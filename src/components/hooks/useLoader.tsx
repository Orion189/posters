import { useState, ReactNode, FC, Dispatch, SetStateAction, createContext, useContext } from 'react';

type LoaderContextProps = {
    isLoaderVisible: boolean;
    setLoaderVisibility: Dispatch<SetStateAction<boolean>>;
};

type LoaderProviderProps = {
    children?: ReactNode;
};

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export const LoaderProvider: FC<LoaderProviderProps> = ({ children }) => {
    const [isLoaderVisible, setLoaderVisibility] = useState(false);

    return <LoaderContext.Provider value={{ isLoaderVisible, setLoaderVisibility }}>{children}</LoaderContext.Provider>;
};

export const useLoader = () => {
    const context = useContext(LoaderContext);

    if (context === undefined) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }

    return context;
};
