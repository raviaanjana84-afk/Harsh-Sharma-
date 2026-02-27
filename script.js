// --- 1. PWA & SERVICE WORKER LOGIC (सबसे ऊपर) ---
let deferredPrompt;

// सर्विस वर्कर को रजिस्टर करना (सुनिश्चित करें कि service-worker.js फाइल मौजूद है)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker Registered Successfully!'))
            .catch(err => console.log('Service Worker Registration Failed!', err));
    });
}

// जब ब्राउज़र ऐप इंस्टॉल करने के लिए तैयार हो (Install Prompt)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log("PWA: ऐप अब इंस्टॉल होने के लिए तैयार है!");
    
    // अगर आपने HTML में 'install-area' वाला बटन बनाया है, तो उसे यहाँ दिखाएं
    const installBtn = document.getElementById('install-area');
    if(installBtn) installBtn.style.display = 'block';
});

// इंस्टॉल बटन दबाने पर चलने वाला फंक्शन
window.installApp = async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
    } else {
        alert("कृपया ब्राउज़र के 3-dots मेनू में जाकर 'Install App' चुनें।");
    }
};

// --- 2. FIREBASE CONFIGURATION ---
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

// --- 3. UI & NAVIGATION LOGIC ---
const spiritualData = {
    'pujan': `<h2>🕉️ पूजन विभाग</h2>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="window.showSection('mangal')">🚩 मंगल दोष (भात पूजन)</div>
            <div class="pujan-card" onclick="window.showSection('kaalsarp')">🐍 कालसर्प दोष शांति</div>
        </div>
        <button class="back-link" onclick="window.hideSection()">← बंद करें</button>`,
    'mangal': `<h2>🚩 मंगल दोष पूजन</h2><p>उज्जैन मंगलनाथ मंदिर पर विशेष भात पूजन।</p><button class="book-now-btn" onclick="window.openWhatsApp('मंगल भात पूजन')">अभी बुक करें</button><button class="back-link" onclick="window.showSection('pujan')">← वापस</button>`,
    'hawan': `<h2>🔥 हवन विभाग</h2><div class="pujan-menu"><div class="pujan-card" onclick="window.openWhatsApp('नवग्रह हवन')">✨ नवग्रह शांति हवन</div></div><button class="back-link" onclick="window.hideSection()">← वापस</button>`,
    'kundli': `<h2>📜 कुंडली विश्लेषण</h2><p>सटीक भविष्यफल।</p><button class="book-now-btn" onclick="window.openWhatsApp('कुंडली परामर्श')">संपर्क करें</button><button class="back-link" onclick="window.hideSection()">← वापस</button>`
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

window.openWhatsApp = function(service) {
    const phone = "918319714682";
    const msg = encodeURIComponent(`प्रणाम पंडित जी, मुझे "${service}" के बारे में जानकारी चाहिए।`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
};

// --- 4. REVIEWS SYSTEM ---
window.saveReview = async function() {
    const name = document.getElementById('userName').value;
    const review = document.getElementById('userReview').value;
    if (!name || !review) { alert("कृपया नाम और अनुभव भरें।"); return; }
    
    try {
        await db.collection("reviews").add({
            name: name, review: review,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("🙏 साझा करने के लिए धन्यवाद!");
        location.reload();
    } catch (e) { alert("Error saving review!"); }
};

function displayReviews() {
    const list = document.getElementById('reviewsList');
    if (!list) return;
    db.collection("reviews").orderBy("timestamp", "desc").limit(5).onSnapshot(snap => {
        list.innerHTML = "";
        snap.forEach(doc => {
            const d = doc.data();
            list.innerHTML += `<div class="wisdom-card" style="margin-bottom:10px;">
                <p style="margin:0;">"${d.review}"</p>
                <small><b>- ${d.name}</b></small>
            </div>`;
        });
    });
}

// पेज लोड होने पर रिव्यूज दिखाएं
document.addEventListener('DOMContentLoaded', displayReviews);
