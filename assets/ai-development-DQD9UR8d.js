const e=`Build with an AI assistant that understands TinyMVC's own APIs, project structure, and installed version. Skeleton includes a small skill entry point; TinyCore ships the full development skill, topic references, and API lookup tool alongside the framework. Composer installs and updates deliver the guidance for the installed release.

## Start here

Open your application folder in your coding assistant, then give it a concrete task and point it to the project guidance:

\`\`\`text
Use .agents/skills/tinymvc-spark/SKILL.md for this TinyMVC project.
Read the relevant linked references and inspect the installed
TinyCore source when an API is unclear.

Add a posts API with validation, ownership checks, and pagination.
Follow the existing application conventions and add focused tests.
\`\`\`

In tools that support named skill invocation, select \`tinymvc-spark\` or invoke \`$tinymvc-spark\` when it is available. In other tools, explicitly reference the local skill entry point and ask the assistant to follow it to the installed TinyCore skill and its relevant references. Automatic discovery varies by assistant; the files can also be used as ordinary Markdown context.

New to TinyMVC itself? Start with [Introduction](./introduction.md), [Installation](./installation.md), and [Quick start](./quick-start.md).

## Understand the guidance files

The application keeps a discoverable entry point; the framework package owns the full skill:

\`\`\`text
your-application/
├── AGENTS.md
├── .agents/
│   └── skills/
│       └── tinymvc-spark/
│           └── SKILL.md              # Loads the installed TinyCore skill
└── vendor/
    └── tinymvc/
        └── tinycore/
            ├── src/
            └── skills/
                └── tinymvc-spark/
                    ├── SKILL.md
                    ├── references/
                    │   ├── application-patterns.md
                    │   ├── foundation.md
                    │   ├── queries.md
                    │   ├── workflow-testing.md
                    │   └── ... (topic references linked from SKILL.md)
                    └── scripts/
                        └── api-lookup.php
\`\`\`

| File | Purpose |
| --- | --- |
| \`AGENTS.md\` | Directs project agents to the local skill entry point and records application conventions |
| \`.agents/skills/tinymvc-spark/SKILL.md\` | A stable entry point that loads the full skill from the installed TinyCore package |
| \`vendor/tinymvc/tinycore/skills/tinymvc-spark/SKILL.md\` | The versioned workflow for implementing, debugging, reviewing, and testing features |
| \`vendor/tinymvc/tinycore/skills/tinymvc-spark/references/\` | Topic guidance and portable application examples for the installed framework |
| \`vendor/tinymvc/tinycore/skills/tinymvc-spark/scripts/api-lookup.php\` | A dependency-free lookup tool for installed source declarations |

The full skill routes the assistant to the relevant reference sections. A routing change should not require loading every database, queue, and frontend example. Resolve its relative reference links inside the installed TinyCore skill directory. Keep your application's own conventions in its project instructions.

For an existing application, copy only \`.agents/skills/tinymvc-spark/SKILL.md\` from the [TinyMVC starter](https://github.com/tinymvc/skeleton) and merge its \`AGENTS.md\` guidance into your existing project rules. The full skill comes from a TinyCore release containing \`skills/tinymvc-spark/\`; do not copy its references or scripts into the application. No symlink, publishing command, service provider, or Composer hook is needed.

If \`vendor/\` is missing, install the project's locked dependencies with \`composer install\` when setting up the application. Older TinyCore releases may not contain the bundled skill. In that case, the entry point tells the assistant to use the installed source and local conventions, report the limitation, and avoid silently upgrading dependencies or substituting a neighboring checkout. Adopt a release containing the skill through your normal dependency upgrade process.

## Work against your installed version

Ask the assistant to check \`composer.json\`, the locked or installed TinyCore version, and the relevant files under \`vendor/tinymvc/tinycore/src\`. A constraint such as \`^4.0\` permits multiple releases and does not identify the installed API.

The current documentation may describe a newer implementation than your application. A neighboring TinyCore checkout can also differ from the installed package. Resolve those differences before using a method, rather than silently upgrading dependencies or editing vendor files.

TinyMVC uses the \`Spark\\\` namespace and its own implementations. Familiar names do not imply Laravel compatibility. For exact parameter order and return types, use the [API reference](./api-reference.md) and the installed source.

## Give the assistant a useful task

Describe the desired behavior, the relevant files or feature, and the constraints that matter: who can access it, the existing frontend, the database driver, and what should count as success.

\`\`\`text
Use the tinymvc-spark skill.

Add a trash screen to the existing posts feature using our current Blade
and Alpine components. Users may view, restore, or permanently delete
only their own archived posts. Keep active posts out of the trash screen.

Use the installed soft-delete APIs and add a new migration if needed.
Test active and archived records belonging to two different users,
including attempts to restore or purge another user's record.
Report the files changed and the checks you ran.
\`\`\`

This gives the assistant observable requirements without prescribing every implementation detail. For a bug, provide the expected result, actual result, a small reproduction, and the relevant error with credentials removed.

## Framework details the skill helps with

| Work | What to verify | Guide |
| --- | --- | --- |
| Routes and requests | Registered route files, middleware, validation, and explicit Gate arguments | [Routing](./routing.md), [Validation](./validation.md), [Authorization](./authorization.md) |
| Models and queries | Fillable persistence, casts, return types, query state, and separate upsert arguments | [Models](./models.md), [Query builder](./query-builder.md) |
| Migrations and pivots | Generation versus execution, related tables, keys, and migration history | [Migrations & schema](./migrations.md) |
| Soft deletes | Active/archive scopes, restore versus purge, owner conditions, and bulk-write boundaries | [Soft deletes](./soft-deletes.md) |
| Frontend work | The app's installed Blade, FireLine, Inertia, or Orbit integration | [Choose your frontend](./introduction.md#choose-your-frontend) |
| Background work | Durable jobs versus deferred work, retry behavior, and configured drivers | [Queues](./queues.md), [Application lifecycle](./lifecycle.md) |

For example, \`onlyTrashed()->forceDelete()\` permanently deletes the selected archived rows. A trash scope alone does not restrict the operation to the current user. The assistant should preserve the application's ownership conditions and verify the resulting database state.

## Coding style and native features

The development skill requires readable Laravel-style PHP formatting while using Spark's real APIs: four spaces, one statement per line, expanded long arrays and chains, and blank lines between logical steps. It discourages compressed method bodies, nested ternaries, redundant wrappers, and unnecessary service layers. Newly written code should follow these conventions without reformatting unrelated files.

The application-patterns reference demonstrates: direct typed controller actions, inline validation for small actions or form requests for larger rule sets, focused domain services, reusable model scopes, and explicit response resources. Its examples are self-contained and use a neutral application domain. Service injection and stateless static helpers are both supported where they match the application. These examples live in the installed TinyCore skill; keep application-specific additions in your project instructions.

For efficient work, trace one nearby feature and its tests, then inspect only the relevant installed methods and reference sections. Route binding does not establish ownership. \`validate()\` and no-argument \`validated()\` return Spark's \`Input\` object; call \`all()\` when a plain array is required. Eager-load the relations/counts a resource needs and use \`whenLoaded()\` / \`whenCounted()\` to avoid hidden serialization queries.

Use Spark's validation, resources, relationships, scopes, support helpers, and services before adding custom equivalents. Verify each method against the installed package. Laravel formatting is a style choice, not a promise of Eloquent or Illuminate compatibility.

The skill also requires checking model return values before chaining. Use global \`tap()\` when retaining a model after actions, and \`pipe()\` when returning a transformed value. Explicitly handle failed writes when success matters; \`tap()\` ignores callback return values. See [Models](./models.md#model-action-return-values-tap-and-pipe) and [Helpers](./helpers.md#tap-and-pipe).

## Advanced work and exact APIs

The skill includes advanced workflows for conditional writes, tenant/owner scopes, connection boundaries, commit/dispatch failures, idempotent jobs, expiring locks, query costs, and request/worker state isolation. Load those references when the task crosses these boundaries; routine edits can stay focused.

For uncertain signatures, its \`scripts/api-lookup.php\` reads the installed TinyCore source without booting the application. From the application root:

\`\`\`bash
php vendor/tinymvc/tinycore/skills/tinymvc-spark/scripts/api-lookup.php upsert
php vendor/tinymvc/tinycore/skills/tinymvc-spark/scripts/api-lookup.php transaction --file=Database/
\`\`\`

The tool returns bounded signature/source-location results. Follow traits, inheritance and facade forwarding when interpreting them. The skill intentionally does not bundle the documentation’s large \`api.json\` snapshot: an application can install a different version. Keep the browsable [API reference](./api-reference.md) in the documentation and use installed source to settle version-specific behavior. The lookup script ships with TinyCore and needs no separate copying or application bootstrapping.

## Verify the result

Ask for checks appropriate to the change. The skeleton provides a PHP test runner:

\`\`\`bash
php test
\`\`\`

Use \`php test --filter=PostTest\` to run a matching test class or method when one exists, and \`php -l path/to/changed.php\` for syntax checks. Run the application's frontend build when assets change. See [Testing](./testing.md) for test configuration, isolation, and assertions.

For database features, verify affected rows and stored state as well as HTTP responses. Keep migrations and destructive examples in the intended test environment during verification. SQLite tests do not establish MySQL/PostgreSQL compatibility for driver-specific SQL.

The assistant's handoff should identify the behavior changed, tests actually run, and any remaining version or driver limitation. Review the diff alongside those results.

## Keep the guidance current

Framework maintainers update \`skills/tinymvc-spark/SKILL.md\` and its affected references in the [TinyCore repository](https://github.com/tinymvc/tinycore) alongside API and behavior changes. Those updates ship in the same TinyCore release. Skeleton keeps only the stable entry point, so framework skill updates do not require another Skeleton release. Keep application-specific guidance in the application's \`AGENTS.md\`; vendor files are reference only during application development.

When adopting a new TinyCore release, Composer updates the framework and its bundled guidance together. Review the [upgrade notes](./upgrade-notes.md) and re-run the relevant application tests. Existing versioned documentation should continue to describe its own release.

The skill also includes focused references for dependency injection and event/pipeline composition (\`container-pipelines.md\`), execution choices and concurrency failure handling (\`concurrency.md\`), and request locale/timezone boundaries (\`localization-dates.md\`). Its query reference documents nullable single-row lookups and the migration from false checks. These references are linked from \`SKILL.md\` so complex work can load the relevant contracts without loading the entire guide.
`;export{e as default};
