import { ModerationRequest, ModerationResponse } from 'workers/moderation/types';
import { ModerationSlot, IModerationTask, ModerationResult } from './types';
import { fitImage } from './utils';

/**
 * A service for moderating files using a web worker.
 */
export class ModerationService {
    private worker: Worker;
    private disposed = false;
    private tasks = new Map<ModerationSlot, IModerationTask>();
    private counter = 0;

    constructor() {
        this.worker = new Worker(new URL('workers/moderation', import.meta.url));
        this.worker.onmessage = this.handleWorkerMessage;
        this.worker.onerror = this.handleWorkerError;
        this.worker.onmessageerror = this.handleWorkerError;
    }

    /**
     * Starts the moderation process for a given slot with the provided file.
     * @param slot The slot to start the moderation process for.
     * @param file The file to be moderated.
     */
    start(slot: ModerationSlot, file: File): void {
        if (this.disposed) {
            return;
        }

        // Close previous task if it exists
        this.abort(slot);

        const id = this.createTaskId();

        let resolve: IModerationTask['resolve'];
        let reject: IModerationTask['reject'];

        const promise = new Promise<ModerationResult>((res, rej) => {
            resolve = res;
            reject = rej;
        });

        const task: IModerationTask = {
            id,
            slot,
            promise,
            resolve: resolve!,
            reject: reject!,
        };

        this.tasks.set(slot, task);
        this.run(task, file);
    }

    /**
     * Waits for specified moderation slots to finish.
     * @param slot The moderation slot to wait for.
     * @returns A promise that resolves to an object with moderation slot as key and moderation result as value.
     */
    async wait(slots: ModerationSlot[]): Promise<Record<ModerationSlot, ModerationResult>> {
        if (!slots.length) {
            throw new Error('No moderation slots specified');
        }

        const tasks = slots.map((slot) => {
            const task = this.tasks.get(slot);
            if (!task) {
                throw new Error(`No moderation started for slot "${slot}"`);
            }
            return [slot, task] as const;
        });

        const results = await Promise.all(
            tasks.map(([slot, task]) =>
                task.promise.then((result) => [slot, result] as const)
            )
        );

        return Object.fromEntries(results) as Record<ModerationSlot, ModerationResult>;
    }

    /**
     * Aborts the moderation process for the specified slot.
     * @param slot The slot for which to abort the moderation process.
     */
    abort(slot: ModerationSlot): void {
        if (this.disposed) {
            return;
        }

        const task = this.tasks.get(slot);
        if (!task) {
            return;
        }

        task.resolve({ state: 'aborted' });

        this.tasks.delete(slot);
        this.worker.postMessage({ abort: task.id } satisfies ModerationRequest);
    }


    /**
     * Disposes of the ModerationService by terminating the worker
     * and aborting all ongoing moderation tasks.
     */
    dispose(): void {
        if (this.disposed) {
            return;
        }

        this.disposed = true;

        for (const slot of this.tasks.keys()) {
            this.abort(slot);
        }

        this.worker.terminate();
    }

    /**
     * Runs the moderation task for the given task and file.
     * @param task The moderation task to be run.
     * @param file The file to be moderated.
     * @return A promise that resolves when the moderation task is complete.
     */
    private async run(task: IModerationTask, file: File): Promise<void> {
        if (this.disposed) {
            return;
        }

        let bitmap: ImageBitmap | null = null;

        try {
            const origin = await createImageBitmap(file);
            bitmap = await fitImage(origin);
            origin.close();

            // The second check is required because the state may change
            // while the above operations are being performed
            if (this.disposed) {
                bitmap.close();
                return;
            }

            this.worker.postMessage(
                { id: task.id, bitmap } satisfies ModerationRequest,
                [bitmap]
            );
        } catch (error) {
            bitmap?.close();
            task.resolve({ state: 'error', error: String(error) });
            this.tasks.delete(task.slot);
        }
    }

    /**
     * Handles messages from the moderation worker thread.
     * @param event The message event containing the task ID and moderation result.
     */
    private handleWorkerMessage = (event: MessageEvent<ModerationResponse>): void => {
        const data = event.data;

        switch (data.type) {
            case 'result': {
                const task = this.findTaskById(data.id);
                if (!task) {
                    return;
                }

                task.resolve({ state: data.safe ? 'safe' : 'unsafe' });
                break;
            }
            case 'task-error': {
                const task = this.findTaskById(data.id);
                if (!task) {
                    return;
                }

                task.resolve({ state: 'error', error: data.error });
                this.tasks.delete(task.slot);
                break;
            }
            case 'fatal-error': {
                for (const task of this.tasks.values()) {
                    task.resolve({ state: 'error', error: data.error });
                }
                this.tasks.clear();
                break;
            }
        }
    };

    /**
     * Handles worker errors by rejecting all pending tasks and clearing the task map.
     * @param event The error event or message event.
     */
    private handleWorkerError(event: ErrorEvent | MessageEvent): void {
        const error =
            event instanceof ErrorEvent
                // We process only string errors to avoid conversion to non-obvious text,
                // such as "[object Object]" etc.
                ? typeof event.error === 'string'
                    ? event.error
                    : event.message || 'Moderation worker subscription error'
                : 'Moderation worker subscription message error';

        for (const task of this.tasks.values()) {
            task.resolve({ state: 'error', error });
        }

        this.tasks.clear();
    };

    /**
     * Creates a unique task ID.
     * @return The unique task ID.
     */
    private createTaskId(): number {
        return this.counter++;
    }

    /**
     * Finds a moderation task by its ID in the tasks map.
     * @param id The ID of the moderation task to find.
     * @return The moderation task with the specified ID, or undefined if not found.
     */
    private findTaskById(id: number): IModerationTask | undefined {
        for (const task of this.tasks.values()) {
            if (task.id === id) {
                return task;
            }
        }
    }
}
