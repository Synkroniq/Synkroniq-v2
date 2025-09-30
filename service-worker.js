const CACHE_NAME = "synkroniq-cache-v2"; // use versionamento

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./css/base.css",
  "./js/main.js"
];

// Instalação e cache inicial
self.addEventListener("install", event => {
  self.skipWaiting(); // ativa imediatamente

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // remove caches antigos
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepta requisições e serve do cache
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  if (url.protocol === "chrome-extension:" || url.protocol === "moz-extension:") return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(networkResponse => {
        if (event.request.method === "GET" && networkResponse.ok) {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }

        return networkResponse;
      }).catch(() => {
        return response; // fallback offline opcional
      });
    })
  );
});
