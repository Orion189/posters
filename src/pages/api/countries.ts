import getConfig from 'next/config';
import type { Country } from 'src/types';
import type { NextApiRequest, NextApiResponse } from 'next';

const { serverRuntimeConfig } = getConfig();

const handler = async (req: NextApiRequest, res: NextApiResponse<Country[]>) => {
    try {
        const response = await fetch(`${serverRuntimeConfig.apiUrl}/countries`, {
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
