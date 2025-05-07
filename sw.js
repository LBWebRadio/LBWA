const CACHE_NAME = 'lbwa-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/icons/lb no background 192.png',
  '/icons/lb no background 512.png',
  // Add other critical assets (CSS, JS, etc.)
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});