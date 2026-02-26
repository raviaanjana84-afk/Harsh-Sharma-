// 1. Firebase Initialization
const firebaseConfig = {
    apiKey: "AIzaSyDO8kxU1t9zcfD0MXf6vhLlE3FR_CUKycE",
    authDomain: "harsh-sharma-website-f01ac.firebaseapp.com",
    projectId: "harsh-sharma-website-f01ac",
    storageBucket: "harsh-sharma-website-f01ac.firebasestorage.app",
    messagingSenderId: "8698683996",
    appId: "1:8698683996:web:58cd2b05fcf71646e0bc99"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 2. Data Content (Sab kuch details aur price ke saath)
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
    'hawan': `
        <h2 style="color: #B22222;">🔥 हवन विभाग</h2>
        <p>शुद्धि एवं सकारात्मक ऊर्जा हेतु विशेष अनुष्ठान:</p>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="openWhatsApp('नवग्रह शांति हवन')">✨ नवग्रह शांति हवन</div>
            <div class="pujan-card" onclick="openWhatsApp('सुंदरकांड एवं हवन')">📖 सुंदरकांड पाठ एवं हवन</div>
            <div class="pujan-card" onclick="openWhatsApp('वास्तु शांति हवन')">🏠 वास्तु शांति पूजन</div>
        </div>
        <button class="back-link" style="margin-top:20px; width:100%; cursor:pointer;" onclick="hideSection()">← मुख्य पेज</button>
    `,
    'mangal': `
        <h2 style="color: #B22222;">🚩 मंगल दोष निवारण</h2>
        <p>मंगलनाथ मंदिर (उज्जैन) पर विशेष भात पूजन।</p>
        <div class="price-box">💰 शुल्क: ₹1350 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('मंगल भात पूजन')">📅 बुकिंग हेतु संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'kaalsarp': `
        <h2 style="color: #444;">🐍 कालसर्प दोष शांति</h2>
        <p>चांदी के नाग-नागिन पूजन एवं विसर्जन विधि।</p>
        <div class="price-box">💰 शुल्क: ₹2100 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कालसर्प पूजन')">📅 संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'ark_vivah': `
        <h2 style="color: #228B22;">🌿 अर्क विवाह</h2>
        <p>विवाह बाधा दूर करने हेतु प्राचीन विधि।</p>
        <div class="price-box">💰 शुल्क: ₹2500 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('अर्क विवाह')">📅 संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'kumbh_vivah': `
        <h2 style="color: #8B4513;">🏺 कुंभ विवाह</h2>
        <p>स्त्रियों की कुंडली में मांगलिक दोष निवारण।</p>
        <div class="price-box">💰 शुल्क: ₹2500 - ₹5100</div>
        <button class="book-now-btn" onclick="openWhatsApp('कुंभ विवाह')">📅 संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'navgrah': `
        <h2 style="color: #4B0082;">✨ नवग्रह शांति</h2>
        <p>समस्त ग्रहों की शांति के लिए वैदिक पूजन।</p>
        <div class="price-box">💰 शुल्क: ₹2350 - ₹3100</div>
        <button class="book-now-btn" onclick="openWhatsApp('नवग्रह शांति')">📅 संपर्क करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'baglamukhi': `
        <h2 style="color: #FFD700; text-align: center; text-shadow: 1px 1px #000;">🛡️ माँ बगलामुखी हवन</h2>
        <p>शत्रु विजय और बाधा नाश हेतु अचूक अनुष्ठान।</p>
        <div class="price-box">💰 शुल्क: ₹2350 - ₹11,000</div>
        <button class="book-now-btn" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 अभी स्लॉट बुक करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'kundli': `
        <h2 style="color: #B22222;">📜 कुंडली विश्लेषण</h2>
        <p>सटीक भविष्यफल एवं समाधान।</p>
        <div class="price-box">शुल्क: ₹500 (परामर्श) | ₹2100 (पूर्ण कुंडली)</div>
        <button class="book-now-btn" onclick="openWhatsApp('कुंडली परामर्श')">📅 संपर्क करें</button>
        <button class="back-link" onclick="hideSection()">← मुख्य पेज</button>
    `,
    'mantra': `
        <h2 style="color: #B22222;">🕉️ मंत्र विभाग</h2>
        <p>महामृत्युंजय जाप एवं विशेष अनुष्ठान।</p>
        <button class="book-now-btn" onclick="openWhatsApp('मंत्र जाप')">📅 संपर्क करें</button>
        <button class="back-link" onclick="hideSection()">← मुख्य पेज</button>
    `
};

// 3. UI Navigation
function showSection(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    if (spiritualData[key]) {
        content.innerHTML = spiritualData[key];
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
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
    const nameInput = document.getElementById('userName');
    const reviewInput = document.getElementById('userReview');
    const photoFile = document.getElementById('userPhoto').files[0];
    const btn = document.getElementById('submitBtn');

    if (!nameInput.value.trim() || !reviewInput.value.trim()) {
        alert("कृपया नाम और अनुभव भरें।");
        return;
    }

    btn.disabled = true;
    btn.innerText = "प्रतीक्षा करें...";

    try {
        let photoUrl = "";
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
            name: nameInput.value.trim(),
            review: reviewInput.value.trim(),
            photo: photoUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("🙏 आपका अनुभव साझा किया गया!");
        location.reload();
    } catch (e) {
        console.error(e);
        alert("त्रुटि हुई, पुनः प्रयास करें।");
        btn.disabled = false;
        btn.innerText = "✨ अनुभव साझा करें ✨";
    }
}

// Review List Display Function
function displayReviews() {
    const list = document.getElementById('reviewsList');
    const btn = document.getElementById('viewMoreBtn');
    if (!list) return;

    db.collection("reviews").orderBy("timestamp", "desc").onSnapshot(snap => {
        list.innerHTML = "";
        let count = 0;
        snap.forEach(doc => {
            const d = doc.data();
            count++;
            const html = `
                <div class="review-item" style="${count > 3 ? 'display:none' : 'padding:15px; border-bottom:1px solid #eee; margin-bottom:10px; background:white; border-radius:10px;'}">
                    ${d.photo ? `<img src="${d.photo}" style="width:50px; height:50px; border-radius:50%; object-fit:cover; float:left; margin-right:12px;">` : ''}
                    <div style="overflow:hidden;">
                        <p style="margin:0; font-style:italic; font-size:15px; color:#444;">"${d.review}"</p>
                        <small style="color:#B22222; font-weight:bold;">- ${d.name}</small>
                    </div>
                    <div style="clear:both;"></div>
                </div>`;
            list.innerHTML += html;
        });
        if (count > 3 && btn) btn.style.display = "block";
    });
}

function toggleReviews() {
    const hidden = document.querySelectorAll('.review-item[style*="display:none"]');
    hidden.forEach(r => r.style.display = "block");
    document.getElementById('viewMoreBtn').style.display = "none";
}

// Start Reviews automatically
document.addEventListener('DOMContentLoaded', displayReviews);
