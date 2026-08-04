<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageHelper
{
    /**
     * Convert and store an uploaded image file as WebP using PHP GD.
     * Optimized for low-resource VPS (512MB RAM) without external dependencies.
     *
     * @param  string  $folder  Storage subfolder (e.g. 'news', 'potentials')
     * @param  int  $quality  WebP compression quality (1-100, default 80)
     * @param  int  $maxWidth  Maximum width to resize down to (default 1920)
     * @param  string  $disk  Storage disk (default 'public')
     * @return string Stored file path
     */
    public static function storeAsWebp(
        UploadedFile $file,
        string $folder,
        int $quality = 80,
        int $maxWidth = 1920,
        string $disk = 'public'
    ): string {
        // If file is already WebP, store directly
        if (strtolower($file->getClientOriginalExtension()) === 'webp' || $file->getMimeType() === 'image/webp') {
            return $file->store($folder, $disk);
        }

        // Fallback to normal store if GD extension is not enabled
        if (! extension_loaded('gd')) {
            return $file->store($folder, $disk);
        }

        $imageContent = file_get_contents($file->getRealPath());
        if ($imageContent === false) {
            return $file->store($folder, $disk);
        }

        $sourceImage = @imagecreatefromstring($imageContent);
        if (! $sourceImage) {
            return $file->store($folder, $disk);
        }

        $width = imagesx($sourceImage);
        $height = imagesy($sourceImage);

        // Scale down if image width exceeds $maxWidth
        if ($width > $maxWidth) {
            $newWidth = $maxWidth;
            $newHeight = (int) round(($height * $maxWidth) / $width);

            $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
            if ($resizedImage !== false) {
                imagealphablending($resizedImage, false);
                imagesavealpha($resizedImage, true);
                $transparent = imagecolorallocatealpha($resizedImage, 255, 255, 255, 127);
                if ($transparent !== false) {
                    imagefilledrectangle($resizedImage, 0, 0, $newWidth, $newHeight, $transparent);
                }

                imagecopyresampled($resizedImage, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
                imagedestroy($sourceImage);
                $sourceImage = $resizedImage;
            }
        }

        // Buffer WebP output
        ob_start();
        imagewebp($sourceImage, null, $quality);
        $webpContent = ob_get_clean();

        imagedestroy($sourceImage);

        if (! $webpContent) {
            return $file->store($folder, $disk);
        }

        $filename = md5(uniqid((string) microtime(), true)).'.webp';
        $path = trim($folder, '/').'/'.$filename;

        Storage::disk($disk)->put($path, $webpContent);

        return $path;
    }
}
