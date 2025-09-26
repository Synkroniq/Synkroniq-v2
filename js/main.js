document.addEventListener("DOMContentLoaded", () => {
  console.log("Synkroniq 2.0 iniciado");

  // Carrega o cabeçalho
  const header = document.getElementById("header-container");
  if (header) {
    fetch("components/header.html")
      .then(res => res.text())
      .then(html => header.innerHTML = html)
      .catch(err => console.error("Erro ao carregar o cabeçalho:", err));
  }

  // Carrega o rodapé
  const footer = document.getElementById("footer-container");
  if (footer) {
    fetch("components/footer.html")
      .then(res => res.text())
      .then(html => footer.innerHTML = html)
      .catch(err => console.error("Erro ao carregar o rodapé:", err));
  }

  // Carrega o card de serviço
  const card = document.getElementById("card-servico-container");
  if (card) {
    fetch("components/card-servico.html")
      .then(res => res.text())
      .then(html => card.innerHTML = html)
      .catch(err => console.error("Erro ao carregar o card de serviço:", err));
  }

  // Registra o Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
      .then(() => console.log("Service Worker registrado com sucesso"))
      .catch(err => console.error("Erro ao registrar Service Worker:", err));
  }
});
