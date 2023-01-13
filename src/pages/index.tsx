import { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import client from 'src/graphql';
// import getConfig from 'next/config';
import { GetStaticProps } from 'next';
import styles from './style.module.scss';
import type { Movie, Settings } from 'src/types';
import { useMovies } from '@components/hooks/useMovies';
import { GET_GENRES, GET_COUNTRIES } from 'src/graphql/queries';

type IndexPageProps = {
    settingsData: Settings;
};

// const { publicRuntimeConfig } = getConfig();
const getGenres = async () => {
    // const response = await fetch(`${publicRuntimeConfig.host}/api/genres`);
    // const genres = await data.json();
    try {
        const {
            data: { genres }
        } = await client.query({
            query: GET_GENRES
        });

        return genres;
    } catch {
        return [];
    }
};
const getCountries = async () => {
    // const response = await fetch(`${publicRuntimeConfig.host}/api/countries`);
    // const countries = await response.json();
    try {
        const {
            data: { countries }
        } = await client.query({
            query: GET_COUNTRIES
        });

        return countries;
    } catch {
        return [];
    }
};

export const getStaticProps: GetStaticProps = async () => {
    const genresData = await getGenres();
    const countriesData = await getCountries();

    if (!genresData || !countriesData) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            genresData,
            countriesData
        }
    };
};

const IndexPage: FC<IndexPageProps> = () => {
    const { index, movies } = useMovies();

    return index !== undefined ? (
        <div className={styles.cont}>
            <Head>
                <title>{`${movies[index]?.original_title}, ${movies[index]?.year}`}</title>
                <meta name="description" content={movies[index]?.summary} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {movies?.map(
                (mov: Movie) =>
                    mov.poster && (
                        <div
                            className={`${styles.wrapper} ${mov.id === movies[index]?.id ? '' : styles.hidden}`}
                            key={mov.id.toString()}
                        >
                            <Image
                                alt={mov.original_title}
                                src={mov.poster?.file_location}
                                width={mov.poster?.width}
                                height={mov.poster?.height}
                            />
                        </div>
                    )
            )}
        </div>
    ) : null;
};

export default IndexPage;
