const API_KEY = "AIzaSyAsYiOrdnXJe_-D6GhXzbJNbXO6jDcqft8";
const MAX_SELECTION = 4;
const traits = [
    "Zeitlos", "Modern", "Vertrauenswürdig", "Innovativ", "Natürlich", "Freundlich", "Minimalistisch", "Verspielt",
    "Dynamisch", "Bodenständig", "Hochwertig", "Ehrlich", "Kreativ", "Selbstbewusst", "Reduziert", "Charakterstark",
    "Elegant", "Nachhaltig", "Inspirierend", "Mutig", "Ruhig", "Erfrischend", "Klar", "Energiegeladen", "Verlässlich"
];

// Loader
window.addEventListener('load', () => {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
});

// Erstelle Checkboxen
const checkboxesDiv = document.querySelector('.checkboxes');
traits.forEach(trait => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${trait}"> ${trait}`;
    checkboxesDiv.appendChild(label);
});

// Eventlistener für Button
document.getElementById('findFontsBtn').addEventListener('click', async () => {
    const selectedTraits = Array.from(document.querySelectorAll('.checkboxes input:checked')).map(cb => cb.value);
    if (selectedTraits.length > MAX_SELECTION) {
        alert("Bitte wähle maximal 4 Eigenschaften aus.");
        return;
    }
    const headline = document.getElementById('headlineInput').value;
    if (!headline) {
        alert("Bitte gib eine Headline oder einen Logonamen ein.");
        return;
    }
    const fonts = await fetchGoogleFonts();
    displayFontSuggestions(fonts.items.slice(0, 10), headline); // Testweise erste 10 Fonts
});

// Google Fonts API abrufen
async function fetchGoogleFonts() {
    const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`);
    return await response.json();
}

// Fonts anzeigen
function displayFontSuggestions(fonts, text) {
    const fontDiv = document.getElementById('fontSuggestions');
    fontDiv.innerHTML = "";
    fonts.forEach(font => {
        const fontLink = document.createElement('link');
        fontLink.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, '+')}&display=swap`;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        const div = document.createElement('div');
        div.classList.add('font-preview');
        div.style.fontFamily = `'${font.family}', sans-serif`;
        div.innerHTML = `<strong>${font.family}:</strong><br><span style="font-size:2rem">${text}</span>`;
        fontDiv.appendChild(div);
    });

    document.getElementById('sublineSection').classList.remove('hidden');
}

// Hier könnte noch Subline Auswahl implementiert werden
