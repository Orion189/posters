import { useState, ReactNode, FC, Dispatch, SetStateAction, useContext, createContext, useMemo } from 'react';
import { MovieInfo } from 'src/types';

type MovieInfoContextProps = {
    movieInfo: MovieInfo | undefined;
    setMovieInfo: Dispatch<SetStateAction<MovieInfo | undefined>>;
};

type MovieInfoProviderProps = {
    children?: ReactNode;
};

const MovieInfoContext = createContext<MovieInfoContextProps | undefined>(undefined);

export const MovieInfoProvider: FC<MovieInfoProviderProps> = ({ children }) => {
    const [movieInfo, setMovieInfo] = useState<MovieInfo | undefined>(undefined);
    const data = useMemo(() => ({ movieInfo, setMovieInfo }), [movieInfo]);

    return <MovieInfoContext.Provider value={data}>{children}</MovieInfoContext.Provider>;
};

export const useMovieInfo = () => {
    const context = useContext(MovieInfoContext);

    if (context === undefined) {
        throw new Error('useMovieInfo must be used within a CountProvider');
    }

    return context;
};
