export function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  if (menu) {
    const isActive = menu.classList.toggle('active');
    document.body.classList.toggle('menu-open', isActive);
  }
}

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
