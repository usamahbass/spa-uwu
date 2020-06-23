const CACHE_NAME = "fistPWA";

let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/avatar.png",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
];

// Membuat cache

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Mengambil data dari cache ketika page di reload

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request, {
        cacheName: CACHE_NAME,
      })
      .then((res) => {
        if (res) {
          console.log("ServiceWorker: Gunakan aset dari cache", res.url);
          return res;
        }

        console.log("ServiceWorker: Memuat data dari server", e.request.url);
        return fetch(e.request);
      })
  );
});

// Menghapus data lama dalam CACHE

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus !`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
