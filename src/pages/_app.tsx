import { FC } from 'react';
import client from 'src/graphql';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { ApolloProvider } from '@apollo/client';
import ErrorBoundary from '@components/shared/ErrorBoundary';
import BasicLayout from '@components/shared/layouts/basic';
import { LoaderProvider } from '@components/hooks/useLoader';
import { SettingsProvider } from '@components/hooks/useSettings';
import { MovieInfoProvider } from '@components/hooks/useMovieInfo';

import '@styles/globals.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'src/locales';

const App: FC<AppProps> = ({ Component, pageProps }) => (
    <ErrorBoundary>
        <SnackbarProvider
            dense={true}
            hideIconVariant={true}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <ApolloProvider client={client}>
                <LoaderProvider>
                    <MovieInfoProvider>
                        <SettingsProvider>
                            <BasicLayout {...pageProps}>
                                <Component {...pageProps} />
                            </BasicLayout>
                        </SettingsProvider>
                    </MovieInfoProvider>
                </LoaderProvider>
            </ApolloProvider>
        </SnackbarProvider>
    </ErrorBoundary>
);

export default App;
