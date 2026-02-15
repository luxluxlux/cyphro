import { useCallback, useContext, MouseEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import Link from '@mui/material/Link';
import { APP_NAME, APP_URL, GITHUB_URL } from 'utils/constants';
import { WINDOW_DATA, WINDOW, WindowManagerContext } from 'components/WindowManager';

/**
 * How the application works, its reliability, and what to know.
 * @returns Window content.
 */
const HowItWorks = () => {
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
                <title>How It Works — Protect Files Directly in Your Browser | {APP_NAME}</title>
                <link
                    rel="canonical"
                    href={`${APP_URL}?popup=${WINDOW_DATA[WINDOW.HOW_IT_WORKS].path}`}
                />
                <meta
                    name="description"
                    content={`Learn how ${APP_NAME} protects your data. Encode and disguise a file with a password directly in your browser. No uploads, no tracking, 100% open source and transparent.`}
                />
                <meta
                    name="keywords"
                    content={`how it works, ${APP_NAME}, safe, secure, online, encrypt file, encode file, disguise file, password protect, pdf password, excel password, zip password, secret key, data privacy, terms of use`}
                />
                <meta property="og:title" content={`${APP_NAME} — How It Works`} />
                <meta
                    property="og:description"
                    content="Learn how we protect your data. Encode and disguise a file with a password directly in your browser. No uploads, no tracking, 100% open source and transparent."
                />
                <meta
                    property="og:url"
                    content={`${APP_URL}?popup=${WINDOW_DATA[WINDOW.HOW_IT_WORKS].path}`}
                />
                <meta name="twitter:title" content={`${APP_NAME} — How It Works`} />
                <meta
                    name="twitter:description"
                    content="Learn how we protect your data. Encode and disguise a file with a password directly in your browser. No uploads, no tracking, 100% open source and transparent."
                />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'HowTo',
                        name: `How ${APP_NAME} Works`,
                        description: `Step-by-step explanation of how users can protect files using ${APP_NAME} directly in the browser.`,
                        step: [
                            {
                                '@type': 'HowToStep',
                                name: 'Select a file',
                                text: 'Choose a file from your device that you want to protect.',
                            },
                            {
                                '@type': 'HowToStep',
                                name: 'Set a password',
                                text: 'Enter a password that will be required to restore access to the file.',
                            },
                            {
                                '@type': 'HowToStep',
                                name: 'Optional disguise',
                                text: 'Optionally select another file type to make the protected file less noticeable.',
                            },
                            {
                                '@type': 'HowToStep',
                                name: 'Save or share',
                                text: `The protected file can be safely stored or shared. Access is restored only through ${APP_NAME} with the correct password.`,
                            },
                        ],
                    })}
                </script>
            </Helmet>
            <div>
                <h2>How Does It Work?</h2>
                <p>
                    You select a file on your device, set a password, and the app processes it
                    directly in your browser, without uploading it to any server. You can optionally
                    disguise the processed file to reduce unwanted attention, and once protected, it
                    can be stored or shared anywhere while remaining inaccessible until processed
                    again in {APP_NAME} with the same password.
                </p>
                <h2>How Reliable Is It?</h2>
                <p>
                    {APP_NAME} protects your files using{' '}
                    <strong>strong, modern security methods</strong> designed to prevent
                    unauthorized access or tampering. Because all file protection happens directly
                    in your browser and never leaves your device, the safety of your protected files
                    also depends on the security of your own system — including protection from
                    malware, unauthorized users, and potential data leaks.
                </p>
                <h2>Can I Trust You?</h2>
                <p>Yes, and here&apos;s why:</p>
                <div className="how-it-works__features">
                    <div>
                        🙈 <strong>We don&apos;t see your data</strong>
                    </div>
                    <div>
                        We don&apos;t collect or store passwords, keys, or files. All data
                        processing happens in your browser.
                    </div>
                    <div>
                        🧪 <strong>Verify it yourself</strong>
                    </div>
                    <div>
                        In your browser, open Developer Tools → Network: files and passwords
                        aren&apos;t sent, only basic service data.
                    </div>
                    <div>
                        🔍 <strong>No local storage of sensitive info</strong>
                    </div>
                    <div>
                        No sensitive data is saved in cookies, localStorage, or sessionStorage.
                        Check under Application → Storage.
                    </div>
                    <div>
                        🧩 <strong>Open source</strong>
                    </div>
                    <div>
                        {APP_NAME} is fully open on{' '}
                        <Link href={GITHUB_URL} target="_blank" rel="noopener">
                            GitHub
                        </Link>{' '}
                        — anyone can verify it works as stated.
                    </div>
                </div>
                <h2>What Else Should I Know?</h2>
                <p>
                    Before using the app, please read our{' '}
                    <Link component={'button'} onClick={handleClickTermsOfUse}>
                        terms of use
                    </Link>{' '}
                    and{' '}
                    <Link component={'button'} onClick={handleClickPrivacyPolicy}>
                        privacy policy
                    </Link>
                    . Do not modify or compress files processed with the app, as this may make them
                    unrecoverable. This instance of the app is intended for personal, individual use
                    only. Any illegal activities are strictly forbidden.
                </p>
            </div>
        </>
    );
};

HowItWorks.displayName = 'HowItWorks';

export default HowItWorks;
