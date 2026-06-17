import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { clsx } from 'clsx';
import { WindowManagerContext } from 'components/WindowManager';
import blob from 'resources/blob.webp';
import { usePalette } from './hooks';

/**
 * Background component that renders the background of the page.
 * @returns The background of the page.
 */
export const Background = () => {
    const windowContext = useContext(WindowManagerContext);
    const palette = usePalette();

    const [currentPalette, setCurrentPalette] = useState(palette);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentPalette(palette);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [palette]);

    return (
        <>
            <Helmet>
                <link rel="preload" as="image" href={blob} />
            </Helmet>
            <div
                className={clsx(
                    'background',
                    currentPalette && `background_palette_${currentPalette}`
                )}
            >
                {/* CSS doesn't support transitions for gradients, so we provide an overlay for that */}
                {palette !== currentPalette && (
                    <div
                        className={clsx(
                            'background__transition',
                            palette && `background__transition_palette_${palette}`
                        )}
                    />
                )}
                <div
                    className={clsx(
                        'background__blob',
                        'background__blob_top-left',
                        windowContext.isOpened && 'background__blob_paused'
                    )}
                />
                <div
                    className={clsx(
                        'background__blob',
                        'background__blob_bottom-right',
                        windowContext.isOpened && 'background__blob_paused'
                    )}
                />
            </div>
        </>
    );
};

Background.displayName = 'Background';

export default Background;
