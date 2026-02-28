// bhakti-ai.js - Final Stable Version
const GEMINI_API_KEY = "AIzaSyCT1nmY_zCAcrwpKsPgcJ91mJhgnG47egQ"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

window.renderBhaktiAI = function() {
    const content = document.getElementById('overlay-content');
    if(!content) return;

    content.innerHTML = `
        <div style="text-align:center; border-bottom:2px solid #FFD700; padding-bottom:10px; margin-bottom:15px;">
            <h2 style="color:#B22222; margin:0;">🚩 आचार्य हर्ष शर्मा (AI)</h2>
        </div>
        <div id="chat-window" style="height:300px; overflow-y:auto; background:#FFF8F0; padding:10px; border-radius:10px; display:flex; flex-direction:column; gap:10px; border:1px solid #ddd;">
            <div style="background:#e1f5fe; padding:8px; border-radius:8px; align-self:flex-start;">
                <b>आचार्य:</b> जय श्री कृष्ण! मैं आचार्य हर्ष शर्मा का डिजिटल स्वरूप हूँ। पूछें अपना प्रश्न।
            </div>
        </div>
        <div style="display:flex; gap:5px; margin-top:10px;">
            <input type="text" id="ai-input" placeholder="यहाँ लिखें..." style="flex:1; padding:12px; border-radius:20px; border:1px solid #ccc; outline:none;">
            <button onclick="window.askBhaktiAI()" style="background:#B22222; color:white; border:none; width:45px; height:45px; border-radius:50%;"><i class="fas fa-paper-plane"></i></button>
        </div>
        <button class="back-link" style="width:100%; margin-top:10px;" onclick="window.hideSection()">बंद करें</button>
    `;
};

window.askBhaktiAI = async function() {
    const input = document.getElementById('ai-input');
    const chat = document.getElementById('chat-window');
    const msg = input.value.trim();
    if(!msg) return;

    chat.innerHTML += `<div style="background:#B22222; color:white; padding:8px; border-radius:8px; align-self:flex-end;">${msg}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    const loadingId = "loading-" + Date.now();
    chat.innerHTML += `<div id="${loadingId}" style="color:#B22222; font-style:italic;">आचार्य जी विचार कर रहे हैं...</div>`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: "तुम उज्जैन के पंडित हर्ष शर्मा हो। संक्षिप्त और धार्मिक उत्तर दो: " + msg }] }] })
        });

        const data = await response.json();
        // Correct path for Gemini 1.5 Flash response
        if (data && data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            document.getElementById(loadingId).remove();
            chat.innerHTML += `<div style="background:#e1f5fe; padding:8px; border-radius:8px; align-self:flex-start;"><b>आचार्य:</b> ${aiText}</div>`;
        } else { throw new Error(); }
    } catch (e) {
        if(document.getElementById(loadingId)) document.getElementById(loadingId).innerText = "क्षमा करें, तकनीकी बाधा आई।";
    }
    chat.scrollTop = chat.scrollHeight;
};
