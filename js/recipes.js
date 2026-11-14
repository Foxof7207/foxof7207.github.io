/* Gilly SMP recipe viewer.
   Data: /assets/recipes/recipes.json (generated from the survival-rework datapack), icons: /assets/recipes/items.png.
   State lives in the URL hash so searches can be shared: #q=steel&s=blast&make=<item>&use=<item> */
(function () {
  'use strict';

  var ORDER = ['kiln', 'blast', 'oven', 'campfire', 'smithing', 'crafting', 'stonecutter'];
  var PAGE = 48;
  var $ = function (sel, el) { return (el || document).querySelector(sel); };
  var el = function (tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };

  var D, ITEMS, RECIPES, makes = {}, uses = {}, byBase = {};
  var state = { q: '', s: 'all', make: null, use: null };
  var list = $('#rv-list'), status = $('#rv-status'), input = $('#rv-q'), chips = $('#rv-chips');
  var shown = [], rendered = 0, cyclers = [], tick = 0;

  function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function base(key) { return key.split('|')[0]; }
  function nameOf(key) { return (ITEMS[key] && ITEMS[key].n) || key; }

  function icon(key, sm) {
    var i = el('i', 'ico-i' + (sm ? ' sm' : ''));
    var it = ITEMS[key];
    if (it && it.x != null) {
      var s = D.size, c = D.cols, x = (it.x % c) * s, y = Math.floor(it.x / c) * s;
      if (sm) {
        var k = 20 / s;
        i.style.backgroundSize = (c * s * k) + 'px auto';
        i.style.backgroundPosition = (-x * k) + 'px ' + (-y * k) + 'px';
      } else {
        i.style.backgroundPosition = (-x) + 'px ' + (-y) + 'px';
      }
    }
    i.setAttribute('aria-hidden', 'true');
    return i;
  }

  function tagLabel(t) {
    var p = t.split(':').pop().split('/').pop().replace(/_/g, ' ');
    return 'Any ' + p.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
  }

  // ---------- index ----------
  function build(data) {
    D = data; ITEMS = data.items; RECIPES = data.recipes;
    RECIPES.forEach(function (r, idx) {
      r._i = idx;
      var out = r.o.i;
      (makes[out] = makes[out] || []).push(idx);
      var b = base(out);
      if (b !== out) (makes[b] = makes[b] || []).push(idx);
      var seen = {};
      slotsOf(r).forEach(function (s) {
        if (!s) return;
        s.k.forEach(function (k) {
          if (seen[k]) return; seen[k] = 1;
          (uses[k] = uses[k] || []).push(idx);
        });
      });
      r._name = norm(nameOf(out));
      r._alt = norm((ITEMS[out] && ITEMS[out].b) || '');
      r._ing = norm(slotsOf(r).map(function (s) { return s ? (s.t ? tagLabel(s.t) : '') + ' ' + s.k.map(nameOf).join(' ') : ''; }).join(' '));
      r._ord = ORDER.indexOf(r.s);
    });
    Object.keys(ITEMS).forEach(function (k) { var b = base(k); (byBase[b] = byBase[b] || []).push(k); });
    // an ingredient given as a plain id also matches custom items built on that id
    Object.keys(byBase).forEach(function (b) {
      byBase[b].forEach(function (k) {
        if (k !== b && uses[b]) uses[k] = (uses[k] || []).concat(uses[b].filter(function (i) { return (uses[k] || []).indexOf(i) < 0; }));
      });
    });
  }

  function slotsOf(r) { return r.grid || r.in || []; }

  // ---------- chips ----------
  function renderChips() {
    var counts = { all: RECIPES.length, food: 0 };
    RECIPES.forEach(function (r) { counts[r.s] = (counts[r.s] || 0) + 1; if (r.g === 'food') counts.food++; });
    var defs = [['all', 'All', null]].concat(ORDER.map(function (s) { return [s, D.stations[s].n, D.stations[s].i]; }));
    defs.splice(1, 0, ['food', 'Food', 'minecraft:bowl']);
    chips.textContent = '';
    defs.forEach(function (d) {
      var b = el('button', 'rv-chip' + (d[2] ? '' : ' plain'));
      b.type = 'button'; b.dataset.s = d[0];
      if (d[2]) b.appendChild(icon(d[2], true));
      b.appendChild(document.createTextNode(d[1] + ' '));
      b.appendChild(el('span', 'n', String(counts[d[0]] || 0)));
      b.setAttribute('aria-pressed', String(state.s === d[0]));
      b.addEventListener('click', function () { state.s = d[0]; commit(); });
      chips.appendChild(b);
    });
  }

  // ---------- filtering ----------
  function filter() {
    var pool;
    if (state.make) pool = (makes[state.make] || []).map(function (i) { return RECIPES[i]; });
    else if (state.use) pool = (uses[state.use] || []).map(function (i) { return RECIPES[i]; });
    else pool = RECIPES.slice();
    if (state.s === 'food') pool = pool.filter(function (r) { return r.g === 'food'; });
    else if (state.s !== 'all') pool = pool.filter(function (r) { return r.s === state.s; });
    var terms = norm(state.q).split(/\s+/).filter(Boolean);
    if (terms.length) {
      pool = pool.map(function (r) {
        var inName = terms.every(function (t) { return r._name.indexOf(t) >= 0; }) ||
          (r._alt && terms.every(function (t) { return r._alt.indexOf(t) >= 0; }));
        var inIng = !inName && terms.every(function (t) { return (r._name + ' ' + r._ing).indexOf(t) >= 0; });
        r._score = inName ? (r._name.indexOf(terms[0]) === 0 ? 0 : 1) : (inIng ? 2 : 9);
        return r;
      }).filter(function (r) { return r._score < 9; });
    } else pool.forEach(function (r) { r._score = 0; });
    pool.sort(function (a, b) { return a._score - b._score || a._ord - b._ord || (a._name < b._name ? -1 : a._name > b._name ? 1 : 0); });
    return pool;
  }

  // ---------- rendering ----------
  function slotEl(s, extraCls) {
    var b;
    if (!s || !s.k.length) { b = el('div', 'slot empty' + (extraCls ? ' ' + extraCls : '')); return b; }
    b = el('button', 'slot' + (extraCls ? ' ' + extraCls : ''));
    b.type = 'button';
    var keys = s.k;
    var ic = icon(keys[0]);
    b.appendChild(ic);
    b._keys = keys; b._tag = s.t || null; b._ic = ic;
    if (keys.length > 1) { b.appendChild(el('span', 'tagdot')); cyclers.push(b); }
    b.setAttribute('aria-label', s.t ? tagLabel(s.t) : (keys.length > 1 ? 'Any of: ' + keys.map(nameOf).join(', ') : nameOf(keys[0])));
    return b;
  }

  function card(r) {
    var c = el('article', 'rc');
    var head = el('div', 'rc-head');
    var t = el('button', 'rc-title', nameOf(r.o.i)); t.type = 'button';
    t.addEventListener('click', function () { openSheet(r.o.i); });
    head.appendChild(t);
    var st = el('span', 'rc-st');
    st.appendChild(icon(D.stations[r.s].i, true));
    st.appendChild(document.createTextNode(D.stations[r.s].n));
    head.appendChild(st);
    c.appendChild(head);

    var body = el('div', 'rc-body');
    var grid = el('div', 'rc-grid');
    var mid = el('div', 'rc-mid');
    if (r.grid) {
      grid.style.gridTemplateColumns = 'repeat(' + r.w + ', var(--slot))';
      r.grid.forEach(function (s) { grid.appendChild(slotEl(s)); });
    } else if (r.s === 'crafting') {
      var n = r.in.length, w = n <= 1 ? 1 : n <= 4 ? 2 : 3;
      grid.style.gridTemplateColumns = 'repeat(' + w + ', var(--slot))';
      r.in.forEach(function (s) { grid.appendChild(slotEl(s)); });
      mid.appendChild(el('span', 'rc-shapeless', 'any order'));
    } else if (r.s === 'smithing') {
      grid.style.gridTemplateColumns = 'repeat(3, var(--slot))';
      r.in.forEach(function (s) { grid.appendChild(slotEl(s)); });
    } else {
      grid.style.gridTemplateColumns = 'var(--slot)';
      grid.appendChild(slotEl(r.in[0]));
      if (r.s !== 'stonecutter') mid.appendChild(el('span', 'rc-flame'));
    }
    mid.appendChild(el('span', 'rc-arrow'));
    if (r.time) mid.appendChild(el('span', 'rc-note', (r.time / 20) + 's'));
    body.appendChild(grid); body.appendChild(mid);
    var out = slotEl({ k: [r.o.i] }, 'out');
    if (r.o.c > 1) out.appendChild(el('span', 'cnt', String(r.o.c)));
    body.appendChild(out);
    c.appendChild(body);
    return c;
  }

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (ents) {
    if (ents.some(function (e) { return e.isIntersecting; })) more();
  }, { rootMargin: '600px' }) : null;
  var sentinel = el('div', 'rv-sentinel');

  function more() {
    if (rendered >= shown.length) return;
    var frag = document.createDocumentFragment();
    shown.slice(rendered, rendered + PAGE).forEach(function (r) { frag.appendChild(card(r)); });
    rendered = Math.min(shown.length, rendered + PAGE);
    list.appendChild(frag);
    if (sentinel.parentNode) list.appendChild(sentinel);
    moreBtn.hidden = rendered >= shown.length || !!io;
  }
  var moreBtn = $('#rv-more');
  moreBtn.addEventListener('click', more);

  function renderStatus() {
    status.textContent = '';
    var focus = state.make || state.use;
    if (focus) {
      var f = el('span', 'rv-focus');
      f.appendChild(icon(focus, true));
      f.appendChild(document.createTextNode(state.make ? 'How to make ' : 'Recipes using '));
      f.appendChild(el('b', null, nameOf(focus)));
      var x = el('button', 'rv-x', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Show all recipes');
      x.addEventListener('click', function () { state.make = state.use = null; commit(); });
      f.appendChild(x);
      status.appendChild(f);
      var tabs = el('span', 'rv-tabs');
      [['make', 'Made by', makes[focus]], ['use', 'Used in', uses[focus]]].forEach(function (d) {
        var b = el('button', null, d[1] + ' (' + (d[2] ? d[2].length : 0) + ')'); b.type = 'button';
        b.setAttribute('aria-pressed', String(!!state[d[0]]));
        b.disabled = !d[2];
        b.addEventListener('click', function () { state.make = d[0] === 'make' ? focus : null; state.use = d[0] === 'use' ? focus : null; commit(); });
        tabs.appendChild(b);
      });
      status.appendChild(tabs);
    }
    status.appendChild(el('span', null, shown.length.toLocaleString('en') + ' recipe' + (shown.length === 1 ? '' : 's')));
  }

  function render() {
    shown = filter(); rendered = 0; cyclers = [];
    list.textContent = '';
    renderStatus();
    [].forEach.call(chips.children, function (b) { b.setAttribute('aria-pressed', String(b.dataset.s === state.s)); });
    if (!shown.length) {
      list.appendChild(el('p', 'rv-empty', 'No recipe matches. Try another word, or pick "All".'));
      moreBtn.hidden = true;
      return;
    }
    list.appendChild(sentinel);
    more();
    if (io) { io.disconnect(); io.observe(sentinel); }
  }

  // cycle tag ingredients like JEI
  setInterval(function () {
    tick++;
    cyclers.forEach(function (b) {
      if (!b.isConnected) return;
      var k = b._keys[tick % b._keys.length];
      var n = icon(k);
      b.replaceChild(n, b._ic); b._ic = n; b._cur = k;
    });
  }, 1300);

  // ---------- URL state ----------
  function readHash() {
    var p = new URLSearchParams(location.hash.slice(1));
    state.q = p.get('q') || '';
    state.s = p.get('s') || 'all';
    state.make = p.get('make'); state.use = p.get('use');
    if (state.make && !ITEMS[state.make] && !makes[state.make]) state.make = null;
    if (state.use && !ITEMS[state.use] && !uses[state.use]) state.use = null;
    input.value = state.q;
  }
  function writeHash(push) {
    var p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.s !== 'all') p.set('s', state.s);
    if (state.make) p.set('make', state.make);
    if (state.use) p.set('use', state.use);
    var h = p.toString();
    var url = location.pathname + location.search + (h ? '#' + h : '');
    if (push) history.pushState(null, '', url); else history.replaceState(null, '', url);
  }
  function commit(push) { writeHash(push !== false); render(); window.scrollTo({ top: Math.min(window.scrollY, $('.rv-bar').offsetTop), behavior: 'auto' }); }

  var qTimer;
  input.addEventListener('input', function () {
    clearTimeout(qTimer);
    qTimer = setTimeout(function () { state.q = input.value.trim(); writeHash(false); render(); }, 140);
  });
  window.addEventListener('popstate', function () { readHash(); render(); });
  window.addEventListener('hashchange', function () { readHash(); render(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== input && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
    if (e.key === 'Escape') closeSheet();
  });

  // ---------- item stats (in-game lore from the datapack) ----------
  var MC = { black: '#000', dark_blue: '#3a3aff', dark_green: '#22b022', dark_aqua: '#00aaaa', dark_red: '#c42020', dark_purple: '#b040b0',
    gold: '#ffaa00', gray: '#aaaaaa', dark_gray: '#7c7c7c', blue: '#6a6aff', green: '#55ff55', aqua: '#55ffff', red: '#ff5555',
    light_purple: '#ff55ff', yellow: '#ffff55', white: '#ffffff' };
  var RARITY = { uncommon: 'yellow', rare: 'aqua', epic: 'light_purple' };
  // what each stat glyph means, for players who don't know the icons ("s" = seconds, glued to the number)
  var GLYPH_LABEL = { 0x37: ' attack damage', 0x12: 's attack cooldown', 0x36: ' mining speed', 0x3d: ' armor', 0x08: ' armor toughness',
    0x22: ' movement speed', 0x27: ' safe fall distance', 0x23: ' knockback resistance', 0x0a: ' step height', 0x13: ' knockback', 0x28: ' reach' };
  function color(c) { return !c ? null : c.charAt(0) === '#' ? c : MC[c] || null; }

  function glyphText(parent, t) {
    var buf = '';
    function flush() { if (buf) { parent.appendChild(document.createTextNode(buf)); buf = ''; } }
    for (var i = 0; i < t.length; i++) {
      var c = t.charCodeAt(i) - 0xe000;
      if (c >= 0 && c < 96) {
        flush();
        var g = el('i', 'gl');
        g.style.webkitMaskPosition = g.style.maskPosition = (-(c % 16) * 16) + 'px ' + (-Math.floor(c / 16) * 16) + 'px';
        g.setAttribute('aria-hidden', 'true');
        parent.appendChild(g);
      } else buf += t.charAt(i);
    }
    flush();
  }

  function loreLabel(line) {
    if (line.length !== 1) return null;
    var t = line[0][0], m = /^([\ue000-\ue05f]) [+\-]?[\d.]+$/.exec(t);
    if (m) return GLYPH_LABEL[m[1].charCodeAt(0) - 0xe000] || null;
    if (/^[\ue030\ue032]+$/.test(t)) return ' heals';
    if (/^[\ue030\ue032]+ \(/.test(t) && line[0][1] === 'aqua') return ' absorption';
    return null;
  }

  function statLines(key, box) {
    var it = ITEMS[key] || {};
    (it.l || []).forEach(function (line) {
      var d = el('div', 'lo');
      line.forEach(function (s) {
        var sp = el('span'); var c = color(s[1]); if (c) sp.style.color = c;
        glyphText(sp, s[0]); d.appendChild(sp);
      });
      var lb = loreLabel(line);
      if (lb) d.appendChild(el('span', 'lo-k', lb));
      box.appendChild(d);
    });
    if (it.d) box.appendChild(el('div', 'lo lo-dur', 'Durability ' + it.d.toLocaleString('en')));
    return !!(it.l || it.d);
  }

  function tipName(k) {
    var n = el('div', 'tip-n', nameOf(k));
    var r = ITEMS[k] && ITEMS[k].r;
    if (r && RARITY[r]) n.style.color = MC[RARITY[r]];
    return n;
  }

  // ---------- tooltip (mouse) ----------
  var tip = $('#mc-tip');
  list.addEventListener('pointerover', function (e) {
    var s = e.target.closest('.slot');
    if (!s || e.pointerType !== 'mouse' || !s._keys) return;
    var k = s._cur || s._keys[0];
    tip.textContent = '';
    tip.appendChild(tipName(k));
    statLines(k, tip);
    if (s._tag || s._keys.length > 1) tip.appendChild(el('small', null, s._tag ? tagLabel(s._tag) : s._keys.length + ' options'));
    tip.appendChild(el('small', null, 'Click for recipes'));
    tip.hidden = false;
  });
  list.addEventListener('pointermove', function (e) {
    if (tip.hidden) return;
    var x = e.clientX + 14, y = e.clientY - 12 - tip.offsetHeight;
    if (x + tip.offsetWidth > innerWidth - 8) x = e.clientX - 14 - tip.offsetWidth;
    if (y < 8) y = e.clientY + 18;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  });
  list.addEventListener('pointerout', function (e) { if (e.target.closest('.slot')) tip.hidden = true; });

  // ---------- item sheet ----------
  var bg = $('#rv-sheet-bg'), lastFocus;
  list.addEventListener('click', function (e) {
    var s = e.target.closest('.slot');
    if (!s || !s._keys) return;
    tip.hidden = true;
    openSheet(s._cur || s._keys[0], s._keys.length > 1 ? s._keys : null, s._tag);
  });

  function openSheet(key, alts, tag) {
    lastFocus = document.activeElement;
    var sh = $('.rv-sheet', bg);
    sh.textContent = '';
    var top = el('div', 'rv-sheet-top');
    var sl = el('div', 'slot'); sl.appendChild(icon(key)); top.appendChild(sl);
    var txt = el('div');
    var h = el('h2', null, nameOf(key)); h.id = 'rv-sheet-title'; txt.appendChild(h);
    var it = ITEMS[key] || {};
    if (it.b) {
      var bl = el('div', 'bedrock');
      bl.appendChild(document.createTextNode('On Bedrock it looks like '));
      bl.appendChild(el('b', null, it.b));
      txt.appendChild(bl);
    }
    txt.appendChild(el('div', 'sub', base(key)));
    top.appendChild(txt);
    sh.appendChild(top);
    var stats = el('div', 'rv-stats mc-tip');
    if (statLines(key, stats)) sh.appendChild(stats);
    var row = el('div', 'btn-row');
    var nm = (makes[key] || []).length, nu = (uses[key] || []).length;
    var b1 = el('button', 'btn btn-yellow', 'How to make (' + nm + ')'); b1.type = 'button'; b1.disabled = !nm;
    var b2 = el('button', 'btn btn-green', 'Used in (' + nu + ')'); b2.type = 'button'; b2.disabled = !nu;
    b1.addEventListener('click', function () { state.make = key; state.use = null; state.q = ''; input.value = ''; state.s = 'all'; closeSheet(); commit(); });
    b2.addEventListener('click', function () { state.use = key; state.make = null; state.q = ''; input.value = ''; state.s = 'all'; closeSheet(); commit(); });
    row.appendChild(b1); row.appendChild(b2); sh.appendChild(row);
    if (!nm) sh.appendChild(el('p', 'rv-alts', 'No recipe makes this item: find it in the world, from mobs, fishing or trades.'));
    if (alts) {
      var a = el('div', 'rv-alts');
      a.appendChild(el('p', null, (tag ? tagLabel(tag) + ': ' : 'Any of these: ') + 'tap one to switch.'));
      var r = el('div', 'row');
      alts.slice(0, 60).forEach(function (k) {
        var b = el('button', 'slot'); b.type = 'button'; b.appendChild(icon(k)); b.setAttribute('aria-label', nameOf(k)); b.title = nameOf(k);
        b.addEventListener('click', function () { openSheet(k, alts, tag); });
        r.appendChild(b);
      });
      a.appendChild(r); sh.appendChild(a);
    }
    bg.hidden = false;
    var f = nm ? b1 : nu ? b2 : null;
    if (f) f.focus(); else { h.tabIndex = -1; h.focus(); }
  }
  function closeSheet() { if (!bg.hidden) { bg.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); } }
  bg.addEventListener('click', function (e) { if (e.target === bg) closeSheet(); });

  // ---------- boot ----------
  fetch('/assets/recipes/recipes.json?v=e49cfcf8').then(function (r) { return r.json(); }).then(function (data) {
    build(data);
    readHash();
    renderChips();
    render();
    $('#rv-loading').remove();
  }).catch(function () {
    $('#rv-loading').textContent = 'Could not load the recipes. Please refresh the page.';
  });
})();
