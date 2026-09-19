const e=`## Create a controller

Controllers group related request handlers. Generate one with:

\`\`\`bash
php spark make:controller PostController
\`\`\`

Keep the namespace and base class used by your application's existing controllers. A plain resolvable PHP class also works; the router invokes its action through the container.

\`\`\`php
<?php

namespace App\\Http\\Controllers;

use App\\Models\\Post;
use Spark\\Http\\Request;
use Spark\\Http\\Response;

class PostController
{
    public function index(): array
    {
        return ['data' => Post::latest()->take(20)->all()];
    }

    public function show(Post $post): array
    {
        return ['data' => $post];
    }

    public function store(Request $request): Response
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        return json(['data' => Post::create($data)], 201);
    }

    public function update(int $id, Request $request): array
    {
        $post = Post::findOrFail($id);
        $post->fill($request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]));
        $post->save();

        return ['data' => $post];
    }

    public function destroy(int $id): Response
    {
        Post::findOrFail($id)->remove();
        return response('', 204);
    }
}
\`\`\`

This example assumes the \`posts\` model/table from [Quick start](./quick-start.md). Add authentication and authorization to write actions according to your application's access rules.

## Register actions

\`\`\`php
use App\\Http\\Controllers\\PostController;
use Spark\\Facades\\Route;

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::get('/posts/{post:slug}', [PostController::class, 'show']);
\`\`\`

Resource routes map all conventional actions at once, but generate \`{id}\` placeholders. Before using the sample controller with \`Route::resource()\`, change \`show(Post $post)\` to \`show(int $id)\` and call \`Post::findOrFail($id)\` inside it, just as the update action does. A controller with \`__invoke()\` can be registered using its class name for a single-purpose endpoint.

## Dependency injection

Type-hint services in a constructor or action. The container resolves concrete classes and registered interface bindings. Scalar route parameters are supplied by route name; dependencies such as \`Request\` are resolved as services.

Automatic model binding is supported for type-hinted models. A route like \`/posts/{post}\` resolves \`show(Post $post)\` by primary key, and \`/posts/{post:slug}\` resolves the model by the \`slug\` route key. Use this for read actions, then authorize access to the resolved model before performing protected writes.

## Return values

| Return value | Result |
| --- | --- |
| \`Response\` | Its content, status, and headers are used |
| Array / \`Arrayable\` | JSON response |
| String or stringable object | Text/HTML content |
| Integer | HTTP status response |
| \`view(...)\` | Rendered Blade response |

Prefer \`json()\` for an API with a non-default status and \`response()\` for explicit text responses. Keep database rules and external-service work in dedicated classes as actions grow. [Form requests](./validation.md#form-requests) keep reusable validation out of controllers.

## A reusable validated action

\`\`\`php
use App\\Http\\Requests\\StorePostRequest;
use App\\Models\\Post;
use Spark\\Http\\Response;

public function store(StorePostRequest $request): Response
{
    $post = Post::create($request->validated());
    return json(['data' => $post], 201);
}
\`\`\`

This replaces the earlier \`store()\` action after creating the [form request](./validation.md#form-requests). Its \`authorize()\` method runs before validation; record-specific checks still belong where the record is resolved. Keep model lookup and authorization explicit for update/delete actions.
`;export{e as default};
