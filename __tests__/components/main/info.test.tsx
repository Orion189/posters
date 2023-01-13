import { cleanup, render, screen } from '@testing-library/react';
import Info from '@components/main/Info';

const movieInfo = {
    original_title: 'Test movie title',
    year: 1999,
    country: 'US',
    director: 'John Doe',
    genre: 'Drama',
    runtime: 180,
    summary: 'Test movie summary'
};

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((str) => str),
        i18n: {
            changeLanguage: () => new Promise(() => {})
        }
    })
}));

jest.mock('@components/hooks/useMovieInfo', () => ({
    useMovieInfo: () => ({
        movieInfo
    })
}));

describe('Info', () => {
    afterEach(cleanup);

    it('renders <Info /> title', () => {
        const panelTitleKey = 'components.main.Info.title';

        render(<Info />);

        const heading = screen.getByRole('heading', {
            name: panelTitleKey
        });

        expect(heading).toBeInTheDocument();
    });
    it('renders <Info /> props', () => {
        render(<Info />);

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

    it('renders <Info /> unchanged', () => {
        const { container } = render(<Info />)

        expect(container).toMatchSnapshot()
    });
});
