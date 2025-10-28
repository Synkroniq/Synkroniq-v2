const CACHE_NAME = "synkroniq-cache-v2"; // ✅ Atualize este valor a cada nova versão

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./servicos.html",
  "./css/base.css",
  "./css/header.css",
  "./css/servicos.css",
  "./css/footer.css",
  "./js/main.js",
  "./js/servicos.js",
  "./js/menu.js",
  "./js/darkmode.js",
  "./components/header.html",
  "./components/footer.html",
  "./manifest.json"
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

  // ❌ Evita cache de dados dinâmicos (ex: JSON de serviços)
  if (request.url.includes("/data/")) return;

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(request, { cache: "no-store" })
        .then(networkResponse => {
          if (!networkResponse || !networkResponse.ok) return networkResponse;

          // ✅ Armazena apenas arquivos estáticos
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => cachedResponse) // fallback offline
    })
  );
});
