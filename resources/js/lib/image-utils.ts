/**
 * Utility for Client-Side Image WebP Conversion & Compression
 * Safe for low-spec servers (e.g., 512MB RAM) by running 100% on the user's browser.
 */

interface WebPConversionOptions {
    quality?: number; // 0.1 to 1.0 (default: 0.8)
    maxWidth?: number; // Max width in px (default: 1920)
    maxHeight?: number; // Max height in px (default: 1920)
}

/**
 * Converts any image File (JPEG, PNG, GIF, BMP, WebP) to a compressed WebP File in the browser.
 */
export async function convertToWebP(
    file: File,
    options: WebPConversionOptions = {}
): Promise<File> {
    const { quality = 0.8, maxWidth = 1920, maxHeight = 1920 } = options;

    // Return as is if not an image
    if (!file.type.startsWith('image/')) {
        return file;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();

            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Scale down dimensions while keeping aspect ratio
                if (width > maxWidth || height > maxHeight) {
                    if (width / height > maxWidth / maxHeight) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    resolve(file); // Fallback to original file if canvas not supported
                    return;
                }

                // Draw image to canvas
                ctx.drawImage(img, 0, 0, width, height);

                // Convert canvas content to WebP blob
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            resolve(file); // Fallback to original file
                            return;
                        }

                        // Replace extension with .webp
                        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
                        const webpFile = new File([blob], `${nameWithoutExt}.webp`, {
                            type: 'image/webp',
                            lastModified: Date.now(),
                        });

                        resolve(webpFile);
                    },
                    'image/webp',
                    quality
                );
            };

            img.onerror = () => {
                // If loading image fails, return original file
                resolve(file);
            };

            img.src = event.target?.result as string;
        };

        reader.onerror = () => {
            resolve(file);
        };

        reader.readAsDataURL(file);
    });
}
