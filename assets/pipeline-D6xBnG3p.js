const e=`## Compose operations

\`Spark\\Pipeline\` sends a payload through a sequence of operations. Each pipe can change the payload and call the next operation:

\`\`\`php
use Spark\\Pipeline;

$result = Pipeline::make(['name' => '  Ada  '])
    ->through(
        function ($payload, $next) {
            $payload['name'] = trim($payload['name']);
            return $next($payload);
        },
        function ($payload, $next) {
            $payload['slug'] = strtolower($payload['name']);
            return $next($payload);
        },
    )
    ->thenReturn();
\`\`\`

Always return the result of \`$next($payload)\` when execution should continue. A pipe can intentionally stop the sequence by returning without calling next.

## Pipe classes

A pipe can be a class with \`handle()\` / \`__invoke()\`, a callable class/method array, or a closure. \`Spark\\Contracts\\PipeInterface\` defines the handle contract for reusable classes.

\`\`\`php
class TrimName implements \\Spark\\Contracts\\PipeInterface
{
    public function handle($payload, \\Closure $next): mixed
    {
        $payload['name'] = trim($payload['name']);
        return $next($payload);
    }
}
\`\`\`

Pass \`TrimName::class\` to \`through()\`. The container resolves class dependencies. \`pipe()\` aliases pipe addition; \`when()\` and \`unless()\` conditionally add pipes.

## Execute and collect

\`then($destination)\` finishes with an optional callback. \`thenReturn()\` returns the resulting payload; \`execute()\` is another execution entry point. \`collect()\` exposes intermediate results for supported pipeline execution.

\`async()\` returns a Generator. It allows iteration through results but is not a guarantee of parallel processes or threads. Use [Concurrency](./concurrency.md) or [Queues](./queues.md) when the workload needs a different execution model.

## Context and middleware

\`withContext($array)\` attaches shared context. \`middleware($callback)\` wraps the pipeline as a whole, allowing timing or instrumentation around its execution. Keep context values limited to what the pipes need.

## Errors

\`\`\`php
$pipeline->onError(function ($exception, $payload, $context) {
    tracer_log('Import pipeline failed');
    return ['ok' => false];
}, stopOnError: true);
\`\`\`

Choose whether an error should stop processing. Do not continue a partially completed write pipeline unless its recovery behavior is explicit. A pipeline does not automatically create a database transaction.

## Debug and reuse

\`debug(true)\` records pipeline diagnostics and \`getLogs()\` retrieves them. \`clone()\` creates a configured copy; \`reset()\` clears state for reuse. Check whether you intend to append pipes or replace the configured sequence when reusing an object.

Use small, named pipes for validation, normalization, and transformation. Keep application side effects clear and test both the successful chain and an early failure.
`;export{e as default};
