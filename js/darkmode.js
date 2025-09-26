// Aplica o tema salvo ou automático antes do DOM renderizar
const temaSalvo = localStorage.getItem("tema");
const hora = new Date().getHours();
const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (
  temaSalvo === "dark" ||
  (!temaSalvo && (prefereEscuro || hora >= 18 || hora < 6))
) {
  document.body.classList.add("dark");
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Cria botão de alternância
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "toggle-dark";
  toggleBtn.title = "Alternar tema";
  toggleBtn.innerHTML = body.classList.contains("dark") ? "☀️" : "🌙";
  document.body.appendChild(toggleBtn);

  // Alterna tema ao clicar
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    const temaAtual = body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("tema", temaAtual);
    toggleBtn.innerHTML = temaAtual === "dark" ? "☀️" : "🌙";
  });
});
