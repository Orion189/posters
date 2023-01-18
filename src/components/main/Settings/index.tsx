import { FC, useCallback } from 'react';
import getConfig from 'next/config';
import { useSettings } from '@components/hooks/useSettings';
import { Genre, Country, Settings } from 'src/types';
import SettingsView from './Settings';

type SettingsProps = {
    genresData?: [Genre];
    countriesData?: [Country];
};

const { publicRuntimeConfig } = getConfig();

const SettingsFC: FC<SettingsProps> = ({ genresData, countriesData }) => {
    const { setSettingsStored } = useSettings();
    const onSaveForm = useCallback(
        (values: Settings) => {
            window.localStorage.setItem(publicRuntimeConfig.lsItemName, JSON.stringify(values));

            setSettingsStored(true);
        },
        [setSettingsStored]
    );

    const onResetForm = useCallback(() => {
        window.localStorage.removeItem(publicRuntimeConfig.lsItemName);

        setSettingsStored(false);
    }, [setSettingsStored]);

    return (
        <SettingsView
            genresData={genresData}
            countriesData={countriesData}
            onSaveForm={onSaveForm}
            onResetForm={onResetForm}
        />
    );
};

export default SettingsFC;
