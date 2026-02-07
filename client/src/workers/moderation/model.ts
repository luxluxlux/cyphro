import type { NSFWJS } from 'nsfwjs';

/**
 * Lazy-loaded singleton model inside worker.
 */
let nsfwjsModel: NSFWJS | null = null;

/**
 * Asynchronously loads the NSFWJS model if it hasn't been loaded yet, and returns it.
 * @return A promise that resolves with the NSFWJS model.
 */
export async function getModel(): Promise<NSFWJS> {
    if (!nsfwjsModel) {
        const nsfwjs = await import('nsfwjs');
        nsfwjsModel = await nsfwjs.load();
    }
    return nsfwjsModel;
}