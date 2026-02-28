
// ==========================================
// ACHARYA HARSH SHARMA AI (BHAKTI AI)
// ==========================================

const GEMINI_API_KEY = "AIzaSyCT1nmY_zCAcrwpKsPgcJ91mJhgnG47egQ"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// 1. AI चैट इंटरफेस (Bhakti Feel UI)
window.renderBhaktiAI = () => {
    const overlayContent = document.getElementById('overlay-content');
    
    overlayContent.innerHTML = `
        <div style="text-align:center; margin-bottom:15px;">
            <h2 style="color:#B22222; margin:0;">🚩 आचार्य हर्ष शर्मा</h2>
            <small style="color:#FF8C00; font-weight:bold;">आध्यात्मिक मार्गदर्शक (AI स्वरूप)</small>
        </div>
        
        <div id="chat-window" style="height:350px; overflow-y:auto; background:#FFF8F0; padding:15px; border-radius:15px; border:2px solid #FFD700; margin-bottom:15px; display:flex; flex-direction:column; gap:12px; box-shadow: inset 0 0 10px rgba(0,0,0,0.05);">
            <div style="background:#fdf2f2; padding:12px; border-radius:15px 15px 15px 0px; align-self:flex-start; font-size:15px; border:1px solid #f5c6cb; color:#721c24;">
                <b>आचार्य:</b> जय श्री कृष्ण! मैं आचार्य हर्ष शर्मा का डिजिटल स्वरूप हूँ। धर्म, कर्मकांड या जीवन की समस्याओं से जुड़ा आपका क्या प्रश्न है?
            </div>
        </div>
        
        <div style="display:flex; gap:10px; background:white; padding:5px; border-radius:30px; border:1fr solid #B22222; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <input type="text" id="ai-input" placeholder="अपना प्रश्न यहाँ पूछें..." 
                style="flex:1; border:none; padding:12px 20px; border-radius:30px; outline:none; font-family:inherit;">
            <button onclick="window.askBhaktiAI()" 
                style="background:#B22222; color:white; border:none; width:45px; height:45px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
        
        <button class="back-link" style="width:100%; margin-top:15px; border:none; background:none; color:#666;" onclick="window.hideSection()">← वापस जाएँ</button>
    `;
    document.getElementById('overlay').style.display = 'flex';
    
    // Enter key support
    document.getElementById('ai-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') window.askBhaktiAI();
    });
};

// 2. AI से शास्त्र सम्मत संवाद
window.askBhaktiAI = async () => {
    const inputField = document.getElementById('ai-input');
    const chatWindow = document.getElementById('chat-window');
    const userMessage = inputField.value.trim();

    if (!userMessage) return;

    // भक्त का मैसेज (Right Side)
    chatWindow.innerHTML += `
        <div style="background:#B22222; color:white; padding:12px; border-radius:15px 15px 0px 15px; align-self:flex-end; font-size:15px; max-width:80%;">
            ${userMessage}
        </div>
    `;
    inputField.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // लोडिंग (आचार्य जी सोच रहे हैं)
    const loadingId = "loading-" + Date.now();
    chatWindow.innerHTML += `
        <div id="${loadingId}" style="color:#B22222; font-style:italic; font-size:13px; align-self:flex-start;">
            आचार्य जी विचार कर रहे हैं...
        </div>
    `;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `तुम 'आचार्य हर्ष शर्मा' हो, जो उज्जैन के एक ज्ञानी पंडित और आध्यात्मिक मार्गदर्शक हैं। 
                        तुम्हारी भाषा शैली बहुत ही विनम्र, धार्मिक और सकारात्मक होनी चाहिए। 
                        बातचीत की शुरुआत 'जय श्री कृष्ण' या 'शुभ आशीर्वाद' से करो। 
                        तुम केवल हिंदू धर्म, शास्त्र, ज्योतिष, कर्मकांड, और भक्ति से जुड़े उत्तर दोगे। 
                        अगर कोई फालतू या गैर-धार्मिक सवाल पूछे, तो विनम्रता से मना कर दो। 
                        भक्त का प्रश्न है: ${userMessage}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;

        document.getElementById(loadingId).remove();
        
        // आचार्य जी का उत्तर (Left Side)
        chatWindow.innerHTML += `
            <div style="background:#fdf2f2; padding:12px; border-radius:15px 15px 15px 0px; align-self:flex-start; font-size:15px; border:1px solid #f5c6cb; color:#721c24; max-width:85%;">
                <b>आचार्य:</b> ${aiText}
            </div>
        `;
        chatWindow.scrollTop = chatWindow.scrollHeight;

    } catch (error) {
        document.getElementById(loadingId).innerText = "क्षमा करें, तकनीकी बाधा आई।";
    }
};
