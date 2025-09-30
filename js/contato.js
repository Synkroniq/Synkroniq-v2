document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contato-form");
  const toast = document.getElementById("toast-sucesso");
  const closeToast = document.querySelector(".close-toast");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const dados = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: dados,
      headers: {
        Accept: "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        toast.classList.add("show");
        form.reset();

        setTimeout(() => {
          toast.classList.remove("show");
        }, 5000);
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    })
    .catch(() => {
      alert("Erro de conexão. Verifique sua internet.");
    });
  });

  closeToast.addEventListener("click", () => {
    toast.classList.remove("show");
  });
});
