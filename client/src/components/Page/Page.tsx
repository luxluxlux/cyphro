import { CSSProperties, memo } from 'react';
import { WindowManager } from 'components/WindowManager';
import DropArea from 'components/DropArea';
import { IPageProps } from './types';
import { usePrimaryColor } from './hooks';

/**
 * Basic page layout.
 * @param props The properties for the page.
 * @returns Design of page layout with accompanying functionality.
 */
export const Page = (props: IPageProps) => {
    const color = usePrimaryColor();
    return (
        <div
            className="page"
            style={
                {
                    '--primary-color': color,
                } as CSSProperties
            }
        >
            <WindowManager>
                <DropArea>
                    <div className="page__background" />
                    <div className="page__overlay" />
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
                </DropArea>
            </WindowManager>
        </div>
    );
};

Page.displayName = 'Page';

export default memo(Page);
