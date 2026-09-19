const e=`## Choose the right repository

| Project | Repository |
| --- | --- |
| Framework implementation | [tinymvc/tinycore](https://github.com/tinymvc/tinycore) |
| Base application starter | [tinymvc/skeleton](https://github.com/tinymvc/skeleton) |
| Inertia adapter | [tinymvc/inertia-php](https://github.com/tinymvc/inertia-php) |
| Orbit admin starter | [tinymvc/orbit](https://github.com/tinymvc/orbit) |
| FireLine plugin | [shahinmoyshan/fireline](https://github.com/shahinmoyshan/fireline) |

Use the [community page](#/community) for questions and discussion. Report a reproducible framework defect in the repository that owns the behavior.

## Report a useful issue

Include your PHP/framework versions, database/cache drivers, a minimal example, the expected result, and the observed result or sanitized error. Remove credentials, private records, and application keys from logs and examples.

Check existing issues first. A small reproduction in a fresh skeleton is often easier to investigate than a large application-specific trace.

## Propose a change

Create a focused branch, follow nearby code conventions, and explain the behavior before and after the change. Add a regression test for a behavior change and update the related guide when a public API changes. Keep unrelated formatting or refactors out of the patch.

For framework/application PHP changes, lint changed files and run the applicable test suite. For database features, test the drivers your change claims to support.

## Improve the docs

Each guide is a Markdown file. Page titles, descriptions, groups, and order live in the navigation manifest. Keep examples complete enough to follow, name required application classes, and link to related topics.

When an API changes, review the implementation, update its guide and examples, then regenerate the API snapshot. The workflow below keeps the Markdown, navigation, and source reference together. Existing frozen versions should continue to describe their original release.

## Licensing and attribution

TinyMVC and its referenced ecosystem repositories publish their own license files. Preserve the applicable notices when reusing source or documentation. Contributions should be work you have permission to submit.

## Edit content and navigation

From the documentation project root:

| File | Edit here |
| --- | --- |
| \`src/content/current/<slug>.md\` | Current article body, examples, and section headings |
| \`src/content/current/navigation.json\` | Article title, description, group, sidebar order, and source-file mappings |
| \`src/content/versions.json\` | Available versions, default version, and framework source refs |
| \`src/data/site.ts\` | Shared homepage content and menu links |
| \`src/data/community.ts\` | Community content and public giscus configuration |

Article titles come from navigation, so start Markdown sections with \`##\` instead of repeating an H1. Link to another guide with \`./models.md\`, or a section with \`./soft-deletes.md#restore-records\`; the renderer keeps readers in the selected documentation version. Keep published slugs stable so bookmarks continue working.

A new article needs both its Markdown file and a navigation entry. Its \`sources\` list uses paths relative to TinyCore’s \`src/\`; a trailing slash maps a directory. These mappings help the source checker identify guides affected by a framework change. They do not automatically rewrite prose.

## Validate a documentation change

Run these commands in the documentation project, not through \`php spark\`:

\`\`\`bash
npm ci
npm run docs:check-source
npm run docs:check
npm run docs:lint-examples
npm test
npm run docs:smoke
npm run docs:smoke-database
npm run build
\`\`\`

The source and smoke commands expect sibling \`tinycore/\` and \`skeleton/\` checkouts. You can pass another TinyCore \`src\` directory to \`docs:check-source\` / \`docs:sync-api\`, and the PHP smoke scripts accept source and skeleton paths. The build and navigation checks work with the committed content/reference snapshots alone.

\`docs:check-source\` reports changed source files and affected guides. After reviewing those changes and updating examples, run \`npm run docs:sync-api\` to refresh **current** \`api.json\` and \`sources.json\`, then repeat the relevant checks. Never use a snapshot refresh as a substitute for reviewing changed behavior.

The checks serve different purposes: Markdown validation checks local links, headings, metadata, and source paths; PHP example lint checks syntax; runtime smoke checks exercise selected contracts using isolated SQLite/storage. A passing example lint does not prove an application class exists or every database driver behaves identically. Preview desktop and mobile navigation, long tables/code blocks, and search before publishing.

## Freeze a framework version

Keep editing \`current\` until you are ready to preserve a release. Freeze it with:

\`\`\`bash
npm run docs:version -- v3 "TinyMVC v3" YOUR_VERIFIED_TINYCORE_TAG_OR_COMMIT
\`\`\`

Replace the last argument with the actual reviewed TinyCore tag or commit; it is used for source links. The command copies current Markdown, navigation, API declarations, and source hashes into a separate version directory and adds it to \`versions.json\`. It does not check out that ref or regenerate documentation from it. Verify the current snapshot matches that release before freezing.

Version IDs use forms such as \`v3\`, \`v4\`, or \`v5\`; the command rejects an existing ID rather than overwriting it. The selector appears when multiple versions exist. \`defaultVersion\` decides where the plain Docs link opens. Within each version, the first navigation entry is its landing page. Preserve Introduction first, with AI-assisted development after Application lifecycle in the getting-started sequence.

Later framework work stays in \`current\`; corrections to frozen guides should remain specific to the corresponding release. Run \`npm run docs:check\` after changing the registry because validation covers every version.

## Publish the documentation site

\`npm run build\` generates \`dist/\`. Preview it with \`npm run preview\`, then publish that entire output directory to your static host. Relative asset paths support a subdirectory; hash routes such as \`#/docs/validation\` do not need server-side route rewrites. Serve over HTTP(S), not by opening \`index.html\` as a local file.

Before replacing a live site, check its deployed base path, asset loading, page links, search, community discussion embed, and mobile menu. Publishing the documentation does not run PHP migrations or deploy a TinyMVC application; application deployment is covered in [Deployment](./deployment.md).
`;export{e as default};
