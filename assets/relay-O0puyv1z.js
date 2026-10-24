const e=`## Realtime messaging for Spark

Relay is a ReactPHP WebSocket daemon for TinyMVC / Spark. Publish from PHP through the Pusher SDK backed by TinyCore's HTTP client, and connect directly from the browser with \`pusher-js\`.

It provides public, private and presence channels; client events; single and batch publishing; socket exclusion; channel and presence queries; cache channels; heartbeats; app-isolated statistics; health checks; and graceful deployment restarts.

## Install and register

Use PHP 8.2+ with JSON and cURL, then install the package in your Spark application:

\`\`\`bash
composer require tinymvc/relay
npm install pusher-js
\`\`\`

Add \`Spark\\Relay\\RelayServiceProvider::class\` to the existing array in \`bootstrap/providers.php\`. Keep the application's other providers, including Nova's FireLine provider.

Create \`config/relay.php\`:

\`\`\`php
return [
    'server' => [
        'host' => env('RELAY_SERVER_HOST', '127.0.0.1'),
        'port' => (int) env('RELAY_SERVER_PORT', 8080),
        'max_connections' => 500,
        'memory_limit_mb' => 256,
    ],
    'apps' => [[
        'app_id' => env('RELAY_APP_ID', '1'),
        'key' => env('RELAY_APP_KEY'),
        'secret' => env('RELAY_APP_SECRET'),
        'allowed_origins' => [env('RELAY_ALLOWED_ORIGIN', 'http://localhost:8080')],
        'max_connections' => 500,
        'max_message_size' => 16384,
        'client_events' => false,
        'cache_ttl' => 1800,
        'max_cached_channels' => 1000,
        'max_cache_size' => 10485760,
    ]],
    'client' => [
        'host' => env('RELAY_HOST', '127.0.0.1'),
        'port' => (int) env('RELAY_PORT', 8080),
        'scheme' => env('RELAY_SCHEME', 'http'),
        'timeout' => 5,
    ],
];
\`\`\`

Use a unique app key and a randomly generated secret. Only the app key belongs in the browser bundle; keep the secret on the backend. Configure the allowed origin to match the application's URL, including its port.

For local development, keep Spark on port 8080 and use a separate port for Relay:

\`\`\`dotenv
RELAY_APP_ID=1
RELAY_APP_KEY=local-app-key
RELAY_APP_SECRET=replace-with-a-random-secret
RELAY_ALLOWED_ORIGIN=http://localhost:8080
RELAY_SERVER_PORT=8081
RELAY_PORT=8081
VITE_RELAY_APP_KEY=local-app-key
\`\`\`

Start Relay in another terminal:

\`\`\`bash
php spark relay:start
\`\`\`

## Connect with pusher-js

Add this to an application JavaScript module loaded through Vite, preserving the existing Alpine/FireLine setup in Nova:

\`\`\`js
import Pusher from 'pusher-js';

const pusher = new Pusher(import.meta.env.VITE_RELAY_APP_KEY, {
    cluster: 'mt1',
    wsHost: 'localhost',
    wsPort: 8081,
    forceTLS: false,
    enabledTransports: ['ws'],
    disableStats: true,
    channelAuthorization: {
        endpoint: '/broadcasting/auth',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
        },
    },
});

pusher.subscribe('updates').bind('item.created', data => {
    console.log(data);
});
\`\`\`

This example uses local HTTP. For production HTTPS, connect through your TLS reverse proxy with the public \`wsHost\`, \`wssPort: 443\`, \`forceTLS: true\` and \`enabledTransports: ['ws', 'wss']\`.

Keep one client in your application's main bundle and unsubscribe page-specific channels when their views are removed. This is especially useful when FireLine changes pages without a full reload.

## Publish from PHP

\`\`\`php
use Spark\\Relay\\Facades\\Relay;

Relay::trigger('updates', 'item.created', ['id' => 42]);
Relay::trigger('private-chat.42', 'message.sent', ['text' => 'Hello'], $socketId);
\`\`\`

The optional socket ID excludes the originating connection. On the browser it is available as \`pusher.connection.socket_id\` after connection. The default facade uses the first configured app; construct \`Spark\\Relay\\Relay\` with an explicit \`Spark\\Relay\\App\` and client configuration to select another app.

The underlying SDK is available through \`Relay::client()\` for \`triggerBatch()\`, \`getChannels()\`, \`getChannelInfo()\` and \`getPresenceUsers()\`. For background publishing, call Relay inside a [Spark job](./queues.md). SDK \`*Async()\` methods prepare TinyCore requests; use the native HTTP client to execute them outside the daemon's event loop.

## Authorize private and presence channels

Define channel rules in an application's provider \`boot()\` method. The following personal channels allow a signed-in user to access only their own channel:

\`\`\`php
use Spark\\Relay\\ChannelAuth;

ChannelAuth::define('private-user.{id}', function ($user, $id) {
    return $user && (string) $user->id === $id;
});

ChannelAuth::define('presence-user.{id}', function ($user, $id) {
    if (!$user || (string) $user->id !== $id) {
        return false;
    }

    return ['id' => (string) $user->id, 'info' => ['name' => $user->name]];
});
\`\`\`

Register the authorization route in \`routes/web.php\`, retaining the application's CSRF middleware:

\`\`\`php
use Spark\\Facades\\Route;
use Spark\\Http\\Request;
use Spark\\Relay\\ChannelAuth;
use Spark\\Relay\\Facades\\Relay;
use Spark\\Relay\\Protocol;

Route::post('/broadcasting/auth', function (Request $request) {
    $user = auth()->user();
    $socket = $request->input('socket_id');
    $channel = $request->input('channel_name');

    if (!$user) {
        return json(['error' => 'Unauthenticated'], 403);
    }

    if (!is_string($socket) || !is_string($channel)
        || !Protocol::validSocketId($socket) || !Protocol::validChannel($channel)) {
        return json(['error' => 'Invalid channel or socket'], 422);
    }

    $grant = ChannelAuth::authorize($user, $channel);
    if ($grant === false
        || (Protocol::channelType($channel) === 'presence' && !is_array($grant))) {
        return json(['error' => 'Forbidden'], 403);
    }

    return response(Relay::authorize($channel, $socket, is_array($grant) ? $grant : null), 200, [
        'Content-Type' => 'application/json',
    ]);
})->middleware('auth');
\`\`\`

Add \`<meta name="csrf-token" content="{{ csrf_token() }}">\` to the shared Blade layout's \`<head>\` for the client example. Unknown channel patterns deny access. For shared workspaces or conversations, check actual membership in the authorization callback. Presence tracks distinct user IDs while allowing multiple tabs per user.

## Cache channels and client events

Use a \`cache-\`, \`private-cache-\` or \`presence-cache-\` prefix to retain the latest backend event for new subscribers. Authorize private and presence cache channels with matching rules as above.

\`\`\`php
Relay::trigger('cache-service-status', 'status.updated', ['status' => 'operational']);
\`\`\`

\`\`\`js
const status = pusher.subscribe('cache-service-status');
status.bind('status.updated', data => console.log(data));
status.bind('pusher:cache_miss', () => {
    // Load the current state from your application's API.
});
\`\`\`

Bind listeners immediately after subscribing. The cache retains one backend snapshot per channel with per-app expiry, entry and byte limits. It remains available while a channel is empty and resets when the daemon restarts. Use versioned snapshots when HTTP refreshes can race newer live updates.

To enable client events, set the app's \`client_events\` to \`true\`, subscribe to a private or presence channel, and call \`channel.trigger('client-typing', { typing: true })\` after subscription succeeds. Client events are rate-limited and sent to other subscribers; validate their contents in receiving application code.

## Monitor and deploy

\`GET /health\` returns \`{"status":"ok"}\` while the daemon responds. \`Relay::stats()\` retrieves signed, app-isolated connection, subscription, channel, message, byte and cache counters. Message totals include protocol messages; sent counts measure queued output. Counters reset on restart.

Route an app's WebSockets and HTTP publishing to the same daemon. Bind the daemon to loopback or a protected network, terminate TLS at your reverse proxy, expose \`/app/\` to browsers and keep \`/apps/\` and monitoring on the backend network. Set finite connection and memory limits appropriate for the host.

Run under Supervisor or another process manager with automatic restart enabled. After a deployment:

\`\`\`bash
php spark relay:restart
\`\`\`

Run this as the daemon's OS user. Relay closes clients with reconnect code 4200 and exits; the supervisor starts its replacement. For release directories, set \`relay.server.restart_file\` to a stable absolute path in shared local storage outside the public root. Refresh application state after reconnecting.

See the [Relay README](https://github.com/tinymvc/relay#readme) for all configuration limits and a reverse-proxy/Supervisor example, and the [deployment guide](./deployment.md) for application setup.
`;export{e as default};
