// ==========================================
// LEADERBOARD.JS - TOP SADHAK RANKING
// ==========================================

// 1. डेटाबेस से टॉप 10 साधकों की लिस्ट लाना
window.showLeaderboard = async () => {
    const overlayContent = document.getElementById('overlay-content');
    overlayContent.innerHTML = `
        <h2 style="color:#B22222; text-align:center;">🏆 शीर्ष साधक (Leaderboard)</h2>
        <p style="text-align:center; font-size:12px; margin-bottom:15px;">सर्वाधिक माला जाप करने वाले भक्त</p>
        <div id="leaderboard-list" style="min-height:200px;">
            <p style="text-align:center;">डेटा लोड हो रहा है...</p>
        </div>
        <button class="back-link" style="width:100%; margin-top:20px;" onclick="window.hideSection()">बंद करें</button>
    `;
    document.getElementById('overlay').style.display = 'flex';

    try {
        // Firebase से डेटा मंगवाना (माला काउंट के हिसाब से Descending order में)
        const snapshot = await db.collection("leaderboard")
            .orderBy("totalMala", "desc")
            .limit(10)
            .get();

        let html = '<table style="width:100%; border-collapse: collapse; margin-top:10px;">';
        html += `<tr style="background:#B22222; color:white;">
                    <th style="padding:10px; border-radius:10px 0 0 0;">स्थान</th>
                    <th style="padding:10px;">नाम</th>
                    <th style="padding:10px; border-radius:0 10px 0 0;">कुल माला</th>
                 </tr>`;

        let rank = 1;
        if (snapshot.empty) {
            html = "<p style='text-align:center; padding:20px;'>अभी कोई डेटा उपलब्ध नहीं है। पहले साधक बनें!</p>";
        } else {
            snapshot.forEach(doc => {
                const data = doc.data();
                const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank;
                
                html += `
                <tr style="border-bottom:1px solid #eee; text-align:center; background:${rank <= 3 ? '#fff9f0' : 'transparent'};">
                    <td style="padding:12px; font-weight:bold;">${medal}</td>
                    <td style="padding:12px;">${data.name}</td>
                    <td style="padding:12px; color:#B22222; font-weight:bold;">${data.totalMala}</td>
                </tr>`;
                rank++;
            });
            html += "</table>";
        }

        document.getElementById('leaderboard-list').innerHTML = html;

    } catch (error) {
        console.error("Leaderboard Error:", error);
        document.getElementById('leaderboard-list').innerHTML = "<p>डेटा लोड करने में समस्या आई।</p>";
    }
};

// 2. माला पूरी होने पर डेटाबेस अपडेट करने का फंक्शन
window.updateLeaderboardData = async (userName, malaCount) => {
    if (!userName) return;

    const userRef = db.collection("leaderboard").doc(userName);

    try {
        const doc = await userRef.get();
        if (doc.exists) {
            // अगर यूजर पहले से है, तो उसकी माला संख्या बढ़ाएं
            await userRef.update({
                totalMala: firebase.firestore.FieldValue.increment(1),
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            // नया यूजर जोड़ें
            await userRef.set({
                name: userName,
                totalMala: 1,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    } catch (err) {
        console.error("Update Leaderboard Error:", err);
    }
};
