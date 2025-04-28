// Beispiel-Daten: Schriftarten mit zugehörigen Eigenschaften und Beschreibungen
const fonts = [
  {
    name: "Roboto",
    properties: ["Modern", "Klar", "Verlässlich"],
    description: "Roboto ist eine moderne und klare Schriftart, die für ihre Lesbarkeit bekannt ist."
  },
  {
    name: "Lobster",
    properties: ["Verspielt", "Kreativ", "Charakterstark"],
    description: "Lobster verleiht Texten einen verspielten und charakterstarken Look."
  },
  {
    name: "Open Sans",
    properties: ["Zeitlos", "Vertrauenswürdig", "Minimalistisch"],
    description: "Open Sans ist eine zeitlose Schriftart, die Vertrauen und Minimalismus ausstrahlt."
  },
  // Weitere Schriftarten hinzufügen...
];

// Maximal erlaubte Eigenschaften
const maxProperties = 5;

// DOM-Elemente
const headlineInput = document.getElementById("headline-text");
const propertiesForm = document.getElementById("filter-form");
const resetButton = document.getElementById("reset-button");
const fontSelect = document.getElementById("font-select");
const textPreview = document.getElementById("text");
const propertiesCheckboxes = propertiesForm.querySelectorAll('input[name="property"]');
const fontSuggestionsContainer = document.createElement("div");
fontSuggestionsContainer.className = "font-suggestions";
document.querySelector(".input-section").appendChild(fontSuggestionsContainer);

// Funktion zum Laden von Google Fonts
function loadFont(fontName) {
  WebFont.load({
    google: {
      families: [fontName]
    },
    active: function() {
      textPreview.style.fontFamily = fontName;
    }
  });
}

// Funktion zum Aktualisieren der Vorschau
function updatePreview() {
  const selectedFont = fontSelect.value;
  loadFont(selectedFont);
  textPreview.textContent = headlineInput.value || "Dein Text hier";
}

// Funktion zum Filtern der Schriftarten basierend auf ausgewählten Eigenschaften
function filterFonts() {
  const selectedProperties = Array.from(propertiesCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  // Schriftarten filtern
  const matchingFonts = fonts.filter(font =>
    selectedProperties.every(prop => font.properties.includes(prop))
  );

  // Vorschläge anzeigen
  displayFontSuggestions(matchingFonts);

  // Dropdown aktualisieren
  updateFontSelect(matchingFonts);

  // Vorschau aktualisieren
  updatePreview();
}

// Funktion zum Anzeigen der Schriftvorschläge
function displayFontSuggestions(fonts) {
  fontSuggestionsContainer.innerHTML = "";

  fonts.forEach(font => {
    const card = document.createElement("div");
    card.className = "font-card";

    const title = document.createElement("h4");
    title.textContent = font.name;
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = font.description;
    card.appendChild(description);

    fontSuggestionsContainer.appendChild(card);
  });
}

// Funktion zum Aktualisieren des Dropdown-Menüs
function updateFontSelect(fonts) {
  fontSelect.innerHTML = "";

  fonts.forEach(font => {
    const option = document.createElement("option");
    option.value = font.name;
    option.textContent = font.name;
    fontSelect.appendChild(option);
  });
}

// Event-Listener für Checkboxen
propertiesCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const checkedCount = Array.from(propertiesCheckboxes).filter(cb => cb.checked).length;
    if (checkedCount > maxProperties) {
      checkbox.checked = false;
      alert(`Du kannst maximal ${maxProperties} Eigenschaften auswählen.`);
    } else {
      filterFonts();
    }
  });
});

// Event-Listener für Zurücksetzen-Button
resetButton.addEventListener("click", () => {
  propertiesCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  fontSelect.innerHTML = "";
  fontSuggestionsContainer.innerHTML = "";
  textPreview.textContent = "Dein Text hier";
  textPreview.style.fontFamily = "";
});

// Event-Listener für Texteingabe
headlineInput.addEventListener("input", updatePreview);

// Event-Listener für Schriftartauswahl
fontSelect.addEventListener("change", updatePreview);
