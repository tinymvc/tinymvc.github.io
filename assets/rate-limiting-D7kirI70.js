const e=`## Attach a throttle

The skeleton registers \`throttle\` as an alias for an application class extending \`Spark\\Foundation\\Http\\Middlewares\\ThrottleIncomingRequests\`.

\`\`\`php
Route::get('/search', [SearchController::class, 'index'])
    ->middleware('throttle:100,1,search');
\`\`\`

Arguments are **attempts, minutes, suffix**. This example allows up to 100 recorded requests in a one-minute window for the request identifier. Without arguments, the base defaults are 50 attempts and one minute.

## How requests are counted

The implementation stores recent timestamps in the \`th:requests\` cache. The identifier includes the HTTP method, path, client IP, and optional suffix. Old timestamps outside the window are discarded. An exhausted allowance throws \`TooManyRequests\`, mapped to HTTP **429**.

The suffix separates otherwise similar policies. Because the path is part of the key, a route parameter that changes the path also changes its counter. This middleware is not an account-wide quota service.

## Operational considerations

The throttle uses your [cache configuration](./cache.md). Multiple application servers need shared storage if they must share counters. Ensure your deployment resolves client IPs correctly before depending on IP-based limits.

The current implementation reads and writes a timestamp array. It is not an atomic distributed quota guarantee under simultaneous requests. For strict billing quotas or high-concurrency limits, use a dedicated atomic counter design or gateway in addition to this application middleware.

## Test the policy

Use a small limit in a test route, send requests with the same method/path/IP, and assert that the next request returns 429. Test expiry separately using the configured window and isolated cache storage. See [Testing](./testing.md).
`;export{e as default};
