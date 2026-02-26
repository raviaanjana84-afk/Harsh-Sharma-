const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const sections = {

pujan: `
<h2>🕉️ मुख्य पूजन सेवाएँ</h2>
<ul>
<li>🚩 मंगल दोष (₹1350 - ₹5100)</li>
<li>🐍 कालसर्प दोष (₹2100 - ₹5100)</li>
<li>✨ नवग्रह शांति (₹2350 - ₹3100)</li>
<li>🛡️ माँ बगलामुखी हवन (₹2350 - ₹11000)</li>
</ul>
<button onclick="bookNow('पूजन सेवा')">बुक करें</button>
`,

kundli: `
<h2>📜 कुंडली विश्लेषण</h2>
<p>शुद्ध गणितीय गणना द्वारा भविष्यफल।</p>
<p>₹500 – ₹2100</p>
<button onclick="bookNow('कुंडली सेवा')">संपर्क करें</button>
`,

mantra: `
<h2>🕉️ मंत्र अनुष्ठान</h2>
<p>महामृत्युंजय जाप, श्री सूक्त पाठ, सुंदरकांड</p>
<button onclick="bookNow('मंत्र अनुष्ठान')">संपर्क करें</button>
`,

gallery: `
<h2>📸 पावन दर्शन</h2>
<img src="https://images.unsplash.com/photo-1604543163833-3b60f124430e?q=80&w=400" width="100%">
`
};

function openSection(key){
document.getElementById("dynamicContent").innerHTML = sections[key];
document.getElementById("overlay").style.display="flex";
document.body.style.overflow="hidden";
}

function closeSection(){
document.getElementById("overlay").style.display="none";
document.body.style.overflow="auto";
}

function bookNow(service){
const phone="918319714682";
const msg=encodeURIComponent(`प्रणाम पंडित जी, मुझे ${service} के बारे में जानकारी चाहिए।`);
window.open(`https://wa.me/${phone}?text=${msg}`,"_blank");
}

db.collection("reviews").orderBy("timestamp","desc").onSnapshot(snap=>{
let html="";
let count=0;
snap.forEach(doc=>{
count++;
if(count<=3){
const d=doc.data();
html+=`<div class="review-item">
<p>"${d.review}"</p>
<small>- ${d.name}</small>
</div>`;
}
});
document.getElementById("reviewsList").innerHTML=html;
});
