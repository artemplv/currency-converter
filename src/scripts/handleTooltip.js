/* eslint-disable no-param-reassign */
const handleTooltip = {
  hide(tooltip) {
    tooltip.style.visibility = 'hidden';
  },
  show(tooltip, country) {
    const {
      name,
      countryCode,
      currencyCode,
      currencyName = '',
      currencySymbol = '',
    } = country;

    const title = document.createElement('p');
    const countryFlag = document.createElement('span');
    const currencyCodeElement = document.createElement('p');
    const currencyNameElement = document.createElement('p');

    const flagCode = countryCode?.toLowerCase() || 'xx';

    countryFlag.className = `fi fi-${flagCode}`;
    title.className = 'tooltip-title';
    title.append(countryFlag, name);

    currencyCodeElement.innerText = `Currency code: ${currencyCode}`;
    currencyCodeElement.className = 'tooltip-info';
    currencyNameElement.innerText = `${currencyName} ${currencySymbol}`;
    currencyNameElement.className = 'tooltip-info';

    tooltip.replaceChildren(title, currencyCodeElement, currencyNameElement);
    tooltip.style.visibility = 'visible';
  },
};

export default handleTooltip;
