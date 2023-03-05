import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';
import { convertPLNToUSD } from '../../utils/convertPLNToUSD';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });
  it('should render proper info about conversion when PLN -> USD', () => {
    const testCases = [
      { amount: 100, from: 'PLN', to: 'USD' },
      { amount: 200, from: 'PLN', to: 'USD' },
      { amount: 300, from: 'PLN', to: 'USD' },
      { amount: 400, from: 'PLN', to: 'USD' },
    ];

    for (const testObj of testCases) {
      // render component
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);

      // find output element
      const output = screen.getByTestId('output');

      // check if conversion output is correct
      const inputAmount = formatAmountInCurrency(testObj.amount, testObj.from);
      const outputAmount = convertPLNToUSD(testObj.amount);
      const resultTxt = inputAmount + ' = ' + outputAmount;
      expect(output).toHaveTextContent(resultTxt);
      // unmount component
      cleanup();
    }
  });
  it('should render proper info about conversion when USD -> PLN', () => {
    const testCases = [
      { amount: 100, from: 'USD', to: 'PLN' },
      { amount: 200, from: 'USD', to: 'PLN' },
      { amount: 300, from: 'USD', to: 'PLN' },
      { amount: 400, from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {
      // render component
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);

      // find output element
      const output = screen.getByTestId('output');

      // check if conversion output is correct
      const inputAmount = formatAmountInCurrency(testObj.amount, testObj.from);
      const outputAmount = convertUSDToPLN(testObj.amount);
      const resultTxt = inputAmount + ' = ' + outputAmount;
      expect(output).toHaveTextContent(resultTxt);
      // unmount component
      cleanup();
    }
  });
  it('should render proper info about conversion for one currency', () => {
    const testCases = [
      { amount: 100, currency: 'PLN' },
      { amount: 200, currency: 'PLN' },
      { amount: 300, currency: 'USD' },
      { amount: 400, currency: 'USD' },
    ];

    for (const testObj of testCases) {
      // render component
      render(<ResultBox from={testObj.currency} to={testObj.currency} amount={testObj.amount} />);

      // find output element
      const output = screen.getByTestId('output');

      // check if conversion output is correct
      const amount = formatAmountInCurrency(testObj.amount, testObj.currency);
      const resultTxt = amount + ' = ' + amount;
      expect(output).toHaveTextContent(resultTxt);
      // unmount component
      cleanup();
    }
  });
});
