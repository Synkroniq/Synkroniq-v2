document.addEventListener("DOMContentLoaded", () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isInstagram = ua.includes("Instagram");

  if (!isInstagram) return; // Não mostra o modal fora do Instagram

  fetch("modal.html")
    .then(res => res.text())
    .then(html => {
      const container = document.createElement("div");
      container.innerHTML = html;
      document.body.appendChild(container);

      const modal = document.getElementById("instagramModal");
      if (modal) modal.style.display = "flex";

      const btn = document.getElementById("continueInstagramBtn");
      if (btn) {
        btn.addEventListener("click", () => {
          modal.style.display = "none";
        });
      }
    });
});

// Chama o modal dentro do index.html
fetch("modal.html")
  .then(res => res.text())
  .then(html => {
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    // Detecta Instagram e exibe modal
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isInstagram = ua.includes("Instagram");

    if (isInstagram) {
      const modal = document.getElementById("instagramModal");
      if (modal) modal.style.display = "flex";

      const btn = document.getElementById("continueInstagramBtn");
      if (btn) {
        btn.addEventListener("click", () => {
          modal.style.display = "none";
        });
      }
    }
  });
//carrega apenas na pagina inicial
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  // fetch + modal logic aqui
}
