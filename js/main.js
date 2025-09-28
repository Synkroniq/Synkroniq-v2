import { toggleMenu, closeMenuOnOutsideClick } from './menu.js';
import { loadComponent } from './loader.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("Synkroniq 2.0 iniciado");

  loadComponent("header-container", "components/header.html");
  loadComponent("footer-container", "components/footer.html");
  loadComponent("card-servico-container", "components/card-servico.html");


  requestAnimationFrame(() => {
    const toggleBtn = document.querySelector('.menu-toggle');
    const menu = document.getElementById('mainMenu');

    if (toggleBtn && menu) {
      toggleBtn.addEventListener('click', toggleMenu);
      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('active'));
      });
      document.addEventListener('click', closeMenuOnOutsideClick);
    }
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/Synkroniq-v2/service-worker.js")
      .then(() => console.log("Service Worker registrado com sucesso"))
      .catch(err => console.error("Erro ao registrar Service Worker:", err));
  }
});
