import { useCallback, useContext } from 'react';
import Link from '@mui/material/Link';
import { GITHUB_URL } from 'utils/constants';
import { WindowManagerContext, WINDOW } from 'components/WindowManager';

/**
 * Extra links and additional information.
 * @returns The footer.
 */
const Footer = () => {
    const windowContext = useContext(WindowManagerContext);

    const handleTermsOfUseClick = useCallback(() => {
        windowContext.open(WINDOW.TERMS_OF_USE);
    }, [windowContext.open]);

    const handlePrivacyPolicyClick = useCallback(() => {
        windowContext.open(WINDOW.PRIVACY_POLICY);
    }, [windowContext.open]);

    return (
        <nav aria-label="Footer Menu">
            <ul className="footer__list">
                <li className="footer__list-item">
                    <Link
                        className="footer__list-item-action"
                        component={'button'}
                        onClick={handleTermsOfUseClick}
                    >
                        Terms of Use
                    </Link>
                </li>
                <li className="footer__list-item">
                    <Link
                        className="footer__list-item-action"
                        component={'button'}
                        onClick={handlePrivacyPolicyClick}
                    >
                        Privacy Policy
                    </Link>
                </li>
                <li className="footer__list-item">
                    <Link
                        className="footer__list-item-action"
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener"
                    >
                        GitHub
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

Footer.displayName = 'Footer';

export default Footer;
