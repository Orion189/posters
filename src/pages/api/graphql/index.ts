import { readFileSync } from 'fs';
import { ApolloServer } from '@apollo/server';
import type { NextApiRequest } from 'next';
import type { GraphQLServerContext } from 'src/types';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import countries from './countries';
import genres from './genres';
import random from './random';
import search from './search';
import typeDefs from 'src/graphql/schema.graphql';

const resolvers = {
    MovieType: {
        BOTH: 0,
        MOVIE: 1,
        SERIES: 2
    },
    PosterType: {
        UNSET: 0,
        POSTER: 1,
        COVER: 2,
        TEXTLESS: 3,
        LOGO: 4,
        PROMO: 5,
        CUSTOM: 6,
        ADVANCE: 7,
        TEASER: 8,
        THEATRICAL: 9,
        RE_RELEASE: 10,
        COMBO: 11,
        VIDEO_RELEASE: 12,
        CONCEPT: 13,
        NEVER_PRINTED: 14
    },
    Query: {
        countries,
        genres,
        random,
        search
    }
};
const server = new ApolloServer<GraphQLServerContext>({
    resolvers,
    typeDefs
});

export default startServerAndCreateNextHandler(server, {
    context: async (req: NextApiRequest) => ({
        req
    })
});
