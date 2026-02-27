// --- 1. PWA INSTALL LOGIC ---
let deferredPrompt;
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(() => console.log("SW Registered"));
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-area').style.display = 'block';
});

window.installApp = async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') document.getElementById('install-area').style.display = 'none';
        deferredPrompt = null;
    }
};

// --- 2. FIREBASE CONFIG ---
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

// --- 3. DATA & NAVIGATION ---
const spiritualData = {
    'pujan': `<h2>🕉️ पूजन विभाग</h2><div class="pujan-menu">
        <div class="pujan-card" onclick="window.showSection('mangal')">🚩 मंगल दोष (भात पूजन)</div>
        <div class="pujan-card" onclick="window.showSection('kaalsarp')">🐍 कालसर्प दोष शांति</div>
        </div><button class="back-link" onclick="window.hideSection()">← बंद करें</button>`,
    'mangal': `<h2>🚩 मंगल दोष पूजन</h2><p>उज्जैन मंगलनाथ मंदिर पर विशेष भात पूजन।</p><button class="book-now-btn" onclick="window.openWhatsApp('मंगल भात पूजन')">अभी बुक करें</button>`,
    'hawan': `<h2>🔥 हवन विभाग</h2><div class="pujan-menu"><div class="pujan-card" onclick="window.openWhatsApp('नवग्रह हवन')">✨ नवग्रह हवन</div></div>`,
    'mantra': `<h2 style="color: #B22222; text-align: center;">🛕 मंत्र विभाग</h2><div class="pujan-menu">
        <div class="pujan-card" onclick="window.showMantraContent('shiv')">1️⃣ शिव मंत्र</div>
        <div class="pujan-card" onclick="window.showMantraContent('rules')">7️⃣ जप के नियम</div>
        </div><button class="back-link" onclick="window.hideSection()">← बंद करें</button>`,
    'shiv': `<h2>🔱 शिव मंत्र</h2><div class="pujan-menu"><div class="pujan-card" onclick="window.showMantraContent('mahamrityunjay')">🕉️ महामृत्युंजय मंत्र</div></div><button class="back-link" onclick="window.showSection('mantra')">← वापस</button>`,
    'mahamrityunjay': `<h3>🕉️ महामृत्युंजय मंत्र</h3><p style="background:#fdf2f2; padding:15px; border-radius:10px;"><b>ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।<br>उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥</b></p><button class="back-link" onclick="window.showMantraContent('shiv')">← वापस</button>`,
    'rules': `<h2>📜 जप नियम</h2><p>शांत स्थान पर बैठकर 108 बार जप करें।</p><button class="back-link" onclick="window.showSection('mantra')">← वापस</button>`
};

// --- 4. ADVANCED QUIZ ---
const masterQuizBank = {
    'रामायण': [
        { q: "श्रीराम के धनुष का नाम क्या था?", options: ["कोदंड", "गांडीव", "पिनाक", "शारंग"], a: 0 },
        { q: "लक्ष्मण जी की माता कौन थीं?", options: ["कौशल्या", "कैकेयी", "सुमित्रा", "मन्दोदरी"], a: 2 }
    ],
    'महाभारत': [
        { q: "गीता का उपदेश किसने दिया?", options: ["भीष्म", "अर्जुन", "श्रीकृष्ण", "धृतराष्ट्र"], a: 2 }
    ]
};

let selectedQue = []; let currentIdx = 0; let score = 0;

window.initQuiz = function() {
    const topicDiv = document.getElementById('topic-selection');
    topicDiv.innerHTML = "";
    Object.keys(masterQuizBank).forEach(topic => {
        topicDiv.innerHTML += `<div class="pujan-card" style="text-align:center;" onclick="window.startBigQuiz('${topic}')">🚩 ${topic}</div>`;
    });
};

window.startBigQuiz = function(topic) {
    selectedQue = [...masterQuizBank[topic]].sort(() => Math.random() - 0.5).slice(0, 10);
    currentIdx = 0; score = 0;
    document.getElementById('topic-selection').style.display = 'none';
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('question-area').style.display = 'block';
    renderQue();
};

function renderQue() {
    const data = selectedQue[currentIdx];
    document.getElementById('que-count').innerText = `प्रश्न: ${currentIdx + 1}/${selectedQue.length}`;
    document.getElementById('score-count').innerText = `स्कोर: ${score}`;
    document.getElementById('question-text').innerText = data.q;
    const optDiv = document.getElementById('options-list');
    optDiv.innerHTML = "";
    data.options.forEach((o, i) => {
        optDiv.innerHTML += `<div class="pujan-card" style="text-align:center; background:#fff;" onclick="window.checkAns(${i})">${o}</div>`;
    });
}

window.checkAns = function(i) {
    if(i === selectedQue[currentIdx].a) score++;
    currentIdx++;
    if(currentIdx < selectedQue.length) renderQue();
    else showRes();
};

function showRes() {
    document.getElementById('question-area').innerHTML = `<div style="text-align:center; padding:20px;"><h3>क्विज़ पूर्ण!</h3><p style="font-size:22px;">स्कोर: ${score}/${selectedQue.length}</p><button class="book-now-btn" onclick="window.location.reload()">मुख्य मेनू 🏠</button></div>`;
}

// --- 5. GLOBAL FUNCTIONS ---
window.showSection = function(k) {
    const c = document.getElementById('overlay-content');
    c.innerHTML = spiritualData[k];
    document.getElementById('overlay').style.display = 'flex';
};
window.showMantraContent = function(k) { document.getElementById('overlay-content').innerHTML = spiritualData[k]; };
window.hideSection = function() { document.getElementById('overlay').style.display = 'none'; document.body.style.overflow = 'auto'; };
window.openWhatsApp = function(s) { window.open(`https://wa.me/918319714682?text=प्रणाम, मुझे ${s} की जानकारी चाहिए।`, '_blank'); };
window.saveReview = async function() {
    const n = document.getElementById('userName').value; const r = document.getElementById('userReview').value;
    if (n && r) { await db.collection("reviews").add({ name: n, review: r, time: new Date() }); alert("🙏 धन्यवाद!"); location.reload(); }
};

document.addEventListener('DOMContentLoaded', window.initQuiz);
    
