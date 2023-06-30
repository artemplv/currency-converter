/* eslint-disable no-param-reassign */
const handleTooltip = {
  hide(tooltip) {
    tooltip.style.visibility = 'hidden';
  },
  show(tooltip, text) {
    tooltip.style.visibility = 'visible';
    tooltip.innerText = text;
  },
};

export default handleTooltip;
