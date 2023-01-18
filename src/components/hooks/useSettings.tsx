import { useState, ReactNode, FC, Dispatch, SetStateAction, createContext, useContext, useMemo } from 'react';

type SettingsContextProps = {
    isSettingsStored: boolean;
    setSettingsStored: Dispatch<SetStateAction<boolean>>;
};

type SettingsProviderProps = {
    children?: ReactNode;
};

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
    const [isSettingsStored, setSettingsStored] = useState(false);
    const data = useMemo(() => ({ isSettingsStored, setSettingsStored }), [isSettingsStored]);

    return <SettingsContext.Provider value={data}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
    const context = useContext(SettingsContext);

    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }

    return context;
};
