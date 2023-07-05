const instructionsModal = document.querySelector('.instructions-modal');
const instructionsOpenButton = document.querySelector('#instructions-open');
const instructionsCloseButton = document.querySelector('#instructions-close');

instructionsOpenButton.addEventListener('click', () => {
  instructionsModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

instructionsCloseButton.addEventListener('click', () => {
  instructionsModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
});
