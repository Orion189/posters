import getConfig from 'next/config';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const { publicRuntimeConfig } = getConfig();

const client = new ApolloClient({
    uri: `${publicRuntimeConfig.host}/api/graphql`,
    cache: new InMemoryCache()
});

export default client;
