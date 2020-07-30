'use strict';

const burger = document.querySelector('.navbar__burger');
const burgerMenu = document.querySelector('.navbar-burger');


burger.addEventListener('click', () => {
    burgerMenu.style.backgroundColor = '#0798ec';
    burger.classList.toggle('actived');
    burgerMenu.classList.toggle('actived');
});

burgerMenu.addEventListener('click', () => {
    burger.classList.toggle('actived');
    burgerMenu.classList.toggle('actived');
});