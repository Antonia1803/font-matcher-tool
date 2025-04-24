fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=YOUR_GOOGLE_API_KEY')
  .then(response => response.json())
  .then(data => {
    const fonts = data.items.map(item => item.family);

    WebFont.load({
      google: {
        families: fonts
      },
      active: function() {
        console.log('Alle Google Fonts sind jetzt geladen!');
        initializeApp();
      },
      inactive: function() {
        console.log('Fehler beim Laden der Google Fonts!');
      }
    });
  })
  .catch(error => {
    console.log('Fehler beim Abrufen der Google Fonts:', error);
  });

function initializeApp() {
  console.log("Font Matcher Tool ist jetzt bereit!");
  document.getElementById("root").innerHTML = "Das Font Matcher Tool ist bereit!";
}
import { createElement as h, useState, useEffect } from "https://esm.sh/react";
import { render } from "https://esm.sh/react-dom";
import fontData from "./fontData.js";

const traits = [
  "freundlich", "puristisch", "ehrlich", "nachhaltig", "einfach",
  "innovativ", "lecker", "familienfreundlich", "natürlich", "öko"
];

function App() {
  const [headlineFont, setHeadlineFont] = useState("Roboto");
  const [bodyFont, setBodyFont] = useState("Lora");
  const [headlineText, setHeadlineText] = useState("Eppli investieren in Stil");
  const [sublineText, setSublineText] = useState("Die passende Subline-Schrift zur Headline");
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [filteredFonts, setFilteredFonts] = useState(fontData);

  useEffect(() => {
    WebFont.load({ google: { families: [headlineFont, bodyFont] } });
  }, [headlineFont, bodyFont]);

  useEffect(() => {
    if (selectedTraits.length === 0) {
      setFilteredFonts(fontData);
    } else {
      setFilteredFonts(fontData.filter(f =>
        selectedTraits.every(trait => f.traits.includes(trait))
      ));
    }
  }, [selectedTraits]);

  return h("div", { style: { maxWidth: "800px", margin: "auto" } },
    h("h1", null, "Font Matcher Tool"),
    h("div", null, traits.map(trait =>
      h("label", { key: trait, style: { marginRight: "1rem" } },
        h("input", {
          type: "checkbox",
          checked: selectedTraits.includes(trait),
          onChange: e => {
            const updated = e.target.checked
              ? [...selectedTraits, trait]
              : selectedTraits.filter(t => t !== trait);
            setSelectedTraits(updated);
          }
        }),
        " " + trait
      )
    )),
    h("div", null,
      h("select", {
        value: headlineFont,
        onChange: e => setHeadlineFont(e.target.value)
      }, filteredFonts.map(f => h("option", { value: f.name }, f.name))),
      h("select", {
        value: bodyFont,
        onChange: e => setBodyFont(e.target.value)
      }, filteredFonts.map(f => h("option", { value: f.name }, f.name)))
    ),
    h("input", {
      value: headlineText,
      onChange: e => setHeadlineText(e.target.value),
      placeholder: "Headline Text eingeben",
      style: { width: "100%" }
    }),
    h("input", {
      value: sublineText,
      onChange: e => setSublineText(e.target.value),
      placeholder: "Subline Text eingeben",
      style: { width: "100%" }
    }),
    h("div", {
      style: {
        padding: "1rem", backgroundColor: "#fff", marginTop: "1rem",
        fontFamily: bodyFont, border: "1px solid #ddd"
      }
    },
      h("h2", { style: { fontFamily: headlineFont } }, headlineText),
      h("p", null, sublineText)
    )
  );
}

render(h(App), document.getElementById("root"));
