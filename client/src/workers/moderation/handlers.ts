/* eslint-disable no-restricted-globals */

import { FORBIDDEN_CLASSES, TRESHOLD } from './constants';
import { getModel } from './model';
import { ModerationRequest, ModerationResponse } from './types';

const abortedTasks = new Set<number>();

/**
 * Handles the incoming message event from the main thread.
 * @param event The message event to handle.
 * @return A promise that resolves when the message has been handled.
 */
export async function handleMessage(event: MessageEvent<ModerationRequest>): Promise<void> {
    const data = event.data;

    if ('abort' in data) {
        abortedTasks.add(data.abort);
        return;
    }

    const { id, bitmap } = data;

    try {
        const model = await getModel();

        // @ts-expect-error In fact, the model works with ImageBitmap
        const predictions = await model.classify(bitmap);

        const unsafe = predictions.some(
            (param) =>
                FORBIDDEN_CLASSES.includes(param.className) &&
                param.probability >= TRESHOLD
        );

        if (!abortedTasks.has(id)) {
            self.postMessage({
                type: 'result',
                id,
                safe: !unsafe,
            } satisfies ModerationResponse);
        }
    } catch (error) {
        if (!abortedTasks.has(id)) {
            self.postMessage({
                type: 'task-error',
                id,
                error: error instanceof Error ? error.message : String(error),
            } satisfies ModerationResponse);
        }
    } finally {
        bitmap.close();
        abortedTasks.delete(id);
    }
}

/**
 * Handles errors in the moderation worker.
 * @param event The event or error message to handle.
 */
export function handleError(event: Event | string): void {
    const error =
        event instanceof ErrorEvent
            ? event.message
            : typeof event === 'string'
                ? event
                : 'Moderation worker error';

    self.postMessage({
        type: 'fatal-error',
        error,
    } satisfies ModerationResponse);
}