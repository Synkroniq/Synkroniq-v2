export async function loadComponent(id, path) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Erro ao carregar ${path}: ${response.status}`);
    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Falha ao carregar componente ${path}:`, err);
    container.innerHTML = `
      <div style="padding:1rem; background:#ffdddd; text-align:center;">
        Erro ao carregar componente: <strong>${path}</strong>
      </div>
    `;
  }
}
