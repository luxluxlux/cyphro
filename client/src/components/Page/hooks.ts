import { useLocation } from 'react-router-dom';
import { removeTrailingSlashes } from 'utils/common';
import { WINDOW_PATHS, STAGE, STAGE_DATA } from 'utils/constants';

/**
 * Gets the primary color for the current page based on the location pathname.
 * @returns The primary color for the current stage or undefined if not found.
 */
export function usePrimaryColor(): string | undefined {
    const location = useLocation();
    const pathname = removeTrailingSlashes(location.pathname);

    // Some pages render as popups from the home page, not stages
    if (WINDOW_PATHS.includes(pathname)) {
        return STAGE_DATA[STAGE.UPLOAD].color;
    }

    const stageData = Object.values(STAGE_DATA).find(({ path }) => path === pathname);
    return stageData ? stageData.color : undefined;
}
