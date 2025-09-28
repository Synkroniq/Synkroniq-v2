import { toggleMenu, closeMenuOnOutsideClick } from './menu.js';
import { loadComponent } from './loader.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("Synkroniq 2.0 iniciado");

  // Carregamento dos componentes dinâmicos
  loadComponent("header-container", "components/header.html");
  loadComponent("footer-container", "components/footer.html");
  loadComponent("card-servico-container", "components/card-servico.html");

  // Função que ativa o menu sanduíche
  function ativarMenuSanduiche() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const menu = document.getElementById('mainMenu');

    if (toggleBtn && menu) {
      toggleBtn.addEventListener('click', toggleMenu);
      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('active'));
      });
      document.addEventListener('click', closeMenuOnOutsideClick);
      console.log("Menu sanduíche ativado com sucesso");
      return true;
    }
    return false;
  }

  // Observa quando o header é carregado
  const headerContainer = document.getElementById("header-container");
  const observer = new MutationObserver(() => {
    if (ativarMenuSanduiche()) observer.disconnect();
  });

  observer.observe(headerContainer, { childList: true, subtree: true });

  // Fallback: ativa o menu se já estiver presente (ex: header estático)
  setTimeout(() => {
    if (!document.querySelector('.menu-toggle')) return;
    ativarMenuSanduiche();
  }, 500);

  // Registro do Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/Synkroniq-v2/service-worker.js")
      .then(() => console.log("Service Worker registrado com sucesso"))
      .catch(err => console.error("Erro ao registrar Service Worker:", err));
  }

  // Lógica do formulário de contato com modal
  const form = document.querySelector("#contato-form");
  const modal = document.getElementById("modal-obrigado");
  const closeBtn = document.querySelector(".close-btn");

  if (form && modal && closeBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      modal.classList.add("show");

      fetch("https://formsubmit.co/eduachou@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      }).then(() => {
        form.reset();
      }).catch(() => {
        alert("Erro ao enviar. Tente novamente.");
      });
    });

    closeBtn.addEventListener("click", () => modal.classList.remove("show"));
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("show");
    });
  }
});
