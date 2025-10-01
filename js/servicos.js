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

  // Carrega serviços
  fetch("data/servicos.json")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar serviços");
      return res.json();
    })
    .then(servicos => {
      const lista = document.getElementById("lista-servicos");
      if (!lista) return;

      servicos.forEach(servico => {
        const card = document.createElement("div");
        card.className = "card-servico";

        const mensagem = `Olá! Gostaria de agendar o serviço: ${servico.nome}`;
        const hoje = new Date();
        const expira = new Date(servico.expiraEm);
        const diasRestantes = Math.ceil((expira - hoje) / (1000 * 60 * 60 * 24));

        card.innerHTML = `
          ${servico.imagem ? `<img src="${servico.imagem}" alt="${servico.nome}" class="img-servico">` : ""}
          <span class="categoria">${servico.categoria || "Serviço"}</span>
          <h3>${servico.nome}</h3>
          <p>${servico.descricao}</p>
          <p class="preco">${servico.preco}</p>
          ${servico.duracao ? `<p class="duracao">Duração: ${servico.duracao}</p>` : ""}
          ${diasRestantes > 0 ? `<p class="expira">Disponível por ${diasRestantes} dia${diasRestantes > 1 ? "s" : ""}</p>` : `<p class="expira expirada">Serviço expirado</p>`}
          <a href="https://wa.me/5544997648490?text=${encodeURIComponent(mensagem)}" target="_blank">
            Agendar via WhatsApp
          </a>
        `;

        lista.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar serviços:", err);
      const lista = document.getElementById("lista-servicos");
      if (lista) {
        lista.innerHTML = `<p style="color:red;">Não foi possível carregar os serviços no momento.</p>`;
      }
    });
});
