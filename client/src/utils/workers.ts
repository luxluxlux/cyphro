import { ITransferableFile, ITransferableUint8Array } from './interfaces';

/**
 * Serializes a File to a transferable object.
 * @param file The file to serialize.
 * @returns A promise that resolves to the serialized transferable object.
 */
export async function serializeFile(
    file: File
): Promise<ITransferableFile> {
    const buffer = await file.arrayBuffer();
    return {
        name: file.name,
        type: file.type,
        buffer,
    };
}

/**
 * Creates a new File object from a transferable object.
 * @param obj The transferable file object.
 * @param obj.buffer The buffer of the file.
 * @param obj.name The name of the file.
 * @param obj.type The MIME type of the file.
 * @return The newly created File object.
 */
export function deserializeFile({ buffer, name, type }: ITransferableFile): File {
    return new File([buffer], name, { type });
}

/**
 * Serializes a Uint8Array into a transferable object.
 * @param arr The Uint8Array to be serialized.
 * @return The serialized transferable object.
 */
export function serializeUint8Array(arr: Uint8Array): ITransferableUint8Array {
    return {
        buffer: arr.buffer,
        byteOffset: arr.byteOffset,
        byteLength: arr.byteLength,
    };
}

/**
 * Deserializes a transferable object into a Uint8Array.
 * @param obj The transferable object to deserialize.
 * @param obj.buffer The underlying ArrayBuffer of Uint8Array.
 * @param obj.byteOffset The byte offset of Uint8Array.
 * @param obj.byteLength The byte length of Uint8Array.
 * @return The deserialized Uint8Array.
 */
export function deserializeUint8Array({
    buffer,
    byteOffset,
    byteLength,
}: ITransferableUint8Array): Uint8Array {
    return new Uint8Array(buffer, byteOffset, byteLength);
}
