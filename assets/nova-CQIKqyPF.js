const e=`## A ready-to-build Spark application

Nova is a starter kit for TinyMVC / Spark built with **Blade, Alpine.js, FireLine, Tailwind CSS 4 and daisyUI 5**. It gives you an application you can customize immediately, with PHP routes and templates driving the interface.

| Included feature | What you can build on |
| --- | --- |
| Authentication | Registration, sign-in, remember me, logout and password recovery |
| Account settings | Profile updates and password changes |
| Projects workspace | Create, edit, delete, search and paginate projects, with per-account ownership |
| Responsive layouts | Homepage, authentication screens, dashboard, settings and mobile navigation |
| Interactive forms | Inline validation, loading states, password visibility and success notices |
| Reusable components | Forms, cards, tables, pagination, dialogs, alerts, dropdowns and more |
| Application tests | Authentication, account settings, projects, validation and access protection |

## Install Nova

Use PHP 8.2+, Composer, PDO SQLite for the default database, and Node.js 20.19+ or 22.12+. MySQL is also supported through application configuration.

\`\`\`bash
composer create-project tinymvc/nova tinyapp
cd tinyapp
npm install
npm run build
php spark serve
\`\`\`

Open \`http://localhost:8080\` and create an account. Composer installs the PHP dependencies, creates \`.env\`, generates the application key, and runs migrations and seeders. The npm commands build the frontend assets.

For an existing source checkout, \`composer setup\` prepares the application and builds assets. Generate the application key once when setting up a new project, then preserve it across deployments.

## Develop locally

Run these in separate terminals:

\`\`\`bash
php spark serve
\`\`\`

\`\`\`bash
npm run dev
\`\`\`

Keep \`APP_URL\` in \`.env\` aligned with the local URL. Vite serves the development assets; \`npm run build\` creates the assets used in deployment. See [Vite & Alpine](./vite.md) and [FireLine](./fireline.md) for the frontend workflow.

## Find your way around

| Location | Purpose |
| --- | --- |
| \`routes/web.php\` | Public pages, authentication routes, projects and profile endpoints |
| \`app/Http/Controllers/Auth/\` | Registration, sign-in and password recovery actions |
| \`app/Http/Controllers/ProjectController.php\` | Project creation, updates and deletion |
| \`app/Http/Requests/\` | Form validation |
| \`app/Models/Project.php\` | Project fields, statuses and the \`ownedBy\` scope |
| \`app/Services/\` | Account and password reset workflows |
| \`resources/views/\` | Homepage, dashboard, profile and authentication templates |
| \`resources/views/components/\` | Shared layouts and UI components |
| \`resources/app/app.js\` | Alpine and FireLine initialization |
| \`resources/app/app.css\` | Tailwind, daisyUI and application styles |
| \`database/migrations/\` | Database schema and seeders |

Start by editing the branding component and layouts, then adapt the dashboard and project workflow to your domain. Keep record ownership checks in your controllers and queries when extending the projects workspace.

## Use the UI components

Nova's anonymous Blade components accept props and ordinary HTML attributes. For example:

\`\`\`blade
<x-card title="Your workspace" subtitle="A starting point for your application">
    <p class="text-sm">Add your own content and actions here.</p>
    <x-button variant="primary" type="button">Get started</x-button>
</x-card>
\`\`\`

Browse \`resources/views/components\` for inputs, selects, validation errors, tables, pagination, modals, confirmation dialogs and loading states. Follow the existing forms when adding validation or FireLine submissions, and keep CSRF protection enabled for writes.

## Configure email and data

Application, database and mail settings live in \`.env\`. Nova starts with SQLite and database-backed sessions, cache and queues. Run \`php spark migrate\` after adding migrations.

Password reset messages use \`MAIL_TRANSPORT=log\` by default and can be inspected in \`storage/logs\`. For delivery, set \`MAIL_TRANSPORT=smtp\` and configure \`MAIL_HOST\`, \`MAIL_PORT\`, \`MAIL_USERNAME\`, \`MAIL_PASSWORD\`, \`MAIL_ENCRYPTION\` and the sender settings. See [Mail](./mail.md) for the framework integration.

## Test and deploy

\`\`\`bash
php test
npm run build
\`\`\`

Point the web server at \`public/\`, configure the production environment and mail delivery, keep storage writable, and deploy the built assets. Replace or remove the seeded development account before exposing the application publicly. Follow the [deployment guide](./deployment.md) for the framework checklist.

For live notifications or collaborative presence, follow [Relay](./relay.md). Nova's existing authentication and middleware can protect your channel authorization route. The [Nova repository](https://github.com/tinymvc/nova) contains the starter's source and release-specific setup notes.
`;export{e as default};
