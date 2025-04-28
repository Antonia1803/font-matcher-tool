const apiKey = "AIzaSyAsYiOrdnXJe_-D6GhXzbJNbXO6jDcqft8";
const traits = [
    "Zeitlos", "Modern", "Vertrauenswürdig", "Innovativ", "Natürlich",
    "Freundlich", "Minimalistisch", "Verspielt", "Dynamisch", "Bodenständig",
    "Hochwertig", "Ehrlich", "Kreativ", "Selbstbewusst", "Reduziert",
    "Charakterstark", "Elegant", "Nachhaltig", "Inspirierend", "Mutig",
    "Ruhig", "Erfrischend", "Klar", "Energiegeladen", "Verlässlich"
];

let fonts = [];
let displayedFonts = 0;
const fontsPerLoad = 20;

document.addEventListener('DOMContentLoaded', () => {
    const traitsContainer = document.getElementById('traitsContainer');
    traits.forEach(trait => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" value="${trait}">${trait}`;
        traitsContainer.appendChild(label);
    });

    document.getElementById('findFontsBtn').addEventListener('click', findFonts);
    document.getElementById('loadMoreBtn').addEventListener('click', showFonts);
});

function findFonts() {
    const selectedTraits = Array.from(document.querySelectorAll('#traitsContainer input:checked'))
        .map(cb => cb.value)
        .slice(0, 4);

    if (selectedTraits.length === 0) {
        alert("Bitte wähle mindestens 1 Eigenschaft aus.");
        return;
    }

    document.getElementById('fontResults').innerHTML = '';
    document.getElementById('loading').classList.remove('hidden');
    fonts = [];
    displayedFonts = 0;

    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            fonts = data.items.filter(font => font.category === "sans-serif" || font.category === "display");
            showFonts();
            document.getElementById('loading').classList.add('hidden');
        })
        .catch(error => {
            console.error('Fehler beim Laden der Fonts:', error);
            document.getElementById('loading').classList.add('hidden');
        });
}

function showFonts() {
    const fontResults = document.getElementById('fontResults');
    const headline = document.getElementById('headlineInput').value || 'Beispiel-Headline';
    const subline = document.getElementById('sublineInput').value || 'Subline hier...';

    const nextFonts = fonts.slice(displayedFonts, displayedFonts + fontsPerLoad);

    nextFonts.forEach(font => {
        const card = document.createElement('div');
        card.className = 'font-card';

        const fontName = font.family.replace(/ /g, '+');
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);

        card.innerHTML = `
            <div class="font-sample" style="font-family: '${font.family}', sans-serif;">${headline}</div>
            <div class="font-sample" style="font-family: '${font.family}', sans-serif; font-size: 1.2rem;">${subline}</div>
            <div class="font-info"><b>${font.family}</b> – perfekt für moderne & kreative Projekte</div>
        `;
        fontResults.appendChild(card);
    });

    displayedFonts += fontsPerLoad;

    if (displayedFonts < fonts.length) {
        document.getElementById('loadMoreBtn').classList.remove('hidden');
    } else {
        document.getElementById('loadMoreBtn').classList.add('hidden');
    }
}
