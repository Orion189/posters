import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

export const useNetworkStatus = () => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const toggleOnline = useCallback(
        () => enqueueSnackbar(t('common.label.network.online'), { variant: 'success' }),
        []
    );
    const toggleOffline = useCallback(
        () => enqueueSnackbar(t('common.label.network.offline'), { variant: 'error' }),
        []
    );

    useEffect(() => {
        window.addEventListener('online', toggleOnline);
        window.addEventListener('offline', toggleOffline);
    }, []);
    useEffect(
        () => () => {
            window.removeEventListener('online', toggleOnline);
            window.removeEventListener('offline', toggleOffline);
        },
        []
    );
};
