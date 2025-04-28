const apiKey = "AIzaSyAsYiOrdnXJe_-D6GhXzbJNbXO6jDcqft8";
const headlineInput = document.getElementById('headlineInput');
const fontGrid = document.getElementById('fontGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loader = document.getElementById('loader');
const attributesContainer = document.getElementById('attributes');

const fontDetails = document.getElementById('fontDetails');
const selectedFontName = document.getElementById('selectedFontName');
const variantButtons = document.getElementById('variantButtons');
const closeDetailsBtn = document.getElementById('closeDetailsBtn');

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
let selectedFont = null;

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
  fontDetails.classList.add('hidden');
  displayedFonts = 0;
  showMoreFonts();
}

function showMoreFonts() {
  loader.classList.remove('hidden');

  setTimeout(() => {
    const selectedAttributes = Array.from(document.querySelectorAll('.attribute.selected')).map(attr => attr.innerText.toLowerCase());
    let filteredFonts = fonts.filter(font => font.category !== 'handwriting' && font.category !== 'monospace');

    // Filter z.B. Modern = sans-serif
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
      `;
      fontCard.onclick = () => openFontDetails(font);
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

function openFontDetails(font) {
  selectedFont = font;
  fontDetails.classList.remove('hidden');
  fontGrid.innerHTML = "";
  selectedFontName.innerText = font.family;
  variantButtons.innerHTML = "";

  font.variants.forEach(variant => {
    const btn = document.createElement('button');
    btn.className = 'variant-button';
    btn.innerText = variant;
    btn.onclick = () => applyVariant(font.family, variant);
    variantButtons.appendChild(btn);
  });

  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css?family=${font.family.replace(/ /g, '+')}:${font.variants.join(',')}`;
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

function applyVariant(family, variant) {
  const variantStyle = variant.includes('italic') ? 'italic' : 'normal';
  const weight = variant.replace('italic', '') || '400';
  headlineInput.style.fontFamily = `'${family}', sans-serif`;
  headlineInput.style.fontWeight = weight;
  headlineInput.style.fontStyle = variantStyle;
}

closeDetailsBtn.addEventListener('click', () => {
  fontDetails.classList.add('hidden');
  loadFonts();
});

loadMoreBtn.addEventListener('click', showMoreFonts);
headlineInput.addEventListener('input', loadFonts);

// Start
fetchFonts();
