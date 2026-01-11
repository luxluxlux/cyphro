/* eslint-disable no-restricted-globals */

import type { Action, ITransferableFile } from 'utils/interfaces';
import { deserializeFile, serializeUint8Array } from 'utils/workers';

// TODO: Cover with tests
self.onmessage = async (
    event: MessageEvent<{
        action: Action;
        source: ITransferableFile;
        password: string;
        disguise?: ITransferableFile
    }>): Promise<void> => {
    const { action, source, password, disguise } = event.data;

    const deserializedSource = deserializeFile(source);
    const deserializedDisguise = disguise && action === 'encode' ? deserializeFile(disguise) : undefined;

    // Web worker doesn't call onerror handler on exceptions in async functions
    try {
        const { encryptFile, decryptFile } = await import('utils/crypto/core');
        const data = action === 'encode'
            ? await encryptFile(deserializedSource, password!, deserializedDisguise)
            : await decryptFile(deserializedSource, password!);

        const serializedData = serializeUint8Array(data instanceof Uint8Array ? data : data.data);

        const result = data instanceof Uint8Array ? serializedData : {
            name: data.name,
            extension: data.extension,
            data: serializedData,
        };

        // To avoid copying, the contents of the files are stored in a transferable object
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects
        const transfer = [serializedData.buffer];

        self.postMessage({ ok: true, result }, transfer);
    } catch (error) {
        self.postMessage({
            ok: false,
            error: error instanceof Error ? error.message : String(error),
        });
    }
};