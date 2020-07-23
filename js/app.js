'use strict';

const burger = document.querySelector('.navbar__burger');
const burgerMenu = document.querySelector('.navbar-burger');
const calcItems = document.querySelector('.calc-body-items');
const calcList = document.querySelector('.calc-ul');
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

const getData = async function(url) {
    const response = await window.fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибка ${response.status}!`);
    }
    return await response.json();
};

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

function createCard(item) {
    const {
        name,
        image,
        call
    } = item;

    const card = `
    <div class="calc-body-item">
        <img src="${image}" alt="image" class="calc-body-item__image"/>
        <span class="calc-body-item__text">${name}</span>
        <div class="calc-body-item__add">+</div>
    </div>
    `;
    calcItems.insertAdjacentHTML('beforeend', card);
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
    normalScrollElements: '#calcMenu, #calcItems'
});

calcList.addEventListener('click', (event) => {
    let target = event.target.textContent;
    calcItems.innerHTML = '';
    if (event.target.value === undefined) {
        getData('./db/fruits.json').then(function(data) {
            data.forEach(createCard);
        });
    } else {
        switch (target) {
            case 'Крупы и каши':
                getData('./db/kasha.json').then(function(data) {
                    data.forEach(createCard);
                });
                break;
            case 'Молочные продукты':
                getData('./db/milk.json').then(function(data) {
                    data.forEach(createCard);
                });
                break;
            case 'Морепродукты':
                getData('./db/fish.json').then(function(data) {
                    data.forEach(createCard);
                });
                break;
            case 'Мучные изделия':
                getData('./db/xleb.json').then(function(data) {
                    data.forEach(createCard);
                });
                break;
            case 'Мясные продукты':
                getData('./db/sha.json').then(function(data) {
                    data.forEach(createCard);
                });
                break;
            case 'Напитки':
                getData('./db/drink.json').then(function(data) {
                    data.forEach(createCard);
                });
                break;
            case 'Овощи и зелень':
                getData('./db/ovoshi.json').then(function(data) {
                    data.forEach(createCard);
                });
                break;
            case 'Орехи и сухофрукты':
                getData('./db/suhof.json').then(function(data) {
                    data.forEach(createCard);
                });
                break;
            case 'Фрукты и ягоды':
                getData('./db/fruits.json').then(function(data) {
                    data.forEach(createCard);
                });
                break;
            case 'Разное':
                getData('./db/raznoe.json').then(function(data) {
                    data.forEach(createCard);
                });
                break;
        }
    }
});

function init() {
    getData('./db/suhof.json').then(function(data) {
        data.forEach(createCard);
    });
}

init();

