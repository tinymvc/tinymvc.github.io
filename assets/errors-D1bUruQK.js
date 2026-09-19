const e=`## Abort a request

\`\`\`php
abort(404, 'Post not found');
abort_if(!$allowed, 403, 'Forbidden');
abort_unless($available, 404, 'Not found');
\`\`\`

Use an HTTP error when the request cannot continue. Prefer explicit not-found and authorization checks over allowing a null value to trigger an unrelated exception later.

## Framework mappings

| Failure | HTTP status |
| --- | --- |
| Route, item, or record not found | 404 |
| Authorization denied | 403 |
| Invalid CSRF token | 419 |
| Too many requests | 429 |

Request validation prepares an error response appropriate to the request type. JSON callers should send \`Accept: application/json\`. Tests capture early error responses rather than terminating the runner.

## Custom exception handlers

\`withExceptions()\` accepts an array mapping exception class names to callable handlers. Register it in \`bootstrap/app.php\` when your application has a domain-specific exception response.

Keep handlers narrow and return a framework response. Log operational details server-side while returning a useful public message. A handler receives the exception as its single argument and must return a \`Spark\\Http\\Response\` to handle an HTTP failure. Matching uses the first registered compatible exception class; register specific exceptions before broad ones. Built-in HTTP mappings above run before these custom handlers.

## Debug mode

\`APP_DEBUG\` maps to \`app.debug\`. Enable it locally to inspect errors, and disable it in production. Clear configuration cache after changing it. Debug pages may expose paths, queries, or other internals, so a production error page should be controlled and concise.

## Tracer and logs

\`\`\`php
tracer_log('Report generation started');
\`\`\`

\`Spark\\Tracer\` registers error, exception, and shutdown handlers and supports \`log()\`. \`tracer()\` resolves the diagnostic utility. Use application logging around important operations rather than relying on removed Mail/Queue-specific logging APIs.

Logs need appropriate permissions, rotation, and retention. Avoid logging passwords, session IDs, bearer tokens, or entire request bodies containing private data.

## Interactive debugging

\`dump()\` prints diagnostic values; \`dd()\` prints and stops execution. Remove temporary output before returning JSON or committing production code.

\`\`\`bash
php spark tinker
\`\`\`

Tinker opens an interactive application shell. It uses the application's configured services, so a write in the shell can change the real database. Use a development environment for experiments.

## Troubleshooting by layer

Check the route list for routing problems, middleware aliases for unexpected denials, config cache for stale settings, database driver/credentials for PDO errors, and the Vite manifest for asset failures. Add a focused regression test once the failure is understood.

## Handle a domain exception

Assuming your application defines \`App\\Exceptions\\InventoryUnavailable\`, add to the bootstrap chain:

\`\`\`php
->withExceptions([
    \\App\\Exceptions\\InventoryUnavailable::class => function ($exception) {
        return json(['message' => 'This item is currently unavailable.'], 409);
    },
])
\`\`\`

Register a callable, such as a closure; an unresolved non-callable controller array is skipped. An unexpected exception is rethrown if its handler returns no Response.

## Structured log context

\`\`\`php
use Spark\\Facades\\Log;

Log::info('Report generated', ['report_id' => $reportId]);
Log::warning('Delivery delayed', ['job_id' => $jobId]);
\`\`\`

Supported levels are \`debug\`, \`info\`, \`notice\`, \`warning\`, \`error\`, \`critical\`, \`alert\`, and \`emergency\`. The facade appends JSON context to the message and writes through Tracer. It does not provide a configurable multi-channel logging stack. Tracer defaults to \`storage_dir('logs/spark.log')\` and renames the file when its built-in size limit is reached; it is not a daily-log driver. A custom Tracer instance can receive another log-file path. Keep context to identifiers and operational facts rather than full models or secrets.
`;export{e as default};
