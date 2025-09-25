document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;

  let index = 0;
  let intervalo;

  function mostrarSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.remove("ativo");
      slide.setAttribute("aria-hidden", "true");
    });

    slides[i].classList.add("ativo");
    slides[i].removeAttribute("aria-hidden");

    // Reinicia animação da barra de progresso
    const barras = document.querySelectorAll(".progress-bar");
    barras.forEach(barra => {
      const clone = barra.cloneNode(true);
      barra.parentNode.replaceChild(clone, barra);
    });
  }

  function proximoSlide() {
    index = (index + 1) % slides.length;
    mostrarSlide(index);
  }

  function anteriorSlide() {
    index = (index - 1 + slides.length) % slides.length;
    mostrarSlide(index);
  }

  document.getElementById("btn-esq").addEventListener("click", () => {
    clearInterval(intervalo);
    anteriorSlide();
    setTimeout(iniciarCarrossel, 7000); // pausa de 7 segundos
  });

  document.getElementById("btn-dir").addEventListener("click", () => {
    clearInterval(intervalo);
    proximoSlide();
    setTimeout(iniciarCarrossel, 7000); // pausa de 7 segundos
  });

  function iniciarCarrossel() {
    intervalo = setInterval(proximoSlide, 5000);
  }

  mostrarSlide(index);
  iniciarCarrossel();

  // Timer regressivo
  const deadline = new Date("2025-10-15T23:59:59");

  function formatar(n) {
    return n < 10 ? "0" + n : n;
  }

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

    timerEl.textContent = `${dias}d ${formatar(horas)}h ${formatar(minutos)}m ${formatar(segundos)}s`;
  }

  setInterval(atualizarTimer, 1000);
  atualizarTimer();
});
