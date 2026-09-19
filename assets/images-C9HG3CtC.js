const e=`## Load an image

Image manipulation uses PHP GD:

\`\`\`php
$photo = image(storage_dir('uploads/photo.jpg'));
$info = $photo->info();
\`\`\`

\`Spark\\Utils\\Image::from($path)\` is an alternative constructor. \`setImageSource()\`, \`set()\`, and \`source()\` replace the source. \`getInfo()\` / \`info()\` inspect metadata, and \`getImage()\` / \`image()\` expose the GD image.

## Resize and compress

\`\`\`php
$source = storage_dir('uploads/photo.jpg');
$thumbnail = storage_dir('uploads/photo-small.jpg');

$resized = image($source)->resize(320, 240, $thumbnail);
if ($resized) {
    $compressed = image($thumbnail)->compress(80);
}
\`\`\`

\`resize()\` and \`compress()\` return **booleans**, not the Image object. Do not chain \`resize()->compress()\`. Omitting a destination can write back to the source, so pass a destination when the original must remain intact.

Quality must be between 0 and 100. JPEG uses that quality value; PNG maps it to the inverse 0–9 compression setting, which changes compression effort rather than making PNG lossy. GIF ignores the quality number. Check the output size and appearance rather than assuming a fixed percentage reduction.

## Multiple sizes and rotation

\`bulkResize($sizes)\` returns an array of generated results for configured sizes. The [uploader](./uploads.md) can apply multiple sizes while storing an incoming file.

\`rotate($degrees)\` rotates the source and returns a boolean. Validate the result before replacing a stored reference.

## Formats and limits

The current Image loader handles **JPEG, PNG, and GIF**. It does not load WebP, AVIF, or SVG, even if GD supports them. File validation and upload storage may accept formats that this transformer cannot process. Animated GIF transformations do not preserve animation.

Bound upload byte size and image dimensions before expensive transformations. A small compressed file can expand into a large pixel buffer. Handle unreadable files, unsupported formats, and unwritable destinations with a controlled error.

## Serving images

Store the generated path on the owning model and use a matching media URL for public assets. Keep originals/private images behind the appropriate authorization boundary. [File manager](./files.md) handles non-image filesystem operations.

## Resize geometry and variants

\`resize($width, $height, $destination)\` creates exactly those pixel dimensions by scaling to cover the target and cropping centrally. It can upscale a small source. Width and height must be positive and at most 10,000. This is a crop-to-fill operation rather than a fit-inside box.

After a successful resize/compression, the object’s source becomes the destination. \`bulkResize()\` accepts a width-to-height map, such as \`[640 => 480, 320 => 240]\`, and works successively on that changing source. To generate every variant from the original, create a fresh Image for each:

\`\`\`php
$source = storage_dir('uploads/photo.jpg');
foreach ([[640, 480], [320, 240]] as [$width, $height]) {
    image($source)->resize($width, $height,
        storage_dir("uploads/photo-{$width}x{$height}.jpg"));
}
\`\`\`

Use separate destinations for originals worth preserving. Invalid input and failed writes can throw \`Spark\\Exceptions\\Utils\\ImageUtilException\`; a boolean return type does not imply that every failure returns false.
`;export{e as default};
