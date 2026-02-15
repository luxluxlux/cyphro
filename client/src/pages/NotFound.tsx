import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import { APP_NAME, STAGE, STAGE_DATA } from 'utils/constants';

/**
 * 404 error page.
 * @returns A page with a warning and a button to return to the main page.
 */
const NotFound = () => (
    <>
        <Helmet>
            <title>404 — Page Not Found | {APP_NAME}</title>
            <meta name="robots" content="noindex" />
        </Helmet>
        <div className="not-found">
            <h2 className="not-found__title">Oops! 404 - Page Not Found</h2>
            <p className="not-found__description">
                The page packed up its bits and left. We&apos;re still trying to decode its last
                message.
            </p>
            <Button component={Link} to={STAGE_DATA[STAGE.UPLOAD].path} variant="contained">
                Go home
            </Button>
        </div>
    </>
);

NotFound.displayName = 'NotFound';

export default NotFound;
