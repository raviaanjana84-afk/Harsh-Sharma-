// 1. Firebase Initialization
const firebaseConfig = {
    apiKey: "AIzaSyDO8kxU1t9zcfD0MXf6vhLlE3FR_CUKycE",
    authDomain: "harsh-sharma-website-f01ac.firebaseapp.com",
    projectId: "harsh-sharma-website-f01ac",
    storageBucket: "harsh-sharma-website-f01ac.firebasestorage.app",
    messagingSenderId: "8698683996",
    appId: "1:8698683996:web:58cd2b05fcf71646e0bc99"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 2. Data Content
// 1. डेटा ऑब्जेक्ट जिसमें सभी सेक्शन्स का HTML है
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
        <button class="back-link" style="margin-top:20px; width:100%;" onclick="hideSection()">← मुख्य पेज</button>
    `,
    'mangal': `
        <h2 style="color: #B22222;">🚩 मंगल दोष निवारण (भात पूजन)</h2>
        <p><b>जानकारी:</b> मंगल दोष से निवारण हेतु मंगल भात पूजन विशेष रूप से उज्जैन में मंगलनाथ मंदिर पर किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹1350 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('मंगल भात पूजन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'kaalsarp': `
        <h2 style="color: #444;">🐍 कालसर्प दोष निवारण</h2>
        <p><b>जानकारी:</b> कालसर्प नामक दोष से निवारण हेतु नवकुल चांदी के नाग नागिन का पूजन कर विसर्जन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2100 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कालसर्प पूजन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'ark_vivah': `
        <h2 style="color: #228B22;">🌿 अर्क विवाह (पुरुषों हेतु)</h2>
        <p><b>जानकारी:</b> यह पूजन पुरुषों की कुंडली में मांगलिक दोष या विवाह में आ रही बाधाओं को दूर करने के लिए किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2500 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('अर्क विवाह')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'kumbh_vivah': `
        <h2 style="color: #8B4513;">🏺 कुंभ विवाह (स्त्रियों हेतु)</h2>
        <p><b>जानकारी:</b> यह मुख्य रूप से स्त्रियों की जन्म कुंडली में मांगलिक दोष को दूर करने के लिए किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2500 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कुंभ विवाह')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'navgrah': `
        <h2 style="color: #4B0082;">✨ नवग्रह शांति</h2>
        <p><b>जानकारी:</b> ग्रहों की प्रतिकूलता को दूर करने और सुख-समृद्धि के लिए नवग्रह शांति पूजन।</p>
        <div class="price-box">💰 शुल्क: ₹2350 - ₹3100</div>
        <button class="book-now-btn" onclick="openWhatsApp('नवग्रह शांति')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'baglamukhi': `
        <h2 style="color: #FFD700;">🛡️ माँ बगलामुखी हवन पूजन</h2>
        <p><b>जानकारी:</b> शत्रुओं पर विजय और तंत्र बाधा निवारण हेतु माँ बगलामुखी विशेष हवन।</p>
        <div class="price-box">💰 शुल्क: ₹2350 - ₹11000</div>
        <button class="book-now-btn" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `
};

// 2. फंक्शन: सेक्शन बदलने के लिए
function showSection(sectionId) {
    // अपनी HTML में इस ID वाले div को जरूर बनाएँ: <div id="pujan-container"></div>
    const container = document.getElementById('pujan-container'); 
    
    if (spiritualData[sectionId]) {
        container.innerHTML = spiritualData[sectionId];
        window.scrollTo(0, 0); // क्लिक करने पर पेज ऊपर चला जाए
    } else {
        console.error("Section not found: " + sectionId);
    }
}

// 3. फंक्शन: मुख्य पेज पर वापस जाने के लिए
function hideSection() {
    // यह मानकर कि आपका मुख्य पेज index.html है
    window.location.href = 'index.html'; 
}

// 4. फंक्शन: WhatsApp बुकिंग के लिए
function openWhatsApp(pujanName) {
    const phone = "910000000000"; // अपना 10 अंकों का नंबर यहाँ लिखें
    const msg = encodeURIComponent("नमस्ते, मुझे " + pujanName + " की बुकिंग के बारे में जानकारी चाहिए।");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

// 5. पेज लोड होते ही डिफ़ॉल्ट रूप से पूजन लिस्ट दिखाएँ
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('pujan-container')){
        showSection('pujan');
    }
});
    'baglamukhi': `
        <h2 style="color: #FFD700; text-align: center; text-shadow: 1px 1px #000;">🛡️ माँ बगलामुखी हवन पूजन</h2>
        
        <p><b>विवरण:</b> माँ बगलामुखी स्तंभन की देवी हैं। उज्जैन में माँ बगलामुखी का विशेष महत्व है, यहाँ किया गया हवन शत्रुओं पर विजय और बाधाओं के नाश के लिए अचूक माना जाता है।</p>
        
        <div style="background: #fff9db; padding: 15px; border-radius: 10px; border: 1px dashed #ffc107; margin-bottom: 15px;">
            <p style="margin: 5px 0;">✅ <b>विशेष लाभ:</b> कोर्ट-कचहरी, तंत्र बाधा निवारण, शत्रु शांति और व्यापार में वृद्धि।</p>
            <p style="margin: 5px 0;">🔥 <b>हवन सामग्री:</b> पीली सरसों, हल्दी की गांठ और विशेष जड़ी-बूटियाँ।</p>
        </div>

        <div class="price-box">
            💰 <b>अनुष्ठान शुल्क:</b><br>
            • सामान्य हवन: ₹2350 से शुरू<br>
            • विशेष अनुष्ठान (3500 मंत्र): ₹11,000 तक
        </div>

        <button class="book-now-btn" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 अभी स्लॉट बुक करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
        
 'kundli': `
        <h2>📜 कुंडली विश्लेषण</h2>
        <p>शुद्ध गणितीय गणना और प्राचीन सिद्धांतों के आधार पर सटीक भविष्यफल।</p>
        <div class="price-box">परामर्श शुल्क: ₹500 | पूर्ण कुंडली: ₹2100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कुंडली सेवा')">📅 परामर्श हेतु संपर्क करें</button>
        <button class="back-link-btn" onclick="hideSection()">← वापस मुख्य पेज</button>`,
       'mantra': `
        <div style="text-align: left; background: #ffffff; padding: 15px; border-radius: 12px;">
            <h2 style="color: #B22222; text-align: center; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">🕉️ मंत्र जाप एवं अनुष्ठान</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
                <b>"मन्त्राणां जपतः सिद्धिः"</b> - मंत्रों के शुद्ध उच्चारण और निरंतर जाप से असंभव कार्य भी सिद्ध हो जाते हैं। हम शास्त्रोंक्त विधि से आपके लिए विशेष अनुष्ठान संपन्न करते हैं।
            </p>

            <h3 style="color: #ff9933; margin-top: 15px;">✨ मुख्य अनुष्ठान सेवाएँ:</h3>
            <ul style="color: #444; line-height: 1.8; padding-left: 5px;">
                <li>🔥 <b>महामृत्युंजय जाप:</b> असाध्य रोगों से मुक्ति और अकाल मृत्यु के भय के निवारण हेतु।</li>
                <li>🛡️ <b>बगलामुखी मंत्र:</b> शत्रु दमन, विजय प्राप्ति और तंत्र बाधा से रक्षा हेतु।</li>
                <li>💰 <b>श्री सूक्त पाठ:</b> मां लक्ष्मी की कृपा और व्यापार में वृद्धि हेतु।</li>
                <li>📖 <b>गीता पाठ/सुंदरकांड:</b> घर में शांति और सकारात्मक ऊर्जा के संचार हेतु।</li>
            </ul>

            <div style="background: #fffcf0; padding: 15px; border-radius: 8px; border-left: 5px solid #B22222; margin-top: 20px;">
                <p style="margin: 0;"><b>सूचना:</b> मंत्र जाप की संख्या और दक्षिणा आपकी समस्या एवं अनुष्ठान के प्रकार पर निर्भर करती है।</p>
            </div>

            <button class="book-now-btn" style="background: #25D366; width: 100%; margin-top: 20px; padding: 15px; border-radius: 8px; color: white; border: none; font-weight: bold; cursor: pointer;" 
                onclick="openWhatsApp('मंत्र जाप अनुष्ठान')">
                📅 संकल्प हेतु संपर्क करें
            </button>
            
            <button class="back-link" style="margin-top: 15px; width: 100%; color: #B22222; background: none; border: none; cursor: pointer;" 
                onclick="hideSection()">← वापस मुख्य पेज</button>
        </div>
    `,
    
};

// 3. Functions
function showSection(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    if (!spiritualData[key]) return;
    content.innerHTML = spiritualData[key];
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
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

// 4. Review System
async function saveReview() {
    const name = document.getElementById('userName').value.trim();
    const review = document.getElementById('userReview').value.trim();
    const photoFile = document.getElementById('userPhoto').files[0];
    const btn = document.getElementById('submitBtn');

    if (!name || !review) {
        alert("कृपया नाम और अनुभव भरें।");
        return;
    }

    btn.disabled = true;
    btn.innerText = "कृपया प्रतीक्षा करें...";

    let photoUrl = "";
    try {
        if (photoFile) {
            const formData = new FormData();
            formData.append("image", photoFile);
            const res = await fetch("https://api.imgbb.com/1/upload?key=2705a30bb29595bfa91f1dc8fa478ef4", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            photoUrl = data.data.url;
        }

        await db.collection("reviews").add({
            name: name,
            review: review,
            photo: photoUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("🙏 अनुभव साझा किया गया!");
        location.reload();
    } catch (e) {
        console.error(e);
        alert("त्रुटि हुई, पुनः प्रयास करें।");
        btn.disabled = false;
        btn.innerText = "✨ अनुभव साझा करें ✨";
    }
}

function displayReviews() {
    const list = document.getElementById('reviewsList');
    const btn = document.getElementById('viewMoreBtn');
    
    db.collection("reviews").orderBy("timestamp", "desc").onSnapshot(snap => {
        list.innerHTML = "";
        let i = 0;
        snap.forEach(doc => {
            const d = doc.data();
            i++;
            const html = `
                <div class="review-item" style="${i > 3 ? 'display:none' : ''}">
                    ${d.photo ? `<img src="${d.photo}" class="rev-img">` : ''}
                    <p>"${d.review}"</p>
                    <small>- ${d.name}</small>
                </div>`;
            list.innerHTML += html;
        });
        if (i > 3) btn.style.display = "block";
    });
}

function toggleReviews() {
    const hidden = document.querySelectorAll('.review-item[style*="display:none"]');
    hidden.forEach(r => r.style.display = "block");
    document.getElementById('viewMoreBtn').style.display = "none";
}

displayReviews();
