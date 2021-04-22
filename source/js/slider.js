'use strict';

(() => {
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 2,
        pagination: {
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            return current + ' of ' + total;
          },
        },
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 2,
        pagination: {
          type: 'bullets',
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
      },
      // when window width is >= 1366px
      1366: {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 4,
      },
    },
  });
})();
