'use strict';

(() => {
  const page = document.querySelector(`.page`);
  const menu = document.querySelector('.header');
  const toggle = document.querySelector('.header__nav-btn');
  const menuNav = document.querySelector('.header__nav');

  const switchScroll = () => {
    page.classList.toggle(`page--no-scroll`);
  };

  const onMenuPressEsc = (evt) => {
    if (evt.key === `Escape`) {
      closeMenu();
    }
  };

  const onMenuItemClick = (evt) => {
    if (evt.target.tagName.toLowerCase() === `a`) {
      closeMenu();
    }
  };

  const openMenu = () => {
    switchScroll();
    menu.classList.remove(`header--closed`);
    menu.classList.add(`header--opened`);
    document.addEventListener(`keydown`, onMenuPressEsc);
    menuNav.addEventListener(`click`, onMenuItemClick);
  };

  const closeMenu = () => {
    switchScroll();
    menu.classList.remove(`header--opened`);
    menu.classList.add(`header--closed`);
    document.removeEventListener(`keydown`, onMenuPressEsc);
    menuNav.removeEventListener(`click`, onMenuItemClick);
  };

  if (menu && toggle) {
    menu.classList.remove('header--nojs');
    menu.classList.add(`header--closed`);

    toggle.addEventListener(`click`, () => {
      if (menu.classList.contains(`header--closed`)) {
        openMenu();
      } else {
        closeMenu();
      }
    });
  }
})();
