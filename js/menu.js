export function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

export function closeMenuOnOutsideClick(e) {
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
