'use strict';

const burger = document.querySelector('.navbar__burger');
const burgerMenu = document.querySelector('.navbar-burger');
const first = '#ff5f45', second = '#0798ec', third = '#fc6c7c', fouth = '#fec401';

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
        case 'c':
            burgerMenu.style.backgroundColor = third;
            break;
        default:
            console.error('Error');
    }
}

new fullpage('#fullpage', {
    menu: 'menu',
    anchors: ['Main', 'Food', 'Calc'],
    sectionsColor: [first, second, third, fouth],
    recordHistory: false,
    scrollingSpeed: 900,
    verticalCentered: false,
    navigation: true,
    slidesNavigation: true,
});