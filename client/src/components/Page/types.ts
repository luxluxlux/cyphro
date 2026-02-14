import { ReactNode } from 'react';

/**
 * Page component properties.
 */
export interface IPageProps {
    /**
     * Page logo.
     */
    logo: ReactNode;
    /**
     * Page menu.
     */
    menu: ReactNode;
    /**
     * Page footer.
     */
    footer: ReactNode;
    /**
     * Page content.
     */
    content: ReactNode;
}
