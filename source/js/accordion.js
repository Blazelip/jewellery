'use strict';

(() => {
  document.addEventListener(`DOMContentLoaded`, () => {

    const dropdowns = document.querySelectorAll(`.dropdown`);
    const dropdownBtns = document.querySelectorAll(`.dropdown__btn`);

    const onDropdownBtnClick = (btn) => {
      if (btn) {
        btn.closest(`.dropdown`).classList.toggle(`dropdown--opened`);
      }
    };

    if (dropdowns) {
      dropdowns.forEach((item) => {
        item.classList.remove(`dropdown--nojs`);
      });

      dropdownBtns.forEach((btn) => {
        btn.addEventListener(`click`, () => {
          onDropdownBtnClick(btn);
        });
      });
    }
  });
})();
