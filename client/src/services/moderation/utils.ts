import { MAX_IMAGE_SIZE } from './constants';

/**
 * Resizes an ImageBitmap to fit within a specified maximum size.
 * @param bitmap The ImageBitmap to be resized.
 * @return A Promise that resolves to the resized ImageBitmap.
 */
export async function fitImage(bitmap: ImageBitmap): Promise<ImageBitmap> {
    const scale = Math.min(MAX_IMAGE_SIZE / bitmap.width, MAX_IMAGE_SIZE / bitmap.height);

    const resizedBitmap = await createImageBitmap(bitmap, {
        resizeWidth: Math.round(bitmap.width * scale),
        resizeHeight: Math.round(bitmap.height * scale),
        resizeQuality: 'high',
    });

    return resizedBitmap;
}
