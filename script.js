// Beispiel-Daten für Schriftarten
const fonts = [
  {
    name: "Roboto",
    properties: ["Modern", "Klar", "Verlässlich"],
    weights: ["400", "700"]
  },
  {
    name: "Lora",
    properties: ["Elegant", "Klar"],
    weights: ["400", "700"]
  },
  {
    name: "Open Sans",
    properties: ["Modern", "Verlässlich"],
    weights: ["400", "700"]
  },
  {
    name: "Playfair Display",
    properties: ["Elegant", "Modern"],
    weights: ["400", "700"]
  }
  // Weitere Schriftarten können hier hinzugefügt werden
];

const fontList = document.getElementById("font-list");
const checkboxes = document.querySelectorAll('input[name="property"]');

// Funktion zum Rendern der Schriftarten
function renderFonts(filteredFonts) {
  fontList.innerHTML = "";

  filteredFonts.forEach(font => {
    const card = document.createElement("div");
    card.className = "font-card";
    card.innerHTML = `
      <div class="font-name">${font.name}</div>
      <div class="font-preview" style="font-family: '${font.name}', sans-serif;">Beispieltext</div>
    `;
    card.addEventListener("click", () => {
      const weightsParam = font.weights.join(",");
      const url = `font-detail.html?font=${encodeURIComponent(font.name)}&weights=${encodeURIComponent(weightsParam)}`;
      window.open(url, "_blank");
    });
    fontList.appendChild(card);
  });
}

// Funktion zum Filtern der Schriftarten basierend auf den ausgewählten Eigenschaften
function filterFonts() {
  const selectedProps = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const filtered = fonts.filter(font =>
    selectedProps.every(prop => font.properties.includes(prop))
  );

  renderFonts(filtered);
}

// Event Listener für Checkboxen
checkboxes.forEach(cb => cb.addEventListener("change", filterFonts));

// Initiale Anzeige aller Schriftarten
renderFonts(fonts);
