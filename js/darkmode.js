document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const hora = new Date().getHours();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Aplica modo escuro automático
  if (prefersDark || hora >= 18 || hora < 6) {
    body.classList.add("dark");
  }

  // Cria botão de alternância
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "toggle-dark";
  toggleBtn.title = "Alternar tema";
  toggleBtn.innerHTML = "🌙";
  document.body.appendChild(toggleBtn);

  // Alterna tema ao clicar
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    toggleBtn.innerHTML = body.classList.contains("dark") ? "☀️" : "🌙";
  });
});
