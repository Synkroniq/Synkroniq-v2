const CACHE_NAME = "synkroniq-cache-v3"; // versionamento inteligente

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./css/base.css",
  "./js/main.js"
];

// 📦 Instalação e cache inicial
self.addEventListener("install", event => {
  self.skipWaiting(); // ativa imediatamente

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// 🧹 Ativação e limpeza de caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// 🔄 Intercepta requisições e serve do cache
self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora extensões do navegador
  if (url.protocol === "chrome-extension:" || url.protocol === "moz-extension:") return;

  // Ignora requisições POST, PUT, DELETE
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(request)
        .then(networkResponse => {
          if (!networkResponse || !networkResponse.ok) return networkResponse;

          // Armazena no cache apenas arquivos estáticos
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => cachedResponse) // fallback offline
    })
  );
});
