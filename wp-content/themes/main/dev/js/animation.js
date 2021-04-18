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
  if (document.documentElement.scrollTop + windowHeight >= (elHeight * 0.3) + el.offsetTop) {
    el.classList.add('showed');
  }
}