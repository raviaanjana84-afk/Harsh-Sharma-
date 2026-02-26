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

// 2. Sabhi Sections ka Data (Pujan, Hawan, Kundli, etc.)
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
        <h2 style="color: #FFD700; text-align: center;">🛡️ माँ बगलामुखी हवन</h2>
        <p>शत्रु विजय और बाधा नाश हेतु अचूक अनुष्ठान।</p>
        <div class="price-box">💰 शुल्क: ₹2350 - ₹11,000</div>
        <button class="book-now-btn" onclick="openWhatsApp('माँ बगलामुखी हवन')">📅 अभी बुक करें</button>
        <button class="back-link" onclick="showSection('pujan')">← वापस सूची</button>
    `,
    'kundli': `
        <h2 style="color: #B22222;">📜 कुंडली विश्लेषण</h2>
        <p>सटीक भविष्यफल एवं समाधान।</p>
        <div class="price-box">शुल्क: ₹500 (परामर्श) | ₹2100 (पूर्ण कुंडली)</div>
        <button class="book-now-btn" onclick="openWhatsApp('कुंडली परामर्श')">📅 संपर्क करें</button>
        <button class="back-link" onclick="hideSection()">← मुख्य पेज</button>
    `
};

// 3. Mantra Section ka Naya Nested Data
const mantraData = {
    'main': `
        <h2 style="color: #B22222; text-align: center;">🛕 मंत्र विभाग</h2>
        <p style="font-size:14px; margin-bottom:15px; text-align:center;">सनातन वैदिक परंपरा में मंत्रों को चेतना शुद्धि का माध्यम माना गया है।</p>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="showMantraSub('shiv')">1️⃣ शिव मंत्र</div>
            <div class="pujan-card" onclick="showMantraSub('devi')">2️⃣ देवी मंत्र</div>
            <div class="pujan-card" onclick="showMantraSub('navgrah_list')">5️⃣ नवग्रह मंत्र</div>
            <div class="pujan-card" onclick="showMantraSub('rules')">7️⃣ जप के सामान्य नियम</div>
            <div class="pujan-card" onclick="showMantraSub('msg')">🔟 अंतिम संदेश</div>
        </div>
        <button class="back-link" style="width:100%;" onclick="hideSection()">← मुख्य पेज</button>
    `,
    'shiv': `
        <h2 style="color: #B22222;">🔱 शिव मंत्र</h2>
        <div class="pujan-menu">
            <div class="pujan-card" onclick="showMantraDetail('mahamrityunjay')">🕉️ महामृत्युंजय मंत्र</div>
            <div class="pujan-card" onclick="showMantraDetail('om_namah')">🕉️ ॐ नमः शिवाय</div>
        </div>
        <button class="back-link" onclick="showSection('mantra')">← मंत्र सूची</button>
    `,
    'mahamrityunjay': `
        <div style="text-align:left;">
            <h3 style="color: #B22222;">🕉️ महामृत्युंजय मंत्र</h3>
            <p style="background:#fdf2f2; padding:12px; border-radius:8px; font-weight:bold; color:#d32f2f; text-align:center;">
                ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।<br>उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ॥
            </p>
            <p><b>अर्थ:</b> हम तीन नेत्र वाले भगवान शिव की उपासना करते हैं। वे हमें मृत्यु के बंधनों से मुक्त कर अमृत तत्व प्रदान करें।</p>
        </div>
        <button class="back-link" onclick="showMantraSub('shiv')">← वापस</button>
    `,
    'om_namah': `
        <div style="text-align:left;">
            <h3 style="color: #B22222;">🕉️ ॐ नमः शिवाय</h3>
            <p style="background:#fdf2f2; padding:12px; border-radius:8px; font-weight:bold; color:#d32f2f; text-align:center;">ॐ नमः शिवाय ॥</p>
            <p><b>अर्थ:</b> मैं भगवान शिव को नमन करता हूँ। यह मंत्र पंच तत्वों का संतुलन दर्शाता है।</p>
        </div>
        <button class="back-link" onclick="showMantraSub('shiv')">← वापस</button>
    `,
    'devi': `
        <h2 style="color: #B22222;">🚩 देवी मंत्र</h2>
        <div style="text-align:left; line-height:2;">
            <p>🛡️ <b>दुर्गा मंत्र:</b> ॐ दुं दुर्गायै नमः</p>
            <p>💰 <b>लक्ष्मी मंत्र:</b> ॐ श्रीं महालक्ष्म्यै नमः</p>
            <p>🎓 <b>सरस्वती मंत्र:</b> ॐ ऐं सरस्वत्यै नमः</p>
        </div>
        <button class="back-link" onclick="showSection('mantra')">← वापस</button>
    `,
    'navgrah_list': `
        <h2 style="color: #B22222;">✨ नवग्रह मंत्र</h2>
        <div style="text-align:left; font-size:14px; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <span>☀️ सूर्य: ॐ सूर्याय नमः</span>
            <span>🌙 चंद्र: ॐ सोमाय नमः</span>
            <span>🚩 मंगल: ॐ मंगलाय नमः</span>
            <span>💎 बुध: ॐ बुधाय नमः</span>
            <span>🕌 गुरु: ॐ गुरवे नमः</span>
            <span>💍 शुक्र: ॐ शुक्राय नमः</span>
            <span>🌑 शनि: ॐ शनैश्चराय नमः</span>
        </div>
        <button class="back-link" onclick="showSection('mantra')">← वापस</button>
    `,
    'rules': `
        <h2 style="color: #B22222;">📜 जप के नियम</h2>
        <ul style="text-align:left;">
            <li>स्वच्छ एवं शांत स्थान का चयन करें।</li>
            <li>स्पष्ट उच्चारण और एकाग्रता रखें।</li>
            <li>पूर्व या उत्तर दिशा की ओर मुख करें।</li>
        </ul>
        <button class="back-link" onclick="showSection('mantra')">← वापस</button>
    `,
    'msg': `
        <h2 style="color: #B22222;">🔟 अंतिम संदेश</h2>
        <p style="font-style:italic;">"मंत्र केवल शब्द नहीं, ऊर्जा हैं। श्रद्धा ही सच्ची साधना है।"</p>
        <button class="back-link" onclick="showSection('mantra')">← वापस</button>
    `
};

// 4. Sabhi Functions (Navigation & Review)
function showSection(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    
    // Agar mantra click hua hai
    if (key === 'mantra') {
        content.innerHTML = mantraData['main'];
    } else if (spiritualData[key]) {
        content.innerHTML = spiritualData[key];
    }
    
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function showMantraSub(subKey) {
    document.getElementById('overlay-content').innerHTML = mantraData[subKey];
}

function showMantraDetail(detailKey) {
    document.getElementById('overlay-content').innerHTML = mantraData[detailKey];
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

// 5. Review System
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
    if (!list) return;

    db.collection("reviews").orderBy("timestamp", "desc").onSnapshot(snap => {
        list.innerHTML = "";
        let count = 0;
        snap.forEach(doc => {
            const d = doc.data();
            count++;
            const html = `
                <div class="review-item" style="${count > 3 ? 'display:none' : 'padding:15px; border-bottom:1px solid #eee; margin-bottom:10px;'}">
                    ${d.photo ? `<img src="${d.photo}" style="width:50px; height:50px; border-radius:50%; object-fit:cover; float:left; margin-right:10px;">` : ''}
                    <div>
                        <p style="margin:0; font-style:italic;">"${d.review}"</p>
                        <small><b>- ${d.name}</b></small>
                    </div>
                    <div style="clear:both;"></div>
                </div>`;
            list.innerHTML += html;
        });
        if (count > 3) document.getElementById('viewMoreBtn').style.display = "block";
    });
}

function toggleReviews() {
    document.querySelectorAll('.review-item[style*="display:none"]').forEach(r => r.style.display = "block");
    document.getElementById('viewMoreBtn').style.display = "none";
}

// Start everything
document.addEventListener('DOMContentLoaded', displayReviews);
