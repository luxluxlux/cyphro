import type { IRestored } from 'utils/crypto/types';
import { serializeUint8Array } from 'utils/workers';

/**
 * Serializes the given data into a transferable object and a result object.
 * @param data The data to be serialized.
 * @return The serialized data in the form of a transferable object and a result object.
 */
export function serializeResult(data: Uint8Array | IRestored) {
    const payload = data instanceof Uint8Array ? data : data.data;
    const serialized = serializeUint8Array(payload);

    return {
        transfer: [serialized.buffer],
        result:
            data instanceof Uint8Array
                ? serialized
                : {
                    name: data.name,
                    extension: data.extension,
                    data: serialized,
                },
    };
}
