
const API_KEY = 'AIzaSyAsYiOrdnXJe_-D6GhXzbJNbXO6jDcqft8';
const fontSelect = document.getElementById('fontSelect');
const generateBtn = document.getElementById('generateBtn');
const headlineInput = document.getElementById('headlineInput');
const sublineInput = document.getElementById('sublineInput');
const headlineOutput = document.getElementById('headlineOutput');
const sublineOutput = document.getElementById('sublineOutput');
const sublineFontOptions = document.getElementById('sublineFontOptions');

// Google Fonts API URL
const googleFontsAPI = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;

// Fetch Google Fonts data
fetch(googleFontsAPI)
  .then(response => response.json())
  .then(data => {
    const fonts = data.items;
    fonts.forEach(font => {
      const option = document.createElement('option');
      option.value = font.family;
      option.textContent = font.family;
      fontSelect.appendChild(option);
    });
  });

// Funktion zum Generieren der Ausgabe
generateBtn.addEventListener('click', () => {
  const headline = headlineInput.value;
  const selectedFont = fontSelect.value;
  const subline = sublineInput.value;

  headlineOutput.style.fontFamily = selectedFont;
  headlineOutput.textContent = headline;

  // Dynamische Subline-Fonts basierend auf der Headline-Schriftart
  sublineFontOptions.innerHTML = '';
  fetch(googleFontsAPI)
    .then(response => response.json())
    .then(data => {
      const fonts = data.items.filter(font => font.family !== selectedFont);
      fonts.slice(0, 5).forEach(font => {
        const subOption = document.createElement('button');
        subOption.textContent = font.family;
        subOption.style.fontFamily = font.family;
        subOption.addEventListener('click', () => {
          sublineOutput.textContent = subline;
          sublineOutput.style.fontFamily = font.family;
        });
        sublineFontOptions.appendChild(subOption);
      });
    });
});
