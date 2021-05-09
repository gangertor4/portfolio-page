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