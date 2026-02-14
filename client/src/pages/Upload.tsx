import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useSnackbar } from 'components/Snackbar';
import { APP_NAME, APP_URL, MAX_ALERT_FILENAME_LENGTH, STAGE, STAGE_DATA } from 'utils/constants';
import { ellipse, upload, validateFile } from 'utils/common';
import { isMobile } from 'utils/device';
import { WindowManagerContext, WINDOW } from 'components/WindowManager';

/**
 * The upload page.
 * @returns Home page for files upload.
 */
const Upload = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const windowContext = useContext(WindowManagerContext);

    const handleAboutClick = useCallback(() => {
        windowContext.open(WINDOW.HOW_IT_WORKS);
    }, [windowContext.open]);

    const handleFileClick = useCallback(async () => {
        try {
            const file = await upload();
            const validation = validateFile(file);
            if (validation !== true) {
                enqueueSnackbar({
                    variant: 'warning',
                    title: 'Unable to upload file',
                    message: (
                        <>
                            <strong>{ellipse(file.name, MAX_ALERT_FILENAME_LENGTH)}</strong>{' '}
                            isn&apos;t uploaded. {validation}
                        </>
                    ),
                });
                return;
            }
            navigate(STAGE_DATA[STAGE.SECURE].path, { state: { file } });
        } catch (error) {
            enqueueSnackbar({
                variant: 'error',
                title: 'Failed to upload file',
                message: 'Something went wrong. Please try again.',
            });
            console.error(error);
        }
    }, [enqueueSnackbar]);

    return (
        <>
            <Helmet>
                <link rel="canonical" href={APP_URL} />
                <meta
                    name="description"
                    content={`${APP_NAME} is a free web app that lets you protect files with a password and disguise them as another files directly in your browser. Simple, private, and open source.`}
                />
                <meta
                    name="keywords"
                    content="file, data, password, protect, secure, encrypt, decrypt, encode, decode, cipher, disguise, free, online, service, file password, pdf password, excel password, zip password"
                />
                <meta
                    property="og:title"
                    content={`${APP_NAME} — Protect Files with Password Online`}
                />
                <meta
                    property="og:description"
                    content={`${APP_NAME} is a free web app that lets you protect files with a password and disguise them as another files directly in your browser. Simple, private, and open source.`}
                />
                <meta property="og:url" content={APP_URL} />
                <meta
                    name="twitter:title"
                    content={`${APP_NAME} — Protect Files with Password Online`}
                />
                <meta
                    name="twitter:description"
                    content="Protect your files with a password and disguise them as another files directly in your browser. Simple, private, and open source."
                />
                {/* Helmet doesn't overwrite scripts even with the same key */}
                {!windowContext.isOpened && (
                    <script type="application/ld+json">
                        {JSON.stringify({
                            '@context': 'https://schema.org',
                            '@graph': [
                                {
                                    '@type': 'WebSite',
                                    name: APP_NAME,
                                    url: APP_URL,
                                    description: `${APP_NAME} is a free, open-source web application for private file protection and data safety.`,
                                    publisher: {
                                        '@type': 'Organization',
                                        name: `${APP_NAME} Project`,
                                    },
                                },
                                {
                                    '@type': 'SoftwareApplication',
                                    name: APP_NAME,
                                    operatingSystem: 'Web',
                                    applicationCategory: 'SecurityApplication',
                                    browserRequirements: 'Requires JavaScript',
                                    isAccessibleForFree: true,
                                    license: 'https://opensource.org/licenses/MIT',
                                    description:
                                        'A web-based tool that allows users to protect files with a password and disguise them directly in the browser without uploading data to a server.',
                                    url: APP_URL,
                                    author: {
                                        '@type': 'Organization',
                                        name: `${APP_NAME} Project`,
                                    },
                                },
                            ],
                        })}
                    </script>
                )}
            </Helmet>
            <div className="upload">
                <p className="upload__description">
                    Welcome to <strong>{APP_NAME}</strong> — the easiest way to protect your files
                    with a password or disguise them as another file.
                </p>
                <Link className="upload__about" component="button" onClick={handleAboutClick}>
                    How does it work?
                </Link>
                <div className="upload__actions">
                    <Button variant="contained" onClick={handleFileClick}>
                        Select file
                    </Button>
                    {!isMobile() && <div className="upload__actions-hint">or drop it here</div>}
                </div>
            </div>
        </>
    );
};

Upload.displayName = 'Upload';

export default Upload;
