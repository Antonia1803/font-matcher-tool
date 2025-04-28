// Font-Datenbank
const fonts = [
  {
    name: 'Montserrat',
    traits: ['modern', 'selbstbewusst', 'geometrisch'],
    category: 'sans-serif'
  },
  {
    name: 'Playfair Display',
    traits: ['elegant', 'hochwertig', 'charakterstark'],
    category: 'serif'
  },
  {
    name: 'Lato',
    traits: ['freundlich', 'natürlich', 'vertrauenswürdig'],
    category: 'sans-serif'
  },
  {
    name: 'Roboto',
    traits: ['innovativ', 'dynamisch', 'technisch'],
    category: 'sans-serif'
  },
  {
    name: 'Poppins',
    traits: ['energiegeladen', 'modern', 'geometrisch'],
    category: 'sans-serif'
  },
  {
    name: 'Merriweather',
    traits: ['zuverlässig', 'bodenständig', 'lesefreundlich'],
    category: 'serif'
  }
];

// Erklärungen
const fontExplanations = {
  'Montserrat': 'Geometrische Präzision für professionelle Wirkung',
  'Playfair Display': 'Klassische Eleganz mit zeitgemäßer Lesbarkeit',
  'Lato': 'Ausgewogene Rundungen schaffen Vertrauen',
  'Roboto': 'Technisch präzise Formen für digitale Projekte',
  'Poppins': 'Dynamische Geometrie mit hoher Flexibilität',
  'Merriweather': 'Optimale Lesbarkeit für lange Texte'
};

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
  // Hier deine bestehende Event-Listener für die Filter
  // Beispiel-Trigger für Demo-Zwecke:
  updateFontDisplay(['modern', 'professionell']);
});

function updateFontDisplay(selectedTraits) {
  const container = document.getElementById('font-container');
  container.innerHTML = '';

  const filteredFonts = filterFonts(selectedTraits);
  
  filteredFonts.forEach(font => {
    const card = document.createElement('div');
    card.className = 'font-card';
    card.innerHTML = `
      <div class="font-preview" style="font-family: '${font.name}'">
        ${font.name}<br>
        "Design ist Harmonie"
      </div>
      <div class="font-explanation">
        <h3>${font.name}</h3>
        <p>${fontExplanations[font.name]}</p>
        <ul>
          ${font.traits.filter(t => selectedTraits.includes(t)).map(t => `<li>Passt zu: ${t}</li>`).join('')}
        </ul>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterFonts(selectedTraits) {
  return fonts.filter(font => 
    selectedTraits.some(trait => font.traits.includes(trait))
  ).sort((a, b) => {
    const aMatches = a.traits.filter(t => selectedTraits.includes(t)).length;
    const bMatches = b.traits.filter(t => selectedTraits.includes(t)).length;
    return bMatches - aMatches;
  });
}
