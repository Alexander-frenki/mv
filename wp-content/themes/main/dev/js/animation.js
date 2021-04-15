const elementsToAnimate = document.querySelectorAll('.scroll_animate');

document.addEventListener('DOMContentLoaded', () => {
  checkIsVisible();
  window.addEventListener('scroll', checkIsVisible);
});

function checkIsVisible() {
  elementsToAnimate.forEach((el) => {
    return isVisible(el);
  });
}

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const separator = windowWidth < 576 ? 1.5 : 1.1;

function isVisible(el) {
  const elHeight = el.offsetTop + el.offsetHeight;
  if (document.documentElement.scrollTop + windowHeight >= elHeight / separator) {
    el.classList.add('showed');
  }
}