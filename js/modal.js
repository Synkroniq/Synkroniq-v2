document.addEventListener("DOMContentLoaded", () => {
  const isHomePage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";

  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isInstagram = ua.includes("Instagram");

  // Só continua se for página inicial E navegador Instagram
  if (!isHomePage || !isInstagram) return;

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
