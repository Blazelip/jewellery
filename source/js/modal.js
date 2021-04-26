'use strict';

(() => {
  const overlay = document.querySelector(`.overlay`);

  const openModalButtons = document.querySelectorAll(`[data-modal-target]`);
  const closeModalButtons = document.querySelectorAll(`[data-modal-close]`);

  const onModalPressEsc = (evt, modal) => {
    if (evt.key === `Escape`) {
      closeModal(modal);
    }
  };


  const openModal = (modal) => {
    if (modal) {
      modal.classList.add(`modal--opened`);
      overlay.classList.add(`overlay--active`);
      document.addEventListener(`keydown`, (evt) => {
        onModalPressEsc(evt, modal);
      });
      overlay.addEventListener(`click`, () => {
        closeModal(modal);
      });

      if (modal.classList.contains(`modal--login`)) {
        window.form.fillForm();
      }
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove(`modal--opened`);
      overlay.classList.remove(`overlay--active`);
      document.removeEventListener(`keydown`, (evt) => {
        onModalPressEsc(evt, modal);
      });
      overlay.removeEventListener(`click`, () => {
        closeModal(modal);
      });
    }
  };

  openModalButtons.forEach((btn) => {
    btn.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const modal = document.querySelector(`.modal--${btn.dataset.modalTarget}`);
      openModal(modal);
    });
  });

  closeModalButtons.forEach((btn) => {
    btn.addEventListener(`click`, () => {
      const modal = btn.closest(`.modal`);
      closeModal(modal);
    });
  });
})();
