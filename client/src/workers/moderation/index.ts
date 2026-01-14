/* eslint-disable no-restricted-globals */

/**
 * Moderation worker responsible for file content.
 * @module
 */

import { handleMessage, handleError } from './handlers';

self.onmessage = handleMessage;
self.onerror = handleError;