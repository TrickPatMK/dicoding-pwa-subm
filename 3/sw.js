importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if(workbox) console.log('Workbox berhasil dimuat');
   else console.log('Workbox gagal dimuat');

workbox.precaching.precacheAndRoute([
   {url: '/index.html', revision: '1'},
   {url: '/manifest.json', revision: '1'},
   {url: '/css/main.css', revision: '1'},
   {url: '/css/materialize.min.css', revision: '1'},
   {url: '/img/logo192.png', revision: '1'},
   {url: '/img/logo512.png', revision: '1'},
   {url: '/js/main.js', revision: '1'},
   {url: '/js/match.js', revision: '1'},
   {url: '/js/materialize.min.js', revision: '1'},
   {url: '/js/registration.js', revision: '1'},
   {url: '/js/data/api.js', revision: '1'},
   {url: '/js/data/idb.js', revision: '1'},
   {url: '/js/data/db.js', revision: '1'},
   {url: '/pages/match.html', revision: '1'},
   {url: '/pages/home.html', revision: '1'},
   {url: '/pages/favorites.html', revision: '1'},
   {url: '/pages/nav.html', revision: '1'},
   {url: '/pages/standings.html', revision: '1'},
   {url: '/img/logo192.png', revision: '1'},
   {url: '/img/logo512.png', revision: '1'}
],
{
   ignoreURLParametersMatching: [/.*/]
});

const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate, NetworkFirst} = workbox.strategies;
const {CacheableResponsePlugin} = workbox.cacheableResponse;
const {ExpirationPlugin} = workbox.expiration;

registerRoute(
   /^https:\/\/fonts\.googleapis\.com/,
   new StaleWhileRevalidate({
      cacheName: 'Google-font',
      plugins: [
         new CacheableResponsePlugin({
            statuses: [0, 200]
         }),
         new ExpirationPlugin({
            maxAgeSeconds: 7 * 24 * 60 * 60
         })
      ]
   })
);

registerRoute(
   /^https:\/\/fonts\.gstatic\.com/,
   new StaleWhileRevalidate({
      cacheName: 'Google-icon',
      plugins: [
         new CacheableResponsePlugin({
            statuses: [0, 200]
         }),
         new ExpirationPlugin({
            maxAgeSeconds: 7 * 24 * 60 * 60
         })
      ]
   })
);

registerRoute(
   new RegExp('https://api.football-data.org/v2'),
   new NetworkFirst({
      cacheName: 'data-from-api',
      plugins: [
         new CacheableResponsePlugin({
            statuses: [0, 200]
         }),
         new ExpirationPlugin({
            maxAgeSeconds: 2 * 24 * 60 * 60
         })
      ]
   })
);

self.addEventListener('push', event => {
   let body;
   if(event.data){
      body = event.data.text();
   } else {
      body = 'Push message no Payload';
   }

   const options = {
      body: body,
      vibrate: [100, 50, 100],
      data: {
         dataOfArival: Date.now(),
         primaryKey: 1
      }
   };

   event.waitUntil(
      self.registration.showNotification('Push Notifitacion', options)
   );
});