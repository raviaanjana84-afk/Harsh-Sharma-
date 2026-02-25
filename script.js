// 1. Firebase Configuration
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

// 2. Spiritual Data (Information Storage)
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
        <p><b>जानकारी:</b> कालसर्प नामक दोष से निवारण हेतु नवकूल चांदी के नाग नागिन का पूजन कर विसर्जन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2100 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कालसर्प पूजन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'ark_vivah': `
        <h2 style="color: #228B22;">🌿 अर्क विवाह (पुरुषों हेतु)</h2>
        <p><b>जानकारी:</b> यह पूजन पुरुषों की कुंडली में मांगलिक दोष या विवाह में आ रही बाधाओं को दूर करने के लिए किया जाता है। इसमें प्रतीकात्मक रूप से अर्क वृक्ष से विवाह किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2100 - ₹3500</div>
        <button class="book-now-btn" onclick="openWhatsApp('अर्क विवाह')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'kumbh_vivah': `
        <h2 style="color: #8B4513;">🏺 कुंभ विवाह (स्त्रियों हेतु)</h2>
        <p><b>जानकारी:</b> यह मुख्य रूप से स्त्रियों की जन्म कुंडली में मांगलिक दोष या विवाह में आनी वाली अड़चनों को दूर करने के लिए किया जाता है। इसमें विष्णु स्वरूप कुंभ से विवाह होता है।</p>
        <div class="price-box">💰 शुल्क: ₹2100 - ₹3500</div>
        <button class="book-now-btn" onclick="openWhatsApp('कुंभ विवाह')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'navgrah': `
        <h2 style="color: #4B0082;">✨ नवग्रह शांति</h2>
        <p><b>जानकारी:</b> जीवन में ग्रहों की प्रतिकूलता को दूर करने और सुख-समृद्धि के लिए नवग्रह शांति पूजन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹1500 - ₹3100</div>
        <button class="book-now-btn" onclick="openWhatsApp('नवग्रह शांति')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'baglamukhi': `
        <h2 style="color: #FFD700;">🛡️ माँ बगलामुखी हवन पूजन</h2>
        <p><b>जानकारी:</b> शत्रुओं पर विजय, कोर्ट कचहरी, तंत्र बाधा और सर्व कार्य सिद्धि हेतु माँ बगलामुखी विशेष हवन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹5100 - ₹11000</div>
        <button class="book-now-btn" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'hawan': `<h2 style="color: #B22222; margin-bottom: 20px;">🔥 हवन विभाग</h2><div style="background: white; padding: 20px; border-radius: 12px;"><p>माँ बगलामुखी हवन पूजन से शत्रुओं पर विजय और ऋण मुक्ति प्राप्त होती है।</p><p><b>₹2350 - ₹11000</b></p></div>`,
    'kundli': `<h2 style="color: #B22222; margin-bottom: 20px;">📜 कुंडली विभाग</h2><div style="background: white; padding: 20px; border-radius: 12px;"><p>कुंडली निर्माण एवं सटीक ज्योतिषीय विश्लेषण।</p><p><b>₹500 - ₹2100</b></p></div>`,
    'mantra': `<h2 style="color: #B22222; margin-bottom: 20px;">🙏 मंत्र विभाग</h2><div style="background: white; padding: 20px; border-radius: 12px;"><p>सिद्ध मंत्रों का जाप एवं वेदोक्त रीति से अनुष्ठान।</p></div>`
};

// 3. Navigation Functions
function showSection(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    
    if (!spiritualData[key]) return;

    content.innerHTML = spiritualData[key];
    overlay.style.display = 'flex'; 
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    window.history.pushState({overlayOpen: true}, ""); 
}

function hideSection() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// WhatsApp Booking Function
function openWhatsApp(service) {
    const phone = "91918319714682"; 
    const msg = `प्रणाम पंडित जी, मुझे "${service}" के बारे में जानकारी और बुकिंग चाहिए।`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// Mobile Back Button Support
window.onpopstate = function() {
    hideSection();
};

// 4. Review System
function saveReview() {
    const nameInput = document.getElementById('userName');
    const reviewInput = document.getElementById('userReview');
    const name = nameInput.value.trim();
    const review = reviewInput.value.trim();

    if(name && review) {
        db.collection("reviews").add({
            name: name,
            review: review,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("🙏 आपका अनुभव साझा किया गया!");
            nameInput.value = '';
            reviewInput.value = '';
        });
    } else {
        alert("कृपया नाम और अनुभव दोनों भरें।");
    }
}

function displayReviews() {
    const reviewsList = document.getElementById('reviewsList');
    db.collection("reviews").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
        reviewsList.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            reviewsList.innerHTML += `
                <div class="wisdom-card" style="border-left: 5px solid #ff9933; margin-bottom: 10px; padding: 10px;">
                    <p>"${data.review}"</p>
                    <small><strong>- ${data.name}</strong></small>
                </div>`;
        });
    });
}

// Initialize Reviews
displayReviews();
