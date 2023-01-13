import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const handler = async () => {
    try {
        const response = await fetch(`${serverRuntimeConfig.apiUrl}/countries`, {
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
