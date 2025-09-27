function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

function closeMenuOnOutsideClick(e) {
  const menu = document.getElementById('mainMenu');
  const toggleBtn = document.querySelector('.menu-toggle');
  if (
    menu &&
    menu.classList.contains('active') &&
    !menu.contains(e.target) &&
    !toggleBtn.contains(e.target)
  ) {
    menu.classList.remove('active');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Synkroniq 2.0 iniciado");

  // Carrega o cabeçalho
  const header = document.getElementById("header-container");
  if (header) {
    fetch("/Synkroniq-v2/components/header.html")
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;

        requestAnimationFrame(() => {
          const toggleBtn = document.querySelector('.menu-toggle');
          const menu = document.getElementById('mainMenu');

          if (toggleBtn && menu) {
            toggleBtn.addEventListener('click', toggleMenu);

            // Fecha ao clicar em item
            menu.querySelectorAll('a').forEach(link => {
              link.addEventListener('click', () => {
                menu.classList.remove('active');
              });
            });

            // Fecha ao clicar fora
            document.addEventListener('click', closeMenuOnOutsideClick);
          }
        });
      })
      .catch(err => console.error("Erro ao carregar o cabeçalho:", err));
  }

  // Carrega o rodapé
  const footer = document.getElementById("footer-container");
  if (footer) {
    fetch("/Synkroniq-v2/components/footer.html")
      .then(res => res.text())
      .then(html => {
        footer.innerHTML = html;
      })
      .catch(err => console.error("Erro ao carregar o rodapé:", err));
  }

  // Carrega o card de serviço
  const card = document.getElementById("card-servico-container");
  if (card) {
    fetch("/Synkroniq-v2/components/card-servico.html")
      .then(res => res.text())
      .then(html => {
        card.innerHTML = html;
      })
      .catch(err => console.error("Erro ao carregar o card de serviço:", err));
  }

  // Registra o Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/Synkroniq-v2/service-worker.js")
      .then(() => console.log("Service Worker registrado com sucesso"))
      .catch(err => console.error("Erro ao registrar Service Worker:", err));
  }
});
