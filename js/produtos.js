document.addEventListener("DOMContentLoaded", () => {
  // Carrega cabeçalho
  fetch("components/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header-container").innerHTML = html;
    });

  // Carrega rodapé
  fetch("components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer-container").innerHTML = html;
    });

  // Carrega menu deslizante
  fetch("components/menu.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("mainMenu").innerHTML = html;
    });

  // Carrega produtos
  fetch("data/produtos.json")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar produtos");
      return res.json();
    })
    .then(produtos => {
      const vitrine = document.getElementById("vitrine-produtos");
      if (!vitrine) return;

      produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "card-produto";

        const hoje = new Date();
        const expira = new Date(produto.expiraEm);
        const diasRestantes = Math.ceil
