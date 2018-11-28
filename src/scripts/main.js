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

        navMobile.classList.toggle('nav-mobile--active');
        navTrigger.classList.toggle('nav-trigger--active');
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
    const items = list.querySelectorAll('slider__item');

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);

    let num = 2;

    function moveNext() {
        num++
        if (num > items.lenght) {
            num = 1;
        }
    }
}
sliderBurger();