import { useEffect, useState } from 'react';
import { ILoadingStep } from './types';

/**
 * Generates a loading step based on the provided steps array.
 * @param steps An array of loading steps.
 * @return The loading step text or a fallback message if no steps are provided or all steps have been completed.
 */
export function useLoadingSteps(steps: ILoadingStep[]): string {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!steps.length || index >= steps.length) {
            return;
        }

        const timeout = setTimeout(() => {
            setIndex((prev) => prev + 1);
        }, steps[index].delay);

        return () => clearTimeout(timeout);
    }, [index, steps]);

    return steps[index]?.text ?? 'It takes more time than usual...';
}
