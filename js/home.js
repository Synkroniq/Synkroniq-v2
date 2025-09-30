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
      slide.innerHTML = `
        <a href="${item.link}">
          <img src="${item.imagem}" alt="${item.titulo}" />
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
        </a>
      `;
      track.appendChild(slide);

      const indicador = document.createElement("span");
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
