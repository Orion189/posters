import { cleanup, render, fireEvent, act, RenderResult } from '@testing-library/react';
import { LoaderProvider, useLoader } from '@components/hooks/useLoader';
import { FC } from 'react';

describe('useLoader', () => {
    let renderResult: RenderResult;
    const TestComponent: FC = () => {
        const { isLoaderVisible, setLoaderVisibility } = useLoader();

        return <button data-testid="button" onClick={() => setLoaderVisibility(!isLoaderVisible)}>{isLoaderVisible ? 'visible' : 'invisible'}</button>;
    };

    beforeEach(() => {
        act(() => {
            renderResult = render(
                <LoaderProvider>
                    <TestComponent />
                </LoaderProvider>
            );
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('Test Loader visibility: positive case', () => {
        const { getByText, getByTestId } = renderResult;
        const button = getByTestId('button');

        fireEvent.click(button);

        expect(getByText('visible')).toBeInTheDocument();
    });

    it('Test Loader visibility: negative case', () => {
        const { getByText, getByTestId } = renderResult;
        const button = getByTestId('button');

        fireEvent.click(button);
        fireEvent.click(button);

        expect(getByText('invisible')).toBeInTheDocument();
    });
});