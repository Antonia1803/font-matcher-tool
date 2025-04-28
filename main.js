const apiKey = "AIzaSyAsYiOrdnXJe_-D6GhXzbJNbXO6jDcqft8";
const fontResults = document.getElementById('fontResults');
const loadingSpinner = document.getElementById('loadingSpinner');
const loadMoreButton = document.getElementById('loadMoreButton');
const searchButton = document.getElementById('searchButton');
const headlineInput = document.getElementById('headlineInput');

let fonts = [];
let fontsLoaded = 0;
const fontsPerLoad = 20;

searchButton.addEventListener('click', () => {
    fontsLoaded = 0;
    fontResults.innerHTML = '';
    fetchFonts();
});

loadMoreButton.addEventListener('click', () => {
    loadFonts();
});

async function fetchFonts() {
    loadingSpinner.classList.remove('hidden');
    const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`);
    const data = await response.json();
    fonts = data.items;
    loadingSpinner.classList.add('hidden');
    loadFonts();
}

function loadFonts() {
    loadingSpinner.classList.remove('hidden');
    setTimeout(() => {
        const nextFonts = fonts.slice(fontsLoaded, fontsLoaded + fontsPerLoad);
        nextFonts.forEach(font => createFontCard(font));
        fontsLoaded += fontsPerLoad;

        if (fontsLoaded < fonts.length) {
            loadMoreButton.classList.remove('hidden');
        } else {
            loadMoreButton.classList.add('hidden');
        }
        loadingSpinner.classList.add('hidden');
    }, 500); // kurze Ladeverzögerung für Animation
}

function createFontCard(font) {
    const fontCard = document.createElement('div');
    fontCard.className = 'font-card';

    const fontLink = document.createElement('link');
    fontLink.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, '+')}&display=swap`;
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const fontSample = document.createElement('div');
    fontSample.style.fontFamily = `'${font.family}', sans-serif`;
    fontSample.style.fontSize = '20px';
    fontSample.textContent = headlineInput.value || "Beispieltext";

    const fontName = document.createElement('div');
    fontName.className = 'font-name';
    fontName.textContent = font.family;

    const fontReason = document.createElement('div');
    fontReason.className = 'font-reason';
    fontReason.textContent = "Passt gut wegen moderner, klarer Form.";

    fontCard.appendChild(fontSample);
    fontCard.appendChild(fontName);
    fontCard.appendChild(fontReason);

    fontResults.appendChild(fontCard);
}
