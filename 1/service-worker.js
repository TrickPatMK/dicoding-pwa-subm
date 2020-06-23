const CACHE_NAME = "alta v1.4";
let urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/script.js",
    "/pages/community.html",
    "/pages/fauna.html",
    "/pages/flora.html",
    "/pages/home.html",
    "/images/babi-hutan.jpg",
    "/images/daisy.jpg",
    "/images/elang-jawa.jpg",
    "/images/hewan-langka.jpg",
    "/images/mendaki.jpg",
    "/images/muncak.jpg",
    "/images/murbei.jpg",
    "/images/penemuan.jpg",
    "/images/Wanadri.png",
    "/images/more_vert.png",
    "/images/close.png",
    "/images/add.png",
    "/images/icon.png",
    "/images/icon180-fill.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches
        .match(event.request, {cacheName: CACHE_NAME})
        .then(response => {
            if(response){
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheName != CACHE_NAME){
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});