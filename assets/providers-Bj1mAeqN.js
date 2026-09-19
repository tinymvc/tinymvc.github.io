const e=`## Create a provider

\`\`\`bash
php spark make:provider CatalogServiceProvider
\`\`\`

Providers extend \`Spark\\Foundation\\Providers\\ServiceProvider\`. Register services in \`register()\` and integrations in \`boot()\`:

\`\`\`php
<?php

namespace App\\Providers;

use Spark\\Foundation\\Providers\\ServiceProvider;
use App\\Contracts\\Catalog;
use App\\Services\\RemoteCatalog;

class CatalogServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(Catalog::class, RemoteCatalog::class);
    }

    public function boot(): void
    {
        // Register listeners, view composers, or application integrations.
    }
}
\`\`\`

The example assumes those application classes exist. Keep registration lightweight so resolving a provider does not perform an external HTTP request or an unnecessary database query.

## Register a provider

Add the class to the array in \`bootstrap/providers.php\`. The application can also receive a provider list through \`Application::create(providers: ...)\` or \`withApp(providers: ...)\`.

All providers register before provider boot logic runs. Use this ordering when one integration depends on services supplied by another. Avoid relying on incidental request-time initialization.

## Typical provider work

- Bind interfaces to implementations or configure a third-party SDK.
- Register event listeners and permission abilities.
- Share view data, view composers, and custom directives.
- Install router macros supplied by an integration.

Application configuration remains in \`config/*.php\`; a provider reads it and builds services.

## Facades

Facades are static-looking proxies to services resolved from the application container:

\`\`\`php
use Spark\\Facades\\Cache;
use Spark\\Facades\\Route;

Route::get('/status', fn() => ['status' => 'ok']);
\`\`\`

Available facades include App, Auth, Blade, Cache, DB, Event, Gate, Hash, Http, Lock, Log, Mail, and Route. Check the underlying service signature in the [API reference](./api-reference.md). A facade does not guarantee compatibility with another framework's similarly named facade.

## Choose a consistent style

Helpers are convenient in routes and templates. Constructor injection makes dependencies clear in services and simplifies replacement in tests. Facades can fit an application that already uses them. Choose a consistent convention rather than introducing every style into a single feature.

## Integration boundaries

An installed package may contribute its own provider and facade namespace. For example, the Inertia facade is \`Inertia\\Facades\\Inertia\`, and \`Route::inertia()\` exists only after that provider registers it. Keep package setup with the application's other providers.
`;export{e as default};
