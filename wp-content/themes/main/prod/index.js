// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/jquery-zoom/jquery.zoom.js":[function(require,module,exports) {
/*!
	Zoom 1.7.21
	license: MIT
	http://www.jacklmoore.com/zoom
*/
(function ($) {
	var defaults = {
		url: false,
		callback: false,
		target: false,
		duration: 120,
		on: 'mouseover', // other options: grab, click, toggle
		touch: true, // enables a touch fallback
		onZoomIn: false,
		onZoomOut: false,
		magnify: 1
	};

	// Core Zoom Logic, independent of event listeners.
	$.zoom = function(target, source, img, magnify) {
		var targetHeight,
			targetWidth,
			sourceHeight,
			sourceWidth,
			xRatio,
			yRatio,
			offset,
			$target = $(target),
			position = $target.css('position'),
			$source = $(source);

		// The parent element needs positioning so that the zoomed element can be correctly positioned within.
		target.style.position = /(absolute|fixed)/.test(position) ? position : 'relative';
		target.style.overflow = 'hidden';
		img.style.width = img.style.height = '';

		$(img)
			.addClass('zoomImg')
			.css({
				position: 'absolute',
				top: 0,
				left: 0,
				opacity: 0,
				width: img.width * magnify,
				height: img.height * magnify,
				border: 'none',
				maxWidth: 'none',
				maxHeight: 'none'
			})
			.appendTo(target);

		return {
			init: function() {
				targetWidth = $target.outerWidth();
				targetHeight = $target.outerHeight();

				if (source === target) {
					sourceWidth = targetWidth;
					sourceHeight = targetHeight;
				} else {
					sourceWidth = $source.outerWidth();
					sourceHeight = $source.outerHeight();
				}

				xRatio = (img.width - targetWidth) / sourceWidth;
				yRatio = (img.height - targetHeight) / sourceHeight;

				offset = $source.offset();
			},
			move: function (e) {
				var left = (e.pageX - offset.left),
					top = (e.pageY - offset.top);

				top = Math.max(Math.min(top, sourceHeight), 0);
				left = Math.max(Math.min(left, sourceWidth), 0);

				img.style.left = (left * -xRatio) + 'px';
				img.style.top = (top * -yRatio) + 'px';
			}
		};
	};

	$.fn.zoom = function (options) {
		return this.each(function () {
			var
			settings = $.extend({}, defaults, options || {}),
			//target will display the zoomed image
			target = settings.target && $(settings.target)[0] || this,
			//source will provide zoom location info (thumbnail)
			source = this,
			$source = $(source),
			img = document.createElement('img'),
			$img = $(img),
			mousemove = 'mousemove.zoom',
			clicked = false,
			touched = false;

			// If a url wasn't specified, look for an image element.
			if (!settings.url) {
				var srcElement = source.querySelector('img');
				if (srcElement) {
					settings.url = srcElement.getAttribute('data-src') || srcElement.currentSrc || srcElement.src;
				}
				if (!settings.url) {
					return;
				}
			}

			$source.one('zoom.destroy', function(position, overflow){
				$source.off(".zoom");
				target.style.position = position;
				target.style.overflow = overflow;
				img.onload = null;
				$img.remove();
			}.bind(this, target.style.position, target.style.overflow));

			img.onload = function () {
				var zoom = $.zoom(target, source, img, settings.magnify);

				function start(e) {
					zoom.init();
					zoom.move(e);

					// Skip the fade-in for IE8 and lower since it chokes on fading-in
					// and changing position based on mousemovement at the same time.
					$img.stop()
					.fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
				}

				function stop() {
					$img.stop()
					.fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
				}

				// Mouse events
				if (settings.on === 'grab') {
					$source
						.on('mousedown.zoom',
							function (e) {
								if (e.which === 1) {
									$(document).one('mouseup.zoom',
										function () {
											stop();

											$(document).off(mousemove, zoom.move);
										}
									);

									start(e);

									$(document).on(mousemove, zoom.move);

									e.preventDefault();
								}
							}
						);
				} else if (settings.on === 'click') {
					$source.on('click.zoom',
						function (e) {
							if (clicked) {
								// bubble the event up to the document to trigger the unbind.
								return;
							} else {
								clicked = true;
								start(e);
								$(document).on(mousemove, zoom.move);
								$(document).one('click.zoom',
									function () {
										stop();
										clicked = false;
										$(document).off(mousemove, zoom.move);
									}
								);
								return false;
							}
						}
					);
				} else if (settings.on === 'toggle') {
					$source.on('click.zoom',
						function (e) {
							if (clicked) {
								stop();
							} else {
								start(e);
							}
							clicked = !clicked;
						}
					);
				} else if (settings.on === 'mouseover') {
					zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.

					$source
						.on('mouseenter.zoom', start)
						.on('mouseleave.zoom', stop)
						.on(mousemove, zoom.move);
				}

				// Touch fallback
				if (settings.touch) {
					$source
						.on('touchstart.zoom', function (e) {
							e.preventDefault();
							if (touched) {
								touched = false;
								stop();
							} else {
								touched = true;
								start( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
							}
						})
						.on('touchmove.zoom', function (e) {
							e.preventDefault();
							zoom.move( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
						})
						.on('touchend.zoom', function (e) {
							e.preventDefault();
							if (touched) {
								touched = false;
								stop();
							}
						});
				}
				
				if ($.isFunction(settings.callback)) {
					settings.callback.call(img);
				}
			};

			img.setAttribute('role', 'presentation');
			img.alt = '';
			img.src = settings.url;
		});
	};

	$.fn.zoom.defaults = defaults;
}(window.jQuery));

},{}],"js/header.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var header = document.querySelector('.header');
var burgerBtn = header.querySelector('.header_burger');
var subMenuBtns = header.querySelectorAll('.sub_menu_btn'); // toggle drawer menu for mobile device

burgerBtn.addEventListener('click', toggleHeader);

function toggleHeader() {
  header.classList.toggle('active');
}

; // toggle sub menu in drawer for mobile device

subMenuBtns.forEach(function (btn) {
  btn.addEventListener('click', toggleSubMenu.bind(null, btn));
});

function toggleSubMenu(btn) {
  var subMenu = btn.previousElementSibling;

  if (subMenu.classList.contains('open')) {
    subMenu.classList.remove('open');
    closeSubMenu(subMenu);
  } else {
    subMenu.classList.add('open');
    openSubMenu(subMenu);
  }
}

function openSubMenu(menu) {
  var height = getMenuHeight(menu) + 18; // 18 for padding;

  setHeight(height, menu);
}

function closeSubMenu(menu) {
  setHeight(0, menu);
}

function getMenuHeight(menu) {
  return _toConsumableArray(menu.children).reduce(function (acc, el) {
    return acc + el.offsetHeight + parseInt(window.getComputedStyle(el).marginBottom, 10);
  }, 0);
}

function setHeight(height, el) {
  Object.assign(el.style, {
    height: "".concat(height, "px")
  });
}
},{}],"js/gallery.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var CATEGORY_KEY = 'category';
var SLIDER_SELECTOR = '.gallery_slider';
var header = document.querySelector('.header');
var title = document.querySelector('[data-title]');
var slider = document.querySelector('.gallery_slider');
var sliderCloseBtn = document.querySelector('.gallery_slider_close');
var categoryBtns = document.querySelectorAll('[data-btn-category]');
var categoryLinks = document.querySelectorAll('[data-link-category]');
var items = document.querySelectorAll('[data-item-categories]');
var searchParams = new URLSearchParams(window.location.search);
window.addEventListener('DOMContentLoaded', function () {
  if (categoryBtns.length) {
    var category = getSearchParamCategory() || getFirstCategory();
    applyCategory(category);
    [].concat(_toConsumableArray(categoryBtns), _toConsumableArray(categoryLinks)).forEach(function (btn) {
      return btn.addEventListener('click', function (event) {
        event.preventDefault();
        header.classList.remove('active');
        var category = event.currentTarget.dataset.btnCategory || event.currentTarget.dataset.linkCategory;
        applyCategory(category);
      });
    });

    _toConsumableArray(items).forEach(function (item) {
      return item.addEventListener('click', function (event) {
        if (event.target.nodeName === 'IMG') {
          var index = event.currentTarget.dataset.itemIndex;
          activateSlider(index);
        }

        ;
      });
    });

    sliderCloseBtn.addEventListener('click', closeSlider);
  }

  ;
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
  var activeCategory = getSearchParamCategory();

  if (activeCategory !== category) {
    searchParams.set(CATEGORY_KEY, category);
    window.history.replaceState({}, '', "".concat(window.location.pathname, "?").concat(searchParams));
  }
}

function getFirstCategory() {
  return _toConsumableArray(categoryBtns).shift().dataset.btnCategory;
}

function discardActiveBtn() {
  var activeBtn = _toConsumableArray(categoryBtns).find(function (btn) {
    return btn.classList.contains('active');
  });

  if (activeBtn) {
    activeBtn.classList.remove('active');
  }
}

function activateBtn(category) {
  discardActiveBtn();
  console.log(category);

  var btn = _toConsumableArray(categoryBtns).find(function (btn) {
    return btn.dataset.btnCategory === category;
  });

  btn.classList.add('active');
}

function getTitleByCategory(category) {
  return _toConsumableArray(categoryBtns).find(function (btn) {
    return btn.dataset.btnCategory === category;
  }).dataset.btnName;
}

function setTitle(category) {
  var activeTitle = getTitleByCategory(category);
  title.classList.remove('showed');
  title.textContent = activeTitle;
  setTimeout(function () {
    // need for animation
    title.classList.add('showed');
  }, 50);
}

function discardItems() {
  items.forEach(function (item) {
    return item.classList.remove('active');
  });
}

function getItemsByCategory(category) {
  return _toConsumableArray(items).filter(function (item) {
    return item.dataset.itemCategories.split('/').includes(category);
  });
}

function showItemsByCategory(category) {
  discardItems();
  var itemsByCategory = getItemsByCategory(category);
  itemsByCategory.forEach(function (item) {
    return item.classList.add('active');
  });
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
  setTimeout(function () {
    openSlider();
  }, 300);
}

$(document).ready(function () {
  $(SLIDER_SELECTOR).slick({
    draggable: false,
    prevArrow: "<button type='button' class='slick-prev pull-left'><svg width='30' height='22' viewBox='0 0 30 22' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9 21L1 11m0 0L9 1M1 11h28' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></button>",
    nextArrow: '<button type="button" class="slick-next pull-right"><svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 1l8 10m0 0l-8 10m8-10H1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
  });
  $('.clone-arrow-prev').on('click', function () {
    $('.slick-prev').click();
  });
  $('.clone-arrow-next').on('click', function () {
    $('.slick-next').click();
  });

  if ($(document).width() <= 1440) {
    $.each($('[data-zoom-img]'), function (i, img) {
      $(img).zoom({
        url: $(img).attr('data-zoom-img]')
      });
    });
  }

  ;
});

function goToSlide(index) {
  $(SLIDER_SELECTOR).slick('slickGoTo', index);
}
},{}],"js/categories.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var categoryItemsWrapper = document.querySelector('.categories_wrapper');
var categoryItems = document.querySelectorAll('[data-itm-category] h3');
var categoryImages = document.querySelectorAll('[data-img-category]');
var itemsWrapper = document.querySelector('.categories');
var imagesWrapper = document.querySelector('.categories_hover_img');
window.addEventListener('DOMContentLoaded', function () {
  if (categoryItems.length && window.innerWidth >= 992) {
    _toConsumableArray(categoryItems).forEach(function (item) {
      return item.addEventListener('mouseenter', setEnterEvent);
    });

    _toConsumableArray(categoryItems).forEach(function (item) {
      return item.addEventListener('mouseleave', setLeaveEvent);
    });

    itemsWrapper.addEventListener('mousemove', debounce(setImageOffset, 10));
  }

  ;
});

function setImageOffset(_ref) {
  var x = _ref.x,
      y = _ref.y;
  applyCoords(imagesWrapper, {
    x: x,
    y: y
  });
}

function setEnterEvent(_ref2) {
  var target = _ref2.target,
      x = _ref2.x,
      y = _ref2.y;
  var coords = {
    x: x,
    y: y
  };
  var category = target.parentNode.parentNode.dataset.itmCategory;
  var img = findImageByCategory(category);

  if (img) {
    showImg(img, coords);
  }
}

function setLeaveEvent(_ref3) {
  var target = _ref3.target;
  var category = target.parentNode.parentNode.dataset.itmCategory;
  var img = findImageByCategory(category);

  if (img) {
    hideImg(img);
  }
}

function findImageByCategory(category) {
  return _toConsumableArray(categoryImages).find(function (img) {
    return img.dataset.imgCategory === category;
  });
}

function showImg(img) {
  img.classList.add('show');
}

function hideImg(img) {
  img.classList.remove('show');
}

function applyCoords(item, coords) {
  Object.assign(item.style, {
    left: "".concat(coords.x, "px"),
    top: "".concat(coords.y, "px")
  }); // Object.assign(item.style, {transform: `translate3d(calc(${coords.x}px - 50%), calc(${coords.y}px - 45%), 0)`});
}

function debounce(f, ms) {
  var isCooldown = false;
  return function () {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(function () {
      return isCooldown = false;
    }, ms);
  };
}
},{}],"js/animation.js":[function(require,module,exports) {
var elementsToAnimate = document.querySelectorAll('.scroll_animate');
document.addEventListener('DOMContentLoaded', function () {
  checkIsVisible();
  window.addEventListener('scroll', checkIsVisible);
});

function checkIsVisible() {
  elementsToAnimate.forEach(function (el) {
    return isVisible(el);
  });
}

var windowHeight = window.innerHeight;

function isVisible(el) {
  var elHeight = el.offsetHeight;

  if (document.documentElement.scrollTop + windowHeight >= elHeight * 0.15 + el.offsetTop - (window.innerWidth >= 1024 ? 72 : 0)) {
    el.classList.add('showed');
  }
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles/index.scss");

require("jquery-zoom");

require("./js/header");

require("./js/gallery");

require("./js/categories");

require("./js/animation");

document.addEventListener('wpcf7mailsent', function () {
  document.querySelector('.contacts_form_thanks').classList.add('active');
}, false);
},{"./styles/index.scss":"styles/index.scss","jquery-zoom":"../node_modules/jquery-zoom/jquery.zoom.js","./js/header":"js/header.js","./js/gallery":"js/gallery.js","./js/categories":"js/categories.js","./js/animation":"js/animation.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60353" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map