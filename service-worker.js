const MODO_DEV = true; // ✅ Altere para false quando for publicar

if (MODO_DEV) {
  // 🔧 Modo desenvolvimento: desativa o Service Worker
  self.addEventListener("install", () => self.skipWaiting());

  self.addEventListener("activate", event => {
    event.waitUntil(
      self.registration.unregister().then(() => {
        return self.clients.matchAll();
      }).then(clients => {
        clients.forEach(client => client.navigate(client.url));
      })
    );
  });

  self.addEventListener("fetch", () => {}); // ignora todas as requisições
} else {
  // ✅ Modo produção: cache inteligente
  const CACHE_NAME = "synkroniq-cache-v2";

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

  self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
  });

  self.addEventListener("activate", event => {
    event.waitUntil(
      caches.keys().then(keys =>
        Promise.all(
          keys.map(key => {
            if (key !== CACHE_NAME) return caches.delete(key);
          })
        )
      ).then(() => self.clients.claim())
    );
  });

  self.addEventListener("fetch", event => {
    const { request } = event;
    const url = new URL(request.url);

    if (url.protocol === "chrome-extension:" || url.protocol === "moz-extension:") return;
    if (request.method !== "GET") return;
    if (request.url.includes("/data/")) return;

    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;

        return fetch(request, { cache: "no-store" })
          .then(networkResponse => {
            if (!networkResponse || !networkResponse.ok) return networkResponse;
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            });
          })
          .catch(() => cachedResponse);
      })
    );
  });
}
