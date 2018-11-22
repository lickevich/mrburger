const navTrigger = document.querySelector('.nav-trigger');
const navMobile = document.querySelector('.nav-mobile');
const navMobileLink = document.querySelector('.nav-mobile__link');

navTrigger.addEventListener('click', function(e) {
          e.preventDefault();
          navMobile.classList.toggle('nav-mobile--active');
          navTrigger.classList.toggle('nav-trigger--active');        
});

navMobileLink.addEventListener('click', function(e) {
          e.preventDefault();
});