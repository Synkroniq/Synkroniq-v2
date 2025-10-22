// ✅ Alterna visibilidade do menu sanduíche (mobile)
export function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  const toggleBtn = document.querySelector('.menu-toggle');
  if (!menu || !toggleBtn) return;

  const isActive = menu.classList.toggle('active');

  // Oculta ou exibe o botão ☰
  toggleBtn.classList.toggle('oculto', isActive);

  // Aplica ou remove bloqueio de cliques no conteúdo
  document.body.classList.toggle('menu-aberto', isActive);
}

// ✅ Fecha o menu ao clicar fora dele
export function closeMenuOnOutsideClick(e) {
  const menu = document.getElementById('mainMenu');
  const toggleBtn = document.querySelector('.menu-toggle');
  if (!menu || !toggleBtn) return;

  const clickedInsideMenu = menu.contains(e.target);
  const clickedToggleBtn = toggleBtn.contains(e.target);

  if (menu.classList.contains('active') && !clickedInsideMenu && !clickedToggleBtn) {
    menu.classList.remove('active');
    toggleBtn.classList.remove('oculto');
    document.body.classList.remove('menu-aberto');
  }
}

// ✅ Fecha o menu ao clicar em qualquer link interno
export function closeMenuOnLinkClick(e) {
  const menu = document.getElementById('mainMenu');
  const toggleBtn = document.querySelector('.menu-toggle');
  if (!menu || !toggleBtn) return;

  const isExternal = e.target.getAttribute('target') === '_blank';
  if (!isExternal && menu.classList.contains('active')) {
    menu.classList.remove('active');
    toggleBtn.classList.remove('oculto');
    document.body.classList.remove('menu-aberto');
  }
}

// ✅ Inicializa os eventos ao carregar a página
function initMenuEvents() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const menuLinks = document.querySelectorAll('#mainMenu a');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleMenu);
  }

  document.addEventListener('click', closeMenuOnOutsideClick);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenuOnLinkClick);
  });
}

// Reexecuta após carregamento dinâmico
window.addEventListener('load', initMenuEvents);
