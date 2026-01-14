/**
 * The request type for moderation operations.
 */
export type ModerationRequest =
    | {
        id: number;
        bitmap: ImageBitmap;
    }
    | { abort: number };

/**
 * The response type for moderation operations.
 */
export type ModerationResponse =
    | {
        type: 'result';
        id: number;
        safe: boolean;
    }
    | {
        type: 'task-error';
        id: number;
        error: string;
    }
    | {
        type: 'fatal-error';
        error: string;
    };