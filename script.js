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

// 2. Data Bank
const spiritualData = {
    'pujan': `<h2>🕉️ पूजन विभाग</h2><div class="pujan-menu">
        <div class="pujan-card" onclick="window.showSection('mangal')">🚩 मंगल दोष (भात पूजन)</div>
        <div class="pujan-card" onclick="window.showSection('kaalsarp')">🐍 कालसर्प दोष शांति</div>
        </div><button class="back-link" onclick="window.hideSection()">← बंद करें</button>`,
    'mangal': `<h2>🚩 मंगल दोष पूजन</h2><p>उज्जैन मंगलनाथ मंदिर पर विशेष भात पूजन।</p><button class="book-now-btn" onclick="window.openWhatsApp('मंगल भात पूजन')">अभी बुक करें</button>`,
    'hawan': `<h2>🔥 हवन विभाग</h2><div class="pujan-menu"><div class="pujan-card" onclick="window.openWhatsApp('नवग्रह हवन')">✨ नवग्रह शांति हवन</div></div>`
};

const mantraData = {
    'main': `<h2 style="color: #B22222; text-align: center;">🛕 मंत्र विभाग</h2>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="window.showMantraContent('shiv')">1️⃣ शिव मंत्र</div>
            <div class="pujan-card" onclick="window.showMantraContent('rules')">7️⃣ जप के नियम</div>
        </div>`,
    'shiv': `<h2>🔱 शिव मंत्र</h2><div class="pujan-menu"><div class="pujan-card" onclick="window.showMantraContent('mahamrityunjay')">🕉️ महामृत्युंजय मंत्र</div></div>`,
    'mahamrityunjay': `<h3>🕉️ महामृत्युंजय मंत्र</h3><p style="background:#fdf2f2; padding:10px; border-radius:8px;">ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।</p><button class="back-link" onclick="window.showMantraContent('shiv')">← वापस</button>`,
    'rules': `<h2>📜 नियम</h2><p>शांत स्थान पर बैठकर 108 बार जप करें।</p>`,
};

// 3. MASTER QUIZ BANK (Big Data)
const masterQuizBank = {
    'रामायण': [
        { q: "श्रीराम ने किस युग में अवतार लिया था?", options: ["सत्ययुग", "त्रेतायुग", "द्वापरयुग", "कलियुग"], a: 1 },
        { q: "लक्ष्मण जी की माता का नाम क्या था?", options: ["कौशल्या", "कैकेयी", "सुमित्रा", "मन्दोदरी"], a: 2 },
        { q: "हनुमान जी के पुत्र का नाम क्या था?", options: ["मकरध्वज", "अंगद", "लव", "कुश"], a: 0 },
        { q: "भगवान राम के धनुष का नाम क्या था?", options: ["कोदंड", "गांडीव", "पिनाक", "शारंग"], a: 0 },
        { q: "सीता माता की खोज में समुद्र किसने लांघा था?", options: ["जामवंत", "अंगद", "हनुमान", "नल-नील"], a: 2 },
        { q: "रामायण के रचयिता कौन हैं?", options: ["तुलसीदास", "वाल्मीकि", "वेदव्यास", "कालिदास"], a: 1 },
        { q: "भरत की पत्नी का नाम क्या था?", options: ["उर्मिला", "श्रुतकीर्ति", "मांडवी", "सुलक्षणा"], a: 2 },
        { q: "मेघनाद का दूसरा नाम क्या था?", options: ["कुंभकर्ण", "इंद्रजीत", "विभीषण", "दशानन"], a: 1 },
        { q: "वानर राज सुग्रीव के बड़े भाई कौन थे?", options: ["अंगद", "बाली", "केसरी", "नल"], a: 1 },
        { q: "राजा दशरथ के कुल गुरु कौन थे?", options: ["विश्वामित्र", "वशिष्ठ", "परशुराम", "संदीपनी"], a: 1 }
    ],
    'महाभारत': [
        { q: "श्रीमद्भगवद्गीता का उपदेश श्रीकृष्ण ने किसे दिया?", options: ["भीष्म", "अर्जुन", "कर्ण", "युधिष्ठिर"], a: 1 },
        { q: "महाभारत का युद्ध कितने दिनों तक चला?", options: ["12", "15", "18", "21"], a: 2 },
        { q: "अर्जुन के धनुष का नाम क्या था?", options: ["गांडीव", "पिनाक", "शारंग", "विजय"], a: 0 },
        { q: "कौरवों की एकमात्र बहन का नाम क्या था?", options: ["सुभद्रा", "उत्तरा", "दुशाला", "गांधारी"], a: 2 },
        { q: "धृतराष्ट्र के सारथी कौन थे?", options: ["विदुर", "संजय", "शकुनि", "द्रोणाचार्य"], a: 1 },
        { q: "अभिमन्यु की माता कौन थीं?", options: ["द्रौपदी", "सुभद्रा", "उलूपी", "चित्रांगदा"], a: 1 },
        { q: "भीष्म पितामह का वास्तविक नाम क्या था?", options: ["देवव्रत", "कर्ण", "विदुर", "शांतनु"], a: 0 },
        { q: "द्रौपदी के पिता का नाम क्या था?", options: ["द्रुपद", "विराट", "शैल्य", "पांडु"], a: 0 },
        { q: "कर्ण के कवच-कुंडल किसने दान में मांगे थे?", options: ["इंद्र", "श्रीकृष्ण", "भीष्म", "युधिष्ठिर"], a: 0 },
        { q: "पांडवों को वनवास कितने वर्ष का मिला था?", options: ["10", "12", "13", "14"], a: 2 }
    ],
    'उज्जैन-दर्शन': [
        { q: "उज्जैन किस नदी के किनारे बसा है?", options: ["नर्मदा", "गंगा", "क्षिप्रा", "यमुना"], a: 2 },
        { q: "महाकालेश्वर मंदिर का मुख किस दिशा की ओर है?", options: ["पूर्व", "पश्चिम", "उत्तर", "दक्षिण"], a: 3 },
        { q: "उज्जैन में कुंभ मेला कितने वर्षों में लगता है?", options: ["6", "10", "12", "15"], a: 2 },
        { q: "श्रीकृष्ण ने शिक्षा कहाँ प्राप्त की थी?", options: ["काशी", "उज्जैन", "मथुरा", "द्वारका"], a: 1 },
        { q: "उज्जैन के कोतवाल किन्हें कहा जाता है?", options: ["कालभैरव", "हनुमान", "विक्रमादित्य", "नंदी"], a: 0 }
    ]
};

let selectedQueList = [];
let currentQueIdx = 0;
let score = 0;

// Quiz Initialization
window.initQuiz = function() {
    const topicDiv = document.getElementById('topic-selection');
    topicDiv.innerHTML = "";
    Object.keys(masterQuizBank).forEach(topic => {
        topicDiv.innerHTML += `<div class="pujan-card" style="text-align:center;" onclick="window.startBigQuiz('${topic}')">🚩 ${topic}</div>`;
    });
};

window.startBigQuiz = function(topic) {
    let allQue = [...masterQuizBank[topic]];
    // Shuffle logic: to avoid repetition
    selectedQueList = allQue.sort(() => Math.random() - 0.5).slice(0, 10); 
    currentQueIdx = 0; score = 0;
    document.getElementById('topic-selection').style.display = 'none';
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('question-area').style.display = 'block';
    renderQuestion();
};

function renderQuestion() {
    const data = selectedQueList[currentQueIdx];
    document.getElementById('que-count').innerText = `प्रश्न: ${currentQueIdx + 1}/10`;
    document.getElementById('score-count').innerText = `स्कोर: ${score}`;
    document.getElementById('question-text').innerText = data.q;
    const optionsDiv = document.getElementById('options-list');
    optionsDiv.innerHTML = "";
    data.options.forEach((opt, i) => {
        optionsDiv.innerHTML += `<div class="pujan-card" style="text-align:center; background:#fff;" onclick="window.checkBigAns(${i})">${opt}</div>`;
    });
}

window.checkBigAns = function(idx) {
    if(idx === selectedQueList[currentQueIdx].a) score++;
    currentQueIdx++;
    if(currentQueIdx < selectedQueList.length) renderQuestion();
    else showBigResult();
};

function showBigResult() {
    const area = document.getElementById('question-area');
    area.innerHTML = `<div style="text-align:center; padding: 20px;">
        <h3 style="color: #B22222;">क्विज़ पूर्ण हुआ!</h3>
        <p style="font-size:22px; font-weight:bold;">स्कोर: ${score}/10</p>
        <button class="book-now-btn" style="margin-top:15px;" onclick="window.location.reload()">मुख्य मेनू पर जाएं 🏠</button>
    </div>`;
}

// Global Nav Functions
window.showSection = function(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    if (key === 'mantra') content.innerHTML = mantraData['main'];
    else if (spiritualData[key]) content.innerHTML = spiritualData[key];
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.showMantraContent = function(key) {
    document.getElementById('overlay-content').innerHTML = mantraData[key];
};

window.hideSection = function() {
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.openWhatsApp = function(service) {
    window.open(`https://wa.me/918319714682?text=प्रणाम, मुझे ${service} की जानकारी चाहिए।`, '_blank');
};

window.saveReview = async function() {
    const name = document.getElementById('userName').value;
    const review = document.getElementById('userReview').value;
    if (name && review) {
        await db.collection("reviews").add({ name, review, time: new Date() });
        alert("🙏 धन्यवाद!"); location.reload();
    }
};

document.addEventListener('DOMContentLoaded', window.initQuiz);
