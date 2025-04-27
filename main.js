
const GOOGLE_API_KEY = 'AIzaSyAsYiOrdnXJe_-D6GhXzbJNbXO6jDcqft8'; // Hier deinen API-Schlüssel einfügen

// Google Fonts API URL
const API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_API_KEY}`;

// Funktion, um alle verfügbaren Google Fonts abzurufen
async function fetchGoogleFonts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.items; // Gibt die Liste der Schriftarten zurück
  } catch (error) {
    console.error('Fehler beim Abrufen der Google Fonts:', error);
  }
}

// Funktion, um die Google Fonts dynamisch zu laden
async function loadFonts() {
  const fonts = await fetchGoogleFonts();

  if (fonts) {
    const fontSelect = document.getElementById("font-select");

    fonts.forEach(font => {
      const option = document.createElement("option");
      option.value = font.family;
      option.textContent = font.family;
      fontSelect.appendChild(option);
    });
  }
}

// Funktion zur Filterung der Schriften basierend auf den Eigenschaften
function filterFontsByProperties(fonts, selectedProperties) {
  return fonts.filter(font => {
    return selectedProperties.some(property => font.tags && font.tags.includes(property));
  });
}

// Beispiel für das Anwenden der ausgewählten Schriftart auf ein Textfeld
function applyFont(fontFamily) {
  const textElement = document.getElementById("text");
  textElement.style.fontFamily = fontFamily;
}

// Funktion, um die Schriften entsprechend der ausgewählten Eigenschaften anzuzeigen
function applyFilteredFonts(selectedProperties) {
  fetchGoogleFonts().then(fonts => {
    const filteredFonts = filterFontsByProperties(fonts, selectedProperties);
    const fontSelect = document.getElementById("font-select");
    fontSelect.innerHTML = ""; // Zurücksetzen der Optionen im Dropdown-Menü

    filteredFonts.forEach(font => {
      const option = document.createElement("option");
      option.value = font.family;
      option.textContent = font.family;
      fontSelect.appendChild(option);
    });
  });
}

// Event Listener, um Schriftart zu ändern, wenn der Benutzer eine auswählt
document.getElementById("font-select").addEventListener("change", (event) => {
  const selectedFont = event.target.value;
  applyFont(selectedFont);
});

// Event Listener für die Filterung nach Eigenschaften (Mehrfachauswahl)
document.getElementById("filter-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedProperties = Array.from(document.querySelectorAll("input[name='property']:checked"))
    .map(input => input.value);

  applyFilteredFonts(selectedProperties);
});

// Initialisieren des Tools
function init() {
  loadFonts(); // Lädt die Schriften
}

init();