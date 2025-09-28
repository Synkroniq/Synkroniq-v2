export function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

export function closeMenuOnOutsideClick(e) {
  const menu = document.getElementById('mainMenu');
  const toggleBtn = document.querySelector('.menu-toggle');

  // Protege contra cliques em elementos inexistentes
  if (!menu || !toggleBtn) return;

  const clickedInsideMenu = menu.contains(e.target);
  const clickedToggleBtn = toggleBtn.contains(e.target);

  // Fecha o menu se estiver aberto e o clique for fora
  if (menu.classList.contains('active') && !clickedInsideMenu && !clickedToggleBtn) {
    menu.classList.remove('active');
  }
}
