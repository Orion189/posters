import { cleanup, render, fireEvent, act, RenderResult } from '@testing-library/react';
import { MovieInfoProvider, useMovieInfo } from '@components/hooks/useMovieInfo';
import { MovieInfo } from 'src/types';
import { FC } from 'react';

describe('useMovieInfo', () => {
    let renderResult: RenderResult;
    const movieInfoTestData: MovieInfo = {
        year: 1940,
        original_title: 'Test Movie',
        country: 'United States',
        director: 'Movie Director',
        genre: 'Drama',
        runtime: 180,
        summary: 'Test suumary'
    }
    const TestComponent: FC = () => {
        const { movieInfo, setMovieInfo } = useMovieInfo();

        return (
            <>
                <div data-testid="year">{movieInfo?.year}</div>
                <div data-testid="original_title">{movieInfo?.original_title}</div>
                <div data-testid="country">{movieInfo?.country}</div>
                <div data-testid="director">{movieInfo?.director}</div>
                <div data-testid="genre">{movieInfo?.genre}</div>
                <div data-testid="runtime">{movieInfo?.runtime}</div>
                <div data-testid="summary">{movieInfo?.summary}</div>
                <button data-testid="button" onClick={() => setMovieInfo(movieInfo ? undefined : movieInfoTestData)}>Change movie info</button>
            </>
        );
    };

    beforeEach(() => {
        act(() => {
            renderResult = render(
                <MovieInfoProvider>
                    <TestComponent />
                </MovieInfoProvider>
            );
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('Test MovieInfo visibility: positive case', () => {
        const { getByTestId } = renderResult;
        const button = getByTestId('button');

        fireEvent.click(button);

        expect(getByTestId('year')).toHaveTextContent(movieInfoTestData.year.toString());
        expect(getByTestId('original_title')).toHaveTextContent(movieInfoTestData.original_title);
        expect(getByTestId('country')).toHaveTextContent(movieInfoTestData.country);
        expect(getByTestId('director')).toHaveTextContent(movieInfoTestData.director);
        expect(getByTestId('genre')).toHaveTextContent(movieInfoTestData.genre);
        expect(getByTestId('runtime')).toHaveTextContent(movieInfoTestData.runtime.toString());
        expect(getByTestId('summary')).toHaveTextContent(movieInfoTestData.summary);
    });

    it('Test MovieInfo visibility: negative case', () => {
        const { getByTestId } = renderResult;
        const button = getByTestId('button');

        fireEvent.click(button);
        fireEvent.click(button);

        expect(getByTestId('year')).not.toHaveTextContent(movieInfoTestData.year.toString());
        expect(getByTestId('original_title')).not.toHaveTextContent(movieInfoTestData.original_title);
        expect(getByTestId('country')).not.toHaveTextContent(movieInfoTestData.country);
        expect(getByTestId('director')).not.toHaveTextContent(movieInfoTestData.director);
        expect(getByTestId('genre')).not.toHaveTextContent(movieInfoTestData.genre);
        expect(getByTestId('runtime')).not.toHaveTextContent(movieInfoTestData.runtime.toString());
        expect(getByTestId('summary')).not.toHaveTextContent(movieInfoTestData.summary);
    });
});