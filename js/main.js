import { toggleMenu, closeMenuOnOutsideClick, closeMenuOnLinkClick } from './menu.js';
import { loadComponent } from './loader.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("Synkroniq 2.0 iniciado");

  // ✅ Carregamento do cabeçalho dinâmico + ativação do menu
  loadComponent("header-container", "components/header.html", () => {
    ativarMenuSanduiche(); // só ativa após o header estar no DOM
  });

  // ✅ Carregamento do rodapé
  loadComponent("footer-container", "components/footer.html");

  // ✅ Carregamento do card de serviços (se existir)
  const cardContainer = document.getElementById("card-servico-container");
  if (cardContainer) {
    loadComponent("card-servico-container", "components/card-servico.html");
  }

  // ☰ Ativa o menu sanduíche
  function ativarMenuSanduiche() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const menu = document.getElementById('mainMenu');

    if (!toggleBtn || !menu) {
      console.warn("Menu sanduíche não encontrado no DOM.");
      return;
    }

    toggleBtn.classList.remove('oculto'); // garante visibilidade inicial

    toggleBtn.removeEventListener('click', toggleMenu);
    toggleBtn.addEventListener('click', toggleMenu);

    document.removeEventListener('click', closeMenuOnOutsideClick);
    document.addEventListener('click', closeMenuOnOutsideClick);

    menu.querySelectorAll('a').forEach(link => {
      link.removeEventListener('click', closeMenuOnLinkClick);
      link.addEventListener('click', closeMenuOnLinkClick);
    });

    console.log("Menu sanduíche ativado com sucesso");
  }

  // 📦 Registro do Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/Synkroniq-v2/service-worker.js")
      .then(() => console.log("Service Worker registrado com sucesso"))
      .catch(err => console.error("Erro ao registrar Service Worker:", err));
  }

  // 📩 Lógica do formulário de contato com modal de confirmação
  const form = document.querySelector("#contato-form");
  const modal = document.getElementById("modal-obrigado");
  const closeBtn = document.querySelector(".close-btn");

  if (form && modal && closeBtn) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      modal.classList.add("show");

      fetch("https://formsubmit.co/eduachou@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(() => form.reset())
        .catch(() => alert("Erro ao enviar. Tente novamente."));
    });

    closeBtn.addEventListener("click", () => modal.classList.remove("show"));
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("show");
    });
  }
});
