// ==========================================
// ACHARYA HARSH SHARMA AI - STABLE VERSION
// ==========================================

const GEMINI_API_KEY = "AIzaSyCT1nmY_zCAcrwpKsPgcJ91mJhgnG47egQ"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

window.renderBhaktiAI = function() {
    const content = document.getElementById('overlay-content');
    if (!content) return;

    content.innerHTML = `
        <div style="text-align:center; margin-bottom:15px;">
            <h2 style="color:#B22222; margin:0;">🚩 आचार्य हर्ष शर्मा (AI)</h2>
            <small style="color:#FF8C00;">आध्यात्मिक मार्गदर्शक</small>
        </div>
        
        <div id="chat-window" style="height:320px; overflow-y:auto; background:#FFF8F0; padding:15px; border-radius:15px; border:2px solid #FFD700; margin-bottom:15px; display:flex; flex-direction:column; gap:12px;">
            <div style="background:#fdf2f2; padding:10px; border-radius:10px; align-self:flex-start; border:1px solid #f5c6cb;">
                <b>आचार्य:</b> जय श्री कृष्ण! मैं आपकी क्या सहायता कर सकता हूँ?
            </div>
        </div>
        
        <div style="display:flex; gap:8px;">
            <input type="text" id="ai-input" placeholder="अपना प्रश्न यहाँ पूछें..." 
                style="flex:1; border:1px solid #ccc; padding:12px; border-radius:25px; outline:none;">
            <button onclick="window.askBhaktiAI()" 
                style="background:#B22222; color:white; border:none; width:45px; height:45px; border-radius:50%; cursor:pointer;">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
        <button class="back-link" style="width:100%; margin-top:15px;" onclick="window.hideSection()">बंद करें</button>
    `;
};

window.askBhaktiAI = async function() {
    const inputField = document.getElementById('ai-input');
    const chatWindow = document.getElementById('chat-window');
    const userMessage = inputField.value.trim();

    if (!userMessage) return;

    // भक्त का मैसेज दिखाएं
    chatWindow.innerHTML += `<div style="background:#B22222; color:white; padding:10px; border-radius:10px; align-self:flex-end;">${userMessage}</div>`;
    inputField.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // लोडिंग दिखाएं
    const loadingId = "loading-" + Date.now();
    chatWindow.innerHTML += `<div id="${loadingId}" style="color:#B22222; font-style:italic;">आचार्य जी विचार कर रहे हैं...</div>`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `तुम आचार्य हर्ष शर्मा हो। विनम्र और धार्मिक भाषा में हिंदी में उत्तर दो। प्रश्न: ${userMessage}`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        // सुरक्षा चेक: अगर Google से जवाब आया है
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiText = data.candidates[0].content.parts[0].text;
            document.getElementById(loadingId).remove();
            chatWindow.innerHTML += `
                <div style="background:#fdf2f2; padding:10px; border-radius:10px; align-self:flex-start; border:1px solid #f5c6cb;">
                    <b>आचार्य:</b> ${aiText}
                </div>`;
        } else {
            throw new Error("जवाब खाली आया");
        }
        
    } catch (error) {
        console.error("AI Error:", error);
        if (document.getElementById(loadingId)) document.getElementById(loadingId).innerText = "क्षमा करें, संपर्क में बाधा आई।";
    }
    chatWindow.scrollTop = chatWindow.scrollHeight;
};
                
