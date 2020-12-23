const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
let menuOut = false;

document.addEventListener('click', (e) => {
  if (e.target.className === 'nav-menu') {
  } else if (e.target.className === 'burger' || e.target.className === 'slice') {
    if (!menuOut) {
      menuOut = true;
      navMenu.style.top = '60px';
    } else {
      menuOut = false;
      navMenu.style.top = '-100vh';
    }
  } else {
    menuOut = false;
    navMenu.style.top = '-100vh';
  }
});
