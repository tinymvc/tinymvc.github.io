const e=`## Write middleware

Middleware surrounds a route callback. It can reject a request, attach context, or inspect the returned response.

\`\`\`php
<?php

namespace App\\Http\\Middlewares;

use Closure;
use Spark\\Contracts\\Http\\MiddlewareInterface;
use Spark\\Http\\Request;

class EnsureAdmin implements MiddlewareInterface
{
    public function handle(Request $request, Closure $next): mixed
    {
        if (!auth()->check() || !auth()->user('is_admin')) {
            abort(403, 'Forbidden');
        }

        return $next($request);
    }
}
\`\`\`

The \`is_admin\` field is an application-defined attribute. \`php spark make:middleware EnsureAdmin\` creates a starting class.

## Register aliases

Add an entry to the array in \`bootstrap/middlewares.php\`:

\`\`\`php
'admin' => \\App\\Http\\Middlewares\\EnsureAdmin::class,
\`\`\`

Preserve the existing aliases. The skeleton includes \`auth\`, \`csrf\`, \`cors\`, and \`throttle\`. See [Authentication](./authentication.md#protect-routes) for the current core AuthMiddleware limitations and a standalone guard-aware replacement for the \`auth\` alias.

## Route and global middleware

\`\`\`php
Route::get('/admin', [AdminController::class, 'index'])
    ->middleware('admin');
\`\`\`

Apply shared middleware to a route group. To apply it globally, add its alias to the \`queue:\` array in \`withMiddleware()\` in \`bootstrap/app.php\`.

\`withoutMiddleware()\` removes selected middleware for a route or group. Exclusions should be deliberate: stateless APIs and signed webhooks have different requirements from session-authenticated browser forms.

## Parameters

Parameters follow the alias after a colon and are comma-separated:

\`\`\`php
Route::get('/search', [SearchController::class, 'index'])
    ->middleware('throttle:100,1,search');
\`\`\`

A custom handler can accept \`...$args\` after \`$next\`. Parse and validate those string arguments before using them.

## Wrap a response

\`\`\`php
public function handle(Request $request, \\Closure $next): mixed
{
    $response = $next($request);

    if ($response instanceof \\Spark\\Http\\Response) {
        $response->setHeader('X-Frame-Options', 'DENY');
    }

    return $response;
}
\`\`\`

Callbacks may return values that are normalized later, so do not assume every downstream return is already a response unless your integration guarantees it.

## Built-in protections

- [CSRF & CORS](./csrf-cors.md) covers browser form tokens and cross-origin requests.
- [Rate limiting](./rate-limiting.md) covers request throttling.
- [Authentication](./authentication.md) and [Authorization](./authorization.md) cover identity and permission checks.

Use middleware for request-wide behavior and gates for domain-specific actions on records.
`;export{e as default};
