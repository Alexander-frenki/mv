const header = document.querySelector('.header');
const burgerBtn = header.querySelector('.header_burger');
const subMenuBtns = header.querySelectorAll('.sub_menu_btn');

// toggle drawer menu for mobile device
burgerBtn.addEventListener('click', toggleHeader);

function toggleHeader() {
  header.classList.toggle('active');
};

// toggle sub menu in drawer for mobile device
subMenuBtns.forEach(btn => {
  btn.addEventListener('click', toggleSubMenu.bind(null, btn));
});

function toggleSubMenu(btn) {
  const subMenu = btn.previousElementSibling;

  if (subMenu.classList.contains('open')) {
    subMenu.classList.remove('open');
    closeSubMenu(subMenu);
  } else {
    subMenu.classList.add('open');
    openSubMenu(subMenu);
  }
}

function openSubMenu(menu) {
  const height = getMenuHeight(menu) + 18; // 18 for padding;
  setHeight(height, menu);
}

function closeSubMenu(menu) {
  setHeight(0, menu);
}


function getMenuHeight(menu) {
  return [...menu.children].reduce((acc, el) => {
    return acc + el.offsetHeight + parseInt(window.getComputedStyle(el).marginBottom, 10);
  }, 0);
}

function setHeight(height, el) {
  Object.assign(el.style, {height: `${height}px`});
}