'use strict';

(() => {
  document.addEventListener(`DOMContentLoaded`, () => {
    const faqList = document.querySelector(`.faq__list`);
    const faqItems = document.querySelectorAll(`.faq__item--nojs`);

    const onFaqItemClick = (evt) => {
      const item = evt.target.closest(`.faq__item`);
      item.classList.toggle(`faq__item--opened`);
    };

    faqItems.forEach((item) => {
      item.classList.remove(`faq__item--nojs`);
    });

    faqList.addEventListener(`click`, onFaqItemClick);
  });
})();
