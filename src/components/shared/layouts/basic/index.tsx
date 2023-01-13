import { useState, useRef, FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Drawer from '@mui/material/Drawer';
import Info from '@components/main/Info';
import Loader from '@components/shared/Loader';
import Settings from '@components/main/Settings';
import { theme } from '@themes/basic';
import { Genre, Country } from 'src/types';
import { useNetworkStatus } from '@components/hooks/useNetworkStatus';
import { useSideMenuButtons } from '@components/hooks/useSideMenuButtons';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import styles from './style.module.scss';

enum Direction {
    Left = 'left',
    Right = 'right'
}

type Anchor = Direction.Left | Direction.Right;

type BasicLayoutProps = {
    children?: ReactNode;
    genresData?: [Genre];
    countriesData?: [Country];
};

const BasicLayout: FC<BasicLayoutProps> = ({ children, genresData, countriesData }) => {
    const settingsBtnRef = useRef<HTMLButtonElement | null>(null);
    const infoBtnRef = useRef<HTMLButtonElement | null>(null);
    const [state, setState] = useState({
        left: false,
        right: false
    });
    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    useNetworkStatus();
    useSideMenuButtons(settingsBtnRef, infoBtnRef);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Box className={styles.wrapper}>
                    <Loader />
                    <Fab
                        aria-label="settings"
                        ref={settingsBtnRef}
                        className={styles.settingsBtn}
                        onClick={toggleDrawer(Direction.Left, true)}
                        color="primary"
                    >
                        <SettingsRoundedIcon color="primary" fontSize="large" />
                    </Fab>
                    <Drawer anchor={Direction.Left} open={state.left} onClose={toggleDrawer(Direction.Left, false)}>
                        <Settings genresData={genresData} countriesData={countriesData} />
                    </Drawer>
                    {children}
                    <Fab
                        aria-label="info"
                        ref={infoBtnRef}
                        className={styles.infoBtn}
                        onClick={toggleDrawer(Direction.Right, true)}
                        color="primary"
                    >
                        <InfoRoundedIcon fontSize="large" />
                    </Fab>
                    <Drawer anchor={Direction.Right} open={state.right} onClose={toggleDrawer(Direction.Right, false)}>
                        <Info />
                    </Drawer>
                </Box>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default BasicLayout;
