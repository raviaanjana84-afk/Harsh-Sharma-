
// ==========================================
// SERVICE WORKER - OFFLINE & CACHE ENGINE
// ==========================================

const CACHE_NAME = 'pandit-harsh-sharma-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './config.js',
    './main.js',
    './pujan.js',
    './hawan.js',
    './kundli.js',
    './mantra.js',
    './quiz.js',
    './mala.js',
    './reviews.js',
    './bhakti-ai.js',
    './bhandar.js',
    './leaderboard.js',
    './gamification.js'
];

// 1. इंस्टॉल इवेंट - सभी जरूरी फाइलों को ब्राउज़र मेमोरी (Cache) में सेव करना
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('🛡️ आध्यात्मिक संपत्तियां सुरक्षित की जा रही हैं (Caching)...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. एक्टिवेट इवेंट - पुराने कैश को हटाना
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('🧹 पुराना डेटा साफ़ किया जा रहा है...');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 3. फेच इवेंट - इंटरनेट न होने पर कैश से फाइलें दिखाना
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // अगर फाइल कैश में है तो वहीं से दें, वरना नेटवर्क से लें
            return response || fetch(event.request);
        }).catch(() => {
            // अगर दोनों काम न करें (ऑफलाइन मोड)
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
            }
        })
    );
});
