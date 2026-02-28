// ==========================================
// MAIN.JS - CENTRAL APP CONTROLLER
// ==========================================

/**
 * 1. ग्लोबल नेविगेशन इंजन
 * यह फंक्शन सभी मॉडल्स (Pujan, Mantra, AI, etc.) को पॉपअप में लोड करता है।
 */
window.showSection = (category) => {
    // मोबाइल वाइब्रेशन फीडबैक
    if (navigator.vibrate) navigator.vibrate(50);

    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    
    // लोडिंग स्टेट दिखाएं
    content.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <i class="fas fa-spinner fa-spin" style="font-size:30px; color:#B22222;"></i>
            <p>प्रतीक्षा करें...</p>
        </div>`;
    overlay.style.display = 'flex';

    // कैटेगरी के हिसाब से सही फाइल के फंक्शन को कॉल करना
    switch(category) {
        case 'pujan':
            if (window.renderPujanMenu) window.renderPujanMenu();
            break;
        case 'hawan':
            if (window.renderHawanMenu) window.renderHawanMenu();
            break;
        case 'kundli':
            if (window.renderKundliMenu) window.renderKundliMenu();
            break;
        case 'mantra':
            if (window.renderMantraMenu) window.renderMantraMenu();
            break;
        case 'bhandar':
            if (window.renderBhandar) window.renderBhandar();
            break;
        case 'bhakti-ai':
            if (window.renderBhaktiAI) window.renderBhaktiAI();
            break;
        case 'gamification':
            if (window.showGamificationDetails) window.showGamificationDetails();
            break;
        default:
            content.innerHTML = '<h2>त्रुटि</h2><p>यह सुविधा अभी सक्रिय नहीं है।</p>';
    }
};

/**
 * 2. ओवरले बंद करने का फंक्शन
 */
window.hideSection = () => {
    document.getElementById('overlay').style.display = 'none';
};

/**
 * 3. डिटेल रेंडरिंग (Pujan, Hawan, Kundli के लिए कॉमन)
 * यह फंक्शन अलग-अलग डेटा फाइलों से जानकारी उठाकर सुंदर कार्ड में दिखाता है।
 */
window.renderDetail = (type, key) => {
    let data;
    let backBtnCall;

    // डेटा सोर्स पहचानना
    if (type === 'pujan') {
        data = MASTER_PUJAN_DATA[key];
        backBtnCall = 'window.renderPujanMenu()';
    } else if (type === 'hawan') {
        data = MASTER_HAWAN_DATA[key];
        backBtnCall = 'window.renderHawanMenu()';
    } else if (type === 'kundli') {
        data = MASTER_KUNDLI_DATA[key];
        backBtnCall = 'window.renderKundliMenu()';
    }

    if (!data) return;

    document.getElementById('overlay-content').innerHTML = `
        <h2 style="color:#B22222;">${data.title}</h2>
        <div class="wisdom-card" style="text-align:left; border-left:5px solid #FF8C00; background:#fffcf5;">
            <p>${data.desc || data.details}</p>
            <hr style="border:0; border-top:1px solid #eee;">
            <p style="font-weight:bold; color:#B22222; font-size:18px;">
                💰 दक्षिण/शुल्क: ${data.price}
            </p>
        </div>
        <button class="book-now-btn" style="margin-top:15px;" 
                onclick="window.openWhatsApp('जय श्री कृष्ण आचार्य जी, मुझे ${data.title} सेवा की बुकिंग करनी है।')">
            व्हाट्सएप पर बुकिंग करें
        </button>
        <button class="back-link" style="width:100%; margin-top:10px;" onclick="${backBtnCall}">
            ← वापस सूची में
        </button>
    `;
};

/**
 * 4. व्हाट्सएप कनेक्टिविटी
 */
window.openWhatsApp = (message) => {
    const phoneNumber = "918319714682";
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank');
};

/**
 * 5. ऐप इनिशियलाइजेशन (Page Load)
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚩 आचार्य हर्ष शर्मा ऐप लोड हो रही है...");
    
    // रिव्यू लोड करना
    if (window.displayReviews) window.displayReviews();
    
    // स्ट्राइक चेक करना (Gamification)
    if (window.checkStrikeStatus) window.checkStrikeStatus();
    
    // माला काउंट अपडेट करना
    const totalMala = localStorage.getItem('totalMalaCounter') || 0;
    const malaDisplay = document.getElementById('total-mala');
    if (malaDisplay) malaDisplay.innerText = totalMala;
});

// बैकग्राउंड क्लिक पर ओवरले बंद करना (Optional)
window.onclick = function(event) {
    const overlay = document.getElementById('overlay');
    if (event.target == overlay) {
        window.hideSection();
    }
};

