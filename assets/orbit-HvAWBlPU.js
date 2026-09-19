const e=`## An administration starting point

[Orbit](https://github.com/tinymvc/orbit) is a TinyMVC application starter with Inertia, React, TypeScript, Tailwind CSS, and shadcn/ui. It includes authentication flows, users and roles, permission configuration, a BREAD resource module, and configurable dashboard cards/charts.

BREAD means **Browse, Read, Edit, Add, Delete**. A PHP resource describes its forms, table, filters, and actions, and the shared React interface renders them.

## Create an Orbit project

\`\`\`bash
composer create-project tinymvc/orbit my-admin
cd my-admin
npm install
npm run dev
\`\`\`

Run \`php spark serve\` in another terminal. Review Composer's setup output and the project's \`.env\`. The starter's installation scripts prepare the application key, database seeds, and storage link; use the repository's manual setup instructions when those scripts have not run.

Orbit is a complete application starter, not a module to copy blindly over an existing skeleton. Its dependency lockfiles determine the compatible Inertia/React versions. Change seeded demonstration credentials before exposing an installation.

## Add a resource

\`\`\`bash
php spark make:bread Product
\`\`\`

Create the corresponding model and migration, then edit the generated resource in \`app/Http/Resources\`. Its configuration supplies the model, name/slug, eager-loaded relationships, searchable fields, and permission keys.

The resource API groups the work into \`fields()\`, \`columns()\`, \`filters()\`, and \`bulkActions()\`. Dynamic options can come from \`dynamicProps()\`. Lifecycle hooks can transform data before writes or perform follow-up work afterward.

## Register and authorize

Register the resource with \`App\\Modules\\Bread\\ResourceController::routes()\` in the authenticated admin route group. Add its permission keys to \`config/privileges.php\` and the navigation item to \`resources/app/config/menu.ts\`.

Permissions in menus only control visibility. Configure resource/controller permissions so unauthorized users cannot invoke the underlying routes directly.

## Forms, tables, and dashboards

The BREAD layer supports text inputs, selects, relationship pickers, file uploads, rich text, filters, and bulk actions. File fields can manage storage and old-file cleanup; review those lifecycle effects when designing a resource.

Dashboard classes describe stats and chart data in PHP. Supported charts include bar, line, area, pie, radar, and radial layouts. Date filters are application inputs: validate them before using them in queries.

## Customize the interface

| File or directory | Purpose |
| --- | --- |
| \`app/Http/Resources\` | BREAD resource definitions |
| \`app/Modules/Bread\` | Shared resource behavior |
| \`app/Modules/Dashboard\` | Dashboard descriptors |
| \`config/privileges.php\` | Available permission keys |
| \`resources/app/config/menu.ts\` | Navigation items |
| \`resources/app/config/sidebar.ts\` | Sidebar appearance and identity |

Use the [Orbit documentation](https://github.com/tinymvc/orbit#readme) for the complete form/table configuration, resource hooks, chart examples, and release-specific setup. The core [models](./models.md), [validation](./validation.md), and [authorization](./authorization.md) guides still apply to the backend.

## Connect a resource to the existing admin

For \`php spark make:bread Product\`, review the generated \`ProductsResource\` class before registration. In the existing authenticated admin group, add:

\`\`\`php
\\App\\Modules\\Bread\\ResourceController::routes(
    \\App\\Http\\Resources\\ProductsResource::class,
);
\`\`\`

The resource slug controls its paths. Registration supplies browse, create, update, delete, bulk-action, and search endpoints. Keep it inside the starter’s existing authentication group and define privileges before exposing links. Use the exact generated class name when generating resources in subdirectories.

Before releasing a new resource, check field validation, model fillable rules, relationships, file cleanup, and permission checks for every action, including search and bulk actions. Test a restricted role as well as an administrator. Treat seeded accounts as development fixtures and replace their credentials during setup. The [Orbit resource guide](https://github.com/tinymvc/orbit#bread-module) remains the reference for its separately versioned resource API.
`;export{e as default};
