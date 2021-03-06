const topBtn = document.querySelector('.top-button');

const scrollBtnShow = () => {
  let y = window.scrollY;

  if (y > 0) {
    topBtn.classList.remove('btn-hide');
  } else {
    topBtn.classList.add('btn-hide');
  }
}

window.addEventListener('scroll', scrollBtnShow);

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 10);
  }
};

topBtn.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
}

const btnToggle = document.querySelector('.main-nav__btn-toggle');
const navMenu = document.querySelector('.main-nav-wrapper');

btnToggle.addEventListener('click', function () {
  if (btnToggle.classList.contains('main-nav__btn-toggle--burger')) {
    btnToggle.classList.remove('main-nav__btn-toggle--burger');
    btnToggle.classList.add('main-nav__btn-toggle--cross');
    navMenu.classList.remove('main-nav-wrapper--closed');
    navMenu.classList.add('main-nav-wrapper--opened');
  } else {
    btnToggle.classList.remove('main-nav__btn-toggle--cross');
    btnToggle.classList.add('main-nav__btn-toggle--burger');
    navMenu.classList.remove('main-nav-wrapper--opened');
    navMenu.classList.add('main-nav-wrapper--closed');
}
})