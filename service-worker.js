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
  const url = new URL(event.request.url);

  // Ignora requisições de extensões ou protocolos não suportados
  if (url.protocol === "chrome-extension:" || url.protocol === "moz-extension:") return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(networkResponse => {
        console.log("Service Worker interceptando:", event.request.url);

        // Apenas cacheia se for uma requisição GET válida
        if (event.request.method === "GET" && networkResponse.ok) {
          return caches.open("synkroniq-cache").then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }

        return networkResponse;
      }).catch(() => {
        // Fallback opcional: pode retornar uma página offline aqui
        return response;
      });
    })
  );
});
