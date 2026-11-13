// Service worker : notifications push (Firebase) + installation de la carte sur l'écran d'accueil
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:"AIzaSyA0DRAyl7nVuF7yxOFSDS0_z1NZoYuXUtI",authDomain:"carte-fidelite-7a6bc.firebaseapp.com",projectId:"carte-fidelite-7a6bc",storageBucket:"carte-fidelite-7a6bc.firebasestorage.app",messagingSenderId:"975448792225",appId:"1:975448792225:web:c64c4f9bac9717677324e0"});
firebase.messaging();
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',()=>{});
