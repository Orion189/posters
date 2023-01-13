import { renderHook, RenderHookResult } from '@testing-library/react';
import { useNetworkStatus } from "@components/hooks/useNetworkStatus";
import React, { EffectCallback } from 'react';

let enqueueSnackbar: jest.Mock;

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((str) => str),
        i18n: {
            changeLanguage: () => new Promise(() => {})
        }
    })
}));

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar
    })
}));

describe('useNetworkStatus', () => {
    let useCallback: jest.Mock;
    let result: RenderHookResult<void, undefined>;
    let cleanupFunc: ReturnType<EffectCallback>;
    const notificationDataOnline = {
        label: "common.label.network.online",
        options: {
            variant: "success"
        }
    };
    const notificationDataOffline = {
        label: "common.label.network.offline",
        options: {
            variant: "error"
        }
    };

    beforeEach(() => {
        enqueueSnackbar = jest.fn();
        useCallback = jest.fn();
        jest.spyOn(React, 'useEffect').mockImplementation(f => {
            cleanupFunc = f();
        });
        jest.spyOn(window, 'addEventListener');
        jest.spyOn(window, 'removeEventListener');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Test window events subscription', () => {
        jest.spyOn(React, 'useCallback').mockImplementation(() => useCallback);

        renderHook(() => useNetworkStatus());

        expect(window.addEventListener).toHaveBeenCalledTimes(2);
        expect(window.addEventListener).toHaveBeenNthCalledWith(1, 'online', useCallback);
        expect(window.addEventListener).toHaveBeenNthCalledWith(2, 'offline', useCallback);
    });
    it('Test window events unsubscription', () => {
        jest.spyOn(React, 'useCallback').mockImplementation(() => useCallback);

        result = renderHook(() => useNetworkStatus());

        const { unmount } = result;

        unmount();
        cleanupFunc!();

        expect(window.removeEventListener).toHaveBeenCalledTimes(2);
        expect(window.removeEventListener).toHaveBeenNthCalledWith(1, 'online', useCallback);
        expect(window.removeEventListener).toHaveBeenNthCalledWith(2, 'offline', useCallback);
    });

    it('Test showing notification online', () => {
        jest.spyOn(React, 'useCallback').mockImplementation(f => f());

        renderHook(() => useNetworkStatus());

        expect(enqueueSnackbar).toHaveBeenCalledTimes(2);
        expect(enqueueSnackbar).toHaveBeenNthCalledWith(1, notificationDataOnline.label, notificationDataOnline.options);
        expect(enqueueSnackbar).toHaveBeenNthCalledWith(2, notificationDataOffline.label, notificationDataOffline.options);
    });

    it('Test showing notification offline', () => {
        jest.spyOn(React, 'useCallback').mockImplementation(f => f());

        result = renderHook(() => useNetworkStatus());

        const { unmount } = result;

        unmount();
        cleanupFunc!();

        expect(enqueueSnackbar).toHaveBeenCalledTimes(2);
        expect(enqueueSnackbar).toHaveBeenNthCalledWith(1, notificationDataOnline.label, notificationDataOnline.options);
        expect(enqueueSnackbar).toHaveBeenNthCalledWith(2, notificationDataOffline.label, notificationDataOffline.options);
    });
});