import handleExchange from './handleExchange';

const inputsContainer = document.querySelector('#inputs-container');

const createInput = (country, index) => {
  const wrapper = document.createElement('div');
  const currencyInput = document.createElement('input');
  const currencyLabel = document.createElement('label');
  const countryFlag = document.createElement('span');

  currencyInput.value = 0.0;
  currencyInput.type = 'number';
  currencyInput.id = `currency-input-${country.currencyCode}-${index}`;
  currencyInput.className = 'currency-input';
  currencyInput.dataset.currencyCode = country.currencyCode;

  let flagCode;
  if (country.currencyCode === 'EUR') {
    flagCode = 'eu';
  } else if (country.currencyCode === 'USD') {
    flagCode = 'us';
  } else {
    flagCode = country.countryCode?.toLowerCase() || 'xx';
  }

  currencyLabel.setAttribute('for', `currency-input-${country.currencyCode}-${index}`);
  countryFlag.className = `fi fi-${flagCode}`;
  currencyLabel.append(country.currencyCode, countryFlag);

  wrapper.className = 'currency-input-wrapper';
  wrapper.dataset.currencyCode = country.currencyCode;
  wrapper.dataset.currencyName = country.currencyName || 'N/A';
  wrapper.dataset.currencySymbol = country.currencySymbol || '';

  wrapper.append(currencyLabel, currencyInput);

  return wrapper;
};

// eslint-disable-next-line import/prefer-default-export
export const displayInputs = (countries) => {
  const placeholderMessageContainer = document.querySelector('.placeholder-container');

  if (countries.length > 0) {
    placeholderMessageContainer.classList.add('hidden');
  } else {
    placeholderMessageContainer.classList.remove('hidden');
  }

  const form = document.createElement('form');

  form.addEventListener('input', handleExchange);

  for (let i = 0; i < countries.length; i += 1) {
    const element = createInput(countries[i], i);

    form.appendChild(element);
  }

  inputsContainer.replaceChildren(form);
};
