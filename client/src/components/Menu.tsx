import { useContext, useCallback, useState, MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import QuizIcon from '@mui/icons-material/Quiz';
import InfoIcon from '@mui/icons-material/Info';
import { isMobile } from 'utils/device';
import { WindowManagerContext, WINDOW } from 'components/WindowManager';

/**
 * Main site menu.
 * @returns Adaptive menu of the app.
 */
const Menu = () => {
    const windowContext = useContext(WindowManagerContext);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleHowItWorksClick = useCallback(() => {
        windowContext.open(WINDOW.HOW_IT_WORKS);
    }, [windowContext.open]);

    const handleFAQClick = useCallback(() => {
        windowContext.open(WINDOW.FAQ);
    }, [windowContext.open]);

    const handleAboutClick = useCallback(() => {
        windowContext.open(WINDOW.ABOUT);
    }, [windowContext.open]);

    const handleOpenMenu = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <nav aria-label="Main Menu">
            {isMobile() ? (
                <>
                    <IconButton aria-label="Open main menu" onClick={handleOpenMenu}>
                        <MenuIcon fontSize="medium" />
                    </IconButton>
                    <MuiMenu
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        onClose={handleCloseMenu}
                        onClick={handleCloseMenu}
                    >
                        <MenuItem divider onClick={handleHowItWorksClick}>
                            <ListItemIcon>
                                <SettingsSuggestIcon fontSize="small" />
                            </ListItemIcon>
                            How it works
                        </MenuItem>
                        <MenuItem divider onClick={handleFAQClick}>
                            <ListItemIcon>
                                <QuizIcon fontSize="small" />
                            </ListItemIcon>
                            FAQ
                        </MenuItem>
                        <MenuItem onClick={handleAboutClick}>
                            <ListItemIcon>
                                <InfoIcon fontSize="small" />
                            </ListItemIcon>
                            About
                        </MenuItem>
                    </MuiMenu>
                </>
            ) : (
                <ul className="menu__list">
                    <li className="menu__list-item">
                        <Button className="menu__list-item-button" onClick={handleHowItWorksClick}>
                            How It Works
                        </Button>
                    </li>
                    <li className="menu__list-item">
                        <Button className="menu__list-item-button" onClick={handleFAQClick}>
                            FAQ
                        </Button>
                    </li>
                    <li className="menu__list-item">
                        <Button className="menu__list-item-button" onClick={handleAboutClick}>
                            About
                        </Button>
                    </li>
                </ul>
            )}
        </nav>
    );
};

Menu.displayName = 'Menu';

export default Menu;
