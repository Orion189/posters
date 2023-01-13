import { gql } from '@apollo/client';

export const GET_GENRES = gql`
    query GetGenres {
        genres {
            id
            name
        }
    }
`;

export const GET_COUNTRIES = gql`
    query GetCountries {
        countries {
            country_code
            country
        }
    }
`;

export const GET_RANDOM_MOVIES = gql`
    query GetRandomMovies {
        random {
            id
            imdb
            type
            year
            original_title
            url_title
            num_posters
            num_groups
            language
            country
            release_date
            director
            genre
            runtime
            summary
            poster {
                id
                group_id
                country_code
                file_location
                width
                height
                size
                type_id
            }
        }
    }
`;

export const GET_MOVIES_BY_SETTINGS = gql`
    query GetMoviesBySettings(
        $movieType: String
        $genreType: String
        $yearFrom: String
        $yearTo: String
        $country: String
    ) {
        search(movieType: $movieType, genreType: $genreType, yearFrom: $yearFrom, yearTo: $yearTo, country: $country) {
            id
            imdb
            type
            year
            original_title
            url_title
            num_posters
            num_groups
            language
            country
            release_date
            director
            genre
            runtime
            summary
            poster {
                id
                group_id
                country_code
                file_location
                width
                height
                size
                type_id
            }
        }
    }
`;
