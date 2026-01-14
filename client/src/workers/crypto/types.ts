import { Action, ITransferableFile, ITransferableUint8Array } from 'utils/types';

/**
 * The request type for crypto operations.
 */
export type CryptoRequest =
    {
        action: Action;
        source: ITransferableFile;
        password: string;
        disguise?: ITransferableFile
    };

/**
 * The response type for crypto operations.
 */
export type CryptoResponse =
    | {
        result: CryptoResult;
    }
    | {
        error: string;
    }

/**
 * The result type for crypto operations.
 */
export type CryptoResult =
    | ITransferableUint8Array
    | {
        name: string | undefined;
        extension: string | undefined;
        data: ITransferableUint8Array;
    }

