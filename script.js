// 1. Firebase Setup
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

// 2. Spiritual Content Data
const spiritualData = {
    'pujan': `<h2 style="color: #B22222; text-align: center;">🕉️ पूजन विभाग</h2>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="window.showSection('mangal')">🚩 मंगल दोष (भात पूजन) - ₹1350 से</div>
            <div class="pujan-card" onclick="window.showSection('kaalsarp')">🐍 कालसर्प दोष शांति - ₹2100 से</div>
            <div class="pujan-card" onclick="window.showSection('ark_vivah')">🌿 अर्क विवाह - ₹2500 से</div>
        </div>
        <button class="back-link" style="width:100%;" onclick="window.hideSection()">← बंद करें</button>`,
    'mangal': `<h2>🚩 मंगल दोष पूजन</h2><p>उज्जैन मंगलनाथ मंदिर पर किया जाने वाला विशेष पूजन।</p><button class="book-now-btn" onclick="window.openWhatsApp('मंगल भात पूजन')">अभी बुक करें</button>`,
    'hawan': `<h2>🔥 हवन विभाग</h2><div class="pujan-menu"><div class="pujan-card" onclick="window.openWhatsApp('नवग्रह हवन')">✨ नवग्रह शांति हवन</div></div>`
};

// 3. Mantra Nested Data (As requested)
const mantraData = {
    'main': `<h2 style="color: #B22222; text-align: center;">🛕 मंत्र विभाग</h2>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="window.showMantraContent('shiv')">1️⃣ शिव मंत्र</div>
            <div class="pujan-card" onclick="window.showMantraContent('rules')">7️⃣ जप के नियम</div>
            <div class="pujan-card" onclick="window.showMantraContent('msg')">🔟 अंतिम संदेश</div>
        </div>`,
    'shiv': `<h2>🔱 शिव मंत्र</h2><div class="pujan-menu"><div class="pujan-card" onclick="window.showMantraContent('mahamrityunjay')">🕉️ महामृत्युंजय मंत्र</div></div>`,
    'mahamrityunjay': `<h3>🕉️ महामृत्युंजय मंत्र</h3><p style="background:#fdf2f2; padding:10px; border-radius:8px;">ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।</p><button class="back-link" onclick="window.showMantraContent('shiv')">← वापस</button>`,
    'rules': `<h2>📜 नियम</h2><p>ब्रह्म मुहूर्त में जप करना श्रेष्ठ है।</p>`,
    'msg': `<h2>🔟 संदेश</h2><p>श्रद्धा ही फलदायी है।</p>`
};

// 4. Quiz Logic (10 Questions)
const quizData = [
    { q: "महाकालेश्वर ज्योतिर्लिंग कहाँ स्थित है?", options: ["काशी", "उज्जैन", "नासिक", "द्वारका"], a: 1 },
    { q: "श्रीमद्भगवद्गीता में कितने अध्याय हैं?", options: ["12", "18", "21", "24"], a: 1 },
    { q: "रामचरितमानस के रचयिता कौन हैं?", options: ["वाल्मीकि", "वेद व्यास", "तुलसीदास", "कबीर"], a: 2 },
    { q: "चार वेदों में सबसे प्राचीन वेद कौन सा है?", options: ["ऋग्वेद", "सामवेद", "यजुर्वेद", "अथर्ववेद"], a: 0 },
    { q: "भगवान शिव के धनुष का नाम क्या था?", options: ["पिनाक", "गांडीव", "शारंग", "कोदंड"], a: 0 },
    { q: "पांडवों में सबसे ज्येष्ठ भाई कौन थे?", options: ["भीम", "अर्जुन", "युधिष्ठिर", "नकुल"], a: 2 },
    { q: "माँ दुर्गा के कितने रूप माने जाते हैं?", options: ["7", "9", "11", "21"], a: 1 },
    { q: "भगवान कृष्ण का जन्म कहाँ हुआ था?", options: ["मथुरा", "गोकुल", "द्वारका", "वृंदावन"], a: 0 },
    { q: "हनुमान जी को किसका अवतार माना जाता है?", options: ["विष्णु", "शिव", "ब्रह्मा", "इंद्र"], a: 1 },
    { q: "सूर्य पुत्र किसे कहा जाता है?", options: ["अर्जुन", "भीम", "कर्ण", "नकुल"], a: 2 }
];

let currentQue = 0; let score = 0;

window.startQuiz = function() {
    currentQue = 0; score = 0; showQuestion();
};

function showQuestion() {
    const quizBox = document.getElementById('quiz-content');
    const data = quizData[currentQue];
    let opts = "";
    data.options.forEach((o, i) => {
        opts += `<button class="pujan-card" style="width:100%; text-align:center;" onclick="window.checkAns(${i})">${o}</button>`;
    });
    quizBox.innerHTML = `<p><b>प्रश्न ${currentQue + 1}/10:</b> ${data.q}</p>${opts}`;
}

window.checkAns = function(i) {
    if (i === quizData[currentQue].a) score++;
    currentQue++;
    if (currentQue < quizData.length) showQuestion();
    else showResult();
};

function showResult() {
    document.getElementById('quiz-content').innerHTML = `<h4>स्कोर: ${score}/10</h4><button class="back-link" onclick="window.startQuiz()">फिर से खेलें</button>`;
}

// 5. Global Functions
window.showSection = function(k) {
    const c = document.getElementById('overlay-content');
    if (k === 'mantra') c.innerHTML = mantraData['main'];
    else c.innerHTML = spiritualData[k];
    document.getElementById('overlay').style.display = 'flex';
};

window.showMantraContent = function(k) {
    document.getElementById('overlay-content').innerHTML = mantraData[k];
};

window.hideSection = function() {
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.openWhatsApp = function(s) {
    window.open(`https://wa.me/918319714682?text=प्रणाम, मुझे ${s} की जानकारी चाहिए।`, '_blank');
};

window.saveReview = async function() {
    const name = document.getElementById('userName').value;
    const review = document.getElementById('userReview').value;
    if (name && review) {
        await db.collection("reviews").add({ name, review, time: new Date() });
        alert("🙏 धन्यवाद!"); location.reload();
    }
};

window.hideSection = function() { document.getElementById('overlay').style.display = 'none'; };
