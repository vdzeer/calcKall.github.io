'use strict';

const burger = document.querySelector('.navbar__burger');
const burgerMenu = document.querySelector('.navbar-burger');
const calcItems = document.querySelector('.calc-body-items');
const calcList = document.querySelector('.calc-ul');
const input = document.querySelector('.calc-input');
const first = '#ff5f45', second = '#0798ec', third = '#fc6c7c', fouth = '#fec401';
const mass = [];
let searchText = '';

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

function init() {
    getData('./db/fruits.json').then(function(data) {
        data.forEach(createCard);
    });
    getItems();
}

burger.addEventListener('click', () => {
    takeColor();
    burger.classList.toggle('actived');
    burgerMenu.classList.toggle('actived');
});

burgerMenu.addEventListener('click', () => {
    burger.classList.toggle('actived');
    burgerMenu.classList.toggle('actived');
})

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

init();