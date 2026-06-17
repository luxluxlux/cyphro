/**
 * The properties for the loading component.
 */
export interface ILoadingProps {
    /**
     * Custom waiting label.
     * @defaultValue Loading, please wait...
     */
    title?: string | ILoadingStep[];
}

/**
 * The type for loading step.
 */
export type ILoadingStep = {
    /**
     * The step text.
     */
    text: string;
    /**
     * The step delay in milliseconds.
     */
    delay: number;
};
