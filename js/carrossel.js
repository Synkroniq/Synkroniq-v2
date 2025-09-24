document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const timerEl = document.getElementById("timer");
  let index = 0;

  function mostrarSlide(i) {
    slides.forEach(slide => slide.classList.remove("ativo"));
    slides[i].classList.add("ativo");
  }

  function proximoSlide() {
    index = (index + 1) % slides.length;
    mostrarSlide(index);
  }

  function anteriorSlide() {
    index = (index - 1 + slides.length) % slides.length;
    mostrarSlide(index);
  }

  document.getElementById("btn-esq").addEventListener("click", anteriorSlide);
  document.getElementById("btn-dir").addEventListener("click", proximoSlide);

  setInterval(proximoSlide, 5000);
  mostrarSlide(index);

  // Timer regressivo
  const deadline = new Date("2025-10-15T23:59:59");

  function atualizarTimer() {
    const agora = new Date();
    const diff = deadline - agora;

    if (diff <= 0) {
      timerEl.textContent = "Promoção encerrada";
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    timerEl.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  setInterval(atualizarTimer, 1000);
  atualizarTimer();
});
