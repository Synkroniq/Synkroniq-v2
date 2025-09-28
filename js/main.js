import { toggleMenu, closeMenuOnOutsideClick } from './menu.js';
import { loadComponent } from './loader.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("Synkroniq 2.0 iniciado");

  // Carregamento dos componentes dinâmicos
  loadComponent("header-container", "components/header.html");
  loadComponent("footer-container", "components/footer.html");
  loadComponent("card-servico-container", "components/card-servico.html");

  // Configuração do menu sanduíche
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
      e.preventDefault(); // Impede envio real

      // Envia via FormSubmit
      fetch("https://formsubmit.co/eduachou@gmail.com", {
        method: "POST",
        body: new FormData(form)
      }).then(() => {
        form.reset();
        modal.style.display = "flex"; // Exibe o modal após envio
      }).catch(() => {
        alert("Erro ao enviar. Tente novamente.");
      });
    });

    // Fecha o modal ao clicar no botão ou fora dele
    closeBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }
});
