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
    pujan: `
        <h2 style="color: #B22222; margin-bottom: 20px;">🕉️ पूजन शुक्ल विभाग</h2>
        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <p>मंगल दोष निवारण हेतु मंगल भात पूजन एवं कालसर्प दोष निवारण पूजन किया जाता है।</p>
            <hr style="margin: 15px 0;">
            <div style="margin-bottom: 15px;">
                <b style="color: #FF8C00;">₹ 1350 : सामान्य भात पूजन</b>
                <p>गणेश पूजन एवं मंगलनाथ जी पर भात चढ़ाई।</p>
            </div>
            <div style="margin-bottom: 15px;">
                <b style="color: #FF8C00;">₹ 2500 : नवग्रह शांति पूजन</b>
                <p>गणेश, वरुण, नवग्रह पूजन एवं हवन के साथ।</p>
            </div>
            <div>
                <b style="color: #FF8C00;">₹ 5100 : पंचांग कर्म पूजन</b>
                <p>कुलदेव-भैरव पूजन, षोडश मात्रिका, कालसर्प, नवग्रह पूजन एवं पूर्ण हवन।</p>
            </div>
        </div>`,
    
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
function showSection(key) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    content.innerHTML = spiritualData[key];
    
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Browser history mein ek state add karein taaki back karne par sirf overlay band ho
    window.history.pushState({overlay: true}, "");
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
