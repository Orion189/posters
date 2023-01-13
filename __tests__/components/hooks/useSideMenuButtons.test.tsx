import { renderHook, RenderHookResult, fireEvent, act } from '@testing-library/react';
import { useSideMenuButtons } from "@components/hooks/useSideMenuButtons";
import React, { EffectCallback, MutableRefObject } from 'react';

describe('useSideMenuButtons', () => {
    let useCallback: jest.Mock;
    let result: RenderHookResult<void, undefined>;
    let cleanupFunc: ReturnType<EffectCallback>;
    let settingsBtnRef: MutableRefObject<HTMLButtonElement | null>;
    let infoBtnRef: MutableRefObject<HTMLButtonElement | null>;

    beforeEach(() => {
        settingsBtnRef = { current: document.createElement('button') };
        infoBtnRef = { current: document.createElement('button') };
        useCallback = jest.fn();

        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    it('Should subscribe to `mousemove` event on mount', () => {
        jest.spyOn(React, 'useCallback').mockImplementationOnce(() => useCallback);
        jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f());
        jest.spyOn(window, 'addEventListener');

        renderHook(() => useSideMenuButtons(settingsBtnRef, infoBtnRef));

        expect(window.addEventListener).toHaveBeenCalledTimes(1);
        expect(window.addEventListener).toHaveBeenCalledWith('mousemove', useCallback);
    });
    it('Should unsubscribe from `mousemove` event on unmount', () => {
        jest.spyOn(React, 'useCallback').mockImplementationOnce(() => useCallback);
        jest.spyOn(React, 'useEffect').mockImplementation(f => {
            cleanupFunc = f();
        });
        jest.spyOn(window, 'removeEventListener');

        result = renderHook(() => useSideMenuButtons(settingsBtnRef, infoBtnRef));

        const { unmount } = result;

        unmount();
        cleanupFunc!();

        expect(window.removeEventListener).toHaveBeenCalledTimes(1);
        expect(window.removeEventListener).toHaveBeenCalledWith('mousemove', useCallback);
    });

    it('Should add specific classes to buttons before timeout', () => {
        renderHook(() => useSideMenuButtons(settingsBtnRef, infoBtnRef));

        fireEvent.mouseMove(window);

        expect(settingsBtnRef.current?.classList.contains('fullOpacity')).toBe(true);
        expect(infoBtnRef.current?.classList.contains('fullOpacity')).toBe(true);
    });

    it('Should call `clearTimeout` once', () => {
        jest.spyOn(window, 'clearTimeout');

        renderHook(() => useSideMenuButtons(settingsBtnRef, infoBtnRef));

        fireEvent.mouseMove(window);

        expect(window.clearTimeout).toHaveBeenCalledTimes(1);
    });

    it('Should call `setTimeout` once', () => {
        jest.spyOn(window, 'setTimeout');

        renderHook(() => useSideMenuButtons(settingsBtnRef, infoBtnRef));

        fireEvent.mouseMove(window);

        expect(window.setTimeout).toHaveBeenCalledTimes(1);
    });

    it('Should remove specific classes from buttons after timeout', async () => {
        act(() => {
            renderHook(() => useSideMenuButtons(settingsBtnRef, infoBtnRef));

            fireEvent.mouseMove(window);
        });

        jest.runAllTimers();

        expect(settingsBtnRef.current?.classList.contains('fullOpacity')).toBe(false);
        expect(infoBtnRef.current?.classList.contains('fullOpacity')).toBe(false);
    });
});
