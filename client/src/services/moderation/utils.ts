import { MAX_IMAGE_SIZE } from './constants';

/**
 * Converts a File object to an ImageBitmap.
 * @param file The File object to be converted to an ImageBitmap.
 * @returns A Promise that resolves to the resulting ImageBitmap.
 */
export async function fileToImageBitmap(file: File): Promise<ImageBitmap> {
    let blob: Blob = file;

    if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
        const { default: heic2any } = await import('heic2any');
        const converted = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.6,
        });

        blob = Array.isArray(converted) ? converted[0] : converted;
    }

    return await createImageBitmap(blob);
}

/**
 * Resizes an ImageBitmap to fit within a specified maximum size.
 * @param bitmap The ImageBitmap to be resized.
 * @return A Promise that resolves to the resized ImageBitmap.
 */
export async function fitImageBitmap(bitmap: ImageBitmap): Promise<ImageBitmap> {
    const scale = Math.min(MAX_IMAGE_SIZE / bitmap.width, MAX_IMAGE_SIZE / bitmap.height);

    const resizedBitmap = await createImageBitmap(bitmap, {
        resizeWidth: Math.round(bitmap.width * scale),
        resizeHeight: Math.round(bitmap.height * scale),
        resizeQuality: 'high',
    });

    return resizedBitmap;
}
