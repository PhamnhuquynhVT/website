/* =============================================================================
   PHAM Nhu Quynh — Portfolio
   Progressive enhancement only: the site is fully readable without this file.
   Plain script (no modules, no fetch) so it works when opened from file://.

   1. Language (FR / EN)            4. Current Issue in the masthead (home)
   2. Reveal on scroll              5. Accessible lightbox
   3. Masthead scroll state
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  root.classList.add('js');

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function onReady(fn) {
    if (doc.readyState !== 'loading') fn();
    else doc.addEventListener('DOMContentLoaded', fn);
  }

  /* 1 — Language ---------------------------------------------------------------
     The inline <head> script has already chosen the language (saved choice, else
     browser language, else English) and set <html lang data-lang>. Text is swapped
     by CSS ([data-l]); attributes are swapped here: English stays in alt /
     aria-label / title / content, French lives in data-fr-*. The English original
     is kept in data-en-* the first time it is replaced. */
  var ATTRS = ['alt', 'aria-label', 'title', 'content'];

  function currentLang() {
    return root.getAttribute('data-lang') === 'fr' ? 'fr' : 'en';
  }

  function applyLang(lang, save) {
    root.setAttribute('lang', lang);
    root.setAttribute('data-lang', lang);

    ATTRS.forEach(function (name) {
      each(doc.querySelectorAll('[data-fr-' + name + ']'), function (el) {
        if (el.tagName === 'TITLE') return;
        if (!el.hasAttribute('data-en-' + name)) el.setAttribute('data-en-' + name, el.getAttribute(name) || '');
        el.setAttribute(name, el.getAttribute('data-' + lang + '-' + name));
      });
    });

    var title = doc.querySelector('title[data-fr-title]');
    if (title) {
      if (!title.hasAttribute('data-en-title')) title.setAttribute('data-en-title', title.textContent);
      doc.title = title.getAttribute('data-' + lang + '-title');
    }

    each(doc.querySelectorAll('[data-set-lang]'), function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });

    if (save) {
      try { window.localStorage.setItem('lang', lang); } catch (e) { /* storage blocked: choice lasts this page only */ }
    }

    var evt;
    try { evt = new CustomEvent('langchange', { detail: { lang: lang } }); }
    catch (e) { evt = doc.createEvent('CustomEvent'); evt.initCustomEvent('langchange', false, false, { lang: lang }); }
    doc.dispatchEvent(evt);
  }

  function initLang() {
    applyLang(currentLang(), false);
    each(doc.querySelectorAll('[data-set-lang]'), function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-set-lang');
        if (lang !== currentLang()) applyLang(lang, true);
        else applyLang(lang, true);
      });
    });
  }

  /* 2 — Reveal on scroll ---------------------------------------------------- */
  function initReveal() {
    var els = doc.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      each(els, function (el) { el.classList.add('is-revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    each(els, function (el) { io.observe(el); });
  }

  /* 3 — Masthead hairline once the page scrolls ------------------------------ */
  function initMasthead() {
    var mast = doc.querySelector('.masthead');
    if (!mast) return;
    var queued = false;
    function update() {
      mast.classList.toggle('is-scrolled', (window.scrollY || window.pageYOffset) > 8);
      queued = false;
    }
    window.addEventListener('scroll', function () {
      if (!queued) { queued = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* 4 — Current Issue in the masthead (in-page links only) ------------------- */
  function initNavState() {
    var links = doc.querySelectorAll('.masthead__link[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var byId = {};
    var order = [];
    each(links, function (link) {
      var id = link.getAttribute('href').slice(1);
      if (doc.getElementById(id)) { byId[id] = link; order.push(id); }
    });
    if (!order.length) return;
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
      var current = null;
      for (var i = 0; i < order.length; i++) {
        if (visible[order[i]]) { current = order[i]; break; }
      }
      each(links, function (link) { link.removeAttribute('aria-current'); });
      if (current) byId[current].setAttribute('aria-current', 'true');
    }, { rootMargin: '-40% 0px -55% 0px' });
    order.forEach(function (id) { io.observe(doc.getElementById(id)); });
  }

  /* 5 — Lightbox ----------------------------------------------------------------
     Triggers: img[data-lightbox]. Markup: a single .lightbox[hidden] per page.
     Its button labels are bilingual in the markup; the caption follows the alt
     text of the current language. */
  function initLightbox() {
    var box = doc.querySelector('.lightbox');
    var triggers = doc.querySelectorAll('img[data-lightbox]');
    if (!box || !triggers.length) return;

    var img = box.querySelector('.lightbox__img');
    var caption = box.querySelector('.lightbox__caption');
    var count = box.querySelector('.lightbox__count');
    var btnClose = box.querySelector('.lightbox__close');
    var btnPrev = box.querySelector('.lightbox__nav--prev');
    var btnNext = box.querySelector('.lightbox__nav--next');
    var items = Array.prototype.slice.call(triggers);
    var single = items.length < 2;
    var index = 0;
    var lastFocus = null;
    var closeTimer = null;

    btnPrev.hidden = single;
    btnNext.hidden = single;

    items.forEach(function (el, n) {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-haspopup', 'dialog');
      el.addEventListener('click', function () { open(n); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(n); }
      });
    });

    function show(n) {
      index = (n + items.length) % items.length;
      var source = items[index];
      img.src = source.getAttribute('data-full') || source.currentSrc || source.src;
      img.alt = source.alt;
      caption.textContent = source.getAttribute('data-caption') || source.alt;
      count.textContent = pad(index + 1) + ' / ' + pad(items.length);
    }

    function open(n) {
      window.clearTimeout(closeTimer);
      lastFocus = items[n];
      show(n);
      box.hidden = false;
      root.classList.add('has-lightbox');
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { box.classList.add('is-open'); });
      });
      btnClose.focus();
      doc.addEventListener('keydown', onKey);
    }

    function close() {
      box.classList.remove('is-open');
      root.classList.remove('has-lightbox');
      doc.removeEventListener('keydown', onKey);
      closeTimer = window.setTimeout(function () {
        box.hidden = true;
        img.removeAttribute('src');
      }, reduceMotion ? 0 : 320);
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    function focusables() {
      return Array.prototype.filter.call(box.querySelectorAll('button'), function (b) { return !b.hidden; });
    }

    function onKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowLeft' && !single) {
        e.preventDefault();
        show(index - 1);
      } else if (e.key === 'ArrowRight' && !single) {
        e.preventDefault();
        show(index + 1);
      } else if (e.key === 'Tab') {
        var f = focusables();
        var first = f[0];
        var last = f[f.length - 1];
        if (!box.contains(doc.activeElement)) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(index - 1); });
    btnNext.addEventListener('click', function () { show(index + 1); });
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lightbox__figure')) close();
    });
    doc.addEventListener('langchange', function () {
      if (!box.hidden) show(index);
    });
  }

  onReady(function () {
    initLang();
    initReveal();
    initMasthead();
    initNavState();
    initLightbox();
  });
})();
