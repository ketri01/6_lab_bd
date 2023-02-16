var CACHE_NAME = 'pwa-cache';
// Указываем ресурсы, которые идут в кэш
var urlsToCache = [
    'favicon.ico',
    'index.html',
    'serviceworker.js',
    'manifest.json',
    'scripts.js',
    'pwa-logo.png',
    'pwa-logo192.png',
];

// Устанавливаем worker и переносим основные ресурсы в кэш
self.addEventListener("install", event => {
  console.log("Service Worker устанавливается.");
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Получаем доступ к кэшу');
                var x = cache.addAll(urlsToCache);
                console.log('Ресурсы добавлены в кэш');
                return x;
            })
    );  
});

// Активируем worker
self.addEventListener("activate", event => {
  console.log("Service Worker активируется.");
});

// Обращение к ресурсам (перехват и выдча данных из кэша)
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
					// Данные есть в кэше, берем их из него
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});