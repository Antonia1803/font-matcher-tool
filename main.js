
const apiKey = 'AIzaSyAsYiOrdnXJe_-D6GhXzbJNbXO6jDcqft8';

async function fetchGoogleFonts() {
  const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`);
  const data = await response.json();
  return data.items;
}

function loadFont(fontName) {
  WebFont.load({
    google: {
      families: [fontName]
    },
    active: () => {
      document.getElementById("headline").style.fontFamily = fontName;
      document.getElementById("subline").style.fontFamily = fontName;
    }
  });
}

async function initFontSelector() {
  const fonts = await fetchGoogleFonts();
  const selector = document.getElementById("fontSelector");

  fonts.forEach(font => {
    const option = document.createElement("option");
    option.value = font.family;
    option.textContent = font.family;
    option.dataset.category = font.category;
    selector.appendChild(option);
  });

  selector.addEventListener("change", (e) => {
    loadFont(e.target.value);
  });

  loadFont(fonts[0].family);
}

document.getElementById("headlineInput").addEventListener("input", (e) => {
  document.getElementById("headline").textContent = e.target.value || "Deine Headline";
});

document.getElementById("sublineInput").addEventListener("input", (e) => {
  document.getElementById("subline").textContent = e.target.value || "Deine Subline oder Bodytext erscheint hier";
});

initFontSelector();
