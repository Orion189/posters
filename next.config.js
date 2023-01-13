/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    serverRuntimeConfig: {
        apiUrl: process.env.API_URL,
        apiKey: process.env.API_KEY,
        defaultDataUrl: process.env.DEFAULT_DATA_URL
    },
    publicRuntimeConfig: {
        host: process.env.NEXT_PUBLIC_HOST,
        lsItemName: process.env.LS_ITEM_NAME
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.movieposterdb.com'
            }
        ]
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
        });

        return config;
    }
};

module.exports = nextConfig;
