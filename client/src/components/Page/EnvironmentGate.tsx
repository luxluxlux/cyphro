import { useContext, useEffect, useState } from 'react';
import { isMobile, isFirefox } from 'react-device-detect';
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import { APP_NAME } from 'utils/constants';
import Notice from 'windows/Notice';
import { IEnvironmentGateProps } from './types';
import { WindowManagerContext } from 'components/WindowManager';

/**
 * Gate for blocking a page depending on the environment.
 * @param props The properties for the environment gate component.
 * @returns The environment gate component.
 */
export const EnvironmentGate = (props: IEnvironmentGateProps) => {
    const windowContext = useContext(WindowManagerContext);

    const [blocked, setBlocked] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent;

        // Simple bot detection to avoid showing unsupported browser notice to web crawlers
        const isBot = /bot|crawler|spider|crawling/i.test(ua);

        // Block mobile Firefox, because it renames downloads based on content,
        // ignoring the original filename and MIME type
        if (isMobile && isFirefox && !isBot) {
            windowContext.open(
                <Notice
                    title="Oops... This Browser Not Supported"
                    message={
                        <>
                            Sorry, this browser isn&apos;t supported in <strong>{APP_NAME}</strong>{' '}
                            right now. We&apos;re working on it. In the meantime, please try using a
                            different browser.
                        </>
                    }
                    Icon={BrowserNotSupportedIcon}
                />,
                {
                    modal: true,
                    fullscreen: true,
                    closable: false,
                }
            );
            setBlocked(true);
        }
    }, []);

    if (blocked) {
        return null;
    }

    return <>{props.children}</>;
};

EnvironmentGate.displayName = 'EnvironmentGate';

export default EnvironmentGate;
