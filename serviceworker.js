var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'image/cars.png',
  'css/style.css',
  'js/jquery.min.js',
  'js/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil (
    caches.open(CACHE_NAME).then(function(cache) {
        console.log('Ini Install Serverworker Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName != CACHE_NAME
        }).map(function(cacheName){
          return caches.delete(cacheName)
        })
      );
    })
  );
});

