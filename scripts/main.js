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
        const formData = {
            name: myForm.elements.name.value,
            phone: myForm.elements.phone.value,
            comment: myForm.elements.comment.value,
            to: 'test@test.com'
        };

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(JSON.stringify(formData));
        xhr.addEventListener('load', () => {
            if (xhr.response.status) {
                console.log('все хорошо');
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
}
openOverlay(); 

// // one page scroll
// function onePageScroll () {
// const wrapper = document.querySelector('.wrapper');
// const content = wrapper.querySelector('.maincontent');
// const sections = content.querySelectorAll('.section');
// const points = document.querySelectorAll('.point__item');
// const dataScrollto = document.querySelectorAll('[data-scroll-to]');


// }
// onePageScroll();
