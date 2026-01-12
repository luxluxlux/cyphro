import { lib } from 'crypto-js';
import { XOR } from 'utils/interfaces';

/**
 * Type of the data array.
 */
export type ArrType = 'WordArray' | 'Uint8Array';

/**
 * Array of objects containing information about the data that makes up the file.
 */
export type FileFormat = ({ type: ArrType } & XOR<{ size: number }, { calcSize: number }>)[];

/**
 * Converts ArrType to its corresponding type.
 */
export type GetArrType<T extends ArrType> = T extends 'WordArray' ? lib.WordArray : Uint8Array;

/**
 * Extracts the types of the arrays from the file format.
 */
export type ExtractArrTypes<T extends FileFormat> = {
    [K in keyof T]: T[K] extends { type: infer U extends ArrType } ? GetArrType<U> : never;
};

/**
 * Interface representing parsed or decrypted file data.
 */
export interface IRestored {
    /**
     * File name.
     */
    name?: string;
    /**
     * File extension.
     */
    extension?: string;
    /**
     * File data.
     */
    data: Uint8Array;
}

/**
 * Workaround to hide error in react-error-overlay.
 */
export type FixedBodyFormat = [
    {
        type: 'Uint8Array',
        calcSize: number
    },
    {
        type: 'Uint8Array',
        calcSize: number
    }
]

/**
 * Workaround to hide error in react-error-overlay.
 */
export type FixedFileFormat = [
    {
        type: 'WordArray',
        calcSize: number
    },
    {
        type: 'WordArray',
        size: number
    },
    {
        type: 'WordArray',
        size: number
    },
    {
        type: 'WordArray',
        size: number
    },
    {
        type: 'Uint8Array',
        size: number
    },
    {
        type: 'Uint8Array',
        size: number
    }
]
