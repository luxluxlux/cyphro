import { memo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ILoadingProps } from './types';
import { useLoadingSteps } from './hooks';

/**
 * Loading overlay.
 * @param props The properties for the loading component.
 * @return The loading component.
 */
export const Loading = ({ title = 'Loading, please wait...' }: ILoadingProps) => {
    const step = useLoadingSteps(Array.isArray(title) ? title : []);

    return (
        <div className="loading">
            <CircularProgress color="inherit" size={60} />
            <div>{typeof title === 'string' ? title : step}</div>
        </div>
    );
};

Loading.displayName = 'Loading';

export default memo(Loading);
