import { useLocation } from 'react-router-dom';
import { Palette } from 'utils/types';
import { WINDOW_PATHS, STAGE, STAGE_DATA } from 'utils/constants';
import { removeTrailingSlashes } from 'utils/common';

/**
 * Gets the color palette for the current page based on the location pathname.
 * @returns The color palette for the current stage or undefined if not found.
 */
export function usePalette(): Palette | undefined {
    const location = useLocation();
    const pathname = removeTrailingSlashes(location.pathname);

    // Some pages render as popups from the home page, not stages
    if (WINDOW_PATHS.includes(pathname)) {
        return STAGE_DATA[STAGE.UPLOAD].palette;
    }

    const stageData = Object.values(STAGE_DATA).find(({ path }) => path === pathname);
    return stageData ? stageData.palette : undefined;
}
