import { useEffect, useRef, useCallback, MutableRefObject } from 'react';
import commonStyles from '@styles/common.module.scss';

export const useSideMenuButtons = (
    settingsBtnRef: MutableRefObject<HTMLButtonElement | null>,
    infoBtnRef: MutableRefObject<HTMLButtonElement | null>
) => {
    const timeoutRef = useRef<undefined | number>(undefined);
    const isBtnsShownRef = useRef<boolean>(false);
    const onMouseMove = useCallback((e: MouseEvent) => {
        const settingsBtn = settingsBtnRef?.current;
        const infoBtn = infoBtnRef?.current;
        let isBtnsShown = isBtnsShownRef?.current;
        let timeout = timeoutRef?.current;

        if (!isBtnsShown) {
            settingsBtn?.classList.add(commonStyles.fullOpacity);
            infoBtn?.classList.add(commonStyles.fullOpacity);
            isBtnsShown = true;
        }

        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            settingsBtn?.classList.remove(commonStyles.fullOpacity);
            infoBtn?.classList.remove(commonStyles.fullOpacity);
            isBtnsShown = false;
        }, 1000);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
    }, [onMouseMove]);
    useEffect(
        () => () => {
            window.removeEventListener('mousemove', onMouseMove);
        },
        [onMouseMove]
    );
};
