'use strict';

const burger = document.querySelector('.navbar__burger');
const burgerMenu = document.querySelector('.navbar-burger');
const calcItems = document.querySelector('.calc-body-items');
const calcList = document.querySelector('.calc-ul');
const input = document.querySelector('.calc-input');
const calcBtn = document.querySelector('.calc-basket');
const modal = document.querySelector('.modal');
const modalList = document.querySelector('.modal-list');
const modalOut = document.querySelector('.modal-out');

const first = '#ff5f45', second = '#0798ec', third = '#fc6c7c', fouth = '#fec401';
const mass = [];
let arrItems = [];
let searchText = '';
let itemPl;


const getData = async function(url) {
    const response = await window.fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибка ${response.status}!`);
    }
    return await response.json();
};

async function getItems() {
    await getData('./db/fruits.json').then(function(data) {
        mass.push(...data)
    });
    await getData('./db/raznoe.json').then(function(data) {
        mass.push(...data)
    });
    await getData('./db/kasha.json').then(function(data) {
        mass.push(...data)
    });
    await getData('./db/milk.json').then(function(data) {
        mass.push(...data)
    });
    await getData('./db/fish.json').then(function(data) {
        mass.push(...data)
    });
    await getData('./db/xleb.json').then(function(data) {
        mass.push(...data)
    });
    await getData('./db/sha.json').then(function(data) {
        mass.push(...data)
    });
    await getData('./db/ovoshi.json').then(function(data) {
        mass.push(...data)
    });
    await getData('./db/drink.json').then(function(data) {
        mass.push(...data)
    });
    await getData('./db/suhof.json').then(function(data) {
        mass.push(...data)
    });

    await seacrhFunc(mass);
}

function seacrhFunc(arr) {
    input.onkeypress = function (event) {
        searchText += event.key;
        input.onkeydown = (event) => {
            if (event.key === 'Backspace') searchText = searchText.slice(0, -1);
            if (searchText === '') {
            calcItems.innerHTML = '';
                getData('./db/fruits.json').then(function(data) {
                    data.forEach(createCard);
                });
            } else {
                findEq(searchText);
            }
        }
        if (searchText === '') {
            calcItems.innerHTML = '';
            getData('./db/fruits.json').then(function(data) {
                data.forEach(createCard);
            });
        } else {
            findEq(searchText);
        }
    }
    
    function findEq(str) {
        calcItems.innerHTML = '';
        let len = str.length;
        for (const key of arr) {
            let word = key.name.slice(0, len);
            if (str !== '' && (str === word || str === word.toLowerCase() || str === word.toUpperCase())) {
                createCard(key);
            }
        }
    }
}

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
        call,
        id
    } = item;

    const card = `
    <div class="calc-body-item">
        <img src="${image}" alt="image" class="calc-body-item__image"/>
        <span class="calc-body-item__text">${name}</span>
        <div class="calc-body-item__add" data-id="${id}">+</div>
    </div>
    `;
    calcItems.insertAdjacentHTML('beforeend', card);
}

async function a(name) {
    await getData(`./db/${name}.json`).then(function(data) {
        data.forEach(createCard);
    });
    itemPl = document.querySelectorAll('.calc-body-item__add');
    for (const key of itemPl) {
        key.addEventListener('click', (e) => {
            addToCart(event.target);
        })
    }
}

async function init() {
    await getData('./db/fruits.json').then(function(data) {
        data.forEach(createCard);
    });
    await getItems();
    itemPl = document.querySelectorAll('.calc-body-item__add');
    for (const key of itemPl) {
        key.addEventListener('click', (e) => {
            addToCart(event.target);
        })
    }
}

function addToCart(target) {
    let cheker = true;
    arrItems.map(item => {
        if (target.dataset.id === item) cheker = false;
    })
    if (cheker) arrItems.push(target.dataset.id);
}

function renderItems(arr) {
    modalList.innerHTML = '';
    let massiv = [];
    for (const key of arr) {
        for (const k of mass) {
            if (k.id === key) massiv.push(k);
        }
    }
    for (const key of massiv) {
        const card = `
            <div class="modal-item">
                <div class="modal-item-text">
                    <img src="${key.image}" alt="image">
                    <span data-id="${key.id}">${key.name}</span>
                </div>
                <div class="modal-item-input">
                    <span>Вес:</span>
                    <input type="number" placeholder="100" min="0" id="modal-item__input">
                    <span>гр.</span>
                    <span class="modal-item-delete">&#10006;</span>
                </div>
            </div>
        `;
        modalList.insertAdjacentHTML('beforeend', card);
    }
    const modalDel = document.querySelectorAll('.modal-item-delete');
    for (const key of modalDel) {
        key.addEventListener('click', e => {
            let name = e.target.parentElement.parentElement.firstChild.nextSibling.lastChild.previousSibling.dataset.id;
            arr = arr.filter(item => {
                if (item !== name) return true
            });
            arrItems = arrItems.filter(item => {
                if (item !== name) return true
            })
            renderItems(arr);
        })
    }
}

burger.addEventListener('click', () => {
    takeColor();
    burger.classList.toggle('actived');
    burgerMenu.classList.toggle('actived');
});

burgerMenu.addEventListener('click', () => {
    burger.classList.toggle('actived');
    burgerMenu.classList.toggle('actived');
});

calcBtn.addEventListener('click', () => {
    modal.classList.remove('hided');
    renderItems(arrItems);
});

modalOut.addEventListener('click', () => {
    modal.classList.add('hided');
});

calcList.addEventListener('click', (event) => {
    let target = event.target.textContent;
    calcItems.innerHTML = '';
    if (event.target.value === undefined) {
        a('fruits');
    } else {
        switch (target) {
            case 'Крупы и каши':
                a('kasha');
                break;
            case 'Молочные продукты':
                a('milk');
                break;
            case 'Морепродукты':
                a('fish');
                break;
            case 'Мучные изделия':
                a('xleb');
                break;
            case 'Мясные продукты':
                a('sha');
                break;
            case 'Напитки':
                a('drink');
                break;
            case 'Овощи и зелень':
                a('ovoshi');
                break;
            case 'Орехи и сухофрукты':
                a('suhof');
                break;
            case 'Фрукты и ягоды':
                a('fruits');
                break;
            case 'Разное':
                a('raznoe');
                break;
        }
    }
});

new fullpage('#fullpage', {
    menu: 'menu',
    anchors: ['Main', 'Food', 'Calc'],
    sectionsColor: [first, second, third, fouth],
    recordHistory: false,
    scrollingSpeed: 900,
    verticalCentered: false,
    navigation: true,
    slidesNavigation: true,
    normalScrollElements: '#calcMenu, #calcItems, #modalList'
});

init();