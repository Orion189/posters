import { GET_RANDOM_MOVIES, GET_MOVIES_BY_SETTINGS } from 'src/graphql/queries';

export const graphqlQueries = [
    {
        request: {
            query: GET_RANDOM_MOVIES
        },
        result: {
            data: {
                id: 50614,
                imdb: 472181,
                type: 1,
                year: 2011,
                original_title: 'The Smurfs',
                url_title: 'the-smurfs',
                num_posters: 205,
                num_groups: 48,
                language: 'English',
                country: 'United States,Belgium,Canada',
                release_date: '2011-07-29',
                director: null,
                genre: 'Animation,Adventure,Comedy,Family,Fantasy',
                runtime: 103,
                summary: 'When the evil wizard Gargamel chases the tiny blue Smurfs out of their village, they tumble from their magical world into New York City.',
                poster: {
                    id: 559744,
                    group_id: 492126,
                    country_code: 'US',
                    file_location: 'https://google.com/',
                    width: 2025,
                    height: 3000,
                    size: 1399842,
                    type_id: 1
                }
            }
        }
    },
    {
        request: {
          query: GET_MOVIES_BY_SETTINGS,
          variables: {
                movieType: '0',
                genreType: 'Drama',
                yearFrom: '1990',
                yearTo: '2000',
                country: 'US'
          }
        },
        result: {
            data: {
                id: 50614,
                imdb: 472181,
                type: 1,
                year: 2011,
                original_title: 'The Smurfs',
                url_title: 'the-smurfs',
                num_posters: 205,
                num_groups: 48,
                language: 'English',
                country: 'United States,Belgium,Canada',
                release_date: '2011-07-29',
                director: null,
                genre: 'Animation,Adventure,Comedy,Family,Fantasy',
                runtime: 103,
                summary: 'When the evil wizard Gargamel chases the tiny blue Smurfs out of their village, they tumble from their magical world into New York City.',
                poster: {
                    id: 559744,
                    group_id: 492126,
                    country_code: 'US',
                    file_location: 'https://google.com/',
                    width: 2025,
                    height: 3000,
                    size: 1399842,
                    type_id: 1
                }
            }
        }
    }
];