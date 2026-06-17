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

/**
 * Environment gate component properties.
 */
export interface IEnvironmentGateProps {
    /**
     * The content of the component
     */
    children: ReactNode;
}