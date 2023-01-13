import { cleanup, render, fireEvent, act, RenderResult } from '@testing-library/react';
import { SettingsProvider, useSettings } from '@components/hooks/useSettings';
import { FC } from 'react';

describe('useSettings', () => {
    let renderResult: RenderResult;
    const TestComponent: FC = () => {
        const { isSettingsStored, setSettingsStored } = useSettings();

        return <button data-testid="button" onClick={() => setSettingsStored(!isSettingsStored)}>{isSettingsStored ? 'stored' : 'not stored'}</button>;
    };

    beforeEach(() => {
        act(() => {
            renderResult = render(
                <SettingsProvider>
                    <TestComponent />
                </SettingsProvider>
            );
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('Test Settings storing: positive case', () => {
        const { getByText, getByTestId } = renderResult;
        const button = getByTestId('button');

        fireEvent.click(button);

        expect(getByText('stored')).toBeInTheDocument();
    });

    it('Test Settings storing: negative case', () => {
        const { getByText, getByTestId } = renderResult;
        const button = getByTestId('button');

        fireEvent.click(button);
        fireEvent.click(button);

        expect(getByText('not stored')).toBeInTheDocument();
    });
});