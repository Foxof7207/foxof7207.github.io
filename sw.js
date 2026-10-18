// Service worker: precaches the site shell, network-first for pages,
// cache-first for static assets. Bump VERSION to invalidate old caches.
var VERSION = 'v1';
var SHELL = 'gilly-shell-' + VERSION;
var ASSETS = 'gilly-assets-' + VERSION;

var PRECACHE = [
  '/',
  '/wiki.html',
  '/404.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.webmanifest',
  '/assets/favicon.png',
  '/assets/logo.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(SHELL)
      .then(function (cache) { return cache.addAll(PRECACHE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys
          .filter(function (k) { return k !== SHELL && k !== ASSETS; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Pages: network first, fall back to cache, then the 404 page.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(function (res) {
          var copy = res.clone();
          if (res.ok) caches.open(SHELL).then(function (c) { c.put(req, copy); });
          return res;
        })
        .catch(function () {
          return caches.match(req).then(function (hit) {
            return hit || caches.match('/') || caches.match('/404.html');
          });
        })
    );
    return;
  }

  // Static assets: cache first, refresh on miss.
  event.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res.ok) {
          var copy = res.clone();
          caches.open(ASSETS).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
