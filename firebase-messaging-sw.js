// Service worker : réception des notifications push + installation sur l'écran d'accueil
// Chaque push affiche TOUJOURS une notification (obligatoire sur iPhone, sinon Apple supprime l'abonnement).
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
// Le manifeste Android est généré par la page (logo du dashboard) et stocké dans le cache ; sinon on sert le fichier manifest.json du site
self.addEventListener('fetch',e=>{
  if(new URL(e.request.url).pathname.endsWith('/manifest.json'))
    e.respondWith(caches.open('dyn').then(c=>c.match(e.request.url)).then(r=>r||fetch(e.request)));
});
self.addEventListener('push',e=>{
  let p={};try{p=e.data?e.data.json():{}}catch(x){}
  const d=p.data||{},n=p.notification||{};
  e.waitUntil(self.registration.showNotification(d.title||n.title||'Notification',{
    body:d.body||n.body||'',data:{link:d.link||(p.fcmOptions&&p.fcmOptions.link)||''}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const u=new URL((e.notification.data&&e.notification.data.link)||self.registration.scope,self.registration.scope).href;
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){if(c.url==u&&'focus' in c)return c.focus()}
    return clients.openWindow(u)}));
});
