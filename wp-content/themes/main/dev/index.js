import './styles/index.scss';
import 'jquery-zoom';
import './js/header';
import './js/gallery';
import './js/categories';
import './js/animation';

document.addEventListener( 'wpcf7mailsent', () => {
  document.querySelector('.contacts_form_thanks').classList.add('active');
}, false );