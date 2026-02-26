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
const spiritualData = {
    'pujan': `
        <h2>🕉️ मुख्य पूजन विभाग</h2>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="showSection('mangal')">🚩 मंगल दोष (भात पूजन)</div>
            <div class="pujan-card" onclick="showSection('kaalsarp')">🐍 कालसर्प दोष निवारण</div>
            <div class="pujan-card" onclick="showSection('ark_vivah')">🌿 अर्क विवाह (पुरुषों हेतु)</div>
            <div class="pujan-card" onclick="showSection('kumbh_vivah')">🏺 कुंभ विवाह (स्त्रियों हेतु)</div>
            <div class="pujan-card" onclick="showSection('navgrah')">✨ नवग्रह शांति</div>
            <div class="pujan-card" onclick="showSection('baglamukhi')">🛡️ माँ बगलामुखी हवन पूजन</div>
        </div>
        <button class="back-link-btn" onclick="hideSection()">← मुख्य पेज</button>`,
    'mangal': `
        <h2>🚩 मंगल दोष निवारण</h2>
        <p>मंगल दोष से निवारण हेतु मंगल भात पूजन विशेष रूप से उज्जैन में मंगलनाथ मंदिर पर किया जाता है।</p>
        <div class="price-box">💰 शुल्क: ₹1350 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('मंगल भात पूजन')">📅 बुकिंग करें</button>
        <button class="back-link-btn" onclick="showSection('pujan')">← वापस सूची</button>`,
    'hawan': `
        <h2>🔥 माँ बगलामुखी विशेष हवन</h2>
        <p>शत्रु विजय, कानूनी मामले, और तंत्र बाधा निवारण हेतु अचूक अनुष्ठान।</p>
        <div class="price-box">दक्षिणा: ₹2,350 से ₹11,000</div>
        <button class="book-now-btn" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 हवन बुकिंग हेतु संपर्क करें</button>
        <button class="back-link-btn" onclick="hideSection()">← वापस मुख्य पेज</button>`,
    'kundli': `
        <h2>📜 कुंडली विश्लेषण</h2>
        <p>शुद्ध गणितीय गणना और प्राचीन सिद्धांतों के आधार पर सटीक भविष्यफल।</p>
        <div class="price-box">परामर्श शुल्क: ₹500 | पूर्ण कुंडली: ₹2100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कुंडली सेवा')">📅 परामर्श हेतु संपर्क करें</button>
        <button class="back-link-btn" onclick="hideSection()">← वापस मुख्य पेज</button>`,
    'mantra': `
        <h2>🕉️ मंत्र जाप एवं अनुष्ठान</h2>
        <p>महामृत्युंजय जाप, श्री सूक्त पाठ और सुंदरकांड हेतु संपर्क करें।</p>
        <button class="book-now-btn" onclick="openWhatsApp('मंत्र जाप अनुष्ठान')">📅 संकल्प हेतु संपर्क करें</button>
        <button class="back-link-btn" onclick="hideSection()">← वापस मुख्य पेज</button>`
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
