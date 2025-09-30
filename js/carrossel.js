document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const indicadoresContainer = document.getElementById("indicadores");
  const timerEl = document.getElementById("timer");
  const carrosselEl = document.getElementById("carrossel");
  if (!timerEl || !carrosselEl) return;

  let index = 0;
  let intervalo = null;
  let touchStartX = 0;

  // Cria bolinhas
  slides.forEach((_, i) => {
    const bolinha = document.createElement("span");
    bolinha.classList.add("bolinha");
    if (i === index) bolinha.classList.add("ativa");

    bolinha.addEventListener("click", () => {
      mostrarSlide(i);
      reiniciarCarrossel();
    });

    indicadoresContainer.appendChild(bolinha);
  });

  function mostrarSlide(i) {
    index = i;

    document.querySelectorAll(".bolinha").forEach((b, idx) => {
      b.classList.toggle("ativa", idx === i);
    });

    slides.forEach((slide, idx) => {
      slide.classList.remove("ativo");
      slide.setAttribute("aria-hidden", "true");
    });

    slides[i].classList.add("ativo");
    slides[i].removeAttribute("aria-hidden");

    document.querySelectorAll(".progress-bar").forEach(barra => {
      const clone = barra.cloneNode(true);
      barra.parentNode.replaceChild(clone, barra);
    });
  }

  function proximoSlide() {
    const novoIndex = (index + 1) % slides.length;
    mostrarSlide(novoIndex);
  }

  function anteriorSlide() {
    const novoIndex = (index - 1 + slides.length) % slides.length;
    mostrarSlide(novoIndex);
  }

  function iniciarCarrossel() {
    intervalo = setInterval(proximoSlide, 5000);
  }

  function reiniciarCarrossel() {
    clearInterval(intervalo);
    iniciarCarrossel();
  }

  document.getElementById("btn-esq").addEventListener("click", () => {
    anteriorSlide();
    reiniciarCarrossel();
  });

  document.getElementById("btn-dir").addEventListener("click", () => {
    proximoSlide();
    reiniciarCarrossel();
  });

  // Swipe horizontal
  carrosselEl.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(intervalo);
  }, { passive: true });

  carrosselEl.addEventListener("touchend", e => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? proximoSlide() : anteriorSlide();
    }

    reiniciarCarrossel();
  }, { passive: true });

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
