import { exchangeAll } from './exchangeRequests';
import { debounce } from './utils';

const handleExchange = async (event) => {
  const sourceCurrencyInput = event.target;
  const sourceCurrencyCode = sourceCurrencyInput.dataset.currencyCode;
  const amount = sourceCurrencyInput.value;

  const targetCurrencyElements = sourceCurrencyInput.parentNode.siblings();

  if (targetCurrencyElements.length < 1 || Number(amount) <= 0 || !amount) {
    return;
  }

  const targetCurrencyCodes = targetCurrencyElements.map((element) => element.dataset.currencyCode);

  const requestData = targetCurrencyCodes.map((code) => ({
    from: sourceCurrencyCode,
    to: code,
    amount,
  }));

  const exchangeResults = await exchangeAll(requestData);

  targetCurrencyElements.forEach((element, idx) => {
    // access <input/> element
    element.lastChild.value = exchangeResults[idx]; // eslint-disable-line no-param-reassign
  });
};

export default debounce(handleExchange, 600);
