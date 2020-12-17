const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
let menuOut = false;

document.addEventListener('click', (e) => {
  console.log(e.target.className);
  if (e.target.className === 'nav-menu') {
    console.log('menu!');
  } else if (e.target.className === 'burger' || e.target.className === 'slice') {
    if (!menuOut) {
      menuOut = true;
      navMenu.style.top = '60px';
    } else {
      menuOut = false;
      navMenu.style.top = '-100vh';
    }
  } else {
    console.log(e.target.className);
    menuOut = false;
    navMenu.style.top = '-100vh';
  }
});
