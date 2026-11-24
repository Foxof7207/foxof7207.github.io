// Language: set by <html lang>. Every page loads this file first, so T() is available
// to main.js, recipes.js and advancements.js. English is the source text; fr is inline.
var LANG = document.documentElement.lang || 'en';
var BASE = { fr: '/fr', de: '/de', es: '/es' }[LANG] || '';
var LOCALE = { fr: 'fr-FR', de: 'de-DE', es: 'es-ES' }[LANG] || 'en-US';
var I18N = { de: {
 "After ": "Nach ",
 "Chance ": "Chance ",
 "Clear your ticked steps for the ": "Abgehakte Schritte für den Reiter ",
 "Completed: ": "Erledigt: ",
 "Could not load the guide. Please refresh the page.": "Der Leitfaden konnte nicht geladen werden. Bitte lade die Seite neu.",
 "Everything here is done. Nice work!": "Hier ist alles erledigt. Gut gemacht!",
 "hidden on Java": "auf Java ausgeblendet",
 "Mark as done: ": "Als erledigt markieren: ",
 "Nothing matches. Try another word.": "Nichts gefunden. Versuche ein anderes Wort.",
 " of 4": " von 4",
 "Rarity ": "Seltenheit ",
 "Recipe: ": "Rezept: ",
 "REWARD": "BELOHNUNG",
 " tab?": "?",
 "TO DO": "OFFEN",
 "Copied!": "Kopiert!",
 "Java 26.3 required.": "Java 26.3 erforderlich.",
 "Needs your console's online subscription.": "Erfordert das Online-Abo deiner Konsole.",
 "Port 19132. On Windows, Android and iOS the \"Add to Minecraft\" button below does it for you.": "Port 19132. Unter Windows, Android und iOS erledigt das der Button „Zu Minecraft hinzufügen“ unten für dich.",
 "Press Ctrl+C to copy": "Drücke Strg+C zum Kopieren",
 "result": "Ergebnis",
 "results": "Ergebnisse",
 "Server currently offline": "Server derzeit offline",
 "Server online, be the first in": "Server online, sei der Erste",
 "Suggested for your device": "Für dein Gerät empfohlen",
 "player": "Spieler",
 "players": "Spieler",
 "online right now": "gerade online",
 "All": "Alle",
 "Any ": "Beliebig ",
 "Any of: ": "Eines von: ",
 "Any of these: ": "Eines von diesen: ",
 "any order": "beliebige Reihenfolge",
 "Click for recipes": "Klicken für Rezepte",
 "Could not load the recipes. Please refresh the page.": "Rezepte konnten nicht geladen werden. Bitte lade die Seite neu.",
 "Durability ": "Haltbarkeit ",
 "Food": "Essen",
 "Heals ": "Heilt ",
 "How to make ": "So stellst du her: ",
 "How to make (": "So stellst du her (",
 "Made by": "Hergestellt von",
 "No recipe makes this item: find it in the world, from mobs, fishing or trades.": "Kein Rezept stellt diesen Gegenstand her: finde ihn in der Welt, bei Mobs, beim Angeln oder durch Handel.",
 "No recipe matches. Try another word, or pick \"All\".": "Kein Rezept passt. Probiere ein anderes Wort oder wähle „Alle“.",
 "On Bedrock it looks like ": "Auf Bedrock sieht er aus wie ",
 "Recipes using ": "Rezepte mit ",
 "Show all recipes": "Alle Rezepte anzeigen",
 "tap one to switch.": "tippe auf einen, um zu wechseln.",
 "Used in (": "Verwendet in (",
 "Used in": "Verwendet in"
}, es: {
 "After ": "Tras ",
 "Chance ": "Probabilidad ",
 "Clear your ticked steps for the ": "Borrar los pasos marcados de la pestaña ",
 "Completed: ": "Completado: ",
 "Could not load the guide. Please refresh the page.": "No se pudo cargar la guía. Recarga la página.",
 "Everything here is done. Nice work!": "¡Todo está hecho aquí. Buen trabajo!",
 "hidden on Java": "oculto en Java",
 "Mark as done: ": "Marcar como hecho: ",
 "Nothing matches. Try another word.": "No hay coincidencias. Prueba otra palabra.",
 " of 4": " de 4",
 "Rarity ": "Rareza ",
 "Recipe: ": "Receta: ",
 "REWARD": "RECOMPENSA",
 " tab?": "?",
 "TO DO": "PENDIENTE",
 "Copied!": "¡Copiado!",
 "Java 26.3 required.": "Se requiere Java 26.3.",
 "Needs your console's online subscription.": "Requiere la suscripción en línea de tu consola.",
 "Port 19132. On Windows, Android and iOS the \"Add to Minecraft\" button below does it for you.": "Puerto 19132. En Windows, Android e iOS, el botón «Añadir a Minecraft» de abajo lo hace por ti.",
 "Press Ctrl+C to copy": "Pulsa Ctrl+C para copiar",
 "result": "resultado",
 "results": "resultados",
 "Server currently offline": "El servidor está desconectado",
 "Server online, be the first in": "¡Servidor en línea, sé el primero!",
 "Suggested for your device": "Recomendado para tu dispositivo",
 "player": "jugador",
 "players": "jugadores",
 "online right now": "conectados ahora",
 "All": "Todas",
 "Any ": "Cualquier ",
 "Any of: ": "Uno de: ",
 "Any of these: ": "Uno de estos: ",
 "any order": "en cualquier orden",
 "Click for recipes": "Haz clic para ver recetas",
 "Could not load the recipes. Please refresh the page.": "No se pudieron cargar las recetas. Recarga la página.",
 "Durability ": "Durabilidad ",
 "Food": "Comida",
 "Heals ": "Cura ",
 "How to make ": "Cómo fabricar ",
 "How to make (": "Cómo fabricar (",
 "Made by": "Fabricado por",
 "No recipe makes this item: find it in the world, from mobs, fishing or trades.": "Ninguna receta fabrica este objeto: consíguelo en el mundo, con mobs, pescando o comerciando.",
 "No recipe matches. Try another word, or pick \"All\".": "Ninguna receta coincide. Prueba otra palabra o elige «Todas».",
 "On Bedrock it looks like ": "En Bedrock se ve como ",
 "Recipes using ": "Recetas que usan ",
 "Show all recipes": "Mostrar todas las recetas",
 "tap one to switch.": "toca una para cambiar.",
 "Used in (": "Usado en (",
 "Used in": "Usado en"
} };
function T(en, fr) {
  if (LANG === 'fr') return fr;
  var d = I18N[LANG];
  return d && d[en] !== undefined ? d[en] : en;
}
(function () {
  'use strict';

  // Clickjacking guard (GitHub Pages cannot send X-Frame-Options / frame-ancestors)
  try { if (window.top !== window.self) window.top.location = window.self.location; } catch (e) { document.documentElement.style.display = 'none'; }

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

  // ---- Bedrock "Add to Minecraft" link ----
  // Bedrock only exists on Windows, Android and iOS/iPadOS (iPads report a Mac UA but have touch).
  var ua = navigator.userAgent;
  var isMacDesktop = /Macintosh/.test(ua) && !(navigator.maxTouchPoints > 1);
  var isLinuxDesktop = /Linux/.test(ua) && !/Android/.test(ua);
  if (isMacDesktop || isLinuxDesktop) {
    document.documentElement.classList.add('no-bedrock-link');
  }

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
        b.innerHTML = ok ? '<i class="ic" style="--i:url(/assets/icons/check.svg)" aria-hidden="true"></i> ' + T('Copied!', 'Copié !') : T('Press Ctrl+C to copy', 'Appuyez sur Ctrl+C pour copier');
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
    var items = [].map.call(document.querySelectorAll('.qa, .spoiler'), function (el) {
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
        var any = s.querySelector('.qa:not([hidden]), .spoiler:not([hidden])');
        s.hidden = !any;
        var link = document.querySelector('.wiki-side a[href="#' + s.id + '"]');
        if (link) link.parentNode.hidden = !any;
      });
      empty.hidden = shown !== 0;
      count.textContent = terms.length ? shown + ' ' + (shown === 1 ? T('result', 'résultat') : T('results', 'résultats')) : '';
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

// ---- Engagement: quick-join, device recommendation, live status ----
(function () {
  'use strict';
  var ua = navigator.userAgent;
  var guess = /PlayStation|Xbox|Nintendo/i.test(ua) ? 'console'
    : (/Android|iPhone|iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) ? 'bedrock'
    : 'java';
  var data = {
    java: { addr: 'play.matchasmp.eu', copy: 'play.matchasmp.eu', note: T('Java 26.3 required.', 'Minecraft Java 26.3 requis.') },
    bedrock: { addr: 'play.matchasmp.eu · port 19132', copy: 'play.matchasmp.eu', note: T('Port 19132. On Windows, Android and iOS the "Add to Minecraft" button below does it for you.', 'Port 19132. Sous Windows, Android et iOS, le bouton « Ajouter à Minecraft » ci-dessous s\'en charge.') },
    console: { addr: 'Friend: MatchaSMP', copy: 'MatchaSMP', note: T('Needs your console\'s online subscription.', 'Nécessite l\'abonnement en ligne de votre console.') }
  };
  var tabs = [].slice.call(document.querySelectorAll('.seg [data-q]'));
  var addr = document.getElementById('quick-addr'), btn = document.getElementById('quick-copy'), note = document.getElementById('quick-note');
  function select(k) {
    tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.q === k)); });
    if (!addr) return;
    addr.textContent = data[k].addr; btn.setAttribute('data-copy', data[k].copy); note.textContent = data[k].note;
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { select(t.dataset.q); }); });
  if (tabs.length) select(guess);

  // Mark the card matching the visitor's device
  var card = document.querySelector('.join-card[data-platform="' + guess + '"]');
  if (card) {
    card.classList.add('recommended');
    var tag = document.createElement('span'); tag.className = 'rec'; tag.textContent = T('Suggested for your device', 'Suggéré pour votre appareil');
    card.appendChild(tag);
  }

  // Real player count, hidden if the lookup fails
  var st = document.getElementById('status');
  if (st && window.fetch) {
    fetch('https://api.mcsrvstat.us/3/play.matchasmp.eu').then(function (r) { return r.json(); }).then(function (d) {
      var text = document.getElementById('status-text');
      if (d && d.online && d.players) {
        var n = d.players.online;
        text.textContent = n > 0 ? n + ' ' + (n === 1 ? T('player', 'joueur') : T('players', 'joueurs')) + ' ' + T('online right now', 'en ligne maintenant') : T('Server online, be the first in', 'Serveur en ligne, soyez le premier');
      } else if (d && d.online === false) { text.textContent = T('Server currently offline', 'Serveur actuellement hors ligne'); st.classList.add('off'); }
      else return;
      st.hidden = false;
    }).catch(function () {});
  }
})();
