/* eslint-disable no-restricted-globals */

import { deserializeFile } from 'utils/workers';
import { serializeResult } from './utils';
import { CryptoRequest, CryptoResponse } from './types';

/**
 * Handles the incoming message event from the main thread.
 * @param event The message event to handle.
 * @return A promise that resolves when the message has been handled.
 */
export async function handleMessage(event: MessageEvent<CryptoRequest>): Promise<void> {
    try {
        const { action, source, password, disguise } = event.data;

        const sourceFile = deserializeFile(source);
        const disguiseFile = disguise && action === 'encode' ? deserializeFile(disguise) : undefined;

        const { encryptFile, decryptFile } = await import('utils/crypto/core');
        const data = action === 'encode'
            ? await encryptFile(sourceFile, password, disguiseFile)
            : await decryptFile(sourceFile, password);

        const { result, transfer } = serializeResult(data);

        self.postMessage({ result } satisfies CryptoResponse, transfer);
    } catch (error) {
        self.postMessage({
            error: error instanceof Error ? error.message : String(error),
        } satisfies CryptoResponse);
    }
};

/**
 * Handles errors in the crypto worker.
 * @param event The event or error message to handle.
 */
export function handleError(event: Event | string): void {
    const error =
        event instanceof ErrorEvent
            ? event.message
            : typeof event === 'string'
                ? event
                : 'Crypto worker error';
                
    self.postMessage({ error } satisfies CryptoResponse);
}