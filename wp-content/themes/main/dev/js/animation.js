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

function isVisible(el) {
  const elHeight = el.offsetHeight;
  if (document.documentElement.scrollTop + windowHeight >= (elHeight * 0.15) + el.offsetTop - (window.innerWidth >= 1024 ? 72 : 0)) {
    el.classList.add('showed');
  }
}