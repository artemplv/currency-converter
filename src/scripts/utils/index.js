/* eslint-disable import/prefer-default-export */
function debounce(callback, ms = 100) {
  let lastCall = 0;

  const delayedCallback = (...args) => {
    const timeSinceLastCall = Date.now() - lastCall;
    if (timeSinceLastCall >= ms) callback(...args);
  };

  return (...args) => {
    lastCall = Date.now();
    window.setTimeout(() => delayedCallback(...args), ms);
  };
}

export {
  debounce,
};
