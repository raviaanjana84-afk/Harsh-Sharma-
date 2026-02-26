// 1. Firebase Initialization
const firebaseConfig = {
    apiKey: "AIzaSyDO8kxU1t9zcfD0MXf6vhLlE3FR_CUKycE",
    authDomain: "harsh-sharma-website-f01ac.firebaseapp.com",
    projectId: "harsh-sharma-website-f01ac",
    storageBucket: "harsh-sharma-website-f01ac.firebasestorage.app",
    messagingSenderId: "8698683996",
    appId: "1:8698683996:web:58cd2b05fcf71646e0bc99"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 2. Data Content (All keys fixed: pujan, hawan, kundli, mantra + Sub-items)
const spiritualData = {
    'pujan': `
        <h2 style="color: #B22222; text-align: center;">🕉️ मुख्य पूजन विभाग</h2>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="showSection('mangal')">🚩 मंगल दोष (भात पूजन)</div>
            <div class="pujan-card" onclick="showSection('kaalsarp')">🐍 कालसर्प दोष निवारण</div>
            <div class="pujan-card" onclick="showSection('ark_vivah')">🌿 अर्क विवाह (पुरुषों हेतु)</div>
            <div class="pujan-card" onclick="showSection('kumbh_vivah')">🏺 कुंभ विवाह (स्त्रियों हेतु)</div>
            <div class="pujan-card" onclick="showSection('navgrah')">✨ नवग्रह शांति</div>
            <div class="pujan-card" onclick="showSection('baglamukhi')">🛡️ माँ बगलामुखी हवन पूजन</div>
        </div>
        <button class="back-link" style="margin-top:20px; width:100%; cursor:pointer;" onclick="hideSection()">← बंद करें</button>
    `,
    'hawan': `
        <h2 style="color: #B22222;">🔥 हवन विभाग</h2>
        <p>शुद्धि एवं सकारात्मक ऊर्जा हेतु विशेष अनुष्ठान संपन्न किए जाते हैं।</p>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="openWhatsApp('नवग्रह शांति हवन')">✨ नवग्रह शांति हवन</div>
            <div class="pujan-card" onclick="openWhatsApp('सुंदरकांड एवं हवन')">📖 सुंदरकांड पाठ एवं हवन</div>
            <div class="pujan-card" onclick="openWhatsApp('वास्तु शांति हवन')">🏠 वास्तु शांति पूजन</div>
        </div>
        <button class="back-link" style="margin-top:20px; width:100%; cursor:pointer;" onclick="hideSection()">← मुख्य पेज</button>
    `,
    'mangal': `
        <h2 style="color: #B22222;">🚩 मंगल दोष निवारण</h2>
        <p>मंगलनाथ मंदिर (उज्जैन) पर विशेष भात पूजन।</p>
        <button class="book-now-btn" onclick="openWhatsApp('मंगल भात पूजन')">📅 बुकिंग हेतु संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'ark_vivah': `
        <h2 style="color: #228B22;">🌿 अर्क विवाह</h2>
        <p>पुरुषों की कुंडली में विवाह बाधा दूर करने हेतु प्राचीन विधि।</p>
        <button class="book-now-btn" onclick="openWhatsApp('अर्क विवाह')">📅 संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'kumbh_vivah': `
        <h2 style="color: #8B4513;">🏺 कुंभ विवाह</h2>
        <p>स्त्रियों की कुंडली में मांगलिक दोष निवारण हेतु विशेष पूजन।</p>
        <button class="book-now-btn" onclick="openWhatsApp('कुंभ विवाह')">📅 संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'navgrah': `
        <h2 style="color: #4B0082;">✨ नवग्रह शांति</h2>
        <p>समस्त ग्रहों की शांति और सुख-समृद्धि हेतु वैदिक पूजन।</p>
        <button class="book-now-btn" onclick="openWhatsApp('नवग्रह शांति')">📅 संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'kaalsarp': `
        <h2 style="color: #444;">🐍 कालसर्प दोष शांति</h2>
        <p>चांदी के नाग-नागिन पूजन एवं विसर्जन विधि।</p>
        <button class="book-now-btn" onclick="openWhatsApp('कालसर्प पूजन')">📅 संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'kundli': `
        <h2 style="color: #B22222;">📜 कुंडली विश्लेषण</h2>
        <p>सटीक भविष्यफल एवं ग्रह दोष निवारण उपाय।</p>
        <button class="book-now-btn" onclick="openWhatsApp('कुंडली परामर्श')">📅 संपर्क करें</button>
        <button class="back-link" onclick="hideSection()">← मुख्य पेज</button>
    `,
    'mantra': `
        <h2 style="color: #B22222;">🕉️ मंत्र विभाग</h2>
        <p>महामृत्युंजय जाप एवं विशेष तांत्रिक अनुष्ठान।</p>
        <button class="book-now-btn" onclick="openWhatsApp('मंत्र जाप')">📅 संपर्क करें</button>
        <button class="back-link" onclick="hideSection()">← मुख्य पेज</button>
    `
};

// 3. Functions
function showSection(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    if (spiritualData[key]) {
        content.innerHTML = spiritualData[key];
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideSection() {
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openWhatsApp(service) {
    const phone = "918319714682";
    const msg = encodeURIComponent(`प्रणाम पंडित जी, मुझे "${service}" के बारे में जानकारी चाहिए।`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

// ... (Rest of your saveReview and displayReviews functions) ...
