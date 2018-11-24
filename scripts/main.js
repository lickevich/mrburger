// МОБИЛЬНОЕ МЕНЮ

function mobileMenu() {

    const navTrigger = document.querySelector('.nav-trigger');
    const navMobile = document.querySelector('.nav-mobile');
    const navMobileItem = document.querySelectorAll('.nav-mobile__item');

    navTrigger.addEventListener('click', toggleClass);
     
    for (const iterator of navMobileItem) {
        iterator.addEventListener('click', toggleClass)
    }

    function toggleClass(e) {
        e.preventDefault();

        navMobile.classList.toggle('nav-mobile--active');
        navTrigger.classList.toggle('nav-trigger--active');
    }
}
mobileMenu();