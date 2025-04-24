
const headlineEl = document.getElementById("headlineFont");
const bodyEl = document.getElementById("bodyFont");
const headlineText = document.getElementById("headline");
const sublineText = document.getElementById("subline");

const fonts = ["Roboto", "Lora", "Playfair Display", "Work Sans", "Poppins"];

fonts.forEach(f => {
  const option1 = document.createElement("option");
  option1.value = option1.textContent = f;
  headlineEl.appendChild(option1);
  const option2 = document.createElement("option");
  option2.value = option2.textContent = f;
  bodyEl.appendChild(option2);
});

headlineEl.addEventListener("change", () => {
  headlineText.style.fontFamily = headlineEl.value;
});
bodyEl.addEventListener("change", () => {
  sublineText.style.fontFamily = bodyEl.value;
});
