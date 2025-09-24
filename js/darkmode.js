document.addEventListener("DOMContentLoaded", () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const body = document.body;

  if (prefersDark) {
    body.classList.add("dark");
  }

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "🌙";
  toggleBtn.id = "toggle-dark";
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
  });
});
