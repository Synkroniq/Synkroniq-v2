fetch("data/blog.json")
  .then(res => res.json())
  .then(artigos => {
    const lista = document.getElementById("lista-artigos");

    artigos.forEach(artigo => {
      const card = document.createElement("div");
      card.className = "card-artigo";

      card.innerHTML = `
        <h3>${artigo.titulo}</h3>
        <p>${artigo.resumo}</p>
        <p class="autor">Por ${artigo.autor} em ${artigo.data}</p>
        <a href="${artigo.link}" target="_blank">Ler artigo completo</a>
      `;

      lista.appendChild(card);
    });
  });
