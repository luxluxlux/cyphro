import { useCallback, useContext, MouseEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import Link from '@mui/material/Link';
import { APP_EMAIL, APP_NAME, APP_URL, GITHUB_URL, VERSION } from 'utils/constants';
import { WindowManagerContext, WINDOW, WINDOW_DATA } from 'components/WindowManager';

/**
 * Information, goals and benefits of the project.
 * @returns Window content.
 */
const About = () => {
    const windowContext = useContext(WindowManagerContext);

    const handleClickTermsOfUse = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            // Prevent window from being closed
            event.stopPropagation();
            windowContext.open(WINDOW.TERMS_OF_USE);
        },
        [windowContext.open]
    );

    const handleClickPrivacyPolicy = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            // Prevent window from being closed
            event.stopPropagation();
            windowContext.open(WINDOW.PRIVACY_POLICY);
        },
        [windowContext.open]
    );

    return (
        <>
            <Helmet>
                <title>
                    About the Project — Open-Source File Protection in Your Browser | {APP_NAME}
                </title>
                <link rel="canonical" href={`${APP_URL}?popup=${WINDOW_DATA[WINDOW.ABOUT].path}`} />
                <meta
                    name="description"
                    content={`${APP_NAME} is an open-source web app for protecting and disguising files directly in your browser. Learn how we make file safety simple, private, and fully local — no installation or registration required.`}
                />
                <meta
                    name="keywords"
                    content={`${APP_NAME}, about project, free, no registration, online, open source, encryption, enoding, file password, password protect, file disguise, collaboration, contacts, author`}
                />
                <meta property="og:title" content={`${APP_NAME} — About the Project`} />
                <meta
                    property="og:description"
                    content="Protecting and disguising files directly in your browser. Learn how we make file safety simple, private, and fully local — no installation or registration required."
                />
                <meta
                    property="og:url"
                    content={`${APP_URL}?popup=${WINDOW_DATA[WINDOW.ABOUT].path}`}
                />
                <meta name="twitter:title" content={`${APP_NAME} — About the Project`} />
                <meta
                    name="twitter:description"
                    content="Protecting and disguising files directly in your browser. Learn how we make file safety simple, private, and fully local — no installation or registration required."
                />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'AboutPage',
                        name: `About ${APP_NAME}`,
                        url: `${APP_URL}?popup=${WINDOW_DATA[WINDOW.ABOUT].path}`,
                        description: `Learn about the ${APP_NAME} project, its mission, values, and approach to private and accessible file protection.`,
                        mainEntity: {
                            '@type': 'SoftwareApplication',
                            name: APP_NAME,
                            operatingSystem: 'Web',
                            applicationCategory: 'SecurityApplication',
                            isAccessibleForFree: true,
                        },
                    })}
                </script>
            </Helmet>
            <div>
                <h2>About the Project</h2>
                <p>
                    <strong>{APP_NAME}</strong> is a privacy-first, open-source web application
                    designed to provide fast and convenient file protection for everyday users. This
                    public web instance is intended for personal use.
                </p>
                <p>
                    The project&apos;s mission is to make personal data security simple and
                    accessible, helping individuals safeguard their files from fraudsters, scammers,
                    and unauthorized access.
                </p>
                <h3>Key Features</h3>
                <div className="about__features">
                    <div>
                        🛡️ <strong>Password protection</strong>
                    </div>
                    <div>
                        Secure a file with a password so that only users who know it can access its
                        contents.
                    </div>
                    <div>
                        🌐 <strong>No installation</strong>
                    </div>
                    <div>
                        {APP_NAME} runs entirely in your browser — no downloads, plugins, or
                        extensions needed.
                    </div>
                    <div>
                        🙈 <strong>No registration</strong>
                    </div>
                    <div>
                        Use the application freely without creating an account or providing any
                        personal information.
                    </div>
                    <div>
                        💸 <strong>Completely free</strong>
                    </div>
                    <div>
                        {APP_NAME} is 100% free to use — no ads, no subscriptions, and no usage
                        limits.
                    </div>
                    <div>
                        🧩 <strong>Open source</strong>
                    </div>
                    <div>
                        The project is transparent and community-driven. Anyone can view, audit, or
                        contribute to the source code on GitHub.
                    </div>
                    <div>
                        🖥️ <strong>Local data processing</strong>
                    </div>
                    <div>
                        All operations take place directly on the user&apos;s device. Files are
                        never uploaded, stored, or transmitted to a server.
                    </div>
                </div>
                <h2>Terms of Use and Privacy Policy</h2>
                <p>
                    By using {APP_NAME}, you confirm that you have read and accepted the{' '}
                    <Link component={'button'} onClick={handleClickTermsOfUse}>
                        terms of use
                    </Link>{' '}
                    and the{' '}
                    <Link component={'button'} onClick={handleClickPrivacyPolicy}>
                        privacy policy
                    </Link>
                    . The application must be used in full compliance with applicable laws and
                    regulations.
                </p>
                <h2>Open to Collaboration</h2>
                <p>
                    {APP_NAME} is built on the belief that{' '}
                    <strong>
                        digital security should be simple, private, and available to everyone
                    </strong>
                    . As an open-source project, it welcomes community involvement — the use of
                    &quot;we&quot; reflects a collaborative vision and an inclusive space for anyone
                    who wishes to contribute.
                </p>
                <p>
                    Developers, designers, security researchers, and privacy-focused enthusiasts are
                    encouraged to participate. Every contribution strengthens the project and helps
                    it grow.
                </p>
                <p>
                    {APP_NAME} welcomes{' '}
                    <strong>sponsorship and collaboration with companies and organizations</strong>{' '}
                    interested in privacy-first solutions. Businesses are free to support the
                    project or use the open-source code in accordance with its license.
                </p>
                <h2>Contact</h2>
                <p>
                    If you&apos;d like to contribute, share ideas, report an issue, or discuss
                    collaboration, you can contact the project author directly via{' '}
                    <Link href={GITHUB_URL} target="_blank" rel="noopener">
                        GitHub
                    </Link>{' '}
                    or by email at <Link href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</Link>.
                </p>
                <p>
                    <strong>Version {VERSION}</strong>
                </p>
            </div>
        </>
    );
};

About.displayName = 'About';

export default About;
