export async function loadComponent(id, path, callback) {
  const container = document.getElementById(id);
  if (!container) {
    console.warn(`🧩 Elemento com id "${id}" não encontrado no DOM.`);
    return;
  }

  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Erro ao carregar ${path}: ${response.status}`);
    }

    const html = await response.text();
    container.innerHTML = html;

    // ✅ Executa função após carregar o componente
    if (typeof callback === "function") {
      try {
        callback();
      } catch (cbErr) {
        console.error(`Erro ao executar callback para "${id}":`, cbErr);
      }
    }
  } catch (err) {
    console.error(`❌ Falha ao carregar componente "${path}":`, err);
    container.innerHTML = `
      <div style="padding:1rem; background:#ffdddd; text-align:center;">
        ⚠️ Erro ao carregar componente: <strong>${path}</strong><br>
        Verifique o caminho ou tente novamente.
      </div>
    `;
  }
}
