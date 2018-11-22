const navTrigger = document.querySelector('.nav-trigger');

navTrigger.addEventListener('click', function(e) {
          e.preventDefault();
          const navMobile = document.querySelector('.nav-mobile');
          navMobile.classList.toggle('nav-mobile--active');        
});

// const menuItem = document.querySelector('menu_item');

// menuItem.addEventListener('click')