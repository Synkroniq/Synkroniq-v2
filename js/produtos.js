document.addEventListener("DOMContentLoaded", () => {
  // Header e footer
  fetch("components/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header-container").innerHTML = html;
    });

  fetch("components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer-container").innerHTML = html;
    });

  // Produtos
  fetch("data/produtos.json")
    .then(res => res.json())
    .then(produtos => {
      const vitrine = document.getElementById("vitrine-produtos");

      produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "card-produto";

        const expira = new Date(produto.expiraEm);
        const hoje = new Date();
        const tempoRestante = Math.max(0, expira - hoje);
        const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));

        card.innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}" />
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <p class="preco">${produto.preco}</p>
          <p class="expira">Expira em ${dias} dias</p>
          <a href="${produto.link}" target="_blank" class="btn-comprar">Comprar agora</a>
        `;

        vitrine.appendChild(card);
      });
    });
});
