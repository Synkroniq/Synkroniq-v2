document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      console.log("Clique em:", link.href);
      // Aqui você pode integrar com Google Analytics ou outro serviço
    });
  });
});
