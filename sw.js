const CACHE_NAME = 'lbwa-v2'; // Changed version
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/sw.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS).catch(err => {
          console.error('Failed to cache:', err);
        });
      })
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('/icons/')) {
    // Cache-first strategy for icons
    e.respondWith(
      caches.match(e.request)
        .then(cached => cached || fetch(e.request))
    );
  } else {
    // Network-first for other assets
    e.respondWith(
      fetch(e.request)
        .catch(() => caches.match(e.request))
    );
  }
});
