function toggleMenu() {
  const menu = document.querySelector('.menu ul');
  if (menu) {
    menu.classList.toggle('active');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Synkroniq 2.0 iniciado");

  const header = document.getElementById("header-container");
  if (header) {
    fetch("/Synkroniq-v2/components/header.html")
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;

        // Aguarda o DOM reconhecer os novos elementos
        requestAnimationFrame(() => {
          const toggleBtn = document.querySelector('.menu-toggle');
          if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleMenu);
          }

          // Fecha o menu ao clicar em qualquer item
          const menuLinks = document.querySelectorAll('.menu ul li a');
          menuLinks.forEach(link => {
            link.addEventListener('click', () => {
              const menu = document.querySelector('.menu ul');
              if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
              }
            });
          });
        });
      })
      .catch(err => console.error("Erro ao carregar o cabeçalho:", err));
  }

  const footer = document.getElementById("footer-container");
  if (footer) {
    fetch("/Synkroniq-v2/components/footer.html")
      .then(res => res.text())
      .then(html => {
        footer.innerHTML = html;
      })
      .catch(err => console.error("Erro ao carregar o rodapé:", err));
  }

  const card = document.getElementById("card-servico-container");
  if (card) {
    fetch("/Synkroniq-v2/components/card-servico.html")
      .then(res => res.text())
      .then(html => {
        card.innerHTML = html;
      })
      .catch(err => console.error("Erro ao carregar o card de serviço:", err));
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/Synkroniq-v2/service-worker.js")
      .then(() => console.log("Service Worker registrado com sucesso"))
      .catch(err => console.error("Erro ao registrar Service Worker:", err));
  }
});
