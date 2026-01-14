/* eslint-disable no-restricted-globals */

/**
 * Crypto worker responsible for encrypting and decrypting files.
 * @module
 */

import { handleMessage, handleError } from './handlers';

self.onmessage = handleMessage;
self.onerror = handleError;