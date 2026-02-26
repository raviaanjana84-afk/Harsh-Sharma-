// 1. Firebase Initialization
const firebaseConfig = {
    apiKey: "AIzaSyDO8kxU1t9zcfD0MXf6vhLlE3FR_CUKycE",
    authDomain: "harsh-sharma-website-f01ac.firebaseapp.com",
    projectId: "harsh-sharma-website-f01ac",
    storageBucket: "harsh-sharma-website-f01ac.firebasestorage.app",
    messagingSenderId: "8698683996",
    appId: "1:8698683996:web:58cd2b05fcf71646e0bc99"
};

// Check if Firebase is already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 2. Data Content for Overlays
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
        <button class="back-link" style="margin-top:20px; width:100%; cursor:pointer;" onclick="hideSection()">← बंद करें</button>
    `,
    'mangal': `
        <h2 style="color: #B22222;">🚩 मंगल दोष निवारण</h2>
        <p>मंगल दोष से निवारण हेतु उज्जैन में मंगलनाथ मंदिर पर मंगल भात पूजन विशेष रूप से किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹1350 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('मंगल भात पूजन')">📅 बुकिंग हेतु संपर्क करें</button>
        <button class="back-link" style="cursor:pointer;" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'kaalsarp': `
        <h2 style="color: #444;">🐍 कालसर्प दोष निवारण</h2>
        <p>कालसर्प दोष निवारण हेतु नवकुल चांदी के नाग-नागिन का पूजन कर विसर्जन किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2100 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कालसर्प पूजन')">📅 बुकिंग हेतु संपर्क करें</button>
        <button class="back-link" style="cursor:pointer;" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'baglamukhi': `
        <h2 style="color: #FFD700; text-align: center; text-shadow: 1px 1px #000;">🛡️ माँ बगलामुखी हवन पूजन</h2>
        <p>माँ बगलामुखी स्तंभन की देवी हैं। यहाँ किया गया हवन शत्रुओं पर विजय और बाधाओं के नाश हेतु अचूक माना जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹2350 - ₹11000</div>
        <button class="book-now-btn" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 अभी स्लॉट बुक करें</button>
        <button class="back-link" style="cursor:pointer;" onclick="showSection('pujan')">← वापस सूची देखें</button>
    `,
    'kundli': `
        <h2 style="color: #B22222;">📜 कुंडली विश्लेषण</h2>
        <p>शुद्ध गणितीय गणना और प्राचीन सिद्धांतों के आधार पर सटीक भविष्यफल।</p>
        <div class="price-box">परामर्श शुल्क: ₹500 | पूर्ण कुंडली: ₹2100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कुंडली सेवा')">📅 परामर्श हेतु संपर्क करें</button>
        <button class="back-link" style="cursor:pointer;" onclick="hideSection()">← मुख्य पेज</button>
    `,
    'mantra': `
        <h2 style="color: #B22222;">🕉️ मंत्र जाप एवं अनुष्ठान</h2>
        <p>मंत्रों के शुद्ध उच्चारण और संकल्प से आपकी समस्याओं का शास्त्रीय निवारण किया जाता है।</p>
        <ul>
            <li>🔥 महामृत्युंजय जाप</li>
            <li>🛡️ बगलामुखी मंत्र</li>
            <li>📖 गीता पाठ / सुंदरकांड</li>
        </ul>
        <button class="book-now-btn" onclick="openWhatsApp('मंत्र जाप अनुष्ठान')">📅 संकल्प हेतु संपर्क करें</button>
        <button class="back-link" style="cursor:pointer;" onclick="hideSection()">← मुख्य पेज</button>
    `
};

// 3. UI Navigation Functions
function showSection(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    
    if (spiritualData[key]) {
        content.innerHTML = spiritualData[key];
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Stop scrolling
    }
}

function hideSection() {
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto'; // Resume scrolling
}

function openWhatsApp(service) {
    const phone = "918319714682";
    const msg = encodeURIComponent(`प्रणाम पंडित जी, मुझे "${service}" के बारे में जानकारी चाहिए।`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

// 4. Review System
async function saveReview() {
    const nameInput = document.getElementById('userName');
    const reviewInput = document.getElementById('userReview');
    const photoFile = document.getElementById('userPhoto').files[0];
    const submitBtn = document.querySelector('.wisdom-card button');

    if (!nameInput.value.trim() || !reviewInput.value.trim()) {
        alert("कृपया नाम और अनुभव भरें।");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "प्रतीक्षा करें...";

    try {
        let photoUrl = "";
        // Upload image to ImgBB if selected
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

        // Save to Firestore
        await db.collection("reviews").add({
            name: nameInput.value.trim(),
            review: reviewInput.value.trim(),
            photo: photoUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("🙏 आपका अनुभव साझा किया गया!");
        location.reload();
    } catch (e) {
        console.error(e);
        alert("त्रुटि हुई, कृपया पुनः प्रयास करें।");
        submitBtn.disabled = false;
        submitBtn.innerText = "✨ अनुभव साझा करें ✨";
    }
}

function displayReviews() {
    const list = document.getElementById('reviewsList');
    const btn = document.getElementById('viewMoreBtn');
    
    db.collection("reviews").orderBy("timestamp", "desc").onSnapshot(snap => {
        list.innerHTML = "";
        let count = 0;
        snap.forEach(doc => {
            const d = doc.data();
            count++;
            const html = `
                <div class="review-item" style="${count > 3 ? 'display:none' : 'padding:10px; border-bottom:1px solid #eee;'}">
                    ${d.photo ? `<img src="${d.photo}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; float:left; margin-right:10px;">` : ''}
                    <p style="margin:0; font-style:italic;">"${d.review}"</p>
                    <small><b>- ${d.name}</b></small>
                    <div style="clear:both;"></div>
                </div>`;
            list.innerHTML += html;
        });
        if (count > 3) btn.style.display = "block";
    });
}

function toggleReviews() {
    const hidden = document.querySelectorAll('.review-item[style*="display:none"]');
    hidden.forEach(r => r.style.display = "block");
    document.getElementById('viewMoreBtn').style.display = "none";
}

// Auto-run on load
document.addEventListener('DOMContentLoaded', displayReviews);
