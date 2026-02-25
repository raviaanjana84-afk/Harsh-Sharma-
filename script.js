// 1. Firebase Configuration ⚙️
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

// 2. Spiritual Data (Information Storage) 🕉️
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
        <p><b> जानकारी:</b> कालसर्प नामक दोष से निवारण हेतु नवकूल चांदी के नाग नागिन का पूजन कर विसर्जन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2100 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कालसर्प पूजन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'ark_vivah': `
        <h2 style="color: #228B22;">🌿 अर्क विवाह (पुरुषों हेतु)</h2>
        <p><b> जानकारी:</b> यह पूजन पुरुषों की कुंडली में मांगलिक दोष या विवाह में आ रही बाधाओं को दूर करने के लिए किया जाता है। इसमें प्रतीकात्मक रूप से अर्क वृक्ष से विवाह किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2500 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('अर्क विवाह')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'kumbh_vivah': `
        <h2 style="color: #8B4513;">🏺 कुंभ विवाह (स्त्रियों हेतु)</h2>
        <p><b> जानकारी:</b> यह मुख्य रूप से स्त्रियों की जन्म कुंडली में मांगलिक दोष या विवाह में आनी वाली अड़चनों को दूर करने के लिए किया जाता है। इसमें विष्णु स्वरूप कुंभ से विवाह होता है।</p>
        <div class="price-box">💰 शुल्क: ₹2500 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कुंभ विवाह')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'navgrah': `
        <h2 style="color: #4B0082;">✨ नवग्रह शांति</h2>
        <p><b> जानकारी:</b> जीवन में ग्रहों की प्रतिकूलता को दूर करने और सुख-समृद्धि के लिए नवग्रह शांति पूजन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2350 - ₹3100</div>
        <button class="book-now-btn" onclick="openWhatsApp('नवग्रह शांति')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'baglamukhi': `
        <h2 style="color: #FFD700;">🛡️ माँ बगलामुखी हवन पूजन</h2>
        <p><b> जानकारी:</b> शत्रुओं पर विजय, कोर्ट कचहरी, तंत्र बाधा और सर्व कार्य सिद्धि हेतु माँ बगलामुखी विशेष हवन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2350 - ₹11000</div>
        <button class="book-now-btn" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'hawan': `
        <div style="text-align: left; background: #ffffff; padding: 15px; border-radius: 12px;">
            <h2 style="color: #B22222; text-align: center;">🔥 माँ बगलामुखी विशेष हवन</h2>
            <p> माँ बगलामुखी हवन पूजन से अत्यधिक आध्यात्मिक लाभ प्राप्त होता है।</p>
            <button class="book-now-btn" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 हवन बुकिंग हेतु संपर्क करें</button>
            <button class="back-link" style="margin-top: 15px; width: 100%;" onclick="hideSection()">← वापस मुख्य पेज</button>
        </div>
    `,
    'kundli': `
        <div style="text-align: left; background: #ffffff; padding: 15px; border-radius: 12px;">
            <h2 style="color: #B22222; text-align: center;">📜 कुंडली निर्माण एवं विश्लेषण</h2>
            <p> हमारे द्वारा सटीक कुंडली तैयार की जाती है।</p>
            <button class="book-now-btn" onclick="openWhatsApp('कुंडली सेवा')">📅 परामर्श के लिए संपर्क करें</button>
            <button class="back-link" style="margin-top: 15px; width: 100%;" onclick="hideSection()">← वापस मुख्य पेज</button>
        </div>
    `,
    'mantra': `
        <div style="text-align: left; background: #ffffff; padding: 15px; border-radius: 12px;">
            <h2 style="color: #B22222; text-align: center;">🕉️ मंत्र जाप एवं अनुष्ठान</h2>
            <p> मंत्रों के शुद्ध उच्चारण से असंभव कार्य सिद्ध हो जाते हैं।</p>
            <button class="book-now-btn" onclick="openWhatsApp('मंत्र जाप अनुष्ठान')">📅 संकल्प हेतु संपर्क करें</button>
            <button class="back-link" style="margin-top: 15px; width: 100%;" onclick="hideSection()">← वापस मुख्य पेज</button>
        </div>
    `,
};

// 3. Navigation Functions 📍
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

function openWhatsApp(service) {
    const phone = "918319714682"; 
    const msg = `प्रणाम पंडित जी, मुझे "${service}" के बारे में जानकारी और बुकिंग चाहिए।`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

window.onpopstate = function() { hideSection(); };

// 4. Review System ✍️

// अनुभव सेव करने का फंक्शन
async function saveReview() {
    const nameInput = document.getElementById('userName');
    const reviewInput = document.getElementById('userReview');
    const photoInput = document.getElementById('userPhoto');
    
    const name = nameInput.value.trim();
    const review = reviewInput.value.trim();
    const photoFile = photoInput.files[0];
    let photoUrl = "";

    if (name && review) {
        try {
            // ImgBB पर फोटो अपलोड
            if (photoFile) {
                const formData = new FormData();
                formData.append("image", photoFile);
                
                const response = await fetch("https://api.imgbb.com/1/upload?key=2705a30bb29595bfa91f1dc8fa478ef4", {
                    method: "POST",
                    body: formData
                });
                const result = await response.json();
                
                if (result.success) {
                    photoUrl = result.data.url;
                }
            }

            // Firestore में डेटा सेव करना
            await db.collection("reviews").add({
                name: name,
                review: review,
                photo: photoUrl,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert("🙏 आपका अनुभव फोटो के साथ साझा किया गया!");
            
            nameInput.value = '';
            reviewInput.value = '';
            photoInput.value = '';
            location.reload(); 

        } catch (error) {
            console.error("Error:", error);
            alert("कुछ गलती हुई, कृपया फिर कोशिश करें।");
        }
    } else {
        alert("कृपया नाम और अनुभव दोनों भरें।");
    }
}

// अनुभव दिखाने का फंक्शन (प्रीमियम कार्ड)
function displayReviews() {
    const reviewsList = document.getElementById('reviewsList');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    
    db.collection("reviews").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
        reviewsList.innerHTML = "";
        let count = 0;
        
        querySnapshot.forEach((doc) => {
            count++;
            const data = doc.data();
            
            const reviewHtml = `
                <div class="wisdom-card" style="
                    background: #fff;
                    border-radius: 12px;
                    padding: 0;
                    margin-bottom: 25px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.06);
                    border: 1px solid #f1f1f1;
                    overflow: hidden;
                    ${count > 3 ? 'display: none;' : ''}">
                    
                    ${data.photo ? `
                        <img src="${data.photo}" style="width:100%; max-height:280px; object-fit:cover; display:block;">
                    ` : ''}

                    <div style="padding: 15px; text-align: left;">
                        <p style="font-size: 1.05rem; color: #444; line-height: 1.6; margin-bottom: 12px;">
                            "${data.review}"
                        </p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f8f8f8; padding-top: 10px;">
                            <span style="color: #B22222; font-weight: bold; font-size: 0.9rem;">
                               👤 ${data.name}
                            </span>
                            <span style="color: #FFD700; font-size: 0.8rem;">⭐⭐⭐⭐⭐</span>
                        </div>
                    </div>
                </div>
            `;
            reviewsList.innerHTML += reviewHtml;
        });

        if (count > 3) {
            viewMoreBtn.style.display = "block";
        }
    });
}

function toggleReviews() {
    const hiddenReviews = document.querySelectorAll('#reviewsList .wisdom-card[style*="display: none"]');
    hiddenReviews.forEach(rev => rev.style.display = "block");
    document.getElementById('viewMoreBtn').style.display = "none";
}

// Initialize Reviews
displayReviews();
                      
