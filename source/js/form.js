'use strict';

(() => {
  const loginForm = document.querySelector(`.login__form`);
  const userEmail = loginForm.querySelector(`[name=mail]`);
  const userPass = loginForm.querySelector(`[name=password]`);

  let isStorageSupport = true;
  let storageMail = ``;

  try {
    storageMail = localStorage.getItem(`email`);
  } catch (err) {
    isStorageSupport = false;
  }

  const fillForm = () => {
    if (storageMail) {
      userEmail.value = storageMail;
      userPass.focus();
    } else {
      userEmail.focus();
    }
  };

  if (loginForm) {
    loginForm.addEventListener(`submit`, (evt) => {
      if (!userEmail.value || !userPass.value) {
        evt.preventDefault();
      } else {
        if (isStorageSupport) {
          localStorage.setItem(`email`, userEmail.value);
        }
      }
    });
  }

  window.form = {
    fillForm
  }
})();
