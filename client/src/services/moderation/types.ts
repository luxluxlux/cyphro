/**
 * Type of a moderation process.
 */
export type ModerationSlot = 'source' | 'disguise';

/**
 * State of a moderation process.
 */
export type ModerationResult =
    | { state: 'aborted' }
    | { state: 'safe' }
    | { state: 'unsafe' }
    | { state: 'error'; error: string };

/**
 * Moderation task object.
 */
export interface IModerationTask {
    id: number;
    slot: ModerationSlot;
    promise: Promise<ModerationResult>;
    resolve: (result: ModerationResult) => void;
    reject: (error: unknown) => void;
};

