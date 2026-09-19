const e=`## Protect a critical section

Locks coordinate work using the configured SQLite or Redis cache driver.

\`\`\`php
$result = lock(name: 'default')->withLock(
    'report:daily',
    function () {
        return app(App\\Services\\ReportService::class)->generateDaily();
    },
    timeout: 30,
    waitTimeout: 5,
);
\`\`\`

\`timeout\` is the lock lifetime in seconds; \`waitTimeout\` is how long acquisition may wait. Choose a lifetime longer than the expected work or extend the lock deliberately.

## Acquire and release explicitly

\`\`\`php
$lock = lock(name: 'default');

if ($lock->lock('invoice:' . $invoiceId, 30, 5)) {
    try {
        // Execute the protected operation.
    } finally {
        $lock->unlock('invoice:' . $invoiceId);
    }
}
\`\`\`

\`lock('key')\` acquires a lock and returns a **boolean**. To obtain the Lock service for fluent calls, omit the key and use a named namespace, as above. \`withLock()\` handles release around its callback; handle acquisition failures according to your application's retry/error policy.

## Ownership and expiry

\`ownsLock()\` checks whether this Lock instance owns a key. \`isLocked()\`, \`getLockInfo()\`, and \`getLockOwner()\` support diagnostics. \`extendLock($key, $additionalSeconds)\` extends an owned lock. Expired locks can be cleaned with \`releaseExpiredLocks()\`.

\`unlockAll()\` releases locks owned by the instance. \`forceUnlock()\` bypasses normal ownership and is an operational recovery tool, not routine cleanup.

## Shared deployments

All processes coordinating the same work must use the same driver, namespace, prefix, and reachable storage. A local SQLite file on each server does not coordinate between servers. Database constraints and idempotent writes remain important even when a lock is used: process pauses or expired leases can allow overlapping work.

For durable retried work, combine a lock with [queue jobs](./queues.md) and an idempotent business operation.

## Handle contention

\`withLock()\` throws \`Spark\\Cache\\Exceptions\\LockException\` if acquisition times out. Its callback receives the Lock instance and may return any result; callback exceptions propagate after the \`finally\` release. Use a bounded response such as “already being processed” or a queued retry when contention is expected.

A positive lifetime expires even if the callback is still running. \`extendLock()\` succeeds only for the current owner. Do not start work under one Lock instance and expect an unrelated instance to release it: retain the owner object until the operation completes.
`;export{e as default};
