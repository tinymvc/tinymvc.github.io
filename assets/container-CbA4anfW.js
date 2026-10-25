const e=`## Resolve dependencies

The application extends \`Spark\\Container\`. \`app()\` returns the container; \`app(Service::class)\` and \`get(Service::class)\` resolve a service.

\`\`\`php
$service = app(App\\Services\\ReportService::class);
\`\`\`

Concrete classes with resolvable constructor dependencies can be built automatically. Interfaces, scalar constructor values, and alternative implementations need bindings or explicit parameters.

## Bind and share services

\`\`\`php
app()->bind(
    App\\Contracts\\Catalog::class,
    App\\Services\\RemoteCatalog::class,
);

app()->singleton(App\\Services\\ReportService::class);
\`\`\`

\`bind()\` resolves according to its factory/class binding; \`singleton()\` keeps a shared resolved instance. A factory receives the container and can read configuration:

\`\`\`php
app()->singleton(App\\Services\\RemoteCatalog::class, function () {
    return new App\\Services\\RemoteCatalog(config('services.catalog_url'));
});
\`\`\`

This example assumes your \`RemoteCatalog\` constructor accepts that URL. Put application bindings in a [service provider](./providers.md).

## Existing instances and aliases

\`instance($abstract, $object)\` registers an already constructed value. Alias argument order is **alias first, abstract second**:

\`\`\`php
app()->alias('catalog', App\\Contracts\\Catalog::class);
$catalog = app('catalog');
\`\`\`

\`isAlias()\`, \`getAlias()\`, \`getAliases()\`, and \`removeAlias()\` inspect or manage aliases. Prefer class/interface names in application code when they make dependencies clearer.

## Constructor and method injection

\`\`\`php
class ReportController
{
    public function __construct(private ReportService $reports) {}

    public function show(\\Spark\\Http\\Request $request)
    {
        return $this->reports->summary();
    }
}
\`\`\`

Import your service class in a real controller. \`make($class, $parameters)\` supplies construction parameters; \`call($callback, $parameters, $bindingFields)\` invokes a closure or action with resolution. Routing and commands use these facilities internally.

Invokable objects and static callables work as actions and binding factories. Static callbacks do not require constructing their class. Explicit positional objects matching a parameter's class type are passed through unchanged; missing class dependencies are injected. Variadic parameters consume remaining positional values or an array supplied by parameter name, and may be empty.

## Contextual bindings

Use the container's three-argument form:

\`\`\`php
app()->when(
    App\\Services\\ExportService::class,
    App\\Contracts\\Storage::class,
    App\\Services\\ArchiveStorage::class,
);
\`\`\`

This chooses an implementation when resolving the specified consuming class. It is not the chained \`when()->needs()->give()\` API of another framework.

## Inspection and replacement

\`bound()\` checks explicit bindings, \`resolved()\` checks resolution state, and \`has()\` checks container availability. \`forgetInstance()\` removes a shared instance; \`forget()\` removes a binding; \`reset()\` replaces it. \`debug()\` returns container diagnostics, and \`flush()\` clears container state.

Use replacement methods deliberately in tests or controlled bootstrapping. Replacing a service after other singletons have captured it does not automatically update those objects.

## Troubleshooting

For an unresolved dependency, check namespace/autoloading, interface bindings, constructor scalar arguments, and provider registration. Circular dependencies are usually a sign to separate responsibilities or introduce a smaller interface. Do not expose container debug output in production.
`;export{e as default};
