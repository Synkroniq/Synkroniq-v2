document.addEventListener("DOMContentLoaded", () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const body = document.body;

  if (prefersDark) {
    body.classList.add("dark");
  }
  
  if (hora >= 18 || hora < 6) {
    corpo.classList.add("dark");
  } else {
    corpo.classList.remove("dark");
  }

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "🌙";
  toggleBtn.id = "toggle-dark";
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
  });
});
