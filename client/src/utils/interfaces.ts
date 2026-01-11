/**
 * Excludes all keys from T that are present in U.
 * @typeParam T The type from which to exclude keys.
 * @typeParam U The type in which keys are present.
 */
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * Exclusive OR type.
 */
export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

/**
 * Web application version ('major.minor.revision').
 */
export type Version = `${number}.${number}.${number}`;

/**
 * Parsed application version version tuple ([major, minor, revision]).
 */
export type ParsedVersion = [number, number, number];

/**
 * Action to process a file.
 */
export type Action = 'encode' | 'decode';

/**
 * Validation result.
 * @returns True on success, an error message on failure.
 */
export type ValidationResult = true | string;

/**
 * Current stage of processing.
 */
export interface IStep {
    /**
     * URL path.
     */
    path: string;
    /**
     * Accent color.
     */
    color: string;
}

/**
 * File serialized to transferable object
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects
 */
export interface ITransferableFile {
    /**
     * File name.
     */
    name: string;
    /**
     * File type (MIME type).
     */
    type: string;
    /**
     * File data as ArrayBuffer.
     */
    buffer: ArrayBuffer;
};

/**
 * Uint8Array serialized to transferable object.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects
 */
export interface ITransferableUint8Array {
    /**
     * ArrayBuffer buffer.
     */
    buffer: ArrayBufferLike;
    /**
     * Byte offset.
     */
    byteOffset: number;
    /**
     * Size in bytes.
     */
    byteLength: number;
};