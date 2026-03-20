import { useState, useCallback, useMemo, useRef, useEffect, memo, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { TransitionProps } from '@mui/material/transitions';
import { STAGE, STAGE_DATA } from 'utils/constants';
import { isEnumValue } from 'utils/common';
import { useUpdateSearchParams } from 'utils/hooks';
import {
    IWindowManagerContext,
    IWindowManagerOptions,
    IWindowManagerProps,
    IWindowManagerState,
} from './types';
import { WINDOW, WINDOW_DATA } from './constants';
import { WindowManagerContext } from './contexts';

/**
 * The component that manages the state and rendering of pop-up windows.
 * @param props The properties for the WindowManager component.
 * @returns Provider for opening pop-up windows.
 */
export function WindowManager(props: IWindowManagerProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { setParam, removeParam } = useUpdateSearchParams();

    const closableRef = useRef(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const transitionRef = useRef<TransitionProps['timeout']>(0);

    const [state, setState] = useState<IWindowManagerState>({
        content: null,
        modal: false,
        fullscreen: false,
    });

    const updateContent = useCallback((content: ReactElement, options?: IWindowManagerOptions) => {
        closableRef.current = options?.closable ?? true;
        scrollRef.current?.scrollTo({ top: 0 });
        setState({
            content,
            modal: !!options?.modal,
            fullscreen: !!options?.fullscreen,
        });
    }, []);

    const clearContent = useCallback(() => {
        setState((prev) => ({ ...prev, content: null }));
    }, []);

    const open = useCallback(
        (content: WINDOW | ReactElement, options?: IWindowManagerOptions) => {
            if (typeof content === 'string') {
                setParam('popup', WINDOW_DATA[content].path);
            } else {
                updateContent(content, options);
            }
        },
        [setParam, updateContent]
    );

    const close = useCallback(() => {
        const pathname = location.pathname.split('/').filter(Boolean).join('/');
        if (isEnumValue(WINDOW, pathname)) {
            navigate(STAGE_DATA[STAGE.UPLOAD].path, {
                state: location.state,
            });
            return;
        }

        const params = new URLSearchParams(location.search);
        if (params.has('popup')) {
            removeParam('popup');
            return;
        }

        clearContent();
    }, [location, removeParam, clearContent]);

    const stateContextValue = useMemo<IWindowManagerContext>(
        () => ({
            isOpened: !!state.content,
            open,
            close,
        }),
        [open, close, state.content]
    );

    const handleClose = useCallback(() => {
        if (closableRef.current) {
            close();
        }
    }, [close]);

    // To guarantee correct window rendering with SSG, the component's state must change
    // synchronously. The useEffect and useLayoutEffect hooks are asynchronous, and a custom hook
    // will fail during double rendering in dev mode (StrictMode), so we use useMemo.
    useMemo(() => {
        const pathname = location.pathname.split('/').filter(Boolean).join('/');
        const params = new URLSearchParams(location.search);

        const key = isEnumValue(WINDOW, pathname) ? pathname : params.get('popup');

        if (key) {
            if (!isEnumValue(WINDOW, key)) {
                throw new Error(`Pop-up component "${key}" not found`);
            }

            updateContent(WINDOW_DATA[key].content);
            return;
        }

        if (state.content) {
            clearContent();
        }
    }, [location]);

    // We don't use the transition for windows opened by the first render,
    // but return it for next ones
    useEffect(() => {
        transitionRef.current = undefined;
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && closableRef.current) {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClose]);

    return (
        <WindowManagerContext.Provider value={stateContextValue}>
            {props.children}
            {/* TODO: Use cross button for close */}
            <Backdrop
                className={state.modal ? 'window-manager_modal' : undefined}
                open={!!state.content}
                transitionDuration={transitionRef.current}
                onClick={handleClose}
            >
                {/* TODO: Adapt fullscreen to non-modal mode */}
                {state.fullscreen ? (
                    state.content
                ) : (
                    <div className="window-manager__content">
                        <div className="window-manager__content-container">
                            <div
                                ref={scrollRef}
                                className="window-manager__content-container-scroll"
                            >
                                {state.content}
                            </div>
                        </div>
                    </div>
                )}
            </Backdrop>
        </WindowManagerContext.Provider>
    );
}

WindowManager.displayName = 'WindowManager';

export default memo(WindowManager);
