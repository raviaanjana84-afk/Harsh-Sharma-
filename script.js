// --- 1. PWA & FORCE INSTALL LOGIC ---
let deferredPrompt;

// सर्विस वर्कर को रजिस्टर करना
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('SW Registered'))
            .catch(err => console.log('SW Failed', err));
    });
}

// जब ब्राउज़र ऐप इंस्टॉल करने के लिए तैयार हो
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // स्क्रीन पर एक बटन दिखाएं ताकि यूजर को 3-dots में न जाना पड़े
    const installDiv = document.createElement('div');
    installDiv.id = 'manual-install-banner';
    installDiv.innerHTML = `
        <div style="position:fixed; bottom:80px; left:5%; width:90%; background:#B22222; color:white; padding:15px; border-radius:10px; text-align:center; z-index:9999; box-shadow:0 5px 15px rgba(0,0,0,0.3);">
            <p style="margin:0 0 10px 0;">🚩 हमारा ऐप इंस्टॉल करें!</p>
            <button onclick="window.forceInstall()" style="background:#FFD700; color:#333; border:none; padding:10px 20px; border-radius:5px; font-weight:bold; cursor:pointer;">अभी इंस्टॉल करें</button>
        </div>
    `;
    document.body.appendChild(installDiv);
});

window.forceInstall = async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            const banner = document.getElementById('manual-install-banner');
            if(banner) banner.remove();
        }
        deferredPrompt = null;
    }
};

// --- 2. FIREBASE & DATA ---
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

// --- 3. UI FUNCTIONS ---
const spiritualData = {
    'pujan': `<h2>🕉️ पूजन विभाग</h2><div class="pujan-menu">
        <div class="pujan-card" onclick="window.showSection('mangal')">🚩 मंगल दोष (भात पूजन)</div>
        <div class="pujan-card" onclick="window.showSection('kaalsarp')">🐍 कालसर्प दोष शांति</div>
        </div><button class="back-link" onclick="window.hideSection()">← बंद करें</button>`,
    'mangal': `<h2>🚩 मंगल दोष</h2><p>उज्जैन मंगलनाथ मंदिर पर विशेष पूजन।</p><button class="book-now-btn" onclick="window.openWhatsApp('मंगल भात पूजन')">बुकिंग करें</button>`,
    'hawan': `<h2>🔥 हवन विभाग</h2><div class="pujan-menu"><div class="pujan-card" onclick="window.openWhatsApp('नवग्रह हवन')">✨ नवग्रह हवन</div></div>`
};

window.showSection = function(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    if (spiritualData[key]) {
        content.innerHTML = spiritualData[key];
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
};

window.hideSection = function() {
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.openWhatsApp = function(s) {
    window.open(`https://wa.me/918319714682?text=प्रणाम, मुझे ${s} की जानकारी चाहिए।`, '_blank');
};

// --- 4. REVIEWS & INITIALIZATION ---
window.saveReview = async function() {
    const n = document.getElementById('userName').value;
    const r = document.getElementById('userReview').value;
    if (n && r) {
        await db.collection("reviews").add({ name: n, review: r, time: new Date() });
        alert("🙏 धन्यवाद!"); location.reload();
    }
};

function displayReviews() {
    const list = document.getElementById('reviewsList');
    if (!list) return;
    db.collection("reviews").orderBy("time", "desc").limit(5).onSnapshot(snap => {
        list.innerHTML = "";
        snap.forEach(doc => {
            const d = doc.data();
            list.innerHTML += `<div class="wisdom-card" style="margin:10px 0;"><p>"${d.review}"</p><small>- ${d.name}</small></div>`;
        });
    });
}
document.addEventListener('DOMContentLoaded', displayReviews);
