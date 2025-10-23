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
        const diasRestantes = Math.ceil((expira - hoje) / (1000 * 60 * 60 * 24));
        const expirado = diasRestantes < 0;

        card.innerHTML = `
          ${produto.imagem ? `<img src="${produto.imagem}" alt="${produto.nome}" class="img-produto">` : ""}
          ${produto.categoria ? `<span class="categoria">${produto.categoria}</span>` : ""}
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <p class="preco">${produto.preco}</p>
          ${produto.estoque !== undefined ? `<p class="estoque">Estoque: ${produto.estoque}</p>` : ""}
          <p class="expira ${expirado ? "expirada" : ""}">
            ${expirado ? "Produto expirado" : `Expira em ${diasRestantes} dia${diasRestantes > 1 ? "s" : ""}`}
          </p>
          ${produto.link ? `<a href="${produto.link}" target="_blank" class="btn-comprar">Comprar agora</a>` : ""}
        `;

        vitrine.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar produtos:", err);
      const vitrine = document.getElementById("vitrine-produtos");
      if (vitrine) {
        vitrine.innerHTML = `<p style="color:red;">Não foi possível carregar os produtos no momento.</p>`;
      }
    });
});
