import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import Portfolio from './Portfolio';

describe('Portfolio Component', () => {
    test('renders correctly with given props', () => {
        const { getByText, getByTestId } = render(
            <Portfolio accountBalance={1000} stocksOwned={5} usedBalancePercentage={50} />
        );

        expect(getByText(/account balance/i)).toBeInTheDocument();
        expect(getByTestId('stocks-owned')).toHaveTextContent('5');
    });
});