// ✅ Alterna visibilidade do menu sanduíche
export function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  if (!menu) return;

  const isActive = menu.classList.toggle('active');
  document.body.classList.toggle('menu-open', isActive);
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
    document.body.classList.remove('menu-open');
  }
}

// ✅ Fecha o menu ao clicar em qualquer link interno
export function closeMenuOnLinkClick(e) {
  const menu = document.getElementById('mainMenu');
  if (!menu) return;

  // Evita fechar se o link tiver atributo target="_blank"
  const isExternal = e.target.getAttribute('target') === '_blank';
  if (!isExternal && menu.classList.contains('active')) {
    menu.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
}
