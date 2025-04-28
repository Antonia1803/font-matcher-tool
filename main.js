const apiKey = "AIzaSyAsYiOrdnXJe_-D6GhXzbJNbXO6jDcqft8";
const headlineInput = document.getElementById('headlineInput');
const fontGrid = document.getElementById('fontGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loader = document.getElementById('loader');
const attributesContainer = document.getElementById('attributes');

const attributes = [
  "Zeitlos", "Modern", "Vertrauenswürdig", "Innovativ", "Natürlich",
  "Freundlich", "Minimalistisch", "Verspielt", "Dynamisch", "Bodenständig",
  "Hochwertig", "Ehrlich", "Kreativ", "Selbstbewusst", "Reduziert",
  "Charakterstark", "Elegant", "Nachhaltig", "Inspirierend", "Mutig",
  "Ruhig", "Erfrischend", "Klar", "Energiegeladen", "Verlässlich"
];

let fonts = [];
let displayedFonts = 0;
const fontsPerLoad = 20;

// Attribute Auswahl aufbauen
attributes.forEach(attr => {
  const div = document.createElement('div');
  div.className = 'attribute';
  div.innerText = attr;
  div.onclick = () => {
    div.classList.toggle('selected');
    loadFonts();
  };
  attributesContainer.appendChild(div);
});

// Fonts laden
async function fetchFonts() {
  loader.classList.remove('hidden');
  const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`);
  const data = await response.json();
  fonts = data.items;
  loader.classList.add('hidden');
  loadFonts();
}

function loadFonts() {
  fontGrid.innerHTML = "";
  displayedFonts = 0;
  showMoreFonts();
}

function showMoreFonts() {
  loader.classList.remove('hidden');
  
  setTimeout(() => {
    const selectedAttributes = Array.from(document.querySelectorAll('.attribute.selected')).map(attr => attr.innerText.toLowerCase());
    let filteredFonts = fonts.filter(font => font.category !== 'handwriting' && font.category !== 'monospace');

    // Einfacher Filter (z.B. Modern => Sans-Serif etc.)
    if (selectedAttributes.includes("modern")) {
      filteredFonts = filteredFonts.filter(f => f.category === 'sans-serif');
    }
    if (selectedAttributes.includes("elegant")) {
      filteredFonts = filteredFonts.filter(f => f.family.toLowerCase().includes('serif'));
    }

    const fontsToShow = filteredFonts.slice(displayedFonts, displayedFonts + fontsPerLoad);
    fontsToShow.forEach(font => {
      const fontCard = document.createElement('div');
      fontCard.className = 'font-card';
      fontCard.innerHTML = `
        <div class="font-preview" style="font-family: '${font.family}', sans-serif;">
          ${headlineInput.value || 'Dein Text'}
        </div>
        <div><strong>${font.family}</strong></div>
        <small>Kategorie: ${font.category}</small>
      `;
      fontCard.onclick = () => selectFont(font.family);
      fontGrid.appendChild(fontCard);

      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css?family=${font.family.replace(/ /g, '+')}`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });

    displayedFonts += fontsPerLoad;
    loader.classList.add('hidden');
  }, 500);
}

function selectFont(fontFamily) {
  headlineInput.style.fontFamily = `'${fontFamily}', sans-serif`;
}

loadMoreBtn.addEventListener('click', showMoreFonts);
headlineInput.addEventListener('input', loadFonts);

// Start
fetchFonts();
