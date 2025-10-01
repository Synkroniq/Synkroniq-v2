document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const indicadores = document.getElementById("indicadores");
  const btnEsq = document.getElementById("btn-esq");
  const btnDir = document.getElementById("btn-dir");

  let slideIndex = 0;
  let slides = [];

  fetch("data/carrossel.json")
    .then(res => res.json())
    .then(data => {
      slides = data;
      renderSlides(slides);
      updateCarousel();
    });

  function renderSlides(data) {
    track.innerHTML = "";
    indicadores.innerHTML = "";

    data.forEach((item, index) => {
      const slide = document.createElement("div");
      slide.className = "slide";

      // Destaque visual para urgentes
      if (item.urgente) {
        slide.classList.add("destaque");
      }

      // Tags como atributos para filtros futuros
      if (item.tags) {
        slide.setAttribute("data-tags", item.tags.join(","));
      }

      // Banner promocional como classe adicional
      if (item.banner) {
        slide.classList.add(item.banner);
      }

      // Conteúdo principal do slide
      slide.innerHTML = `
        <a href="${item.link}" aria-label="${item.titulo}">
          <img src="${item.imagem}" alt="${item.titulo}" />
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
          ${item.agendamento ? `<span class="agendamento">Agendamento: ${item.agendamento.tipo} (${item.agendamento.duracao})</span>` : ""}
          ${item.video ? `<a href="${item.video}" class="video-link" target="_blank">🎥 Ver vídeo</a>` : ""}
        </a>
      `;

      track.appendChild(slide);

      // Indicadores
      const indicador = document.createElement("span");
      indicador.setAttribute("aria-label", `Slide ${index + 1}`);
      indicador.setAttribute("role", "button");
      indicador.addEventListener("click", () => {
        slideIndex = index;
        updateCarousel();
      });
      indicadores.appendChild(indicador);
    });
  }

  function updateCarousel() {
    const slideWidth = track.querySelector(".slide").offsetWidth + 16;
    track.style.transform = `translateX(-${slideWidth * slideIndex}px)`;

    [...indicadores.children].forEach((dot, i) => {
      dot.classList.toggle("ativo", i === slideIndex);
    });
  }

  btnEsq.addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  btnDir.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slides.length;
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);
});
