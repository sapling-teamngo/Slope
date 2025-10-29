
function setLanguage(lang) {
    const labels = {
        en: {
            rainfall: "Rainfall (mm):",
            slope: "Slope:",
            soil: "Soil Texture:",
            land: "Land Area (m²):"
        },
        fr: {
            rainfall: "Pluviométrie (mm):",
            slope: "Pente:",
            soil: "Texture du sol:",
            land: "Surface du terrain (m²):"
        },
        ar: {
            rainfall: "كمية الأمطار (مم):",
            slope: "الانحدار:",
            soil: "نوع التربة:",
            land: "مساحة الأرض (م²):"
        }
    };
    document.getElementById("rainfall-label").innerText = labels[lang].rainfall;
    document.getElementById("slope-label").innerText = labels[lang].slope;
    document.getElementById("soil-label").innerText = labels[lang].soil;
    document.getElementById("land-label").innerText = labels[lang].land;
}

function calculate() {
    const rainfall = parseFloat(document.getElementById("rainfall").value);
    const slope = parseFloat(document.getElementById("slope").value);
    const soil = parseFloat(document.getElementById("soil").value);
    const land_area = parseFloat(document.getElementById("land_area").value);

    const area = (0.005 * rainfall + 1.0) * (1 + slope / 100) * soil;
    const depth = (0.020 * rainfall + 5.0) * (1 + slope / 100) * soil;
    const diameter = Math.sqrt((2 * area) / Math.PI);
    const num_halfmoons = Math.floor(land_area / area);

    document.getElementById("results").innerHTML = `
        <h2>Results</h2>
        <p>Half-Moon Area: ${area.toFixed(2)} m²</p>
        <p>Depth: ${depth.toFixed(2)} cm</p>
        <p>Diameter: ${diameter.toFixed(2)} m</p>
        <p>Number of Half-Moons for ${land_area} m²: ${num_halfmoons}</p>
    `;

    document.getElementById("explanation").innerHTML = `
        <h3>Mathematical Explanation</h3>
        <p>Area = (0.005 × Rainfall + 1.0) × (1 + Slope% / 100) × SoilFactor</p>
        <p>Depth = (0.020 × Rainfall + 5.0) × (1 + Slope% / 100) × SoilFactor</p>
        <p>Diameter = √(2 × Area / π)</p>
        <p>Source: The Half-Moon Technique (Benin), WOCAT SLM Technologies</p>
    `;
}

function downloadResults() {
    const text = document.getElementById("results").innerText + "
" + document.getElementById("explanation").innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "earth_smiles_results.txt";
    link.click();
}
