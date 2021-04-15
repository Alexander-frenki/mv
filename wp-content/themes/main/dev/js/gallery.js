const CATEGORY_KEY = 'category';
const SLIDER_SELECTOR = '.gallery_slider';

const header = document.querySelector('.header');
const title = document.querySelector('[data-title]');
const slider = document.querySelector('.gallery_slider');
const sliderCloseBtn = document.querySelector('.gallery_slider_close');
const categoryBtns = document.querySelectorAll('[data-btn-category]');
const categoryLinks = document.querySelectorAll('[data-link-category]');
const items = document.querySelectorAll('[data-item-categories]');
const searchParams = new URLSearchParams(window.location.search);

window.addEventListener('DOMContentLoaded', () => {
  if (categoryBtns.length) {
    const category = getSearchParamCategory() || getFirstCategory();
    applyCategory(category);

    [...categoryBtns, ...categoryLinks].forEach(btn => btn.addEventListener('click', (event) => {
      event.preventDefault();
      header.classList.remove('active');
      const category = event.currentTarget.dataset.btnCategory || event.currentTarget.dataset.linkCategory;
      applyCategory(category);
    }));

    [...items].forEach(item => item.addEventListener('click', (event) => {
      if (event.target.nodeName === 'IMG') {
        const index = event.currentTarget.dataset.itemIndex;
        activateSlider(index);
      };
    }));

    sliderCloseBtn.addEventListener('click', closeSlider);
  };
});

function applyCategory(category) {
  showItemsByCategory(category);
  activateBtn(category);
  setTitle(category);
  setSearchParamCategory(category);
}

function getSearchParamCategory() {
  return searchParams.get(CATEGORY_KEY);
}

function setSearchParamCategory(category) {
  const activeCategory = getSearchParamCategory();
  if (activeCategory !== category) {
    searchParams.set(CATEGORY_KEY, category);
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
  }
}

function getFirstCategory() {
  return [...categoryBtns].shift().dataset.btnCategory;
}

function discardActiveBtn() {
  const activeBtn = [...categoryBtns].find(btn => btn.classList.contains('active'));
  if (activeBtn) {
    activeBtn.classList.remove('active');
  }
}

function activateBtn(category) {
  discardActiveBtn();
  console.log(category);
  const btn = [...categoryBtns].find(btn => btn.dataset.btnCategory === category);
  btn.classList.add('active');
}

function getTitleByCategory(category) {
  return [...categoryBtns].find(btn => btn.dataset.btnCategory === category).dataset.btnName;
}

function setTitle(category)  {
  const activeTitle = getTitleByCategory(category);
  title.classList.remove('showed');
  title.textContent = activeTitle;
  setTimeout(() => { // need for animation
    title.classList.add('showed');  
  }, 50);
}

function discardItems() {
  items.forEach(item => item.classList.remove('active'));
}

function getItemsByCategory(category) {
  return [...items].filter(item => item.dataset.itemCategories.split('/').includes(category));
}

function showItemsByCategory(category) {
  discardItems();
  const itemsByCategory = getItemsByCategory(category);
  itemsByCategory.forEach(item => item.classList.add('active'));
}

function openSlider() {
  document.body.style.overflow = 'hidden';
  slider.classList.add('active');
}

function closeSlider() {
  document.body.style.overflow = 'initial';
  slider.classList.remove('active');
}

function activateSlider(index) {
  goToSlide(index);
  setTimeout(() => {
    openSlider();
  }, 300)
  
}

$(document).ready(function(){
  $(SLIDER_SELECTOR).slick({
    prevArrow:"<button type='button' class='slick-prev pull-left'><svg width='30' height='22' viewBox='0 0 30 22' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9 21L1 11m0 0L9 1M1 11h28' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></button>",
    nextArrow:'<button type="button" class="slick-next pull-right"><svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 1l8 10m0 0l-8 10m8-10H1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
  });

  $('.clone-arrow-prev').on('click', () => {
    $('.slick-prev').click();
  });
  $('.clone-arrow-next').on('click', () => {
    $('.slick-next').click();
  });
  if ($(document).width() <= 1440 ) {
    $.each($('[data-zoom-img]'), (i, img) => {
      $(img).zoom({ url: $(img).attr('data-zoom-img]') });
    })
  };
});

function goToSlide(index) {
  $(SLIDER_SELECTOR).slick('slickGoTo', index);
}