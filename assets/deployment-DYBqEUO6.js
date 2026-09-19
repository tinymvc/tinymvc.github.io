const e=`## Serve the public directory

Set the web server's document root to the application's **\`public/\`** directory. Requests for application routes should reach \`public/index.php\`; existing public assets can be served directly. Never expose the project root, \`.env\`, source, storage internals, or Composer metadata as static files.

Use a production PHP runtime/web server. \`php spark serve\` is a local development convenience.

## Prepare a release

A typical build phase installs locked dependencies and compiles frontend assets:

\`\`\`bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
\`\`\`

Deploy \`vendor/\`, application code, public assets, and the complete Vite build including its hidden \`.vite/manifest.json\`. Keep production secrets and writable persistent data outside disposable release artifacts.

## Environment and storage

Set the production \`APP_URL\`, \`APP_DEBUG=false\`, database credentials, cache/queue drivers, and mail configuration. Preserve \`APP_KEY\` across releases. Ensure the PHP process can write the configured storage and SQLite locations without making the whole project world-writable.

If public uploads are intended, run \`php spark storage:link\` and verify the resulting public URL. Keep private files outside publicly linked locations.

## Database changes

Back up the database and review migration effects before running:

\`\`\`bash
php spark migrate
\`\`\`

Avoid \`migrate:fresh\` on a database whose contents must be retained. Plan application/schema deployment order for incompatible changes, and keep rollback data-loss risks explicit.

## Clear generated state

After changing configuration or compiled-template behavior:

\`\`\`bash
php spark config:clear
php spark view:clear
\`\`\`

Use cache clearing deliberately according to your invalidation plan. Restart long-running workers so they load the new code and config. Do not regenerate the application key as a routine deployment step.

## Workers and recurring work

Run \`php spark queue:work\` under a process supervisor with the intended queue name and explicit worker settings. Capture output and monitor failures. Repeating jobs need both registration and an active worker.

Use Redis or another shared architecture when multiple hosts must share cache, locks, queue state, and throttling. Local SQLite files on separate machines do not provide shared state.

## Performance

Enable and configure PHP OPcache in the server runtime. Avoid unnecessary queries, eager-load relationships, paginate large lists, cache expensive reusable results, and move slow retriable tasks into jobs. Build frontend assets for production.

Measure latency, database time, memory, and error rates with your actual workload. TinyMVC's compact core is designed for low overhead, but these docs do not promise an unmeasured requests-per-second figure.

## Verify a release

Check a public page, a JSON endpoint, login/logout, a protected write with CSRF, asset loading, upload access, and a queued job. Confirm debug output is off and expected logs are being written. Keep a tested rollback plan for both code and schema changes.

## Persist release state

Keep uploaded files, SQLite databases, queue/cache locations as appropriate, and **\`database/migrations.json\`** outside a replaceable release directory or restore them consistently for the new release. The migration history is a file, not a table in the application database. Losing it can cause an already-applied migration to be attempted again.

Clear stale configuration before running migrations or restarting workers so deployment commands use the intended database. Verify CLI PHP and the web PHP runtime have the same required extensions; a successful CLI command does not establish that PHP-FPM loaded the same configuration.

Composer’s create-project hooks generate keys for a new project. Production deployment should use the existing key and locked dependencies rather than repeating project creation over live data.
`;export{e as default};
