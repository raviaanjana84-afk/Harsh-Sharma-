// ==========================================
// MALA.JS - DIGITAL JAP COUNTER ENGINE
// ==========================================

let currentJapCount = 0;
let totalMalaDone = parseInt(localStorage.getItem('totalMalaCounter')) || 0;

window.countMala = () => {
    currentJapCount++;
    
    // मोबाइल पर वाइब्रेशन (Haptic Feedback)
    if (navigator.vibrate) navigator.vibrate(40);

    // UI अपडेट करें
    document.getElementById('mala-count').innerText = currentJapCount;
    document.getElementById('total-mala').innerText = totalMalaDone;

    // 108 होने पर माला पूर्ण
    if (currentJapCount >= 108) {
        completeMalaCycle();
    }
};

async function completeMalaCycle() {
    currentJapCount = 0;
    totalMalaDone++;
    
    // लोकल स्टोरेज अपडेट
    localStorage.setItem('totalMalaCounter', totalMalaDone);
    document.getElementById('mala-count').innerText = "0";
    document.getElementById('total-mala').innerText = totalMalaDone;

    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    
    // लीडरबोर्ड के लिए नाम पूछें (अगर पहली बार है)
    let userName = localStorage.getItem('bhaktName');
    if (!userName) {
        userName = prompt("अति उत्तम! आपकी एक माला पूर्ण हुई। लीडरबोर्ड के लिए अपना नाम लिखें:");
        if (userName) localStorage.setItem('bhaktName', userName);
    }

    if (userName) {
        // Leaderboard.js का फंक्शन कॉल करें
        if (window.updateLeaderboardData) {
            window.updateLeaderboardData(userName, totalMalaDone);
        }
    }

    alert("🚩 आपकी एक माला (108 जप) पूर्ण हुई! जय श्री कृष्ण।");
}

window.resetMala = () => {
    if (confirm("क्या आप आज की गिनती शून्य करना चाहते हैं?")) {
        currentJapCount = 0;
        document.getElementById('mala-count').innerText = "0";
    }
};

