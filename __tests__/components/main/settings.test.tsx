import { cleanup, render, fireEvent, act, waitFor } from '@testing-library/react';
import { Genre, Country } from 'src/types';
import Settings from '@components/main/Settings';

const genresData: [Genre] = [{
    id: 1,
    name: 'Drama'
}];
const countriesData: [Country] = [{
    country_code: 'US',
    country: 'United States'
}];
const values = {
    movieType: '0',
    genreType: '1',
    yearFrom: '1940',
    yearTo: '2000',
    country: 'US'
};
let setSettingsStored: jest.Mock;

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((str) => str),
        i18n: {
            changeLanguage: () => new Promise(() => {})
        }
    })
}));

jest.mock('@components/hooks/useSettings', () => ({
    useSettings: () => ({ setSettingsStored })
}));

describe('Settings', () => {
    beforeEach(() => {
        window.localStorage.clear();
        setSettingsStored = jest.fn();
        jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    });

    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
    });

    it('Saving preferences', async () => {
        act(() => {
            render(<Settings genresData={genresData} countriesData={countriesData} />);
        })

        const movieType = document.querySelector('[name="movieType"]');
        const genreType = document.querySelector('[name="genreType"]');
        const yearFrom = document.querySelector('[name="yearFrom"]');
        const yearTo = document.querySelector('[name="yearTo"]');
        const country = document.querySelector('[name="country"]');
        const submit = document.querySelector('[type="submit"]');

        act(() => {
            fireEvent.change(movieType!, { target: { value: values.movieType } });
            fireEvent.change(genreType!, { target: { value: values.genreType } });
            fireEvent.change(yearFrom!, { target: { value: values.yearFrom } });
            fireEvent.change(yearTo!, { target: { value: values.yearTo } });
            fireEvent.change(country!, { target: { value: values.country } });

            fireEvent.click(submit!);
        });
        
        await waitFor(() => {
            expect(setSettingsStored).toHaveBeenCalledWith(true);
            expect(window.localStorage.setItem).toHaveBeenCalledWith('settings', JSON.stringify(values));
        });     
    });
/*
    it('renders <Settings /> props', () => {
        render(<Settings />);

        const original_title = screen.getByText(movieInfo.original_title);
        const year = screen.getByText(movieInfo.year);
        const country = screen.getByText(movieInfo.country);
        const director = screen.getByText(movieInfo.director);
        const genre = screen.getByText(movieInfo.genre);
        const runtime = screen.getByText(movieInfo.runtime);
        const summary = screen.getByText(movieInfo.summary);

        expect(original_title).toBeInTheDocument();
        expect(year).toBeInTheDocument();
        expect(country).toBeInTheDocument();
        expect(director).toBeInTheDocument();
        expect(genre).toBeInTheDocument();
        expect(runtime).toBeInTheDocument();
        expect(summary).toBeInTheDocument();
    });
*/
    it('Renders <Settings /> unchanged', () => {
        const { container } = render(<Settings genresData={genresData} countriesData={countriesData} />);

        expect(container).toMatchSnapshot()
    });
});
