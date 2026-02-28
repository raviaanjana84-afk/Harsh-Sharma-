// ==========================================
// GAMIFICATION.JS - STRIKE & BADGES SYSTEM
// ==========================================

const Badges = [
    { id: 'newbie', name: 'नया साधक', minMala: 1, icon: '🌟' },
    { id: 'regular', name: 'नियमित भक्त', minMala: 50, icon: '📿' },
    { id: 'master', name: 'जाप शिरोमणि', minMala: 500, icon: '👑' },
    { id: 'legend', name: 'परम तपस्वी', minMala: 1000, icon: '🔱' }
];

// 1. स्ट्राइक चेक करने का एडवांस लॉजिक
window.checkStrikeStatus = () => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('lastVisitDate');
    let strike = parseInt(localStorage.getItem('userStrike')) || 0;

    if (lastDate === today) {
        // आज पहले ही आ चुका है
    } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate === yesterday.toDateString()) {
            // कल आया था, स्ट्राइक बढ़ाओ
            strike++;
        } else {
            // कल नहीं आया था, स्ट्राइक रीसेट (1 से शुरू)
            strike = 1;
        }
        localStorage.setItem('lastVisitDate', today);
        localStorage.setItem('userStrike', strike);
    }
    
    // UI अपडेट करें
    const strikeEl = document.getElementById('strike-display');
    if (strikeEl) strikeEl.innerHTML = `🔥 ${strike} दिन की साधना`;
};

// 2. यूजर का बैज (Badge) चेक करना
window.getUserBadge = (totalMala) => {
    let currentBadge = Badges[0];
    Badges.forEach(badge => {
        if (totalMala >= badge.minMala) {
            currentBadge = badge;
        }
    });
    return currentBadge;
};

// 3. स्ट्राइक और उपलब्धियों का पॉपअप दिखाना
window.showGamificationDetails = () => {
    const strike = localStorage.getItem('userStrike') || 0;
    const totalMala = parseInt(localStorage.getItem('totalMalaCounter')) || 0;
    const badge = window.getUserBadge(totalMala);

    const html = `
        <div style="text-align:center;">
            <h2 style="color:#B22222;">🚩 आपकी साधना प्रगति</h2>
            <div style="font-size:50px; margin:20px 0;">${badge.icon}</div>
            <h3 style="margin:0; color:#FF8C00;">${badge.name}</h3>
            <p style="font-size:14px; color:#666;">स्तर: ${badge.id.toUpperCase()}</p>
            
            <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
            
            <div style="display:flex; justify-content:space-around;">
                <div>
                    <h4 style="margin:0;">🔥 स्ट्राइक</h4>
                    <p style="font-size:20px; font-weight:bold;">${strike} दिन</p>
                </div>
                <div>
                    <h4 style="margin:0;">📿 कुल माला</h4>
                    <p style="font-size:20px; font-weight:bold;">${totalMala}</p>
                </div>
            </div>

            <div style="background:#fff9f0; padding:15px; border-radius:10px; margin-top:20px; text-align:left;">
                <p style="font-size:13px; margin:0;"><b>अगला लक्ष्य:</b> 
                ${totalMala < 1000 ? "अगले बैज के लिए और जाप करें।" : "आप परम अवस्था में हैं!"}</p>
            </div>
            
            <button class="back-link" style="width:100%; margin-top:20px;" onclick="window.hideSection()">बंद करें</button>
        </div>
    `;
    
    document.getElementById('overlay-content').innerHTML = html;
    document.getElementById('overlay').style.display = 'flex';
};

// पेज लोड होते ही स्ट्राइक चेक करें
document.addEventListener('DOMContentLoaded', window.checkStrikeStatus);
