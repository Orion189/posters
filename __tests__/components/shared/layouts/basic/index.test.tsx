import { cleanup, render, act, RenderResult } from '@testing-library/react';
import { LoaderProvider } from '@components/hooks/useLoader';
import BasicLayout from '@components/shared/layouts/basic';

let useNetworkStatus: jest.Mock;
let useSideMenuButtons: jest.Mock;

jest.mock('@components/hooks/useNetworkStatus', () => ({
    useNetworkStatus: () => useNetworkStatus()
}));
jest.mock('@components/hooks/useSideMenuButtons', () => ({
    useSideMenuButtons: () => useSideMenuButtons()
}));

describe('BasicLayout', () => {
    let result: RenderResult;

    beforeEach(() => {
        useNetworkStatus = jest.fn();
        useSideMenuButtons = jest.fn();

        act(() => {
            result = render(
                <LoaderProvider>
                    <BasicLayout>
                        <div data-testid="test-element"></div>
                    </BasicLayout>
                </LoaderProvider>
            );
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        cleanup();
    });

    it('Should render children components', () => {
        const { getByTestId } = result;
        const testElement = getByTestId('test-element');

        expect(testElement).toBeInTheDocument();
    });
    
    it('Should call `useNetworkStatus` and `useSideMenuButtons` hooks', () => {
        expect(useNetworkStatus).toHaveBeenCalledTimes(1);
        expect(useSideMenuButtons).toHaveBeenCalledTimes(1);
    });

    it('Should render <BasicLayout /> unchanged', () => {
        const { container } = result;

        expect(container).toMatchSnapshot()
    });
});
