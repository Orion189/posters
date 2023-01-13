import { useState, ReactNode, FC, Dispatch, SetStateAction, createContext, useContext } from 'react';

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

    return (
        <SettingsContext.Provider value={{ isSettingsStored, setSettingsStored }}>{children}</SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);

    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }

    return context;
};
