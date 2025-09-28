// Instalação e cache inicial
self.addEventListener("install", event => {
  self.skipWaiting(); // Ativa imediatamente após instalação

  event.waitUntil(
    caches.open("synkroniq-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./css/base.css",
        "./js/main.js"
      ]);
    })
  );
});

// Ativação e controle imediato
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim()); // Assume controle das páginas abertas
});

// Intercepta requisições e serve do cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(networkResponse => {
      console.log("Service Worker interceptando:", event.request.url);
        return caches.open("synkroniq-cache").then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
