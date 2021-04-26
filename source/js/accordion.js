'use strict';

(() => {
  document.addEventListener(`DOMContentLoaded`, () => {
    const faqList = document.querySelector(`.faq__list`);
    const faqItems = document.querySelectorAll(`.faq__item--nojs`);

    const filterSection = document.querySelector(`.filters`);
    const filtersForm = document.querySelector(`.filters__form`);
    const filters = document.querySelectorAll(`.dropdown--nojs`);

    const onFilterClick = (evt) => {
      const target = evt.target;
      if (target.closest(`.dropdown__btn`)) {
        target.closest(`.dropdown`).classList.toggle(`dropdown--opened`);
      }
    };

    const onFaqItemClick = (evt) => {
      const item = evt.target.closest(`.faq__item`);
      item.classList.toggle(`faq__item--opened`);
    };

    if (filterSection) {
      filterSection.classList.remove(`filters--nojs`);
    }

    if (filtersForm) {
      filters.forEach((item) => {
        item.classList.remove(`dropdown--nojs`);
      });

      filtersForm.addEventListener(`click`, onFilterClick);
    }

    if (faqList) {
      faqItems.forEach((item) => {
        item.classList.remove(`faq__item--nojs`);
      });

      faqList.addEventListener(`click`, onFaqItemClick);
    }
  });
})();
