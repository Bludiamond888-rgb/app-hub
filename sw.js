const CACHE='app-hub-v18';
const ASSETS=['./','index.html','styles.css','app.js','apps.json','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','icons/favicon-32.png','icons/apps/futures.png','icons/apps/rent.png','icons/apps/stock.png','icons/apps/lanecast.png','icons/apps/hanzi.png','icons/apps/wheel.png','icons/apps/napkin.png','icons/apps/earnings.png','icons/apps/dividend.png','icons/apps/savings.png','icons/apps/subs.png','icons/apps/checklist.png','icons/apps/recipes.png','icons/apps/deal-proforma.png','icons/apps/deal-flow.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
