import { Helmet } from 'react-helmet-async';
import Link from '@mui/material/Link';
import { APP_EMAIL, APP_NAME, GITHUB_URL, MAX_FILES_SIZE_MB } from 'utils/constants';
import { WINDOW_DATA, WINDOW } from 'components/WindowManager';
import { Header } from 'components/Page';

/**
 * Frequently asked questions (FAQ).
 * @returns Window content.
 */
const FAQ = () => (
    <>
        <Helmet>
            <title>{APP_NAME} | FAQ</title>
        </Helmet>
        <Header
            path={`?popup=${WINDOW_DATA[WINDOW.FAQ].path}`}
            metaTitle={`${APP_NAME} FAQ — File Protection, Password Security, and Troubleshooting`}
            metaDescription={`Find answers to common questions about ${APP_NAME} — a free, open source web app to encode, decode, and disguise a file with a password directly in your browser. Learn about supported formats, file size limits, and how to contribute.`}
            metaKeywords={`faq, ${APP_NAME}, help, support, questions, free, is safe, encrypt file, decrypt file, encode file, decode file, disguise file, file password, bug report, data privacy, partnership`}
            ogTitle={`${APP_NAME} — Frequently asked questions (FAQ)`}
            ogDescription="Find answers to common questions about the project. Learn about supported formats, file size limits, and how to contribute."
        />
        <div>
            <h2>Frequently asked questions (FAQ)</h2>
            <h3>💰 How much does it cost?</h3>
            <p>
                {APP_NAME} is <strong>completely free</strong> to use. There are no subscriptions,
                hidden fees, or payments required. The project is open source and created to make
                file protection accessible to everyone.
            </p>
            <h3>🗝️ Where can I open protected files?</h3>
            <p>
                Protected files can be opened <strong>only in this web app</strong>. The app
                understands its own file format, which ensures a consistent and predictable
                experience. Offline and mobile versions may be available in the future, but
                currently this web app is the only supported option.
            </p>
            <h3>🔓 Can I open files encoded by another app?</h3>
            <p>
                <strong>No.</strong> {APP_NAME} works with its own file format and does not support
                files processed by other tools. This limitation helps avoid compatibility issues and
                reduces the risk of data loss.
            </p>
            <h3>📦 What is the maximum file size?</h3>
            <p>
                The maximum {APP_NAME} file size is <strong>{MAX_FILES_SIZE_MB}MB</strong>. This
                limit helps keep processing fast and reliable across different devices and browsers.
            </p>
            <h3>📁 What file types are supported?</h3>
            <p>
                You can use almost <strong>any file type</strong>, including documents, images,
                audio, and video files. Folder uploads are not supported at the moment.
            </p>
            <h3>📂 Can I process multiple files or folders?</h3>
            <p>
                Currently, <strong>only one file can be processed at a time</strong>. Native support
                for multiple files and folders may be added in future versions.
            </p>
            <h3>🎭 Can I disguise a protected file as another file type?</h3>
            <p>
                <strong>Yes.</strong> The app allows you to disguise a processed file so it appears
                as a different file type (for example, making it look like an image). This can help
                reduce unwanted attention when storing or sharing the file.
            </p>
            <h3>🪄 Is disguising a file reversible?</h3>
            <p>
                <strong>Yes.</strong> Simply open the disguised file in {APP_NAME}. The app will
                detect the protected content and ask for the correct password to restore access.
            </p>
            <h3>🚫 I can&apos;t process a file. What should I do?</h3>
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
            <h3>🐞 I found a bug in the code or interface</h3>
            <p>
                We appreciate bug reports and contributions. You can report issues on{' '}
                <Link href={GITHUB_URL} target="_blank" rel="noopener">
                    GitHub
                </Link>{' '}
                or submit a pull request if you know how to fix the problem.
            </p>
            <h3>🤝 Can I contribute to the project?</h3>
            <p>
                <strong>Yes!</strong> {APP_NAME} is open source and welcomes contributions from
                developers, designers, and other contributors. Visit the{' '}
                <Link href={GITHUB_URL} target="_blank" rel="noopener">
                    GitHub repository
                </Link>{' '}
                to get started.
            </p>
            <h3>🏢 Can organizations use this app?</h3>
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
