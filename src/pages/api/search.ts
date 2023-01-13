import getConfig from 'next/config';
import type { Movie } from 'src/types';
import type { NextApiRequest, NextApiResponse } from 'next';

const { serverRuntimeConfig } = getConfig();

const handler = async (req: NextApiRequest, res: NextApiResponse<Movie[]>) => {
    const url = new URL(`${serverRuntimeConfig.apiUrl}/search/movies`);
    const searchParams = {
        type: req.query.movieType,
        genre_id: req.query.genreType,
        year_from: req.query.yearFrom,
        year_to: req.query.yearTo,
        country_code: req.query.country
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

        res.status(200).json(data);
    } catch {
        res.status(200).json([]);
    }
};

export default handler;
