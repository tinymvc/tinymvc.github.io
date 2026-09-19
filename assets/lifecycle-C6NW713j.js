const e=`## Bootstrap the application

\`public/index.php\` loads Composer and the application's bootstrap file. \`Spark\\Foundation\\Application\` extends the service container and coordinates configuration, providers, routes, middleware, and termination.

The skeleton starts with:

\`\`\`php
<?php

use Spark\\Foundation\\Application;

return Application::create(path: dirname(__DIR__))
    ->withMiddleware(
        load: __DIR__ . '/middlewares.php',
        queue: ['csrf'],
    )
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
    );
\`\`\`

\`Application::create()\` accepts the project path, the config directory, and an optional provider list. Keep bootstrapping in one place so HTTP and CLI entry points use the same services.

## Register application features

| Method | Responsibility |
| --- | --- |
| \`withApp()\` | Apply application configuration, providers, and a callback |
| \`withMiddleware(load:, register:, queue:, then:)\` | Load/register aliases and queue global middleware |
| \`withRouting(web:, api:, webhook:, commands:, then:)\` | Load routes and optionally configure the router |
| \`withCommands(load:, then:)\` | Load console commands |
| \`withQueue(jobs:, then:)\` | Register repeating jobs with duplicate-safe queue insertion |
| \`withExceptions($exceptions)\` | Register exception handlers |

Only pass route file paths that exist. \`api\` files are grouped under \`/api\`, with \`cors\` and without \`csrf\`. \`webhook\` files are grouped under \`/webhook\` without \`csrf\`; verify webhook signatures in your own middleware.

## Request lifecycle

1. The application becomes available through \`app()\`.
2. Environment variables, core services, and configuration are loaded.
3. Providers register dependencies, then boot their integrations.
4. The router matches the incoming request.
5. Global and route middleware wrap the callback or controller.
6. The callback is invoked through the container.
7. Its result is normalized into a response, then sent.
8. Termination releases the client response where supported and runs deferred callbacks.

This ordering explains why bindings belong in a provider's \`register()\` method and route/event integrations usually belong in \`boot()\`.

## Deferred work

Use \`defer()\` for small tasks that can run after sending the response:

\`\`\`php
defer(function () {
    tracer_log('Health endpoint completed');
});
\`\`\`

Deferred callbacks are invoked through the container, so dependencies can be type-hinted. They run in registration order. A callback may enqueue another deferred callback; it runs later in the same termination cycle.

On supported servers, termination uses \`fastcgi_finish_request()\` or \`litespeed_finish_request()\`; otherwise it flushes output buffers. A shutdown fallback also handles code paths that send a response and exit early. Errors are reported without stopping later deferred callbacks. Debug mode dispatches \`app:terminated\`.

Deferred work still runs in the PHP process serving the request. For tasks that need retries or must survive a process crash, use a [queue job](./queues.md).

## Extending the framework

Use [providers](./providers.md) for setup, [container bindings](./container.md) for replaceable services, and [middleware](./middleware.md) for request behavior. Keep application extensions out of \`vendor/\` so Composer updates remain predictable.
`;export{e as default};
