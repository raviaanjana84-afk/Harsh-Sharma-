// ==========================================
// REVIEWS.JS - LIVE BHAKT FEEDBACK
// ==========================================

window.saveReview = async () => {
    const name = document.getElementById('userName').value;
    const review = document.getElementById('userReview').value;

    if (!name || !review) {
        alert("कृपया नाम और संदेश लिखें।");
        return;
    }

    try {
        await db.collection("reviews").add({
            name: name,
            review: review,
            date: new Date().toLocaleDateString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("आपका अनुभव साझा करने के लिए धन्यवाद! 🙏");
        location.reload(); 
    } catch (e) { console.error(e); }
};

window.displayReviews = () => {
    const list = document.getElementById('reviewsList');
    db.collection("reviews").orderBy("timestamp", "desc").limit(5).onSnapshot(snap => {
        list.innerHTML = "";
        snap.forEach(doc => {
            const d = doc.data();
            list.innerHTML += `
                <div style="background:#f9f9f9; padding:15px; border-radius:12px; margin-bottom:10px; font-size:14px;">
                    <b>${d.name}:</b>
                    <p style="margin:5px 0 0 0; font-style:italic;">"${d.review}"</p>
                </div>
            `;
        });
    });
};
