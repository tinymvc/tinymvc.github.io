const e=`## Accept and validate a file

Use \`multipart/form-data\` for browser uploads and validate the file before storing it:

\`\`\`html
<form action="/avatar" method="POST" enctype="multipart/form-data">
    @csrf
    <label for="avatar">Profile image</label>
    <input id="avatar" type="file" name="avatar" accept="image/jpeg,image/png">
    <button type="submit">Upload</button>
</form>
\`\`\`

\`\`\`php
$request->validate(['avatar' => 'required|image|mimes:jpg,jpeg,png|max:2048']);

$path = uploader(
    uploadTo: 'avatars',
    extensions: ['jpg', 'jpeg', 'png'],
    maxSize: 2048,
)->upload($request->file('avatar'));
\`\`\`

The validation and uploader size limits are in **KB**. The uploader default is 2048 KB. PHP's \`upload_max_filesize\` and \`post_max_size\` can reject the request earlier, so align server and application limits.

## Configure the uploader

| Option | Purpose |
| --- | --- |
| \`uploadTo\` | Subdirectory beneath the upload root |
| \`uploadDir\` | Override the configured filesystem root |
| \`extensions\` | Allowed filename extensions |
| \`multiple\` | Control single/multiple result handling |
| \`maxSize\` | Maximum per-file size in KB |
| \`resize\` | Image target size |
| \`resizes\` | Multiple image sizes |
| \`compress\` | Image compression quality |
| \`driver\` | Custom upload driver |

The default root is \`config('app.upload_dir')\`. \`setUploadDir()\` ensures a writable directory. The return from \`upload()\` is a path string or array of paths, depending on the files and transformations; store the returned paths rather than reconstructing generated filenames.

## Multiple files

Use a form input named \`documents[]\` with \`multiple\`. Pass the corresponding upload structure to an uploader configured with \`multiple: true\`. Bound the number and total size of accepted files in your application as well as each file's individual size.

## Image transformations

\`resize: [320, 320]\` configures a target size. \`resizes\` creates variants, and \`compress\` chooses quality. These operations require GD and a supported image format. Preserve a separate original if your product needs to regenerate variants later.

For direct image operations, see [Images](./images.md).

## Public and private files

\`php spark storage:link\` creates the skeleton's public uploads link. Use \`media_url($path)\` for public media URLs when the path and configured prefix correspond to that storage.

Private documents should remain outside publicly linked storage and be served through an authorized controller. Browser \`accept\` attributes are a convenience, not validation. Fileinfo and server-side checks are needed to inspect uploads, and public upload directories should not execute scripts.

## Delete and extend

\`delete($pathOrPaths)\` removes uploaded files; only pass stored paths owned by the record being updated or deleted. \`copy()\` duplicates uploader configuration. \`removeUploadDir()\` normalizes paths relative to the upload root.

A custom driver implements \`Spark\\Contracts\\Utils\\UploaderUtilDriverInterface\`. Verify upload/delete behavior and returned-path conventions when integrating remote storage. Catch \`UploaderUtilException\` at a controlled boundary and report a useful, non-sensitive error.

## Multiple upload payloads and cleanup

\`\`\`php
$paths = uploader(
    uploadTo: 'documents',
    extensions: ['pdf'],
    multiple: true,
    maxSize: 5120,
)->upload('documents');
\`\`\`

A string argument names the request file field. Multiple uploads use PHP's parallel arrays (\`name\`, \`tmp_name\`, \`size\`, \`error\`); they are not an arbitrary list of individual upload objects. Validate each file and bound the count before storage. The validator does not expand \`documents.*\` wildcard rules automatically.

A multi-file upload can store earlier files before a later file fails. Database rollback does not remove filesystem writes. Track stored paths and implement cleanup if the complete operation must succeed together. When replacing a file, persist the new reference successfully before removing the old file unless your recovery design says otherwise.

An empty extension list does not establish a file-type allowlist. Supply explicit extensions and MIME validation for public uploads. Store the returned relative paths using the same uploader root when later deleting them.
`;export{e as default};
