'use strict';

const burger = document.querySelector('.navbar__burger');
const burgerMenu = document.querySelector('.navbar-burger');
const first = '#ff5f45', second = '#0798ec';

burger.addEventListener('click', () => {
    takeColor();
    burger.classList.toggle('active');
    burgerMenu.classList.toggle('active');
})

function takeColor() {
    let counter = document.body.classList.value,
        num = counter[counter.length - 1];

    switch (num) {
        case '0':
            burgerMenu.style.backgroundColor = first;
            break;
        case '1':
            burgerMenu.style.backgroundColor = second;
            break;
        default:
            console.error('Error');
    }
}

new fullpage('#fullpage', {
	menu: 'menu',
    sectionsColor: [first, second],
    scrollingSpeed: 900,
    navigation: true,
    slidesNavigation: true,
});