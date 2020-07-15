'use strict';

const burger = document.querySelector('.navbar__burger');
const burgerMenu = document.querySelector('.navbar-burger');
const first = '#ff5f45', second = '#0798ec';

burger.addEventListener('click', () => {
    takeColor();
    burger.classList.toggle('actived');
    burgerMenu.classList.toggle('actived');
});
burgerMenu.addEventListener('click', () => {
    burger.classList.toggle('actived');
    burgerMenu.classList.toggle('actived');
})

function takeColor() {
    let counter = document.body.classList.value,
        num = counter[counter.length - 1];
    switch (num) {
        case 'n':
            burgerMenu.style.backgroundColor = first;
            break;
        case 'd':
            burgerMenu.style.backgroundColor = second;
            break;
        default:
            console.error('Error');
    }
}

new fullpage('#fullpage', {
    menu: 'menu',
    anchors: ['Main', 'Food'],
    sectionsColor: [first, second],
    scrollingSpeed: 900,
    navigation: true,
    slidesNavigation: true,
});