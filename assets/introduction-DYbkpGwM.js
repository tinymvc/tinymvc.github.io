const e=`TinyMVC is a compact PHP framework for server-rendered websites, JSON APIs, and applications with a modern JavaScript frontend. Spark is the framework's developer-facing identity; its core package is \`tinymvc/tinycore\`, and its PHP classes use the \`Spark\\\` namespace.

## Start building

Working with an AI assistant? Read [AI-assisted development](./ai-development.md) to use the project's skill and framework reference.

New to the framework? Follow [Installation](./installation.md), then build a page and endpoint in the [Quick start](./quick-start.md). Coming from the previous documentation? Read [Migrating older applications](./upgrade-notes.md) for the configuration and API changes.

You write routes, controllers, and models in your application. TinyCore supplies the HTTP lifecycle, dependency injection, validation, database layer, templates, and background services.

## Choose your frontend

| Approach | A good fit | Start here |
| --- | --- | --- |
| Blade + Alpine | Server-rendered pages with focused interactivity | [Blade](./blade.md) and [Vite & Alpine](./vite.md) |
| Blade + FireLine | PHP-rendered pages with client-side navigation and forms | [FireLine](./fireline.md) |
| Inertia + React or Vue | Application interfaces backed by PHP routes and controllers | [Inertia](./inertia.md) |
| Orbit | A ready-made administration starting point | [Orbit admin](./orbit.md) |
| JSON API | Mobile clients, integrations, or a separate frontend | [Routing](./routing.md) and [Responses](./response.md) |

FireLine, Inertia, and Orbit are separate integrations. Install only the pieces your application needs.

## What is included

- **HTTP:** named and resource routes, middleware, request input, validation, responses, sessions, authentication, gates, CSRF, CORS, and throttling.
- **Data:** PDO connections, a fluent query builder, models, casts, relationships, migrations, schema definitions, and pagination.
- **Services:** a container, providers, facades, events, pipelines, concurrency, SQLite or Redis cache, locks, and queues.
- **Developer tools:** the \`spark\` CLI, code generators, Vite integration, debugging tools, and a plain PHP test runner.
- **Utilities:** collections, strings, dates, URLs, translations, uploads, files, images, mail, and an HTTP client.

## A request at a glance

\`\`\`text
public/index.php
  → bootstrap/app.php
  → environment, configuration, and providers
  → router and middleware
  → controller or callback
  → response
  → deferred callbacks
\`\`\`

Most application code returns a value; the framework handles the response. Return a view for HTML, an array for JSON, or a response object when you need control of status and headers.

\`\`\`php
use Spark\\Facades\\Route;

Route::get('/health', fn() => ['status' => 'ok']);
Route::get('/hello/{name}', fn(string $name) => view('hello', [
    'name' => $name,
]));
\`\`\`

## Using these docs

The sidebar follows the path from first installation to production. Search with **⌘ K** or **Ctrl K**, use the page outline to jump to a section, and copy examples directly from code blocks. Every guide links to related topics and, where applicable, the framework implementation.

The [API reference](./api-reference.md) contains an independently searchable snapshot of public declarations, including utilities and support methods that do not need a full tutorial. These guides describe the current checked-in framework; they use TinyMVC's own APIs rather than assuming compatibility with Laravel.
`;export{e as default};
