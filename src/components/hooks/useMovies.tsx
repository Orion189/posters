import { useRef, useCallback, useEffect, useState } from 'react';
import getConfig from 'next/config';
import type { Movie } from 'src/types';
import { useSnackbar } from 'notistack';
import { useLazyQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useLoader } from '@components/hooks/useLoader';
import { useSettings } from '@components/hooks/useSettings';
import { useMovieInfo } from '@components/hooks/useMovieInfo';
import { GET_RANDOM_MOVIES, GET_MOVIES_BY_SETTINGS } from 'src/graphql/queries';

const TIMEOUT = 1000 * 30;
const { publicRuntimeConfig } = getConfig();

export const useMovies = () => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const { isSettingsStored } = useSettings();
    const { setMovieInfo } = useMovieInfo();
    const { setLoaderVisibility } = useLoader();
    const timeoutRef = useRef<number | undefined>(undefined);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [index, setIndex] = useState<number | undefined>(undefined);
    const [getRandomMovies] = useLazyQuery(GET_RANDOM_MOVIES, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (Array.isArray(data?.random) && data?.random.length > 0) {
                setMovies(data?.random);
                setIndex(0);
                setMovieInfo(movies[0]);
            }
        }
    });
    const [getMoviesBySettings] = useLazyQuery(GET_MOVIES_BY_SETTINGS, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (Array.isArray(data?.search) && data?.search.length > 0) {
                setMovies(data.search);
                setIndex(0);
                setMovieInfo(movies[0]);
            }
        }
    });

    const changeMovie = useCallback(async () => {
        const isMovieAvailable = index !== undefined && movies[index + 1];

        if (isMovieAvailable) {
            setIndex(index + 1);
            setMovieInfo(movies[index + 1]);
        } else {
            const settingsStr = window.localStorage.getItem(publicRuntimeConfig.lsItemName);

            if (settingsStr) {
                try {
                    getMoviesBySettings({
                        variables: JSON.parse(settingsStr)
                    });
                } catch (e) {
                    enqueueSnackbar(t('common.errors.settings.parsing'), { variant: 'error' });
                }
            } else {
                getRandomMovies();
            }
        }

        setLoaderVisibility(false);
    }, [index]);

    useEffect(() => {
        setMovies([]);
        setLoaderVisibility(true);
    }, [isSettingsStored]);

    useEffect(() => {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(changeMovie, TIMEOUT);
    }, [index]);

    useEffect(() => {
        setLoaderVisibility(true);
    }, []);

    useEffect(
        () => () => {
            window.clearTimeout(timeoutRef.current);
        },
        []
    );

    return {
        index,
        movies
    };
};
