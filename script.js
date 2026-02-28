Let deferredPrompt;

// सर्विस वर्कर रजिस्टर करना
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker Live!'))
            .catch(err => console.error('SW Registration Failed!', err));
    });
}

// इंस्टॉल बटन को दिखाना
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installArea = document.getElementById('install-area');
    if(installArea) installArea.style.display = 'block';
});

window.installApp = async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            document.getElementById('install-area').style.display = 'none';
        }
        deferredPrompt = null;
    }
};
// Firebase कॉन्फ़िगरेशन
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

// रिव्यू सेव करना
window.saveReview = async () => {
    const name = document.getElementById('userName').value;
    const review = document.getElementById('userReview').value;
    if (name && review) {
        await db.collection("reviews").add({ name, review, time: new Date() });
        alert("🙏 आपका अनुभव सुरक्षित हो गया है!");
        document.getElementById('userName').value = "";
        document.getElementById('userReview').value = "";
    } else {
        alert("कृपया नाम और अनुभव दोनों भरें।");
    }
};

// लाइव रिव्यू लोड करना
function loadReviews() {
    db.collection("reviews").orderBy("time", "desc").onSnapshot(snap => {
        const list = document.getElementById('reviewsList');
        list.innerHTML = "";
        snap.forEach(doc => {
            const data = doc.data();
            list.innerHTML += `
                <div style="background:#f9f9f9; padding:10px; border-radius:10px; margin-bottom:10px; border-left:4px solid #B22222;">
                    <p style="margin:0; font-weight:bold;">${data.name}</p>
                    <p style="margin:5px 0 0 0; color:#555;">${data.review}</p>
                </div>`;
        });
    });
}
document.addEventListener('DOMContentLoaded', loadReviews);
// --- हिस्सा 4: पूजन विभाग (Detailed Structure) ---

// 1. पूजन की गहरी जानकारी (Deep Details)
const pujanDetails = {
    'mangal': {
        title: "मंगल भात पूजन",
        desc: "उज्जैन के मंगलनाथ मंदिर को मंगल ग्रह की जन्मभूमि माना जाता है। यहाँ भात पूजन (चावल चढ़ाना) से मंगल ग्रह की शांति होती है। यह पूजन कुंडली के मांगलिक दोष को शांत कर वैवाहिक जीवन में सुख और समृद्धि लाता है।",
        price: "सामान्य पूजन: 1350₹"
    },
    'kaalsarp': {
        title: "कालसर्प दोष शांति",
        desc: "जब राहु और केतु के बीच सभी ग्रह आ जाते हैं, तब कालसर्प दोष बनता है। इसमें नवकुल चांदी के नाग-नागिन का शास्त्रोक्त विधि से पूजन कर उन्हें विसर्जित किया जाता है, जिससे जीवन के संघर्ष कम होते हैं और रुके हुए कार्य पूर्ण होते हैं।",
        price: "दोष निवारण पूजन: 2100₹ से शुरू"
    },
    'ark': {
        title: "अर्क विवाह (पुरुषों हेतु)",
        desc: "यदि किसी पुरुष की कुंडली में प्रबल मांगलिक दोष हो या विवाह में अत्यधिक बाधा आ रही हो, तो अर्क (मन्दार) वृक्ष के साथ प्रतीकात्मक विवाह कराया जाता है। इससे कुंडली का वैधव्य या अलगाव दोष समाप्त हो जाता है।",
        price: "संपूर्ण अर्क विवाह: 3100₹"
    },
    'kumbh': {
        title: "कुंभ विवाह (स्त्रियों हेतु)",
        desc: "स्त्रियों की कुंडली में मांगलिक दोष या दो विवाह के योग होने पर कुंभ विवाह किया जाता है। इसमें भगवान विष्णु के स्वरूप मिट्टी के घड़े (कुंभ) के साथ विवाह संपन्न होता है, जिससे वैवाहिक जीवन की बाधाएं दूर होती हैं।",
        price: "संपूर्ण कुंभ विवाह: 3500₹"
    },
    'navgrah': {
        title: "नवग्रह शांति",
        desc: "नौ ग्रहों (सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु, केतु) की प्रतिकूलता दूर करने के लिए यह पूजन अनिवार्य है। इससे स्वास्थ्य, धन और मानसिक शांति की प्राप्ति होती है।",
        price: "नवग्रह शांति: 2500₹"
    },
    'baglamukhi': {
        title: "माँ बगलामुखी हवन पूजन",
        desc: "माँ बगलामुखी स्तंभन की देवी हैं। यह विशेष अनुष्ठान शत्रुओं पर विजय, कोर्ट-कचहरी से मुक्ति, राजनीति में सफलता और तंत्र बाधा निवारण हेतु अत्यंत प्रभावशाली है। इसे सर्व कार्य सिद्धि के लिए किया जाता है।",
        price: "सामान्य: 2350₹ | विशेष: 5600₹ | महाविशेष: 11000₹"
    }
};

// 2. मुख्य पूजन मेनू दिखाना
window.showSection = (key) => {
    if (key === 'pujan') {
        renderPujanMenu();
    } else {
        // बाकी सेक्शन्स के लिए पुराना लॉजिक
        const content = spiritualContent[key] || "जानकारी जल्द उपलब्ध होगी...";
        document.getElementById('overlay-content').innerHTML = content;
        document.getElementById('overlay').style.display = 'flex';
    }
};

// 3. पूजन के 6 विकल्पों की लिस्ट
function renderPujanMenu() {
    const pujanList = `
        <h2 style="color:#B22222; text-align:center;">🕉️ पूजन विभाग</h2>
        <p style="font-size:14px; text-align:center; color:gray;">पूजन का चयन करें और विवरण देखें</p>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="window.showPujanDetail('mangal')">1. मंगल भात पूजन</div>
            <div class="pujan-card" onclick="window.showPujanDetail('kaalsarp')">2. कालसर्प दोष निवारण</div>
            <div class="pujan-card" onclick="window.showPujanDetail('ark')">3. अर्क विवाह (पुरुष)</div>
            <div class="pujan-card" onclick="window.showPujanDetail('kumbh')">4. कुंभ विवाह (स्त्री)</div>
            <div class="pujan-card" onclick="window.showPujanDetail('navgrah')">5. नवग्रह शांति</div>
            <div class="pujan-card" onclick="window.showPujanDetail('baglamukhi')">6. माँ बगलामुखी हवन</div>
        </div>
        <button class="book-now-btn" style="background:#666;" onclick="window.hideSection()">बंद करें</button>
    `;
    document.getElementById('overlay-content').innerHTML = pujanList;
    document.getElementById('overlay').style.display = 'flex';
}

// 4. किसी एक पूजन की गहरी जानकारी दिखाना
window.showPujanDetail = (id) => {
    const data = pujanDetails[id];
    const detailHTML = `
        <h2 style="color:#B22222;">${data.title}</h2>
        <p style="text-align:justify; line-height:1.6; background:#fff8f0; padding:15px; border-radius:10px;">
            ${data.desc}
        </p>
        <button class="book-now-btn" style="background:#FF8C00;" onclick="window.showPujanPrice()">💰 पूजन शुल्क (Price)</button>
        <button class="book-now-btn" style="background:#25D366;" onclick="window.openWhatsApp('बोकिंग: ${data.title}')">🚩 अभी बुक करें</button>
        <button class="back-link" style="width:100%; border:none; padding:10px; cursor:pointer;" onclick="renderPujanMenu()">← वापस मेनू में</button>
    `;
    document.getElementById('overlay-content').innerHTML = detailHTML;
};

// 5. पूजन शुल्क (Price List) दिखाना
window.showPujanPrice = () => {
    const priceHTML = `
        <h2 style="color:#B22222;">💰 पूजन शुल्क विवरण</h2>
        <div style="text-align:left; font-size:14px;">
            <div style="background:#eee; padding:10px; border-radius:8px; margin-bottom:10px;">
                <b>सामान्य मंगल भात पूजन: 1350₹</b><br><small>गणेश पूजन, मंगलनाथ जी पर भात पूजन।</small>
            </div>
            <div style="background:#eee; padding:10px; border-radius:8px; margin-bottom:10px;">
                <b>नवग्रह शांति: 2500₹</b><br><small>गणेश, वरुण, मंगल भात पूजन, नवग्रह पूजन एवं हवन।</small>
            </div>
            <div style="background:#eee; padding:10px; border-radius:8px; margin-bottom:10px;">
                <b>पंचांग कर्म: 5100₹</b><br><small>गणेश, वरुण, षोडश मात्रिका, कुलदेवी, कालसर्प/अन्य दोष पूजन, नवग्रह और हवन।</small>
            </div>
            <div style="background:#fdf2f2; padding:10px; border-radius:8px;">
                <b>बगलामुखी हवन:</b><br>
                सामान्य: 2350₹ | विशेष: 5600₹ | महाविशेष: 11000₹
            </div>
        </div>
        <button class="book-now-btn" style="background:#25D366;" onclick="window.openWhatsApp('पूजन शुल्क जानकारी के बाद बुकिंग')">💬 WhatsApp पर बुक करें</button>
        <button class="back-link" style="width:100%; border:none; padding:10px; cursor:pointer;" onclick="renderPujanMenu()">← वापस मेनू में</button>
    `;
    document.getElementById('overlay-content').innerHTML = priceHTML;
};
// --- हिस्सा 4: हवन विभाग (Detailed Structure) ---

// 1. हवन की गहरी जानकारी (Deep Details)
const hawanDetails = {
    'baglamukhi_samanya': {
        title: "माँ बगलामुखी सामान्य हवन",
        desc: "यह हवन मुख्य रूप से मानसिक शांति और घर की सामान्य बाधाओं को दूर करने के लिए किया जाता है। इसमें मुख्य रूप से पीली सरसों, शुद्ध घी और सूखे नारियल (गोले) की आहुतियां दी जाती हैं। यह मां बगलामुखी की कृपा प्राप्त करने का सरल एवं प्रभावी मार्ग है।",
        samagri: "पीली सरसों, शुद्ध गौ घृत, सूखा नारियल (गोला)।",
        price: "शुल्क: 2350₹"
    },
    'baglamukhi_vishesh': {
        title: "माँ बगलामुखी विशेष हवन",
        desc: "विशेष कार्यों की सिद्धि और शत्रुओं के स्तंभन हेतु यह हवन किया जाता है। इसमें 21 प्रकार की विशेष जड़ी-बूटियों का मिश्रण तैयार किया जाता है। लाल मिर्च और सरसों के विशेष प्रयोग से नकारात्मक शक्तियों का नाश होता है और कार्यों में आ रही अड़चनें दूर होती हैं।",
        samagri: "21 प्रकार की दुर्लभ जड़ी-बूटियाँ, सूखी लाल मिर्च, पीली सरसों, घी, गोला।",
        price: "शुल्क: 5600₹"
    },
    'baglamukhi_mahavishesh': {
        title: "माँ बगलामुखी महाविशेष हवन",
        desc: "यह माँ बगलामुखी का सबसे शक्तिशाली अनुष्ठान है। घोर तंत्र बाधा, बड़े अदालती विवाद (कोर्ट-कचहरी), ऋण मुक्ति और राजनीति में विजय हेतु यह अचूक है। इसमें 36 प्रकार की विशेष जड़ी-बूटियों के साथ नींबू और काली मिर्च का तांत्रिक विधान से प्रयोग किया जाता है, जो सर्व कार्य सिद्धि प्रदान करता है।",
        samagri: "36 प्रकार की जड़ी-बूटियाँ, नींबू, काली मिर्च, सूखी लाल मिर्च, सरसों, घी, गोला।",
        price: "शुल्क: 11000₹"
    }
};

// 2. हवन मेनू को रेंडर करना (Update existing showSection)
const originalShowSection = window.showSection; // पुराने फंक्शन का बैकअप
window.showSection = (key) => {
    if (key === 'hawan') {
        renderHawanMenu();
    } else if (key === 'pujan') {
        renderPujanMenu(); // पूजन विभाग वाला पिछला कोड
    } else {
        originalShowSection(key);
    }
};

// 3. हवन के विकल्पों की लिस्ट
function renderHawanMenu() {
    const hawanList = `
        <h2 style="color:#B22222; text-align:center;">🔥 हवन विभाग</h2>
        <p style="font-size:14px; text-align:center; padding:0 10px;">माँ बगलामुखी हवन पूजन से शत्रुओं पर विजय, कोर्ट-कचहरी से मुक्ति और सर्व कार्य सिद्धि प्राप्त होती है।</p>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="window.showHawanDetail('baglamukhi_samanya')">✨ माँ बगलामुखी सामान्य हवन</div>
            <div class="pujan-card" onclick="window.showHawanDetail('baglamukhi_vishesh')">🚩 माँ बगलामुखी विशेष हवन</div>
            <div class="pujan-card" onclick="window.showHawanDetail('baglamukhi_mahavishesh')">🔱 माँ बगलामुखी महाविशेष हवन</div>
        </div>
        <button class="book-now-btn" style="background:#666;" onclick="window.hideSection()">बंद करें</button>
    `;
    document.getElementById('overlay-content').innerHTML = hawanList;
    document.getElementById('overlay').style.display = 'flex';
}

// 4. हवन की गहरी जानकारी दिखाना
window.showHawanDetail = (id) => {
    const data = hawanDetails[id];
    const detailHTML = `
        <h2 style="color:#B22222;">${data.title}</h2>
        <div style="text-align:justify; line-height:1.6; background:#fffcf0; padding:15px; border-radius:10px; border-left:4px solid #FFD700;">
            <p><b>लाभ:</b> ${data.desc}</p>
            <p><b>मुख्य सामग्री:</b> ${data.samagri}</p>
        </div>
        <button class="book-now-btn" style="background:#FF8C00;" onclick="window.showHawanPrice()">💰 हवन शुल्क (Price)</button>
        <button class="book-now-btn" style="background:#25D366;" onclick="window.openWhatsApp('हवन बुकिंग: ${data.title}')">🔥 अभी अनुष्ठान बुक करें</button>
        <button class="back-link" style="width:100%; border:none; padding:10px; cursor:pointer;" onclick="renderHawanMenu()">← वापस हवन मेनू</button>
    `;
    document.getElementById('overlay-content').innerHTML = detailHTML;
};

// 5. हवन शुल्क (Hawan Price List)
window.showHawanPrice = () => {
    const priceHTML = `
        <h2 style="color:#B22222;">💰 हवन शुल्क विवरण</h2>
        <div style="text-align:left; font-size:14px;">
            <div style="background:#f9f9f9; padding:12px; border-radius:8px; margin-bottom:10px; border-right:4px solid #B22222;">
                <b>बगलामुखी सामान्य हवन: 2350₹</b><br><small>सरसों, घी, गोला द्वारा पूजन एवं हवन।</small>
            </div>
            <div style="background:#f9f9f9; padding:12px; border-radius:8px; margin-bottom:10px; border-right:4px solid #B22222;">
                <b>बगलामुखी विशेष हवन: 5600₹</b><br><small>21 जड़ी-बूटियाँ, लाल मिर्च, सरसों, घी, गोला द्वारा हवन।</small>
            </div>
            <div style="background:#f9f9f9; padding:12px; border-radius:8px; margin-bottom:10px; border-right:4px solid #B22222;">
                <b>बगलामुखी महाविशेष हवन: 11000₹</b><br><small>36 जड़ी-बूटियाँ, नींबू, काली मिर्च, लाल मिर्च, सरसों, घी, गोला।</small>
            </div>
            <div style="background:#fff3cd; padding:10px; border-radius:8px; font-weight:bold; text-align:center;">
                नोट: पंचांग कर्म (दोष शांति सहित) - 5100₹
            </div>
        </div>
        <button class="book-now-btn" style="background:#25D366;" onclick="window.openWhatsApp('हवन शुल्क देखने के बाद बुकिंग')">💬 WhatsApp पर संपर्क करें</button>
        <button class="back-link" style="width:100%; border:none; padding:10px; cursor:pointer;" onclick="renderHawanMenu()">← वापस हवन मेनू</button>
    `;
    document.getElementById('overlay-content').innerHTML = priceHTML;
};
// --- हिस्सा 4: कुंडली विभाग (Detailed Structure) ---

// 1. कुंडली सेवा की गहरी जानकारी
const kundliDetails = {
    'nirman': {
        title: "कुंडली निर्माण (नया चार्ट बनाना)",
        desc: "शास्त्रों के अनुसार, कुंडली एक व्यक्ति के जीवन का मानचित्र है। हम आपकी जन्म तिथि, समय और स्थान के आधार पर सटीक और विस्तृत कुंडली तैयार करते हैं। इसमें आपके जीवन के विभिन्न पहलुओं, जैसे शिक्षा, करियर, स्वास्थ्य और भाग्य का पूरा विवरण होता है।",
        benefit: "शुद्ध गणना, सटीक दशा विवरण और भविष्यफल के साथ पूर्ण कुंडली फाइल।",
        price: "निर्माण शुल्क: 2100₹"
    },
    'v विश्लेषण': {
        title: "कुंडली विश्लेषण (परामर्श)",
        desc: "यदि आपके पास पहले से कुंडली है और आप अपने जीवन की समस्याओं का समाधान चाहते हैं, तो यह सेवा आपके लिए है। पंडित जी आपकी कुंडली के ग्रहों की स्थिति देखकर आपके सवालों (विवाह, व्यापार, रोग, शत्रु) के सटीक उत्तर और प्रभावशाली ज्योतिषीय उपाय प्रदान करते हैं।",
        benefit: "समस्या का समाधान, ग्रहों के दोष दूर करने के उपाय और उचित रत्न सलाह।",
        price: "विश्लेषण शुल्क: 500₹"
    }
};

// 2. कुंडली मेनू को अपडेट करना (showSection फंक्शन में जोड़ें)
const prevShowSection = window.showSection; 
window.showSection = (key) => {
    if (key === 'kundli') {
        renderKundliMenu();
    } else if (key === 'hawan') {
        renderHawanMenu();
    } else if (key === 'pujan') {
        renderPujanMenu();
    } else {
        prevShowSection(key);
    }
};

// 3. कुंडली के विकल्पों की लिस्ट
function renderKundliMenu() {
    const kundliList = `
        <h2 style="color:#B22222; text-align:center;">📜 कुंडली विभाग</h2>
        <p style="font-size:14px; text-align:center; padding:0 10px;">अपनी जन्म कुंडली के माध्यम से अपने भविष्य और ग्रहों की स्थिति को जानें।</p>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="window.showKundliDetail('nirman')">📄 कुंडली निर्माण (New Kundli)</div>
            <div class="pujan-card" onclick="window.showKundliDetail('v विश्लेषण')">🔍 कुंडली विश्लेषण (Consultation)</div>
        </div>
        <button class="book-now-btn" style="background:#666;" onclick="window.hideSection()">बंद करें</button>
    `;
    document.getElementById('overlay-content').innerHTML = kundliList;
    document.getElementById('overlay').style.display = 'flex';
}

// 4. कुंडली की गहरी जानकारी दिखाना
window.showKundliDetail = (id) => {
    const data = kundliDetails[id];
    const detailHTML = `
        <h2 style="color:#B22222;">${data.title}</h2>
        <div style="text-align:justify; line-height:1.6; background:#f0f7ff; padding:15px; border-radius:10px; border-left:4px solid #1877F2;">
            <p><b>विवरण:</b> ${data.desc}</p>
            <p><b>लाभ:</b> ${data.benefit}</p>
        </div>
        <button class="book-now-btn" style="background:#FF8C00;" onclick="window.showKundliPrice('${id}')">💰 सेवा शुल्क (Price)</button>
        <button class="book-now-btn" style="background:#25D366;" onclick="window.openWhatsApp('कुंडली सेवा: ${data.title}')">📜 अभी परामर्श लें</button>
        <button class="back-link" style="width:100%; border:none; padding:10px; cursor:pointer;" onclick="renderKundliMenu()">← वापस कुंडली मेनू</button>
    `;
    document.getElementById('overlay-content').innerHTML = detailHTML;
};

// 5. कुंडली शुल्क (Kundli Price List)
window.showKundliPrice = (id) => {
    const data = kundliDetails[id];
    const priceHTML = `
        <h2 style="color:#B22222;">💰 सेवा शुल्क</h2>
        <div style="text-align:center; padding:20px;">
            <div style="background:#f9f9f9; padding:20px; border-radius:15px; border:2px dashed #B22222; display:inline-block; min-width:200px;">
                <span style="font-size:16px;">${data.title}</span><br>
                <span style="font-size:28px; font-weight:bold; color:#B22222;">${data.price}</span>
            </div>
            <p style="margin-top:15px; font-size:13px; color:#555;">नोट: सटीक गणना के लिए जन्म का सही समय और स्थान आवश्यक है।</p>
        </div>
        <button class="book-now-btn" style="background:#25D366;" onclick="window.openWhatsApp('शुल्क देखने के बाद ${data.title} बुकिंग')">💬 WhatsApp पर जानकारी भेजें</button>
        <button class="back-link" style="width:100%; border:none; padding:10px; cursor:pointer;" onclick="window.showKundliDetail('${id}')">← वापस विवरण पर</button>
    `;
    document.getElementById('overlay-content').innerHTML = priceHTML;
};


// --- हिस्सा 6: लाइव रिव्यू सिस्टम ---

// 1. रिव्यू को डेटाबेस में सेव करना
window.saveReview = async () => {
    const name = document.getElementById('userName').value;
    const review = document.getElementById('userReview').value;
    
    if (name && review) {
        try {
            await db.collection("reviews").add({
                name: name,
                review: review,
                time: firebase.firestore.FieldValue.serverTimestamp() // असली समय लेगा
            });
            alert("🙏 आपका अनुभव साझा करने के लिए धन्यवाद!");
            document.getElementById('userName').value = "";
            document.getElementById('userReview').value = "";
        } catch (error) {
            console.error("Error adding review: ", error);
        }
    } else {
        alert("कृपया अपना नाम और अनुभव दोनों भरें।");
    }
};

// 2. लाइव रिव्यू को स्क्रीन पर दिखाना (Live Listener)
function displayLiveReviews() {
    const list = document.getElementById('reviewsList');
    
    // यह कोड डेटाबेस पर नज़र रखेगा, जैसे ही नया रिव्यू आएगा, तुरंत दिखाएगा
    db.collection("reviews").orderBy("time", "desc").onSnapshot((querySnapshot) => {
        list.innerHTML = ""; // पुराना डेटा साफ़ करें
        querySnapshot.forEach((doc) => {
            const d = doc.data();
            list.innerHTML += `
                <div style="background: white; padding: 15px; border-radius: 10px; margin-bottom: 15px; border-left: 5px solid #B22222; box-shad
