// 1. Firebase Configuration ⚙️
const firebaseConfig = {
  apiKey: "AIzaSyDO8kxU1t9zcfD0MXf6vhLlE3FR_CUKycE",
  authDomain: "harsh-sharma-website-f01ac.firebaseapp.com",
  projectId: "harsh-sharma-website-f01ac",
  storageBucket: "harsh-sharma-website-f01ac.firebasestorage.app",
  messagingSenderId: "8698683996",
  appId: "1:8698683996:web:58cd2b05fcf71646e0bc99"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 2. Spiritual Data (Information Storage) 🕉️
const spiritualData = {
    'pujan': `
        <h2 style="color: #B22222; text-align: center;">🕉️ मुख्य पूजन विभाग</h2>
        <div class="pujan-menu" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="pujan-card" onclick="showSection('mangal')" style="background:#fff8f0; padding:15px; border:1px solid #ddd; border-radius:8px; cursor:pointer; text-align:center;">🚩 मंगल दोष</div>
            <div class="pujan-card" onclick="showSection('kaalsarp')" style="background:#fff8f0; padding:15px; border:1px solid #ddd; border-radius:8px; cursor:pointer; text-align:center;">🐍 कालसर्प दोष</div>
            <div class="pujan-card" onclick="showSection('ark_vivah')" style="background:#fff8f0; padding:15px; border:1px solid #ddd; border-radius:8px; cursor:pointer; text-align:center;">🌿 अर्क विवाह</div>
            <div class="pujan-card" onclick="showSection('kumbh_vivah')" style="background:#fff8f0; padding:15px; border:1px solid #ddd; border-radius:8px; cursor:pointer; text-align:center;">🏺 कुंभ विवाह</div>
            <div class="pujan-card" onclick="showSection('navgrah')" style="background:#fff8f0; padding:15px; border:1px solid #ddd; border-radius:8px; cursor:pointer; text-align:center;">✨ नवग्रह शांति</div>
            <div class="pujan-card" onclick="showSection('baglamukhi')" style="background:#fff8f0; padding:15px; border:1px solid #ddd; border-radius:8px; cursor:pointer; text-align:center;">🛡️ माँ बगलामुखी</div>
        </div>
        <button class="back-link" style="margin-top:20px; width:100%; padding:10px; cursor:pointer;" onclick="hideSection()">← मुख्य पेज</button>
    `,
    'mangal': `
        <h2 style="color: #B22222;">🚩 मंगल दोष निवारण (भात पूजन)</h2>
        <p><b>जानकारी:</b> मंगल दोष से निवारण हेतु मंगल भात पूजन विशेष रूप से उज्जैन में मंगलनाथ मंदिर पर किया जाता है।</p>
        <div class="price-box" style="background:#fef9e7; padding:10px; border-radius:5px; margin:10px 0;">💰 शुल्क: ₹1350 - ₹5100</div>
        <button class="book-now-btn" style="background:#25D366; color:white; border:none; padding:12px; width:100%; border-radius:5px; cursor:pointer;" onclick="openWhatsApp('मंगल भात पूजन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" style="margin-top:10px; background:none; border:none; color:blue; cursor:pointer;" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'kaalsarp': `
        <h2 style="color: #444;">🐍 कालसर्प दोष निवारण</h2>
        <p><b> जानकारी:</b> कालसर्प नामक दोष से निवारण हेतु नवकूल चांदी के नाग नागिन का पूजन कर विसर्जन किया जाता है।</p>
        <div class="price-box" style="background:#fef9e7; padding:10px; border-radius:5px; margin:10px 0;">💰 शुल्क: ₹2100 - ₹5100</div>
        <button class="book-now-btn" style="background:#25D366; color:white; border:none; padding:12px; width:100%; border-radius:5px; cursor:pointer;" onclick="openWhatsApp('कालसर्प पूजन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" style="margin-top:10px; background:none; border:none; color:blue; cursor:pointer;" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'ark_vivah': `
        <h2 style="color: #228B22;">🌿 अर्क विवाह (पुरुषों हेतु)</h2>
        <p><b> जानकारी:</b> पुरुषों की कुंडली में मांगलिक दोष दूर करने हेतु।</p>
        <div class="price-box" style="background:#fef9e7; padding:10px; border-radius:5px; margin:10px 0;">💰 शुल्क: ₹2500 - ₹5100</div>
        <button class="book-now-btn" style="background:#25D366; color:white; border:none; padding:12px; width:100%; border-radius:5px; cursor:pointer;" onclick="openWhatsApp('अर्क विवाह')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" style="margin-top:10px; background:none; border:none; color:blue; cursor:pointer;" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'kumbh_vivah': `
        <h2 style="color: #8B4513;">🏺 कुंभ विवाह (स्त्रियों हेतु)</h2>
        <p><b> जानकारी:</b> स्त्रियों की कुंडली में मांगलिक दोष दूर करने हेतु।</p>
        <div class="price-box" style="background:#fef9e7; padding:10px; border-radius:5px; margin:10px 0;">💰 शुल्क: ₹2500 - ₹5100</div>
        <button class="book-now-btn" style="background:#25D366; color:white; border:none; padding:12px; width:100%; border-radius:5px; cursor:pointer;" onclick="openWhatsApp('कुंभ विवाह')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" style="margin-top:10px; background:none; border:none; color:blue; cursor:pointer;" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'navgrah': `
        <h2 style="color: #4B0082;">✨ नवग्रह शांति</h2>
        <p> ग्रहों की प्रतिकूलता दूर करने हेतु विशेष पूजन।</p>
        <div class="price-box" style="background:#fef9e7; padding:10px; border-radius:5px; margin:10px 0;">💰 शुल्क: ₹2350 - ₹3100</div>
        <button class="book-now-btn" style="background:#25D366; color:white; border:none; padding:12px; width:100%; border-radius:5px; cursor:pointer;" onclick="openWhatsApp('नवग्रह शांति')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" style="margin-top:10px; background:none; border:none; color:blue; cursor:pointer;" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'baglamukhi': `
        <h2 style="color: #FFD700;">🛡️ माँ बगलामुखी हवन पूजन</h2>
        <p> शत्रुओं पर विजय और तंत्र बाधा निवारण हेतु।</p>
        <div class="price-box" style="background:#fef9e7; padding:10px; border-radius:5px; margin:10px 0;">💰 शुल्क: ₹2350 - ₹11000</div>
        <button class="book-now-btn" style="background:#25D366; color:white; border:none; padding:12px; width:100%; border-radius:5px; cursor:pointer;" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 बुकिंग के लिए संपर्क करें</button>
        <button class="back-link" style="margin-top:10px; background:none; border:none; color:blue; cursor:pointer;" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'hawan': `
        <h2 style="color: #B22222; text-align: center;">🔥 माँ बगलामुखी विशेष हवन</h2>
        <button class="book-now-btn" style="background:#25D366; color:white; border:none; padding:12px; width:100%; border-radius:5px; cursor:pointer;" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 हवन बुकिंग हेतु संपर्क करें</button>
        <button class="back-link" style="margin-top: 15px; width: 100%; padding:10px; cursor:pointer;" onclick="hideSection()">← वापस मुख्य पेज</button>
    `,
    'kundli': `
        <h2 style="color: #B22222; text-align: center;">📜 कुंडली निर्माण एवं विश्लेषण</h2>
        <button class="book-now-btn" style="background:#25D366; color:white; border:none; padding:12px; width:100%; border-radius:5px; cursor:pointer;" onclick="openWhatsApp('कुंडली सेवा')">📅 परामर्श के लिए संपर्क करें</button>
        <button class="back-link" style="margin-top: 15px; width: 100%; padding:10px; cursor:pointer;" onclick="hideSection()">← वापस मुख्य पेज</button>
    `,
    'mantra': `
        <h2 style="color: #B22222; text-align: center;">🕉️ मंत्र जाप एवं अनुष्ठान</h2>
        <button class="book-now-btn" style="background:#25D366; color:white; border:none; padding:12px; width:100%; border-radius:5px; cursor:pointer;" onclick="openWhatsApp('मंत्र जाप अनुष्ठान')">📅 संकल्प हेतु संपर्क करें</button>
        <button class="back-link" style="margin-top: 15px; width: 100%; padding:10px; cursor:pointer;" onclick="hideSection()">← वापस मुख्य पेज</button>
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

// 4. Review System ✍️
async function saveReview() {
    const nameInput = document.getElementById('userName');
    const reviewInput = document.getElementById('userReview');
    const photoInput = document.getElementById('userPhoto');
    
    const name = nameInput.value.trim();
    const review = reviewInput.value.trim();
    const photoFile = photoInput.files[0];
    let photoUrl = "";

    if (!name || !review) {
        alert("कृपया अपना नाम और अनुभव भरें।");
        return;
    }

    try {
        // ImgBB Upload
        if (photoFile) {
            const formData = new FormData();
            formData.append("image", photoFile);
            const response = await fetch("https://api.imgbb.com/1/upload?key=2705a30bb29595bfa91f1dc8fa478ef4", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            if (result.success) photoUrl = result.data.url;
        }

        // Firestore Save
        await db.collection("reviews").add({
            name: name,
            review: review,
            photo: photoUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("🙏 आपका अनुभव साझा किया गया!");
        location.reload(); 

    } catch (error) {
        console.error("Error:", error);
        alert("कुछ तकनीकी समस्या आई।");
    }
}

let reviewsExpanded = false;

function toggleReviews() {
    const hiddenReviews = document.querySelectorAll('.review-card-hidden');
    const btn = document.getElementById('viewMoreBtn');
    
    reviewsExpanded = !reviewsExpanded;
    
    hiddenReviews.forEach(el => {
        el.style.display = reviewsExpanded ? 'block' : 'none';
    });
    
    btn.innerText = reviewsExpanded ? "कम अनुभव देखें 👆" : "और भी अनुभव देखें 👇";
}

function displayReviews() {
    const reviewsList = document.getElementById('reviewsList');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    
    db.collection("reviews").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
        reviewsList.innerHTML = "";
        let count = 0;
        
        querySnapshot.forEach((doc) => {
            count++;
            const data = doc.data();
            const isHidden = count > 3 ? 'review-card-hidden' : '';
            const displayStyle = count > 3 ? 'none' : 'block';
            
            const reviewHtml = `
                <div class="wisdom-card ${isHidden}" style="
                    background: #fff; border-radius: 12px; padding: 0;
                    margin: 0 auto 25px auto; width: 95%; 
                    box-shadow: 0 8px 20px rgba(0,0,0,0.06);
                    border: 1px solid #f1f1f1; overflow: hidden;
                    display: ${displayStyle};">
                    
                    ${data.photo ? `<img src="${data.photo}" style="width:100%; max-height:350px; object-fit:cover;">` : ''}

                    <div style="padding: 20px; text-align: left;">
                        <p style="font-size: 1.1rem; color: #444; line-height: 1.6; margin-bottom: 12px;">"${data.review}"</p>
                        <div style="color: #B22222; font-weight: bold; border-top: 1px solid #eee; padding-top:10px;">👤 ${data.name}</div>
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

// 5. App Initialization 🚀
window.onload = function() {
    displayReviews();
};
                                                
