import { cleanup, render, act, RenderResult } from '@testing-library/react';
import React, { EffectCallback, FC, MutableRefObject } from 'react';
import { graphqlQueries } from '../../../__mocks__/queries';
import { MockedProvider } from '@apollo/client/testing';
import { useMovies } from '@components/hooks/useMovies';

const TIMEOUT = 1000 * 30;
let enqueueSnackbar: jest.Mock;
let setMovieInfo: jest.Mock;
let setLoaderVisibility: jest.Mock;

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((str) => str),
        i18n: {
            changeLanguage: () => new Promise(() => {})
        }
    })
}));

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar
    })
}));

jest.mock('@components/hooks/useSettings', () => ({
    useSettings: () => ({
        isSettingsStored: true
    })
}));

jest.mock('@components/hooks/useMovieInfo', () => ({
    useMovieInfo: () => ({
        setMovieInfo
    })
}));

jest.mock('@components/hooks/useLoader', () => ({
    useLoader: () => ({
        setLoaderVisibility
    })
}));

describe('useMovies', () => {
    let useCallback: jest.Mock;
    let setMovies: jest.Mock;
    let setIndex: jest.Mock;
    let result: RenderResult;
    let cleanupFunc: ReturnType<EffectCallback>;
    let timeoutRef: MutableRefObject<number | undefined>;
    const TestComponent: FC = () => {
        const { index, movies } = useMovies();

        return null;
    };

    beforeEach(() => {
        window.localStorage.clear();
        enqueueSnackbar = jest.fn();
        useCallback = jest.fn();
        setLoaderVisibility = jest.fn(isLoaderVisible => isLoaderVisible);
        setMovieInfo = jest.fn((movieInfo) => undefined);
        setMovies = jest.fn((movies) => []);
        setIndex = jest.fn((index) => 0);
        timeoutRef = { current: 1 };
        jest.spyOn(React, 'useRef').mockReturnValueOnce(timeoutRef);
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
        cleanup();
    });

    it('Should reset movies list and show loader after store status changed', () => {
        jest.spyOn(React, 'useState').mockReturnValueOnce([[{}, {}], setMovies]).mockReturnValueOnce([0, setIndex]);
        jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f());

        act(() => {
            render(
                <MockedProvider mocks={graphqlQueries} addTypename={false}>
                    <TestComponent />
                </MockedProvider>
            );
        });

        expect(setMovies).toHaveBeenCalledTimes(1);
        expect(setMovies).toHaveBeenCalledWith([]);
        expect(setLoaderVisibility).toHaveBeenCalledTimes(2);
        expect(setLoaderVisibility).toHaveBeenNthCalledWith(1, true);
        expect(setLoaderVisibility).toHaveBeenNthCalledWith(2, true);
    });

    it('Should call `clearTimeout` and `setTimeout on mount`', () => {
        jest.spyOn(React, 'useState').mockReturnValueOnce([[{}, {}], setMovies]).mockReturnValueOnce([0, setIndex]);
        jest.spyOn(React, 'useCallback').mockImplementation(() => useCallback);
        jest.spyOn(window, 'clearTimeout');
        jest.spyOn(window, 'setTimeout');

        act(() => {
            render(
                <MockedProvider mocks={graphqlQueries} addTypename={false}>
                    <TestComponent />
                </MockedProvider>
            );
        });

        expect(window.clearTimeout).toHaveBeenCalled();
        expect(window.setTimeout).toHaveBeenCalledWith(useCallback, TIMEOUT);
    });

    it('Should call `clearTimeout` on unmount', () => {
        jest.spyOn(React, 'useState').mockReturnValueOnce([[{}, {}], setMovies]).mockReturnValueOnce([0, setIndex]);
        jest.spyOn(window, 'clearTimeout');
        jest.spyOn(React, 'useEffect').mockImplementation(f => {
            cleanupFunc = f();
        });

        act(() => {
            result = render(
                <MockedProvider mocks={graphqlQueries} addTypename={false}>
                    <TestComponent />
                </MockedProvider>
            );
        });

        const { unmount } = result;

        unmount();
        cleanupFunc!();

        expect(window.clearTimeout).toHaveBeenCalled();
    });

    it('Should set index and movie info if movie is available', () => {
        jest.spyOn(React, 'useState').mockReturnValueOnce([[{}, {}], setMovies]).mockReturnValueOnce([0, setIndex]);

        act(() => {
            render(
                <MockedProvider mocks={graphqlQueries} addTypename={false}>
                    <TestComponent />
                </MockedProvider>
            );
        });

        jest.runAllTimers();

        expect(setIndex).toHaveBeenNthCalledWith(1, 1);
        expect(setMovieInfo).toHaveBeenNthCalledWith(1, {});
    });

    it('Should hide loader', () => {
        jest.spyOn(React, 'useState').mockReturnValueOnce([[{}, {}], setMovies]).mockReturnValueOnce([0, setIndex]);

        act(() => {
            render(
                <MockedProvider mocks={graphqlQueries} addTypename={false}>
                    <TestComponent />
                </MockedProvider>
            );
        });
        
        jest.runAllTimers();
        
        expect(setLoaderVisibility).toHaveBeenCalledTimes(3);
        expect(setLoaderVisibility).toHaveBeenNthCalledWith(1, true);
        expect(setLoaderVisibility).toHaveBeenNthCalledWith(2, true);
        expect(setLoaderVisibility).toHaveBeenNthCalledWith(3, false);
    });
});