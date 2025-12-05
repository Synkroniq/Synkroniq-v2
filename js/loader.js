export async function loadComponent(id, path, callback, forceReload = false) {
  const container = document.getElementById(id);
  if (!container) {
    console.warn(`🧩 Elemento com id "${id}" não encontrado no DOM.`);
    return;
  }

  // 🚫 Se já carregado e não for forceReload, sai antes de fazer fetch
  if (!forceReload && container.getAttribute('data-loaded') === 'true') {
    console.log(`🔁 Componente "${id}" já carregado. Ignorando novo fetch.`);
    return;
  }

  try {
    const response = await fetch(path, { cache: "reload" }); // ✅ usa cache controlado
    if (!response.ok) {
      throw new Error(`Erro ao carregar ${path}: ${response.status}`);
    }

    const html = await response.text();
    container.innerHTML = html;
    container.setAttribute('data-loaded', 'true');

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
      <div role="alert" aria-live="assertive" style="padding:1rem; background:#ffdddd; text-align:center;">
        ⚠️ Erro ao carregar componente: <strong>${path}</strong><br>
        Verifique o caminho ou tente novamente.
      </div>
    `;
  }
}
