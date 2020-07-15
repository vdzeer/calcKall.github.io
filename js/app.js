new fullpage('#fullpage', {
	menu: 'menu',
    // anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
    sectionsColor: ['#ff5f45', '#0798ec'],
    scrollingSpeed: 900,
    navigation: true,
    slidesNavigation: true,
    navigationTooltips: ['Главная', 'Питание']
});

const burger = document.querySelector('.navbar__burger');
const burgerMenu = document.querySelector('.navbar-burger');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    burgerMenu.classList.toggle('active');
})

window.addEventListener('scroll', function() {
    if (burgerMenu.classList.contains('active')) {
        burger.classList.remove('active');
        burgerMenu.classList.remove('active');
    }
});