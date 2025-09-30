document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contato-form");
  const modal = document.getElementById("modal-obrigado");
  const closeBtn = document.querySelector(".close-btn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const dados = new FormData(form);

    // Substitua pelo seu endpoint real do Formspree ou outro serviço
    fetch(form.action, {
      method: "POST",
      body: dados,
      headers: {
        Accept: "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        modal.classList.add("show");
        form.reset();
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    })
    .catch(() => {
      alert("Erro de conexão. Verifique sua internet.");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Fecha modal ao clicar fora dele
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});
