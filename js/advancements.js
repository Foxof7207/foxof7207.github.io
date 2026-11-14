/* Gilly SMP advancement guide.
   Data: /assets/advancements/advancements.json (generated from the survival-rework datapack).
   Progress is a per-device convenience kept in localStorage. URL: #tab=hell&q=steel or #a=<advancement id>. */
(function () {
  'use strict';

  var KEY = 'gilly-adv-done-v1';
  var $ = function (s, e) { return (e || document).querySelector(s); };
  var el = function (tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  var D, byId = {}, done = {}, state = { tab: 'tutorial', q: '', hideDone: false };
  var root = $('#av-root'), tabsEl = $('#av-tabs'), input = $('#av-q'), hideBox = $('#av-hide');

  try { done = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { done = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) { /* private mode: progress lives for this visit only */ } }

  function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function stripTags(h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; }

  function sprite(idx) {
    var i = el('i', 'av-sprite');
    if (idx != null) i.style.backgroundPosition = (-(idx % D.cols) * 32) + 'px ' + (-Math.floor(idx / D.cols) * 32) + 'px';
    i.setAttribute('aria-hidden', 'true');
    return i;
  }
  function itemIcon(x) {
    var i = el('i', 'av-item');
    if (x != null) { var k = 20 / 32; i.style.backgroundPosition = (-(x % 32) * 32 * k) + 'px ' + (-Math.floor(x / 32) * 32 * k) + 'px'; }
    i.setAttribute('aria-hidden', 'true');
    return i;
  }
  var FRAME = { task: 0, goal: 1, challenge: 2 };
  function framePos(f, isDone) { return (-(FRAME[f] + (isDone ? 3 : 0)) * 52) + 'px 0'; }

  // ---------- counts ----------
  function tabItems(tab) {
    if (tab === 'almanac') return [].concat.apply([], D.almanac.groups.map(function (g) { return g.e; }));
    return D.advs.filter(function (a) { return a.tab === tab; });
  }
  function renderTabs() {
    tabsEl.textContent = '';
    D.tabs.forEach(function (t) {
      var items = tabItems(t.id), n = items.filter(function (a) { return done[a.id]; }).length;
      var b = el('button', 'av-tab'); b.type = 'button'; b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(state.tab === t.id));
      b.appendChild(sprite(t.icon_ic));
      b.appendChild(el('span', 'nm', t.n));
      b.appendChild(el('span', 'pg', n + '/' + items.length));
      b.addEventListener('click', function () { state.tab = t.id; state.q = ''; input.value = ''; commit(true); window.scrollTo({ top: $('#av-tabs').offsetTop - 80 }); });
      tabsEl.appendChild(b);
    });
  }

  // ---------- rewards ----------
  function reward(code) {
    var p = el('p');
    p.appendChild(el('span', 'lbl rw', 'REWARD'));
    var img = function (src) { var i = el('img', 'glyph'); i.src = src; i.alt = ''; i.width = 16; i.height = 16; return i; };
    if (code === 'H') {
      p.appendChild(img('/assets/advancements/brokenheart.png'));
      p.appendChild(el('span', 'rw-heart', ' Heart mark '));
      p.appendChild(el('span', 'rw-note', 'lowers your minimum hearts. You never go below 10 on Gilly SMP.'));
    } else {
      var n = parseInt(code.slice(1), 10);
      if (code[0] === 'o') {
        p.appendChild(img('/assets/advancements/obol.png'));
        p.appendChild(el('span', 'rw-obol', ' ' + n + ' Obol' + (n > 1 ? 's' : '')));
      } else {
        p.appendChild(img('/assets/advancements/crystal_heart.png'));
        p.appendChild(el('span', 'rw-heart', ' ' + n + ' Crystal Heart' + (n > 1 ? 's' : '')));
        p.appendChild(el('span', 'rw-note', ' · permanent extra health'));
      }
    }
    return p;
  }

  function checkBtn(id, label, card) {
    var b = el('button', 'ac-check', '✓'); b.type = 'button';
    var sync = function () {
      var d = !!done[id];
      card.classList.toggle('done', d);
      b.setAttribute('aria-pressed', String(d));
      b.setAttribute('aria-label', (d ? 'Completed: ' : 'Mark as done: ') + label);
      var fr = $('.ac-frame', card); if (fr) fr.style.backgroundPosition = framePos(card.dataset.f, d);
    };
    b.addEventListener('click', function () {
      if (done[id]) delete done[id]; else done[id] = 1;
      save(); sync(); renderTabs(); renderProgress();
      if (state.hideDone && done[id]) setTimeout(render, 350);
    });
    sync();
    return b;
  }

  // ---------- advancement card ----------
  function card(a) {
    var c = el('article', 'ac'); c.id = 'a-' + a.id.replace(/\//g, '-'); c.dataset.f = a.f;
    var bar = el('div', 'ac-bar');
    var fr = el('div', 'ac-frame'); fr.appendChild(sprite(a.ic)); bar.appendChild(fr);
    var head = el('div', 'ac-head');
    head.appendChild(el('h3', 'ac-title', a.t));
    var meta = el('div', 'ac-meta', '#' + a.num + ' · ' + a.f);
    if (a.hid) { meta.appendChild(document.createTextNode(' · ')); meta.appendChild(el('span', 'hid', 'hidden on Java')); }
    head.appendChild(meta);
    bar.appendChild(head);
    bar.appendChild(checkBtn(a.id, a.t, c));
    c.appendChild(bar);

    var body = el('div', 'ac-body');
    if (a.p && byId[a.p]) {
      var pa = byId[a.p], af = el('p', 'ac-after', 'After ');
      var link = el('a', null, '#' + pa.num + ' ' + pa.t); link.href = '#a=' + encodeURIComponent(pa.id);
      af.appendChild(link); body.appendChild(af);
    }
    if (a.h) body.appendChild(el('p', 'ac-hint', '“' + a.h + '”'));
    var todo = el('p'); todo.appendChild(el('span', 'lbl todo', 'TO DO'));
    var g = el('span'); g.innerHTML = a.goal; todo.appendChild(g); body.appendChild(todo);
    if (a.tip) { var tp = el('p'); tp.appendChild(el('span', 'lbl tip', 'TIP')); var t = el('span'); t.innerHTML = a.tip; tp.appendChild(t); body.appendChild(tp); }
    if (a.r) body.appendChild(reward(a.r));
    if (a.rec) {
      var rr = el('div', 'ac-recipes');
      a.rec.forEach(function (r) {
        var l = el('a'); l.href = '/recipes.html#make=' + encodeURIComponent(r[0]);
        l.appendChild(itemIcon(r[2])); l.appendChild(document.createTextNode('Recipe: ' + r[1]));
        rr.appendChild(l);
      });
      body.appendChild(rr);
    }
    c.appendChild(body);
    return c;
  }

  function fish(e) {
    var c = el('article', 'fish'); c.id = 'a-' + e.id.replace(/\//g, '-'); c.dataset.f = 'task';
    var s = el('div', 'slot'); s.appendChild(sprite(e.ic)); c.appendChild(s);
    var bd = el('div', 'bd');
    bd.appendChild(el('h3', null, e.t));
    var line = el('div');
    if (e.st) {
      var st = el('span', 'stars'); st.setAttribute('aria-label', 'Rarity ' + e.st + ' of 4');
      st.appendChild(document.createTextNode('★'.repeat(e.st)));
      if (e.st < 4) st.appendChild(el('span', 'off', '★'.repeat(4 - e.st)));
      line.appendChild(st); line.appendChild(document.createTextNode(' '));
    }
    if (e.ch) line.appendChild(el('span', 'ch', 'Chance ' + e.ch));
    bd.appendChild(line);
    if (e.h) bd.appendChild(el('p', null, e.h));
    c.appendChild(bd);
    c.appendChild(checkBtn(e.id, e.t, c));
    return c;
  }

  // ---------- render ----------
  function matches(text) {
    var terms = norm(state.q).split(/\s+/).filter(Boolean);
    var t = norm(text);
    return terms.every(function (x) { return t.indexOf(x) >= 0; });
  }

  function renderProgress() {
    var items = tabItems(state.tab), n = items.filter(function (a) { return done[a.id]; }).length;
    $('#av-xp-fill').style.width = (items.length ? (100 * n / items.length) : 0) + '%';
    $('#av-xp-text').innerHTML = '<b>' + n + '</b> / ' + items.length + ' done';
  }

  function render() {
    root.textContent = '';
    var tab = D.tabs.filter(function (t) { return t.id === state.tab; })[0];
    renderTabs(); renderProgress();
    if (tab.note) root.appendChild(el('p', 'av-note', tab.note));
    var count = 0;
    if (state.tab === 'almanac') {
      if (tab.intro) root.appendChild(el('p', 'sec-intro', tab.intro + '. Fish depend on the biome and the water temperature. Junk and treasure can be caught anywhere.'));
      D.almanac.groups.forEach(function (g) {
        var es = g.e.filter(function (e) { return (!state.hideDone || !done[e.id]) && matches(e.t + ' ' + e.h + ' ' + g.n); });
        if (!es.length) return;
        var sec = el('section', 'av-chapter');
        sec.appendChild(el('h2', null, g.n));
        var grid = el('div', 'av-grid');
        es.forEach(function (e) { grid.appendChild(fish(e)); count++; });
        sec.appendChild(grid); root.appendChild(sec);
      });
    } else {
      D.chapters.filter(function (c) { return c.tab === state.tab; }).forEach(function (ch) {
        var as = D.advs.filter(function (a) {
          return a.ch === ch.id && (!state.hideDone || !done[a.id]) &&
            matches(a.t + ' ' + a.h + ' ' + stripTags(a.goal) + ' ' + stripTags(a.tip || '') + ' ' + ch.n);
        });
        if (!as.length) return;
        var sec = el('section', 'av-chapter');
        sec.appendChild(el('h2', null, ch.n));
        var ip = el('p'); ip.innerHTML = ch.intro; sec.appendChild(ip);
        var grid = el('div', 'av-grid');
        as.forEach(function (a) { grid.appendChild(card(a)); count++; });
        sec.appendChild(grid); root.appendChild(sec);
      });
    }
    if (!count) root.appendChild(el('p', 'av-empty', state.hideDone && !state.q ? 'Everything here is done. Nice work!' : 'Nothing matches. Try another word.'));
  }

  // ---------- URL state ----------
  function readHash() {
    var p = new URLSearchParams(location.hash.slice(1));
    var a = p.get('a');
    if (a) {
      var target = byId[a] || null, tab = target ? target.tab : (a.indexOf('anglers_almanac/') === 0 ? 'almanac' : null);
      if (tab) { state.tab = tab; state.q = ''; input.value = ''; render(); focusCard(a); return false; }
    }
    var t = p.get('tab');
    state.tab = D.tabs.some(function (x) { return x.id === t; }) ? t : 'tutorial';
    state.q = p.get('q') || ''; input.value = state.q;
    return true;
  }
  function writeHash(push) {
    var p = new URLSearchParams();
    if (state.tab !== 'tutorial') p.set('tab', state.tab);
    if (state.q) p.set('q', state.q);
    var h = p.toString(), url = location.pathname + (h ? '#' + h : '');
    if (push) history.pushState(null, '', url); else history.replaceState(null, '', url);
  }
  function commit(push) { writeHash(push); render(); }

  function focusCard(id) {
    var c = document.getElementById('a-' + id.replace(/\//g, '-'));
    if (!c) return;
    c.scrollIntoView({ behavior: 'smooth', block: 'start' });
    c.classList.add('flash'); setTimeout(function () { c.classList.remove('flash'); }, 1600);
  }

  var qt;
  input.addEventListener('input', function () { clearTimeout(qt); qt = setTimeout(function () { state.q = input.value.trim(); writeHash(false); render(); }, 150); });
  hideBox.addEventListener('change', function () { state.hideDone = hideBox.checked; render(); });
  $('#av-reset').addEventListener('click', function () {
    if (!confirm('Clear your ticked steps for the ' + D.tabs.filter(function (t) { return t.id === state.tab; })[0].n + ' tab?')) return;
    tabItems(state.tab).forEach(function (a) { delete done[a.id]; });
    save(); render();
  });
  window.addEventListener('hashchange', function () { if (readHash()) render(); });
  window.addEventListener('popstate', function () { if (readHash()) render(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== input && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
  });

  fetch('/assets/advancements/advancements.json?v=34b96165').then(function (r) { return r.json(); }).then(function (data) {
    D = data;
    D.advs.forEach(function (a) { byId[a.id] = a; });
    $('#av-loading').remove();
    if (readHash()) render();
  }).catch(function () { $('#av-loading').textContent = 'Could not load the guide. Please refresh the page.'; });
})();
