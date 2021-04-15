const categoryItemsWrapper = document.querySelector('.categories_wrapper');
const categoryItems = document.querySelectorAll('[data-itm-category] h3');
const categoryImages = document.querySelectorAll('[data-img-category]');
const itemsWrapper = document.querySelector('.categories');
const imagesWrapper = document.querySelector('.categories_hover_img');

window.addEventListener('DOMContentLoaded', () => {
  if (categoryItems.length && window.innerWidth >= 992) {
    [...categoryItems].forEach(item => item.addEventListener('mouseenter', setEnterEvent));
    [...categoryItems].forEach(item => item.addEventListener('mouseleave', setLeaveEvent));
    itemsWrapper.addEventListener('mousemove', debounce(setImageOffset, 10));
  };
});

function setImageOffset({ x, y }) {
  applyCoords(imagesWrapper, { x, y })
}

function setEnterEvent({ target, x, y }) {
  const coords = { x, y };
  const category = target.parentNode.parentNode.dataset.itmCategory;
  const img = findImageByCategory(category);
  if (img) {
    showImg(img, coords);
  }
}

function setLeaveEvent({ target }) {
  const category = target.parentNode.parentNode.dataset.itmCategory;
  const img = findImageByCategory(category);
  if (img) {
    hideImg(img);  
  }
}

function findImageByCategory(category) {
  return [...categoryImages].find(img => img.dataset.imgCategory === category);
}

function showImg(img) {
  img.classList.add('show');
}

function hideImg(img) {
  img.classList.remove('show');
}

function applyCoords(item, coords) {
  Object.assign(item.style, {left: `${coords.x}px`, top: `${coords.y}px`});
  // Object.assign(item.style, {transform: `translate3d(calc(${coords.x}px - 50%), calc(${coords.y}px - 45%), 0)`});
}


function debounce(f, ms) {
  let isCooldown = false;
  return function() {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}