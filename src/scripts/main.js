// МОБИЛЬНОЕ МЕНЮ
function mobileMenu() {

    const navTrigger = document.querySelector('.nav-trigger');
    const navMobile = document.querySelector('.nav-mobile');
    const navMobileItems = document.querySelectorAll('.nav-mobile__item');

    navTrigger.addEventListener('click', toggleClass);
     
    for (const iterator of navMobileItems) {
        iterator.addEventListener('click', toggleClass)
    }

    function toggleClass(e) {
        e.preventDefault();

        navMobile.classList.toggle('is-active');
        navTrigger.classList.toggle('is-active');
    }
}

mobileMenu();

// АККОРДЕОН МЕНЮ
function accordeonMenu() {
    const menuItems = document.querySelectorAll('.menu__item');
    const menuAccord = document.querySelector('.menu__acco');

    menuAccord.addEventListener('click', event => {
        event.preventDefault();
        let target = event.target.parentNode;
        let content = target.nextElementSibling;
        let item = target.parentNode;

        const tarWidth = target.clientWidth;
        const windowWidth = document.documentElement.clientWidth;
        const layoutContentWidth = 520;
        const breackpointPhone = 480;
        const closeMenuWidth = tarWidth * menuItems.lenght;
        const openMenuWidth = closeMenuWidth + layoutContentWidth;

        if (event.target.classList.contains('menu__title')) {
          moveMenu();
        }

        target = event.target;
        content = target.nextElementSibling;
        item = target.parentNode;

        if (target.classList.contains('menu__link')) {
            moveMenu();
        }

        function moveMenu() {
            for (const iterator of menuItems) {
                if (iterator != item) {
                    iterator.classList.remove('menu__item--active');
                    iterator.lastElementChild.style.width = 0;
                    menuAccord.style.transform = `translateX(0)`;
                }
            }

            if (item.classList.contains('menu__item--active')) {
                item.classList.remove('menu__item--active');
                content.style.width = 0;
            } else {
                item.classList.add('menu__item--active');
                    
                if (windowWidth > breackpointPhone && windowWidth < openMenuWidth) {
                    content.style.width = windowWidth - closeMenuWidth + 'px';
                } else if (windowWidth <= breackpointPhone) {
                    let num;
                    for (let i = 0; i < menuItems.length; i++) {
                        if (menuItems[i] === item) {
                            num = menuItems.length - (i + 1);
                        }
                        menuAccord.style.transform = `translateX(${tarWidth * num}px)`;
                        content.style.width = windowWidth - tarWidth + 'px';
                    }
                } else {
                    content.style.width = layoutContentWidth + 'px';
                }
            }
        }
    });
}

accordeonMenu();

// АККОРДЕОН КОМАНДА
function accordeonTeam() {
    const teamItems = document.querySelectorAll('.team__acco-item');
    const teamAccord = document.querySelector('.team__acco');

    teamAccord.addEventListener('click', function(event) {
        event.preventDefault();

        const target = event.target;

        if (target.classList.contains('team__acco-trigger')) {
            const item = target.parentNode;

            for (const iterator of teamItems) {
                if (iterator !== item) {
                    iterator.classList.remove('is-active');
                }
            }

            if (item.classList.contains('is-active')) {
                item.classList.remove('is-active');
            } else {
                item.classList.add('is-active');
            }
        }

    });
}
accordeonTeam();


// СЛАЙДЕР В СЕКЦИИ БУРГЕРЫ
function sliderBurger() {
    const next = document.querySelector('.scroll-btn--next');
    const prev = document.querySelector('.scroll-btn--prev');
    const list = document.querySelector('.slider__list');
    const items = list.querySelectorAll('.slider__item');

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);

    let num = 2;

    function moveNext() {
        num++;
        if (num > items.length) {
            num = 1;
        }
        setOrder()
        list.classList.remove('is-reverse')
        moveItem();
    }
    function movePrev() {
        num--;
        if (num === 0) {
            num = items.length;
        }
        setOrder()
        list.classList.add('is-reverse')
        moveItem();
    }
    function setOrder() {
        let key = num;
        for (const iterator of items) {
            iterator.style.order = key;
            key++
            if (key > items.length) {
                key = 1;
            }
        }
    }
    function moveItem() {
        list.classList.remove('is-move');
        setTimeout(() => {
            list.classList.add('is-move');
        }, 50);
    }
}
sliderBurger();

// СЕКЦИЯ ФОРМА. ОТПРАВКА НА СЕРВЕР
const myForm = document.querySelector('#myForm');
const sendButton = document.querySelector('#sendButton');


sendButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    if (validateForm(myForm)) {
        
        let formData = new FormData(myForm);
        
        formData.append('name', myForm.elements.name.value);
		formData.append('phone', myForm.elements.phone.value);
		formData.append('comment', myForm.elements.comment.value);
		formData.append('to', 'test@test.com');
        
        const overlay = createOverlay(document.querySelector('#overlayTemplate').innerHTML);
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(formData);
        xhr.addEventListener('load', () => {
            overlay.open();
            if (xhr.status <= 400) {
                const message = xhr.response.message;
                overlay.setContent("", message);
            } else {
                const message = 'Ошибка. Повторите ещё раз';
                overlay.setContent("", message);
			}
        });
    }
});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.phone)) {
        valid = false;
    }
    if (!validateField(form.elements.street)) {
        valid = false;
    }
    if (!validateField(form.elements.house)) {
        valid = false;
    }
    if (!validateField(form.elements.building)) {
        valid = false;
    }
    if (!validateField(form.elements.flat)) {
        valid = false;
    }
    if (!validateField(form.elements.floor)) {
        valid = false;
    }

    return valid;
}

function validateField(field) {
    if (!field.checkValidity()) {
        field.nextElementSibling.textContent = field.validationMessage;

        return false;
    } else {
        field.nextElementSibling.textContent = '';

        return true;
    }
}

// СЕКЦИЯ ОТЗЫВЫ. openOverlay
function openOverlay() {
    const reviewsList = document.querySelector('.reviews__list');
    const template = document.querySelector('#overlayTemplate').innerHTML;
    const overlay = createOverlay(template);

    reviewsList.addEventListener('click', function(e) {
        e.preventDefault();

        const buttonOverlay = event.target;

        if (buttonOverlay.classList.contains('btn-overlay')) {
            overlay.open();
            overlay.setContent('Петр Петров', 'Мысли все о них и о них, о них и о них. Нельзя устоять.Невозможно забыть... Никогда не думал, что булочки могут быть такими мягкими, котлета такой сочной, а сыр таким расплавленным.');
        }
    });

}
openOverlay(); 

// Overley
function createOverlay(template) {
    let fragment = document.createElement('div');

    fragment.innerHTML = template;

    const overlayElement = fragment.querySelector('.overlay');
    const contentElement = fragment.querySelector('.overlay__text');
    const titleElement = fragment.querySelector('.overlay__title');
    const closeElement = fragment.querySelector('.close-link');

    fragment = null;

    overlayElement.addEventListener('click', e => {
        e.preventDefault();
        if (e.target === overlayElement) {
            closeElement.click();
        }
    });
    closeElement.addEventListener('click', () => {
        document.body.removeChild(overlayElement);
    });
    return {
        open() {
            document.body.appendChild(overlayElement);
        },
        close() {
            closeElement.click();
        },
        setContent(title, content) {
            contentElement.innerHTML = content;
            titleElement.innerHTML = title;
        }
    };
}

// one page scroll
function onePageScroll() {
    const wrapper = document.querySelector('.wrapper');
    const content = wrapper.querySelector('.maincontent');
    const sections = content.querySelectorAll('.section');
    const points = document.querySelectorAll('.point__item');
    const dataScrollTo = document.querySelectorAll('[data-scroll-to]');

    let isScroll = false;

    addNavigation();
    wheel();
    keyPush();

    function moveToSection(numSection) {
        const position = `${numSection * -100}%`; //Конкатенация строк

        if (isScroll) return;
        
        isScroll = true;

        addClass(sections);

        content.style.transform = `translateY(${position})`;

        setTimeout(() => { //Стандартная функция. Выполнение задержки (1000 миллисекунд).

            isScroll = false;
            addClass(points);

        }, 1000);

        function addClass(arr) { //Добавление активного класса элементу по которому мы кликнули и удаление у других.
            arr[numSection].classList.add('is-active');

            for (const iterator of arr) {
                if (iterator !== arr[numSection]) {
                    iterator.classList.remove('is-active');
                }
            }
        }
    }

    function addNavigation() {
        for (const iterator of dataScrollTo) {
            iterator.addEventListener('click', e => {
                e.preventDefault();
                moveToSection(iterator.dataset.scrollTo)
            });
        }
    }

    function wheel() {
        document.addEventListener('wheel', e => { //Событие wheel отслеживает скролл.

            const direct = e.deltaY > 0 ? 'up' : 'down' // если (e.deltaY > 0), то if('up'); если (e.deltaY < 0), то else('down').

            scrollToSection(direct);
        });
    }

    function defineSection(arr) {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element.classList.contains('is-active')) {
                return {
                    elIndex: i,
                    elActive: element,
                    elNext: element.nextElementSibling,
                    elPrev: element.previousElementSibling
                }
            }
        }
    }

    function scrollToSection(direct) {
        let section = defineSection(sections);

        if (direct === 'up' && section.elNext) {
            let numSection = section.elIndex + 1;
            moveToSection(numSection);
        }
        if (direct === 'down' && section.elPrev) {
            let numSection = section.elIndex - 1;
            moveToSection(numSection);
        }
    }

    function keyPush() {
        document.addEventListener('keydown', e => {
            switch (e.keyCode) { //Возвращает название кнопки.
                case 40: //Номер кнопки вниз 40.
                    scrollToSection('up');
                    break;
                case 38: //Номер кнопки вверх 38.
                    scrollToSection('down');
                    break;
                default: //Срабатывает если не нажали 40 или 38.
                    break;
            }
        });
    }

    if (isMobileDevice()) swipe();

    function swipe() {
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', e => {
            touchStartY = e.changedTouches[0].screenY;
            },
            false
        );

        wrapper.addEventListener('touchmove', e => e.preventDefault());

        document.addEventListener('touchend', e => {
            touchEndY = e.changedTouches[0].screenY;
            let direct = swipeDirect();
            scrollToSection(direct);
            },
            false
        );

        function swipeDirect() {
            let dif = touchStartY - touchEndY;
            if (dif > 100) {
                return 'up';
            } else if (dif < -100) {
                return 'down';
            }
        }
    }

    function isMobileDevice() {
        return (
            typeof window.orientation !== 'undefined' ||
            navigator.userAgent.indexOf('IEMobile') !== -1
        );
    }   
}
onePageScroll();

//Плеер YouTube
// let player;
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('yt-player', {
//         height: '405',
//         width: '660',
//         videoId: 'M7lc1UVf-VE',
//         events: {
//         // 'onReady': onPlayerReady,
//         // 'onStateChange': onPlayerStateChange
//         }
//     });
// }

//Яндекс карта
ymaps.ready(init);

const placemarks = [ //Массив
    { //Объект
        latitude: 59.97, //Широта
        longitude: 30.32, //Долгота
        hintContent: 'Кликните, чтобы посмотреть адрес',
        balloonContent: 'Улица Пушкина, дом Колотушкина'
    },
    {
        latitude: 59.96, 
        longitude: 30.34, 
        hintContent: 'Кликните, чтобы посмотреть адрес',
        balloonContent: 'Улица Пушкина, дом Колотушкина'
    },
    {
        latitude: 59.99, 
        longitude: 30.36, 
        hintContent: 'Кликните, чтобы посмотреть адрес',
        balloonContent: 'Улица Пушкина, дом Колотушкина'
    }
];

    geoObjects = [];

function init() {
    const map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

   for (let i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], 
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '../images/svgicons/map-marker.svg',
                // iconImageClipRect: [[00, 00], [00, 00]], Координаты для изображения из спрайта.
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57] //Сдвиг центра иконки.
            });
    }
    
    const clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: '../images/content/intro/burger_main.png',
                size: [100, 100],
                offset: [-50, -50]
            }
        ],
        clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}