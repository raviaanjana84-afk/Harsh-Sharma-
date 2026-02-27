// --- 1. PWA & INSTALL LOGIC (सबसे पहले) ---
let deferredPrompt;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker Live!', reg))
            .catch(err => console.log('SW Registration Failed!', err));
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log("PWA: ऐप अब इंस्टॉल के लिए तैयार है!");
    // अगर आपने HTML में 'install-area' बनाया है तो उसे यहाँ दिखा सकते हैं
    const btnArea = document.getElementById('install-area');
    if(btnArea) btnArea.style.display = 'block';
});

window.installApp = async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') console.log('User installed the app');
        deferredPrompt = null;
    } else {
        alert("कृपया Chrome मेनू (3-dots) में जाकर 'Install App' चुनें।");
    }
};

// --- 2. FIREBASE INITIALIZATION ---
const firebaseConfig = {
    apiKey: "AIzaSyDO8kxU1t9zcfD0MXf6vhLlE3FR_CUKycE",
    authDomain: "harsh-sharma-website-f01ac.firebaseapp.com",
    projectId: "harsh-sharma-website-f01ac",
    storageBucket: "harsh-sharma-website-f01ac.firebasestorage.app",
    messagingSenderId: "8698683996",
    appId: "1:8698683996:web:58cd2b05fcf71646e0bc99"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- 3. SPIRITUAL DATA & NAVIGATION ---
const spiritualData = {
    'pujan': `<h2>🕉️ पूजन विभाग</h2><div class="pujan-menu">
        <div class="pujan-card" onclick="window.showSection('mangal')">🚩 मंगल दोष (भात पूजन)</div>
        <div class="pujan-card" onclick="window.showSection('kaalsarp')">🐍 कालसर्प दोष शांति</div>
        </div><button class="back-link" onclick="window.hideSection()">← बंद करें</button>`,
    'mangal': `<h2>🚩 मंगल दोष पूजन</h2><p>उज्जैन मंगलनाथ मंदिर पर विशेष भात पूजन।</p><button class="book-now-btn" onclick="window.openWhatsApp('मंगल भात पूजन')">अभी बुक करें</button>`,
    'hawan': `<h2>🔥 हवन विभाग</h2><div class="pujan-menu"><div class="pujan-card" onclick="window.openWhatsApp('नवग्रह हवन')">✨ नवग्रह शांति हवन</div></div>`
};

window.showSection = function(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    if (key === 'mantra') {
        // मंत्र का कोड यहाँ (जो आपने पहले बनाया था)
        content.innerHTML = "<h2>मंत्र विभाग जल्द आ रहा है</h2>"; 
    } else if (spiritualData[key]) {
        content.innerHTML = spiritualData[key];
    }
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.hideSection = function() {
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.openWhatsApp = function(service) {
    window.open(`https://wa.me/918319714682?text=प्रणाम, मुझे ${service} की जानकारी चाहिए।`, '_blank');
};

// --- 4. REVIEW SYSTEM ---
window.saveReview = async function() {
    const name = document.getElementById('userName').value;
    const review = document.getElementById('userReview').value;
    if (name && review) {
        await db.collection("reviews").add({ name, review, time: new Date() });
        alert("🙏 धन्यवाद!"); location.reload();
    }
};
