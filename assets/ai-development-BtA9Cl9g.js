const e=`Build with an AI assistant that understands TinyMVC's own APIs, project structure, and installed version. The starter includes a development skill and a detailed framework reference so your assistant can work from the actual implementation.

## Start here

Open your application folder in your coding assistant, then give it a concrete task and point it to the project guidance:

\`\`\`text
Use .agents/skills/tinymvc-development/SKILL.md for this TinyMVC project.
Read the relevant sections of FRAMEWORK.md and inspect the installed
TinyCore source when an API is unclear.

Add a posts API with validation, ownership checks, and pagination.
Follow the existing application conventions and add focused tests.
\`\`\`

In tools that support named skill invocation, select \`tinymvc-development\` or invoke \`$tinymvc-development\` when it is available. In other tools, explicitly reference the skill file and \`FRAMEWORK.md\`. Automatic discovery varies by assistant; the files can also be used as ordinary Markdown context.

New to TinyMVC itself? Start with [Introduction](./introduction.md), [Installation](./installation.md), and [Quick start](./quick-start.md).

## Understand the guidance files

Keep these files together at their application-relative paths:

\`\`\`text
your-application/
├── AGENTS.md
├── FRAMEWORK.md
└── .agents/
    └── skills/
        └── tinymvc-development/
            └── SKILL.md
\`\`\`

| File | Purpose |
| --- | --- |
| \`AGENTS.md\` | Directs project agents to the TinyMVC skill and the installed framework |
| \`.agents/skills/tinymvc-development/SKILL.md\` | A focused workflow for implementing, debugging, reviewing, and testing features |
| \`FRAMEWORK.md\` | Detailed APIs, examples, source locations, and framework-specific behavior |

The skill routes the assistant to the relevant reference sections. A routing change should not require loading every database, queue, and frontend example. Keep your application's own conventions in its project instructions, and keep reusable framework guidance in the skill/reference.

For an existing application without these files, bring them over from the [TinyMVC starter](https://github.com/tinymvc/skeleton) after reviewing them against your installed framework. Merge guidance into an existing \`AGENTS.md\` instead of overwriting project rules. Preserve the directory structure: the skill links to \`FRAMEWORK.md\` using a relative path. These are repository files; they do not require a PHP service provider or runtime package.

## Work against your installed version

Ask the assistant to check \`composer.json\`, the locked or installed TinyCore version, and the relevant files under \`vendor/tinymvc/tinycore/src\`. A constraint such as \`^3.0\` permits multiple releases and does not identify the installed API.

The current documentation may describe a newer implementation than your application. A neighboring TinyCore checkout can also differ from the installed package. Resolve those differences before using a method, rather than silently upgrading dependencies or editing vendor files.

TinyMVC uses the \`Spark\\\` namespace and its own implementations. Familiar names do not imply Laravel compatibility. For exact parameter order and return types, use the [API reference](./api-reference.md) and the installed source.

## Give the assistant a useful task

Describe the desired behavior, the relevant files or feature, and the constraints that matter: who can access it, the existing frontend, the database driver, and what should count as success.

\`\`\`text
Use the TinyMVC development skill.

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

## Verify the result

Ask for checks appropriate to the change. The skeleton provides a PHP test runner:

\`\`\`bash
php test
\`\`\`

Use \`php test --filter=PostTest\` to run a matching test class or method when one exists, and \`php -l path/to/changed.php\` for syntax checks. Run the application's frontend build when assets change. See [Testing](./testing.md) for test configuration, isolation, and assertions.

For database features, verify affected rows and stored state as well as HTTP responses. Keep migrations and destructive examples in the intended test environment during verification. SQLite tests do not establish MySQL/PostgreSQL compatibility for driver-specific SQL.

The assistant's handoff should identify the behavior changed, tests actually run, and any remaining version or driver limitation. Review the diff alongside those results.

## Keep the guidance current

Update \`FRAMEWORK.md\` when the framework's public behavior changes. Update \`SKILL.md\` when the development workflow or reference paths change. Keep the short entry point focused and link to detailed guidance instead of duplicating the entire manual.

When adopting a new TinyCore release, review the [upgrade notes](./upgrade-notes.md), compare the installed APIs with the guidance, and re-run the relevant application tests. Existing versioned documentation should continue to describe its own release.
`;export{e as default};
