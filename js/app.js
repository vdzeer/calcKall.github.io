const burger = document.querySelector('.navbar__burger');
const burgerMenu = document.querySelector('.navbar-burger');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    burgerMenu.classList.toggle('active');
})