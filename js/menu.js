// ✅ Alterna visibilidade do menu sanduíche
export function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  const toggleBtn = document.querySelector('.menu-toggle');
  const header = document.querySelector('header.topo');
  if (!menu || !toggleBtn || !header) return;

  const isActive = menu.classList.toggle('active');
  header.classList.toggle('menu-ativo', isActive);

  // Oculta ou exibe o botão ☰
  toggleBtn.classList.toggle('oculto', isActive);
}

// ✅ Fecha o menu ao clicar fora dele
export function closeMenuOnOutsideClick(e) {
  const menu = document.getElementById('mainMenu');
  const toggleBtn = document.querySelector('.menu-toggle');
  const header = document.querySelector('header.topo');
  if (!menu || !toggleBtn || !header) return;

  const clickedInsideMenu = menu.contains(e.target);
  const clickedToggleBtn = toggleBtn.contains(e.target);

  if (menu.classList.contains('active') && !clickedInsideMenu && !clickedToggleBtn) {
    menu.classList.remove('active');
    header.classList.remove('menu-ativo');
    toggleBtn.classList.remove('oculto');
  }
}

// ✅ Fecha o menu ao clicar em qualquer link interno
export function closeMenuOnLinkClick(e) {
  const menu = document.getElementById('mainMenu');
  const toggleBtn = document.querySelector('.menu-toggle');
  const header = document.querySelector('header.topo');
  if (!menu || !toggleBtn || !header) return;

  const isExternal = e.target.getAttribute('target') === '_blank';
  if (!isExternal && menu.classList.contains('active')) {
    menu.classList.remove('active');
    header.classList.remove('menu-ativo');
    toggleBtn.classList.remove('oculto');
  }
}
