import { Helmet } from 'react-helmet-async';
import Link from '@mui/material/Link';
import {
    ALLOWED_DISGUISE_EXTENSIONS,
    APP_EMAIL,
    APP_NAME,
    APP_URL,
    FORBIDDEN_FILE_EXTENSIONS,
    GITHUB_URL,
    MAX_FILES_SIZE_MB,
} from 'utils/constants';
import { WINDOW_DATA, WINDOW } from 'components/WindowManager';

/**
 * Frequently asked questions (FAQ).
 * @returns Window content.
 */
const FAQ = () => (
    <>
        <Helmet>
            <title>Frequently Asked Questions (FAQ) — File Protection & Disguise | {APP_NAME}</title>
            <link rel="canonical" href={`${APP_URL}?popup=${WINDOW_DATA[WINDOW.FAQ].path}`} />
            <meta
                name="description"
                content={`Find answers to common questions about ${APP_NAME} — a free, open source web app to encode, decode, and disguise a file with a password directly in your browser. Learn about supported formats, file size limits, and how to contribute.`}
            />
            <meta
                name="keywords"
                content={`faq, ${APP_NAME}, help, support, questions, free, is safe, encrypt file, decrypt file, encode file, decode file, disguise file, file password, bug report, data privacy, partnership`}
            />
            <meta property="og:title" content={`${APP_NAME} — Frequently asked questions (FAQ)`} />
            <meta
                property="og:description"
                content="Find answers to common questions about the project. Learn about supported formats, file size limits, and how to contribute."
            />
            <meta property="og:url" content={`${APP_URL}?popup=${WINDOW_DATA[WINDOW.FAQ].path}`} />
            <meta name="twitter:title" content={`${APP_NAME} — Frequently asked questions (FAQ)`} />
            <meta
                name="twitter:description"
                content="Find answers to common questions about the project. Learn about supported formats, file size limits, and how to contribute."
            />
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: [
                        {
                            '@type': 'Question',
                            name: `How much does ${APP_NAME} cost?`,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: `${APP_NAME} is completely free to use. There are no subscriptions, payments, or hidden fees.`,
                            },
                        },
                        {
                            '@type': 'Question',
                            name: `Does ${APP_NAME} upload my files to a server?`,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: 'No. All file processing happens locally in the browser. Files are never uploaded, stored, or transmitted to a server.',
                            },
                        },
                        {
                            '@type': 'Question',
                            name: `Can I use ${APP_NAME} without registration?`,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: `Yes. ${APP_NAME} does not require registration or personal information.`,
                            },
                        },
                    ],
                })}
            </script>
        </Helmet>
        <div>
            <h2>Frequently Asked Questions (FAQ)</h2>
            <h3>💰 How Much Does It Cost?</h3>
            <p>
                {APP_NAME} is <strong>completely free</strong> to use. There are no subscriptions,
                hidden fees, or payments required. The project is open source and created to make
                file protection accessible to everyone.
            </p>
            <h3>🔒 Are My Files Sent Anywhere?</h3>
            <p>
                No. All file processing happens entirely in your browser. Files are{' '}
                <strong>never uploaded, stored, or transmitted</strong> to any server, which means
                your data always stays on your device and remains under your full control.
            </p>
            <h3>👤 Do I Need an Account To Use the App?</h3>
            <p>
                No registration is required. You can start protecting files immediately without
                creating an account or sharing any personal information — no sign-ups, logins, or
                tracking involved.
            </p>
            <h3>🗝️ Where Can I Open Protected Files?</h3>
            <p>
                Protected files can be opened <strong>only in this web app</strong>. The app
                understands its own file format, which ensures a consistent and predictable
                experience. Offline and mobile versions may be available in the future, but
                currently this web app is the only supported option.
            </p>
            <h3>🔓 Can I Open Files Encoded by Another App?</h3>
            <p>
                <strong>No.</strong> {APP_NAME} works with its own file format and does not support
                files processed by other tools. This limitation helps avoid compatibility issues and
                reduces the risk of data loss.
            </p>
            <h3>📦 What is the Maximum File Size?</h3>
            <p>
                The maximum {APP_NAME} file size is <strong>{MAX_FILES_SIZE_MB}MB</strong>. This
                limit helps keep processing fast and reliable across different devices and browsers.
            </p>
            <h3>📁 What File Types Are Supported?</h3>
            <p>
                You can use almost any file type, including documents, images, audio, and video
                files. For security reasons, executable or system-related files and folder uploads
                are currently not supported.
            </p>
            <p>
                <strong>Forbidden file extensions:</strong>{' '}
                {FORBIDDEN_FILE_EXTENSIONS.map((value) => `*.${value}`).join(', ')}.
            </p>
            <h3>📂 Can I Process Multiple Files or Folders?</h3>
            <p>
                Currently, <strong>only one file can be processed at a time</strong>. Native support
                for multiple files and folders may be added in future versions.
            </p>

            <h3>🎭 Can I Disguise a Protected File as Another File Type?</h3>
            <p>
                <strong>Yes.</strong> The app allows you to disguise a processed file so it appears
                as a different file type (for example, making it look like an image). This can help
                reduce unwanted attention when storing or sharing the file.
            </p>
            <h3>🪄 Is Disguising a File Reversible?</h3>
            <p>
                <strong>Yes.</strong> Simply open the disguised file in {APP_NAME}. The app will
                detect the protected content and ask for the correct password to restore access.
            </p>
            <h3>📏 Is There a Size Limit for Disguise Files?</h3>
            <p>
                Yes. The file used as a disguise must be no larger than{' '}
                <strong>{MAX_FILES_SIZE_MB}MB</strong>. This limit helps ensure stable processing
                and prevents issues when restoring the original data.
            </p>
            <h3>🏷️ What File Types Are Supported for Disguise?</h3>
            <p>
                Disguise files must use non-executable formats that are technically tolerant to
                additional embedded data. The supported formats are based on technical constraints
                and may be expanded in future versions.
            </p>
            <p>
                <strong>Allowed disguise extensions:</strong>{' '}
                {ALLOWED_DISGUISE_EXTENSIONS.map((value) => `*.${value}`).join(', ')}.
            </p>
            <h3>🚫 I Can&apos;t Process a File. What Should I Do?</h3>
            <p>Please check the following:</p>
            <ul>
                <li>The file is not damaged or corrupted</li>
                <li>
                    The correct password is entered (watch for Caps Lock, typos and extra spaces)
                </li>
            </ul>
            <p>
                If the problem continues, you can report an issue on our GitHub page. When
                reporting, include:
            </p>
            <ul>
                <li>The file type (extension)</li>
                <li>A screenshot of the error</li>
                <li>Browser console output (Developer Tools → Console)</li>
            </ul>
            <p>You do not need to upload the actual file.</p>
            <h3>🐞 I Found a Bug in the Code or Interface</h3>
            <p>
                We appreciate bug reports and contributions. You can report issues on{' '}
                <Link href={GITHUB_URL} target="_blank" rel="noopener">
                    GitHub
                </Link>{' '}
                or submit a pull request if you know how to fix the problem.
            </p>
            <h3>🤝 Can I Contribute to the Project?</h3>
            <p>
                <strong>Yes!</strong> {APP_NAME} is open source and welcomes contributions from
                developers, designers, and other contributors. Visit the{' '}
                <Link href={GITHUB_URL} target="_blank" rel="noopener">
                    GitHub repository
                </Link>{' '}
                to get started.
            </p>
            <h3>🏢 Can Organizations Use This App?</h3>
            <p>
                This public web instance is intended for personal use only. Organizations interested
                in using the technology should review the open-source code and its license, or
                contact the project maintainers via{' '}
                <Link href={GITHUB_URL} target="_blank" rel="noopener">
                    GitHub
                </Link>{' '}
                or by email at <Link href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</Link> to discuss
                collaboration or sponsorship opportunities.
            </p>
        </div>
    </>
);

FAQ.displayName = 'FAQ';

export default FAQ;
