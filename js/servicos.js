document.addEventListener("DOMContentLoaded", () => {
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
});

fetch("data/servicos.json")
  .then(res => res.json())
  .then(servicos => {
    const lista = document.getElementById("lista-servicos");

    servicos.forEach(servico => {
      const card = document.createElement("div");
      card.className = "card-servico";

      const mensagem = `Olá! Gostaria de agendar o serviço: ${servico.nome}`;

      card.innerHTML = `
        <h3>${servico.nome}</h3>
        <p>${servico.descricao}</p>
        <p class="preco">${servico.preco}</p>
        <a href="https://wa.me/5544997648490?text=${encodeURIComponent(mensagem)}" target="_blank">Agendar via WhatsApp</a>
      `;

      lista.appendChild(card);
    });
  });
