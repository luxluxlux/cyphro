import { WINDOW_DATA } from 'components/WindowManager';
import { parseVersion } from './common';
import { IStep, Version } from './types';

/**
 * Name of the application.
 */
export const APP_NAME = 'Cyphro';

// TODO: Get it from the app params
/**
 * URL of the application.
 */
export const APP_URL = 'https://cyphro.io/';

// TODO: Get it from the app params
/**
 * Contact email address of the application.
 */
export const APP_EMAIL = 'cyphroapp@gmail.com';

// TODO: Get it from the app params
/**
 * Application server country.
 */
export const APP_COUNTRY = 'the Netherlands';

/**
 * Project URL on GitHub.
 */
export const GITHUB_URL = 'https://github.com/luxluxlux/cyphro';

/**
 * Version size in bytes.
 */
export const VERSION_SIZE = 3;

/**
 * Web application version ('major.minor.revision').
 * @remarks No letters! Only numbers! No greater than 1 byte (0-255) for each number. Don't forget
 * to sync it with the package.json.
 */
export const VERSION: Version = '1.0.0';

/**
 * Version parsed into the tuple ([major, minor, revision]).
 */
export const PARSED_VERSION = parseVersion(VERSION, VERSION_SIZE);

/**
 * Minimum password length.
 */
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Maximum password length.
 */
export const MAX_PASSWORD_LENGTH = 127;

/**
 * Maximum total size of uploaded files.
 */
export const MAX_FILES_SIZE_MB = 10;

/**
 * Size of reserved space for file name size in bytes.
 */
export const FILE_NAME_SIZE_SIZE_BYTES = 2;

/**
 * Maximum file name length.
 * @remarks UTF-8 - 4 bytes per character.
 */
export const FILE_NAME_MAX_LENGTH = 2 ** (8 * FILE_NAME_SIZE_SIZE_BYTES) / 4 - 1;

/**
 * Size of reserved space for file extension size in bytes
 */
export const FILE_EXTENSION_SIZE_SIZE_BYTES = 2;

/**
 * Maximum file extension length.
 * @remarks UTF-8 - 4 bytes per character.
 */
export const FILE_EXTENSION_MAX_LENGTH = 2 ** (8 * FILE_EXTENSION_SIZE_SIZE_BYTES) / 4 - 1;

/**
 * Forbidden file extensions.
 * @remarks Executable file formats that may contain malicious scripts and programs.
 */
export const FORBIDDEN_FILE_EXTENSIONS = [
    // Windows executables & system files
    'exe', 'msi', 'msp', 'dll', 'sys', 'scr', 'cpl', 'drv',

    // Windows script-based executables
    'bat', 'cmd', 'ps1', 'psm1', 'vbs', 'vbe', 'js', 'jse', 'wsf', 'wsh',

    // macOS executables & installers
    'app', 'pkg', 'dmg', 'command',

    // Linux / Unix executables
    'elf', 'bin', 'run', 'out', 'so',

    // Java & cross-platform executables
    'jar', 'jnlp',

    // Mobile / embedded
    'apk', 'aab', 'ipa',

    // Firmware / low-level binaries
    'img', 'iso', 'rom',

    // Archives & compressed containers
    'zip', 'rar', '7z', 'tar',
    'gz', 'tgz', 'bz2', 'xz', 'lz', 'lzma', 'zst',
    'cab', 'arj', 'ace', 'sit', 'sitx',
    'cpio', 'deb', 'rpm',

    // Legacy / uncommon but dangerous
    'pif', 'gadget'
];

/**
 * Forbidden disguise extensions.
 * @remarks Non-executable file formats for which writing bytes to the end is not critical.
 */
export const ALLOWED_DISGUISE_EXTENSIONS = [
    // Audio formats (stream-based, tolerant to trailing data)
    'mp3',        // ignoring ID3v1 edge case
    'wav',
    'flac',
    'ogg', 'oga',
    'opus',
    'aac',
    'm4a',        // if moov atom is at the beginning
    'aiff',
    'alac',

    // Video formats (container-based, index not strictly at EOF)
    'mp4',        // faststart / moov at beginning
    'm4v',
    'mov',        // faststart
    'mkv',
    'webm',
    'avi',
    'flv',
    'ogv',

    // Image formats (size defined in headers)
    'jpg', 'jpeg',
    'png',
    'gif',
    'bmp',
    'tiff', 'tif',
    'webp',
    'ico',
    'heic',

    // Document formats (not intended for plain-text reading)
    'rtf',
    'tex', 'latex',
    'epub',
    'djvu',
    'pdf',

    // Scientific & structured binary data
    'dat',
    'raw',
    'npy', 'npz',
    'mat',
    'hdf5', 'h5',
    'parquet',
    'avro',

    // Databases & database dumps
    'sqlite',
    'db', 'db3',
    'sqlitedb',
    'dump',

    // Archive / compression formats tolerant to trailing bytes
    'tar',
    'gz', 'tgz',
    'bz2',
    'xz',
    'lz', 'lzma',
    'zst',

    // Capture, trace & binary log formats
    'pcap',
    'pcapng',

    // Other non-executable binary formats
    'wasm',
    'swf'
];

/**
 * Maximum length of the file name inside the alert.
 */
export const MAX_ALERT_FILENAME_LENGTH = 30;

/**
 * Encoded file extension.
 */
export const FILE_EXTENSION = 'cph';

/**
 * Data processing stages.
 */
export enum STAGE {
    UPLOAD = 'upload',
    SECURE = 'secure',
    DOWNLOAD = 'download',
}

/**
 * Data for stage render.
 */
export const STAGE_DATA: Record<STAGE, IStep> = {
    [STAGE.UPLOAD]: {
        path: '/',
        color: '#009dff',
    },
    [STAGE.SECURE]: {
        path: '/secure',
        color: '#00fff0',
    },
    [STAGE.DOWNLOAD]: {
        path: '/download',
        color: '#4aff90',
    },
};

/**
 * Artificial rendering paths for react-snap environment.
 */
export const REACT_SNAP_PATHS = [
    '/mobile',
    ...Object.values(WINDOW_DATA).flatMap(({ path }) => [`/${path}`, `/mobile/${path}`]),
];
