export function loadComponent(id, path) {
  const container = document.getElementById(id);
  if (container) {
    fetch(path)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
      })
      .catch(err => console.error(`Erro ao carregar ${id}:`, err));
  }
}
