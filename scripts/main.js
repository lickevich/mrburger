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
    const accordElements = document.querySelector('.team__acco');
    createAccord(accordElements);
    
    function createAccord(element) {
        
    let activeCont = document.querySelector('.team__acco-content--active');

    element.addEventListener('click', function (event) {
        event.preventDefault();
        
        const trigger = event.target;

        if (trigger.classList.contains('team__acco-trigger')) {
            
            if (activeCont) {
                activeCont.classList.remove('team__acco-content--active');
            } 

            activeCont = trigger.nextElementSibling;
            activeCont.classList.add('team__acco-content--active');
        }
    });
}

// СЛАЙДЕР В СЕКЦИИ БУРГЕРЫ

