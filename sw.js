// Service worker minimal : requis pour l'installation de la carte sur l'écran d'accueil
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',()=>{});
