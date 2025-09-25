document.addEventListener("DOMContentLoaded", () => {
  console.log("Synkroniq 2.0 iniciado");

  // Carrega o cabeçalho
  fetch("components/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header-container").innerHTML = html;
    })
    .catch(err => console.error("Erro ao carregar o cabeçalho:", err));

  // Carrega o rodapé
  fetch("components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer-container").innerHTML = html;
    })
    .catch(err => console.error("Erro ao carregar o rodapé:", err));
});
