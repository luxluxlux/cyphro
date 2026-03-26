import { useCallback, useEffect } from 'react';
import { Link as RouterLink, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MuiLink from '@mui/material/Link';
import Button from '@mui/material/Button';
import TelegramIcon from '@mui/icons-material/Telegram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { APP_NAME, APP_URL, STAGE, STAGE_DATA } from 'utils/constants';
import { download, ellipse } from 'utils/common';

const ENCODED_SHARED_URL = encodeURIComponent(APP_URL);
const ENCODED_SHARED_TEXT = encodeURIComponent(
    `Sharing files? Protect them with a password using ${APP_NAME} 🔐`
);

/**
 * File download and share page.
 * @returns File processing summary page.
 */
const Download = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const downloadFile = useCallback(() => {
        download(location.state.data, location.state.fileName);
        navigate(
            {
                pathname: STAGE_DATA[STAGE.DOWNLOAD].path,
                // Set it not to lose the search params after deferred download
                search: location.search,
            },
            {
                state: {
                    ...location.state,
                    downloaded: true,
                },
            }
        );
    }, [location]);

    useEffect(() => {
        if (!location.state || location.state.downloaded) {
            return;
        }
        // Give the user some time to read the result
        const timeout = setTimeout(() => {
            downloadFile();
        }, 2_000);
        return () => clearTimeout(timeout);
    }, [location]);

    if (!location.state) {
        return (
            <Navigate
                to={{
                    pathname: STAGE_DATA[STAGE.UPLOAD].path,
                    search: location.search,
                }}
                replace
            />
        );
    }

    return (
        <>
            <Helmet>
                <title>Download | {APP_NAME}</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="download">
                <p className="download__description">
                    Your file was successfully {location.state.action}d as{' '}
                    <b title={location.state.fileName}>{ellipse(location.state.fileName, 40)}</b>{' '}
                    and downloaded. If not, use the button below.
                </p>
                <div className="download__actions">
                    <Button variant="contained" onClick={downloadFile}>
                        Download
                    </Button>
                    <Button
                        component={RouterLink}
                        to={STAGE_DATA[STAGE.UPLOAD].path}
                        variant="outlined"
                    >
                        Again
                    </Button>
                </div>
                <div className="download__socials">
                    <div className="download__socials-title">Tell your friends about us</div>
                    {/*
                    Don't use URLSearchParams, it replaces spaces with '+'.
                    It can cause problems, for example, in Telegram.
                */}
                    <div className="download__socials-links">
                        <MuiLink
                            className="download__socials-links-link"
                            href={`https://t.me/share/url?url=${ENCODED_SHARED_URL}&text=${ENCODED_SHARED_TEXT}`}
                            target="_blank"
                            rel="noopener"
                            title="Telegram"
                        >
                            <TelegramIcon fontSize="small" />
                        </MuiLink>
                        <MuiLink
                            className="download__socials-links-link"
                            href={`https://x.com/intent/post?url=${ENCODED_SHARED_URL}&text=${ENCODED_SHARED_TEXT}`}
                            target="_blank"
                            rel="noopener"
                            title="X (Twitter)"
                        >
                            <XIcon fontSize="small" />
                        </MuiLink>
                        <MuiLink
                            className="download__socials-links-link"
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${ENCODED_SHARED_URL}&text=${ENCODED_SHARED_TEXT}`}
                            target="_blank"
                            rel="noopener"
                            title="LinkedIn"
                        >
                            <LinkedInIcon fontSize="small" />
                        </MuiLink>
                    </div>
                </div>
            </div>
        </>
    );
};

Download.displayName = 'Download';

export default Download;
