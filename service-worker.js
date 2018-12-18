/*
https://codelabs.developers.google.com/codelabs/your-first-pwapp/#6
*/

let cacheName = 'travelHere-PWA-v1';
let dataCacheName = '';
let assetsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/img/background.jpg',
    '/img/background2.jpg',
    '/img/background3.jpg',
    '/img/favicon.png',
    '/img/favicon.svg',
    '/img/logo2.svg',
    '/img/logo.svg',
    '/img/logo.png'
];

// cache all static content/app shell
self.addEventListener('install', (e) => {
    console.log('Service worker Install');
    e.waitUntil(
        caches.open(cacheName).then(
            (cache) => {
                console.log('Service worker caching app shell');
                return cache.addAll(assetsToCache);
            }
        )
    );
});

// activate the service worker and clean up outdated caches
self.addEventListener('activate', (e) => {
    console.log('Service worker Activate');
    e.waitUntil(
        caches.keys().then((keyList) => {
            // delete any cache which is not cacheName(ours)
            return Promise.all(keyList.map(key => {
                if(key !== cacheName && key !== dataCacheName){
                    console.log('Service worker removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    /* The new service worker will only take over when you close
       and reopen your app, or if the service worker calls clients.claim
    */
    return self.clients.claim();
});

// serve the app from the service worker
self.addEventListener('fetch', (e) => {
    console.log('Service worker Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request)
        })
    );
});