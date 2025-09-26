// Aplica o tema salvo ou automático antes do DOM renderizar
if (
  localStorage.getItem("tema") === "dark" ||
  (!localStorage.getItem("tema") &&
    (window.matchMedia("(prefers-color-scheme: dark)").matches ||
     new Date().getHours() >= 18 || new Date().getHours() < 6))
) {
  document.documentElement.classList.add("dark");
}

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // Cria botão de alternância
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "toggle-dark";
  toggleBtn.title = "Alternar tema";
  toggleBtn.innerHTML = html.classList.contains("dark") ? "☀️" : "🌙";
  document.body.appendChild(toggleBtn);

  // Alterna tema ao clicar
  toggleBtn.addEventListener("click", () => {
    html.classList.toggle("dark");
    const temaAtual = html.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("tema", temaAtual);
    toggleBtn.innerHTML = temaAtual === "dark" ? "☀️" : "🌙";
  });
});
