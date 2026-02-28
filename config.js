// ==========================================
// 1. FIREBASE CONFIGURATION
// ==========================================
// यहाँ आपका Firebase डेटा है जो आपने पहले दिया था
const firebaseConfig = {
    apiKey: "AIzaSyDO8kxU1t9zcfD0MXf6vhLlE3FR_CUKycE",
    authDomain: "harsh-sharma-website-f01ac.firebaseapp.com",
    projectId: "harsh-sharma-website-f01ac",
    storageBucket: "harsh-sharma-website-f01ac.firebasestorage.app",
    messagingSenderId: "8698683996",
    appId: "1:8698683996:web:58cd2b05fcf71646e0bc99"
};

// Firebase शुरू करें
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// ==========================================
// 2. PWA INSTALL LOGIC
// ==========================================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // ब्राउज़र के डिफॉल्ट प्रॉम्प्ट को रोकें
    e.preventDefault();
    deferredPrompt = e;
    // इंस्टॉल बटन दिखाएं (UI में)
    const installBtn = document.getElementById('install-area');
    if (installBtn) installBtn.style.display = 'block';
});

window.installApp = async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install');
            document.getElementById('install-area').style.display = 'none';
        }
        deferredPrompt = null;
    }
};

// ==========================================
// 3. DAILY STRIKE SYSTEM ( engagement )
// ==========================================
function updateDailyStrike() {
    const today = new Date().toLocaleDateString(); // आज की तारीख
    const lastVisit = localStorage.getItem('lastVisitDate');
    let strikeCount = parseInt(localStorage.getItem('userStrike')) || 0;

    if (!lastVisit) {
        // पहली बार आया है
        strikeCount = 1;
    } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toLocaleDateString();

        if (lastVisit === today) {
            // यूजर आज पहले भी आ चुका है, कुछ न करें
        } else if (lastVisit === yesterdayStr) {
            // यूजर कल भी आया था, स्ट्राइक बढ़ाएं
            strikeCount += 1;
        } else {
            // स्ट्राइक टूट गई, वापस 1 से शुरू
            strikeCount = 1;
        }
    }

    // डेटा सेव करें
    localStorage.setItem('lastVisitDate', today);
    localStorage.setItem('userStrike', strikeCount);

    // UI में दिखाएं
    const strikeDisplay = document.getElementById('strike-display');
    if (strikeDisplay) {
        strikeDisplay.innerText = `🔥 ${strikeCount} दिन`;
    }
}

// पेज लोड होते ही स्ट्राइक चेक करें
document.addEventListener('DOMContentLoaded', updateDailyStrike);
