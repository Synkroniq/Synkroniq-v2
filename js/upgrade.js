fetch("data/upgrade.json")
  .then(res => res.json())
  .then(upgrades => {
    const lista = document.getElementById("lista-upgrades");

    upgrades.forEach(kit => {
      const card = document.createElement("div");
      card.className = "card-upgrade";

      const mensagem = `Olá! Tenho interesse no kit: ${kit.nome}`;

      card.innerHTML = `
        <h3>${kit.nome}</h3>
        <p>${kit.descricao}</p>
        <p class="preco">${kit.preco}</p>
        <a href="https://wa.me/55XXXXXXXXXX?text=${encodeURIComponent(mensagem)}" target="_blank">Solicitar via WhatsApp</a>
      `;

      lista.appendChild(card);
    });
  });
