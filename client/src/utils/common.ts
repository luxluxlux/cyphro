import { ParsedVersion, ValidationResult, Version } from './types';
import {
    ALLOWED_DISGUISE_EXTENSIONS,
    FILE_EXTENSION_MAX_LENGTH,
    FILE_NAME_MAX_LENGTH,
    FORBIDDEN_FILE_EXTENSIONS,
    MAX_FILES_SIZE_MB
} from './constants';

/**
 * Parses a version string into a tuple.
 * @param str The version string to parse, in the format 'major.minor.revision'.
 * @returns The parsed version tuple, or throws an error if the version string is invalid.
 */
export function parseVersion(str: Version, size: number): ParsedVersion {
    const version = str.split('.').map(Number);
    // No letters, only numbers
    // No more than 1 byte (0-255) for each number
    if (version.length !== size || version.some((v) => v < 0 || v > 255)) {
        throw new Error('Invalid application version');
    }
    return version as ParsedVersion;
}

/**
 * Uploads file by the system dialog.
 * @param type File type.
 * @returns A promise that resolves to the selected file.
 */
export async function upload(type?: string): Promise<File> {
    return new Promise<File>((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        if (type) {
            input.accept = type;
        }

        // Safari sometimes doesn't handle clicks on elements that aren't in the DOM
        input.style.display = 'none';
        document.body.appendChild(input);

        input.onchange = () => {
            const file = input.files?.[0];
            document.body.removeChild(input);
            if (file) {
                resolve(file);
            } else {
                reject(new Error('No file selected'));
            }
        };

        input.onerror = (error) => {
            document.body.removeChild(input);
            reject(error);
        };

        // Reset the input value to allow selecting the same file again
        input.value = '';

        input.click();
    });
}

/**
 * Downloads file.
 * @param data Blob data.
 * @param fileName Name string.
 */
export function download(data: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(data);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;

    // Some browsers don't handle clicks on elements that aren't in the DOM
    anchor.style.display = 'none';
    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);

    // Safari doesn't always release the object URL immediately after the download,
    // so we wait a bit before revoking it
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 100);
}

/**
 * Hides the middle part of the string under an ellipsis.
 * @param text String.
 * @param maxLength Max length of the string.
 * @returns Ellipsed string.
 */
export function ellipse(text: string, maxLength: number): string {
    if (text.length > maxLength) {
        const maxLengthWithDots = maxLength - 3;
        const ellipsis = '...';
        if (maxLengthWithDots <= 0) {
            return ellipsis;
        }
        return (
            text.slice(0, Math.ceil(maxLengthWithDots / 2)) +
            ellipsis +
            text.slice(-Math.floor(maxLengthWithDots / 2))
        );
    }
    return text;
}

/**
 * Validates a file to ensure it meets the required criteria.
 * @param sourceFile The source file to be validated.
 * @param disguiseFile The disguise file associated with the source file.
 * @returns True if the file is valid, or an error message if it's not.
 */
export function validateFile(sourceFile: File, disguiseFile?: File): ValidationResult {
    const { name, extension } = parseFileName(sourceFile.name);

    if (!name) {
        return 'File name is required.';
    }

    if (name.length > FILE_NAME_MAX_LENGTH) {
        return 'File name is too long.';
    }

    // Some browsers may automatically assign a file extension during download
    // if the original filename has none
    if (!extension) {
        return 'File extension is required.';
    }

    if (extension.length > FILE_EXTENSION_MAX_LENGTH) {
        return 'File extension is too long.';
    }

    if (FORBIDDEN_FILE_EXTENSIONS.includes(extension.toLowerCase())) {
        return 'Forbidden file extension. See FAQ for allowed formats.';
    }

    if (sourceFile.size === 0) {
        return 'Folders and empty files are not allowed.';
    }

    if (sourceFile.size > MAX_FILES_SIZE_MB * 1024 * 1024) {
        return `The file must be no more than ${MAX_FILES_SIZE_MB}MB.`;
    }

    if (disguiseFile && (sourceFile.size + disguiseFile.size > MAX_FILES_SIZE_MB * 1024 * 1024)) {
        return `The file and disguise must be no more than ${MAX_FILES_SIZE_MB}MB in total.`;
    }

    return true;
}

/**
 * Validates a list of files to ensure it meets the required criteria.
 * @param sourceFiles The list of files to be validated.
 * @param disguiseFile The disguise file associated with the source files.
 * @returns An error message if validation fails, or true if validation succeeds.
 */
export function validateFiles(sourceFiles: FileList, disguiseFile?: File): ValidationResult {
    const length = sourceFiles.length;

    if (length < 1) {
        return 'At least one file is required.';
    }

    if (length > 1) {
        return 'No more than one file at a time.';
    }

    const sourceFile = sourceFiles[0];
    return validateFile(sourceFile, disguiseFile);
}

/**
 * Validates a disguise file to ensure it meets the required criteria.
 * @param disguiseFile The disguise file to be validated.
 * @param sourceFile The source file associated with the disguise file.
 * @returns True if the disguise file is valid, or an error message if it's not.
 */
export function validateDisguise(disguiseFile: File, sourceFile: File): ValidationResult {
    const { name: disguiseFileName, extension: disguiseFileExtension } = parseFileName(disguiseFile.name);

    if (!disguiseFileName) {
        return 'File name is required.';
    }

    // Files without an extension may be automatically treated as text files by browsers or operating systems,
    // and are often opened by text editors, which can expose the disguise
    if (!disguiseFileExtension) {
        return 'File extension is required.';
    }

    if (!ALLOWED_DISGUISE_EXTENSIONS.includes(disguiseFileExtension.toLowerCase())) {
        return 'Forbidden file extension. See FAQ for allowed formats.';
    }

    if (disguiseFile.size === 0) {
        return 'Folders and empty files are not allowed.';
    }

    if (disguiseFile.size > MAX_FILES_SIZE_MB * 1024 * 1024) {
        return `The file must be no more than ${MAX_FILES_SIZE_MB}MB.`;
    }

    if (sourceFile.size + disguiseFile.size > MAX_FILES_SIZE_MB * 1024 * 1024) {
        return `The file and disguise must be no more than ${MAX_FILES_SIZE_MB}MB in total.`;
    }

    return true;
}

/**
 * Waits for a specified interval of time and resolves the Promise.
 * @param interval The time interval in milliseconds.
 * @return A Promise that resolves after the specified interval.
 */
export function waitResolve(interval: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, interval));
};

/**
 * Waits for a specified interval of time and rejects the Promise with an error.
 * @param interval The time interval in milliseconds.
 * @param error The error to be rejected with.
 * @return A Promise that rejects after the specified interval.
 */
export function waitReject(
    interval: number,
    error: unknown = new Error('Wait timeout')
): Promise<never> {
    return new Promise((_, reject) =>
        setTimeout(reject, interval, error)
    );
}

/**
 * Parses a file name into its name and extension.
 * @param fileName The file name to be parsed.
 * @returns An object containing the name and extension.
 */
export function parseFileName(fileName: string): {
    name?: string;
    extension?: string;
} {
    const match = fileName.match(/^(.*?)(?:\.([^.]+))?\.?$/);
    return {
        name: match?.[1] || undefined,
        extension: match?.[2] || undefined,
    };
}

/**
 * Adds a file extension to a given file name.
 * @param name The original file name.
 * @param extension The extension to add.
 * @returns The file name with the added extension.
 */
export function addExtension(name: string, extension: string): string {
    return `${name}.${extension}`;
}

/**
 * Changes the file extension of a given file name.
 * @param name The original file name.
 * @param extension The new file extension.
 * @returns The file name with the new extension.
 */
export function changeExtension(name: string, extension: string): string {
    return name.replace(/\.[^.]*$|$/, extension ? `.${extension}` : '');
}

/**
 * Removes trailing slashes from a given path.
 * @remarks Does not remove the leading slash, even if there is only one.
 * @param path The path from which trailing slashes will be removed.
 * @returns The path with trailing slashes removed.
 */
export function removeTrailingSlashes(path: string) {
    return path.replace(/(?<=.)\/+$/g, '');
}

/**
 * Joins an array of words into a string, using "and" to separate the last two words.
 * @remarks Uses to the Oxford comma.
 * @param words An array of words to be joined.
 * @return The joined string with the last two words separated by "and".
 */
export function joinWithAnd(words: string[]): string {
    if (words.length <= 2) {
        return words.join(' and ');
    }

    return `${words.slice(0, -1).join(', ')}, and ${words.at(-1)}`;
}

/**
 * Checks if a value is present in an enum object.
 * @param enumObj The enum object to check against.
 * @param value The value to check.
 * @returns Returns true if the value is present in the enum object, false otherwise.
 */
export function isEnumValue<T extends Record<string, string | number>>(
    enumObj: T,
    value: unknown
): value is T[keyof T] {
    return Object.values(enumObj).includes(value as T[keyof T]);
}
