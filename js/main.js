(function () {
  'use strict';

  // ---- Mobile nav ----
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Flip cards (click / tap / keyboard) ----
  document.querySelectorAll('.flip').forEach(function (card) {
    var btn = card.querySelector('.flip-btn');
    card.addEventListener('click', function (e) {
      if (e.target.closest('.copy')) return;
      var flipped = card.classList.toggle('is-flipped');
      if (btn) btn.setAttribute('aria-pressed', String(flipped));
    });
  });

  // ---- Copy buttons ----
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (err) {}
    document.body.removeChild(ta);
    return ok;
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    var original = b.innerHTML;
    var timer;
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      copyText(b.getAttribute('data-copy')).then(function (ok) {
        clearTimeout(timer);
        b.classList.toggle('copied', ok);
        b.classList.toggle('failed', !ok);
        b.innerHTML = ok ? '<i class="ic" style="--i:url(/assets/icons/check.svg)" aria-hidden="true"></i> Copied!' : 'Press Ctrl+C to copy';
        timer = setTimeout(function () {
          b.classList.remove('copied', 'failed');
          b.innerHTML = original;
        }, 2000);
      });
    });
  });

  // ---- Wiki search ----
  var input = document.getElementById('wiki-search');
  if (input) {
    var items = [].map.call(document.querySelectorAll('.qa'), function (el) {
      return { el: el, text: el.textContent.toLowerCase(), section: el.closest('article') };
    });
    var sections = [].slice.call(document.querySelectorAll('.wiki article'));
    var count = document.getElementById('wiki-count');
    var empty = document.getElementById('wiki-empty');
    var filter = function () {
      var terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
      var shown = 0;
      items.forEach(function (it) {
        var ok = terms.every(function (t) { return it.text.indexOf(t) !== -1; });
        it.el.hidden = !ok;
        if (ok) shown++;
      });
      sections.forEach(function (s) {
        var any = s.querySelector('.qa:not([hidden])');
        s.hidden = !any;
        var link = document.querySelector('.wiki-side a[href="#' + s.id + '"]');
        if (link) link.parentNode.hidden = !any;
      });
      empty.hidden = shown !== 0;
      count.textContent = terms.length ? shown + ' result' + (shown === 1 ? '' : 's') : '';
    };
    input.addEventListener('input', filter);
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== input && !/input|textarea/i.test(document.activeElement.tagName)) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  // ---- Wiki scroll-spy: highlight the section being read ----
  var spyLinks = [].slice.call(document.querySelectorAll('.wiki-side a[href^="#"]'));
  if (spyLinks.length) {
    var spySections = spyLinks.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var current = null, spyTicking = false;
    var spy = function () {
      spyTicking = false;
      var line = 68 + 120, active = null;
      for (var i = 0; i < spySections.length; i++) {
        var s = spySections[i];
        if (!s || s.hidden) continue;
        if (s.getBoundingClientRect().top <= line) active = i; else break;
      }
      if (active === null) {
        for (var k = 0; k < spySections.length; k++) { if (spySections[k] && !spySections[k].hidden) { active = k; break; } }
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        for (var m = spySections.length - 1; m >= 0; m--) { if (spySections[m] && !spySections[m].hidden) { active = m; break; } }
      }
      if (active === current) return;
      current = active;
      spyLinks.forEach(function (a, idx) {
        var on = idx === active;
        a.classList.toggle('active', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
      var link = spyLinks[active], list = link && link.closest('ul');
      if (list && list.scrollHeight > list.clientHeight) {
        var top = link.offsetTop - list.offsetTop;
        if (top < list.scrollTop || top + link.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = top - 40;
      }
    };
    var spyReq = function () { if (!spyTicking) { spyTicking = true; requestAnimationFrame(spy); } };
    window.addEventListener('scroll', spyReq, { passive: true });
    window.addEventListener('resize', spyReq);
    document.addEventListener('input', spyReq);
    spy();
  }

  // ---- Wiki search: slides into the sidebar when scrolling ----
  var bar = document.querySelector('.wiki-search');
  var slot = document.querySelector('.wiki-search-slot');
  var side = document.querySelector('.wiki-side');
  if (bar && slot && side) {
    var navH = 68, docked = false, ticking = false, moveTimer;
    var desktop = window.matchMedia('(min-width: 901px)');
    var place = function () {
      ticking = false;
      if (!desktop.matches) {
        bar.classList.remove('js-float', 'docked');
        side.classList.remove('search-docked');
        bar.style.cssText = ''; slot.style.height = '';
        docked = false;
        return;
      }
      if (!bar.classList.contains('js-float')) {
        slot.style.height = bar.offsetHeight + 'px';
        bar.classList.add('js-float');
      }
      var s = slot.getBoundingClientRect();
      var sd = side.getBoundingClientRect();
      var shouldDock = sd.top <= navH + 21;
      if (shouldDock !== docked) {
        docked = shouldDock;
        bar.classList.add('moving');
        clearTimeout(moveTimer);
        moveTimer = setTimeout(function () { bar.classList.remove('moving'); }, 450);
        bar.classList.toggle('docked', docked);
        side.classList.toggle('search-docked', docked);
      }
      if (docked) {
        bar.style.left = (sd.left + 14) + 'px';
        bar.style.width = (sd.width - 28) + 'px';
        bar.style.top = (navH + 20 + 14) + 'px';
      } else {
        bar.style.left = s.left + 'px';
        bar.style.width = s.width + 'px';
        bar.style.top = Math.max(s.top, navH + 12) + 'px';
      }
    };
    var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(place); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    place();
  }
})();
