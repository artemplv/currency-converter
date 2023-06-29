import Example from './scripts/example';

document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  // eslint-disable-next-line no-new
  new Example(main);
});
