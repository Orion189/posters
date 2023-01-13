import getConfig from 'next/config';
import type { GraphQLServerContext } from 'src/types';

const { serverRuntimeConfig } = getConfig();

const handler = async (parent: any, args: any, context: GraphQLServerContext, info: any) => {
    const url = new URL(`${serverRuntimeConfig.apiUrl}/search/movies`);
    /*const searchParams = {
        type: context.req.query.movieType,
        genre_id: context.req.query.genreType,
        year_from: context.req.query.yearFrom,
        year_to: context.req.query.yearTo,
        country_code: context.req.query.country
    };*/
    const searchParams = {
        type: args.movieType,
        genre_id: args.genreType,
        year_from: args.yearFrom,
        year_to: args.yearTo,
        country_code: args.country
    };

    url.search = Object.entries(searchParams)
        .filter((pair) => !!pair[1])
        .map((pair) => pair.join('='))
        .join('&');

    try {
        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${serverRuntimeConfig.apiKey}`
            }
        });
        const { data } = await response.json();

        return data;
    } catch {
        return [];
    }
};

export default handler;
