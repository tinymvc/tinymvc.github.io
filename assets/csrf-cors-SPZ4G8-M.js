const e=`## CSRF protection

The skeleton queues the \`csrf\` middleware globally. Its base class is \`Spark\\Foundation\\Http\\Middlewares\\CsrfProtection\`. State-changing browser requests using POST, PUT, PATCH, or DELETE must carry a valid token.

\`\`\`html
<form action="/profile" method="POST">
    @csrf
    @method('PUT')
    <input name="name" value="{{ old('name') }}">
    <button type="submit">Save</button>
</form>
\`\`\`

The middleware checks \`_token\`, \`X-CSRF-TOKEN\`, or \`X-XSRF-TOKEN\`. A missing or invalid token causes HTTP **419**. Generate the token with \`csrf_token()\` or the \`@csrf\` directive; do not hardcode it.

## JavaScript requests

For a same-origin session-authenticated request, send the token in a header:

\`\`\`html
<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
const token = document.querySelector('meta[name="csrf-token"]').content;
fetch('/profile', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': token,
    },
    body: JSON.stringify({ name: 'Ada' }),
});
<\/script>
\`\`\`

Ensure the page and request share the intended session. Expired sessions, a changed host, or stale cached forms can explain otherwise valid-looking token failures.

## CSRF exclusions

\`withRouting(api: ...)\` and \`withRouting(webhook: ...)\` exclude \`csrf\`. A specific route may use \`withoutMiddleware('csrf')\`. Protect APIs with the appropriate authentication/authorization and webhooks with verified provider signatures. CORS alone does not authenticate requests.

## Configure CORS

The skeleton’s application middleware extends \`Spark\\Foundation\\Http\\Middlewares\\CorsAccessControl\` and reads \`config/cors.php\`. Edit that file; a separate custom middleware class is only needed when changing the middleware behavior:

\`\`\`php
return [
    'paths' => ['/api/*', '/webhook/*'],
    'origin' => ['https://app.example.com'],
    'methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    'headers' => ['Content-Type', 'Authorization', 'X-CSRF-TOKEN'],
    'credentials' => false,
    'age' => 600,
];
\`\`\`

\`paths\` limits CORS to matching request paths (wildcards supported); omitted or empty paths apply it everywhere. \`origin\` controls permitted origins, \`methods\` and \`headers\` control allowed preflight requests, and \`age\` is the preflight cache duration in seconds. Set \`credentials\` to a boolean. Use explicit trusted origins for cookie-bearing cross-origin requests.

## Preflight behavior

A browser preflight uses \`OPTIONS\`, \`Origin\`, and \`Access-Control-Request-Method\`, optionally with \`Access-Control-Request-Headers\`. The router matches a preflight to the route for its requested method, so an ordinary API route with \`cors\` middleware does not need a duplicate OPTIONS route. An explicitly registered OPTIONS route is also supported. Keep \`cors\` before middleware that would reject an unauthenticated preflight.

For an allowed origin, an accepted preflight returns **204** without invoking the controller; unsupported methods or headers return **403**. A disallowed origin continues without CORS access headers, so the browser cannot read the response. CORS is a browser response-access policy, not a server-side permission check.

Credential headers are emitted only when enabled; the middleware does not emit \`Access-Control-Allow-Credentials: false\`. Origin-specific responses include \`Vary: Origin\`.

## Troubleshooting

Check the browser's actual preflight request, the route list, middleware registration, and exact origin including scheme/port. Test normal requests as well as OPTIONS requests. A valid GET response without matching CORS headers will still be blocked by the browser.
`;export{e as default};
