        // Firebase Config
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Overlay Content
const data = {
pujan: `
<h2>🕉️ पूजन सेवाएँ</h2>
<p>मंगल दोष, कालसर्प, नवग्रह शांति आदि।</p>
<button onclick="openWhatsApp('पूजन सेवा')">बुक करें</button>
`,

kundli: `
<h2>📜 कुंडली विश्लेषण</h2>
<p>शुद्ध गणना के आधार पर भविष्यफल।</p>
<button onclick="openWhatsApp('कुंडली सेवा')">संपर्क करें</button>
`,

mantra: `
<h2>🕉️ मंत्र जाप</h2>
<p>महामृत्युंजय, श्री सूक्त, सुंदरकांड पाठ।</p>
<button onclick="openWhatsApp('मंत्र जाप')">संपर्क करें</button>
`
};


// Show Overlay
function showSection(key){
document.getElementById('overlay-data').innerHTML = data[key];
document.getElementById('overlay').style.display = "flex";
document.body.style.overflow="hidden";
}

// Hide Overlay
function hideSection(){
document.getElementById('overlay').style.display="none";
document.body.style.overflow="auto";
}

// WhatsApp
function openWhatsApp(service){
const phone="918319714682";
const msg=encodeURIComponent(`प्रणाम पंडित जी, मुझे ${service} के बारे में जानकारी चाहिए।`);
window.open(`https://wa.me/${phone}?text=${msg}`,"_blank");
}


// Save Review
async function saveReview(){
const name=document.getElementById("name").value;
const review=document.getElementById("review").value;

if(!name || !review){
alert("कृपया सभी जानकारी भरें");
return;
}

await db.collection("reviews").add({
name,
review,
time:firebase.firestore.FieldValue.serverTimestamp()
});

alert("धन्यवाद 🙏");
location.reload();
}

// Display Reviews
db.collection("reviews").orderBy("time","desc").onSnapshot(snap=>{
const div=document.getElementById("reviews");
div.innerHTML="";
snap.forEach(doc=>{
const d=doc.data();
div.innerHTML+=`<div class="review-item">
<p>"${d.review}"</p>
<small>- ${d.name}</small>
</div>`;
});
});
