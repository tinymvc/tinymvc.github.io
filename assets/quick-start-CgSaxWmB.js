const e=`This walkthrough adds a server-rendered page, a JSON endpoint, and a small persistent resource to a fresh skeleton.

## Render your first page

Add to \`routes/web.php\`:

\`\`\`php
use Spark\\Facades\\Route;

Route::get('/hello/{name}', function (string $name) {
    return view('hello', ['name' => $name]);
})->name('hello');
\`\`\`

Create \`resources/views/hello.blade.php\`:

\`\`\`html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello from Spark</title>
</head>
<body>
    <h1>Hello, {{ $name }}.</h1>
    <p>Your first TinyMVC page is running.</p>
</body>
</html>
\`\`\`

Visit \`/hello/Ada\`. Blade escapes \`{{ }}\` output, so a name is rendered as text.

## Return JSON

Add another route:

\`\`\`php
Route::get('/health', fn() => json([
    'status' => 'ok',
    'application' => config('app.name'),
]));
\`\`\`

An array return value is also converted into JSON. Use \`json($data, 201)\` when you need an explicit HTTP status.

## Add an API route file

Create \`routes/api.php\`. Register it alongside the existing web file in \`bootstrap/app.php\`:

\`\`\`php
->withRouting(
    web: __DIR__ . '/../routes/web.php',
    api: __DIR__ . '/../routes/api.php',
)
\`\`\`

API routes automatically receive the \`/api\` prefix, \`cors\` middleware, and an exclusion from the global \`csrf\` middleware. The skeleton already registers the \`cors\` alias. Do not repeat \`/api\` in the route file. Authentication and permissions are still application responsibilities.

## Create a posts table

\`\`\`bash
php spark make:migration create_posts_table
\`\`\`

Edit the generated migration:

\`\`\`php
<?php

use Spark\\Database\\Schema\\Blueprint;
use Spark\\Database\\Schema\\Schema;

return new class {
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->required();
            $table->text('body')->required();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
\`\`\`

Set your [database configuration](./database.md), then run \`php spark migrate\`.

## Create a model

Create \`app/Models/Post.php\`:

\`\`\`php
<?php

namespace App\\Models;

use Spark\\Database\\Model;

class Post extends Model
{
    protected string $table = 'posts';
    protected array $fillable = ['title', 'body'];
}
\`\`\`

The timestamps created in the migration match the model defaults. \`fillable\` limits the supplied fields that are persisted; validate and authorize input before creating a model.

## Validate and save

Add to \`routes/api.php\`:

\`\`\`php
use App\\Models\\Post;
use Spark\\Facades\\Route;
use Spark\\Http\\Request;

Route::get('/posts', fn() => [
    'data' => Post::latest()->take(20)->all(),
]);

Route::post('/posts', function (Request $request) {
    $data = $request->validate([
        'title' => 'required|string|max:255',
        'body' => 'required|string',
    ]);

    return json(['data' => Post::create($data)], 201);
});
\`\`\`

Try the local endpoint:

\`\`\`bash
curl -i http://localhost:8080/api/posts \\
  -H 'Accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{"title":"First post","body":"Built with Spark."}'
\`\`\`

This teaching endpoint allows public writes. Before deploying it, attach your application's authentication and authorization middleware. See [Authentication](./authentication.md) and [Authorization](./authorization.md).

## Grow the feature

Move route logic into a [controller](./controllers.md), move reusable rules into a [form request](./validation.md), and add a [feature test](./testing.md). For HTML forms, include \`@csrf\` and use the [validation errors and old input](./validation.md#displaying-errors) helpers.
`;export{e as default};
