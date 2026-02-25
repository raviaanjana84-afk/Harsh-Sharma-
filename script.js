// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO8kxU1t9zcfD0MXf6vhLlE3FR_CUKycE",
  authDomain: "harsh-sharma-website-f01ac.firebaseapp.com",
  projectId: "harsh-sharma-website-f01ac",
  storageBucket: "harsh-sharma-website-f01ac.firebasestorage.app",
  messagingSenderId: "8698683996",
  appId: "1:8698683996:web:58cd2b05fcf71646e0bc99"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Review save karne ka function
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
        })
        .then(() => {
            alert("🙏 आपका अनुभव सफलतापूर्वक साझा किया गया!");
            nameInput.value = '';
            reviewInput.value = '';
        })
        .catch((error) => {
            console.error("Error: ", error);
            alert("Kuch galti hui hai: " + error.message);
        });
    } else {
        alert("कृपया नाम और अनुभव दोनों भरें।");
    }
}

const spiritualData = {
    // Ye hai aapki main list jo "पूजन शुक्ल विभाग" click karne par khulegi
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

    // 1. Mangal Dosh
    'mangal': `
        <h2 style="color: #B22222;">🚩 मंगल दोष निवारण (भात पूजन)</h2>
        <p><b>जानकारी:</b> मंगल दोष से निवारण हेतु मंगल भात पूजन विशेष रूप से उज्जैन में मंगलनाथ मंदिर पर किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹1350 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('मंगल भात पूजन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,

    // 2. Kaalsarp
    'kaalsarp': `
        <h2 style="color: #444;">🐍 कालसर्प दोष निवारण</h2>
        <p><b>जानकारी:</b> कालसर्प नामक दोष से निवारण हेतु नवकूल चांदी के नाग नागिन का पूजन कर विसर्जन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2100 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कालसर्प पूजन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,

    // 3. Ark Vivah
    'ark_vivah': `
        <h2 style="color: #228B22;">🌿 अर्क विवाह (पुरुषों हेतु)</h2>
        <p><b>जानकारी:</b> यह पूजन पुरुषों की कुंडली में मांगलिक दोष या विवाह में आ रही बाधाओं को दूर करने के लिए किया जाता है। इसमें प्रतीकात्मक रूप से अर्क वृक्ष से विवाह किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2100 - ₹3500</div>
        <button class="book-now-btn" onclick="openWhatsApp('अर्क विवाह')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,

    // 4. Kumbh Vivah
    'kumbh_vivah': `
        <h2>🏺 कुंभ विवाह (स्त्रियों हेतु)</h2>
        <p><b>जानकारी:</b> यह मुख्य रूप से स्त्रियों की जन्म कुंडली में मांगलिक दोष या विवाह में आनी वाली अड़चनों को दूर करने के लिए किया जाता है। इसमें विष्णु स्वरूप कुंभ से विवाह होता है।</p>
        <div class="price-box">💰 शुल्क: ₹2100 - ₹3500</div>
        <button class="book-now-btn" onclick="openWhatsApp('कुंभ विवाह')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,

    // 5. Navgrah
    'navgrah': `
        <h2>✨ नवग्रह शांति</h2>
        <p><b>जानकारी:</b> जीवन में ग्रहों की प्रतिकूलता को दूर करने और सुख-समृद्धि के लिए नवग्रह शांति पूजन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹1500 - ₹3100</div>
        <button class="book-now-btn" onclick="openWhatsApp('नवग्रह शांति')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,

    // 6. Baglamukhi
    'baglamukhi': `
        <h2 style="color: #FFD700;">🛡️ माँ बगलामुखी हवन पूजन</h2>
        <p><b>जानकारी:</b> शत्रुओं पर विजय प्राप्ति, कोर्ट कचहरी से मुक्ति, तंत्र बाधा से मुक्ति, राजनीतिक विजय प्राप्ती, लक्ष्मी प्राप्ति, संतान प्राप्ति एवं सर्व कार्य सिद्धि हेतु माँ बगलामुखी विशेष हवन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹5100 - ₹11000</div>
        <button class="book-now-btn" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `
};


    
    hawan: `
        <h2 style="color: #B22222; margin-bottom: 20px;">🔥 हवन विभाग</h2>
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <p>मां बगलामुखी हवन पूजन से शत्रुओं पर विजय, कोर्ट कचहरी से मुक्ति और ऋण कर्ज से मुक्ति प्राप्त होती है।</p>
            <hr style="margin: 15px 0;">
            <p><b>₹ 2350 : सामान्य हवन</b> (सरसो, घी एवं गोले द्वारा)</p>
            <p style="margin-top: 10px;"><b>₹ 5100 : विशेष हवन</b> (21 प्रकार की जड़ी बूटियों एवं लाल मिर्ची द्वारा)</p>
            <p style="margin-top: 10px;"><b>₹ 11000 : महाविशेष हवन</b> (36 प्रकार की जड़ी बूटियों एवं तांत्रोक्त पद्धति द्वारा)</p>
        </div>`,

    kundli: `
        <h2 style="color: #B22222; margin-bottom: 20px;">📜 कुंडली विभाग</h2>
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <p>हमारे द्वारा शुद्ध गणना के साथ कुंडली निर्माण एवं विश्लेषण किया जाता है।</p>
            <hr style="margin: 15px 0;">
            <p><b>₹ 2100</b> : कुंडली बनाने का शुल्क</p>
            <p style="margin-top: 10px;"><b>₹ 500</b> : कुंडली विश्लेषण (परामर्श)</p>
            <p style="margin-top: 15px; font-style: italic;">"कुंडली देख कर आपकी सभी समस्याओं का ज्योतिषीय समाधान बताया जाता है।"</p>
        </div>`,

    mantra: `
        <h2 style="color: #B22222; margin-bottom: 20px;">🙏 मंत्र विभाग</h2>
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <p>विभिन्न बाधाओं के निवारण हेतु सिद्ध मंत्रों का जाप एवं वेदोक्त रीति से अनुष्ठान संपन्न कराए जाते हैं।</p>
        </div>`
};
// Isse replace karein (Line 91 ke paas)
function showSection(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    content.innerHTML = spiritualData[key];
    
    overlay.style.display = 'flex'; // Box ko dikhane ke liye
    document.body.style.overflow = 'hidden'; // Screen scroll rokne ke liye

    // ✨ Ye line back button ko handle karne ke liye "History State" banati hai
    window.history.pushState({overlayOpen: true}, ""); 
}


function hideSection() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Mobile back button ko handle karne ke liye
window.onpopstate = function(event) {
    hideSection();
};

function hideSection() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Page scroll wapas chalu karne ke liye
}

// Reviews ko fetch aur display karne ka function
function displayReviews() {
    const reviewsList = document.getElementById('reviewsList');
    
    // Database se "reviews" collection ko real-time read karna
    db.collection("reviews").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
        reviewsList.innerHTML = ""; // Purani list clear karein
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const reviewHtml = `
                <div class="wisdom-card" style="border-left: 5px solid #ff9933; margin-bottom: 10px; padding: 10px;">
                    <p style="font-style: italic;">"${data.review}"</p>
                    <small><strong>- ${data.name}</strong></small>
                </div>
            `;
            reviewsList.innerHTML += reviewHtml;
        });
    });
}

// Page load hote hi function chalu karein
displayReviews();
// File ke aakhir mein naya add-on karein
window.onpopstate = function(event) {
    // Jab user phone ka back button dabaye
    hideSection();
};

function hideSection() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none'; // Box band karein
    document.body.style.overflow = 'auto'; // Scroll wapas chalu karein
}
