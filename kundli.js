// ==========================================
// KUNDLI DEPARTMENT DATA & LOGIC
// ==========================================

const MASTER_KUNDLI_DATA = {
    'nirman': {
        title: "कुंडली निर्माण",
        details: "जन्म समय और स्थान के आधार पर सटीक एवं विस्तृत डिजिटल कुंडली का निर्माण।",
        price: "2100₹"
    },
    'analysis': {
        title: "कुंडली विश्लेषण (Personal Consultation)",
        details: "विवाह, व्यापार, नौकरी और स्वास्थ्य संबंधी समस्याओं का समाधान और सटीक ज्योतिषीय उपाय।",
        price: "500₹ (प्रति प्रश्न/परामर्श)"
    }
};

// Function to render Kundli Menu
window.renderKundliMenu = () => {
    let html = `<h2>📜 कुंडली विभाग</h2><div class="menu-grid">`;
    Object.keys(MASTER_KUNDLI_DATA).forEach(key => {
        html += `<div class="pujan-card" onclick="window.renderDetail('kundli', '${key}')">
                    ${MASTER_KUNDLI_DATA[key].title}
                 </div>`;
    });
    html += `</div>`;
    document.getElementById('overlay-content').innerHTML = html + `<button class="back-link" onclick="window.hideSection()">बंद करें</button>`;
};

