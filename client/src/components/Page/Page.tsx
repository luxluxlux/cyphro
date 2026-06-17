import { memo } from 'react';
import { WindowManager } from 'components/WindowManager';
import DropArea from 'components/DropArea';
import { IPageProps } from './types';
import Background from './Background';
import EnvironmentGate from './EnvironmentGate';

/**
 * Basic page layout.
 * @param props The properties for the page.
 * @returns Design of page layout with accompanying functionality.
 */
export const Page = (props: IPageProps) => {
    return (
        <div className="page">
            <WindowManager>
                <DropArea>
                    <Background />
                    <EnvironmentGate>
                        <div className="page__content">
                            <header className="page__content-header">
                                <div>{props.logo}</div>
                                <div>{props.menu}</div>
                            </header>
                            <main className="page__content-body">
                                <div className="page__content-body-content">{props.content}</div>
                            </main>
                            <footer className="page__content-footer">{props.footer}</footer>
                        </div>
                    </EnvironmentGate>
                </DropArea>
            </WindowManager>
        </div>
    );
};

Page.displayName = 'Page';

export default memo(Page);
