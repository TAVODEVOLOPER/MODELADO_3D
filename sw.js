/* Dolwin 4 · Service worker: funciona sin conexión tras la primera visita. Sube VERSION al publicar cambios. */
const VERSION='dolwin4-v3';
const SHELL=['./', 'index.html', 'manifest.webmanifest', 'vendor/three.min.js', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon.svg', 'icons/favicon-32.png'];
const PLANS=['assets/plans/L0.webp', 'assets/plans/L1.webp', 'assets/plans/L10.webp', 'assets/plans/L10d1.webp', 'assets/plans/L10d2.webp', 'assets/plans/L2.webp', 'assets/plans/L3.webp', 'assets/plans/L4.webp', 'assets/plans/L5.webp', 'assets/plans/L6.webp', 'assets/plans/L7.webp', 'assets/plans/L8.webp', 'assets/plans/L9.webp'];
self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(VERSION);
    await Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})));
    await Promise.all(PLANS.map(u=>c.add(u).catch(()=>{})));
    self.skipWaiting();
  })());
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    for(const k of await caches.keys()) if(k!==VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(u.origin===location.origin){
    // red primero para el HTML (así llegan las actualizaciones), caché para lo demás
    if(r.mode==='navigate'){
      e.respondWith(fetch(r).then(x=>{const cp=x.clone(); caches.open(VERSION).then(c=>c.put('index.html',cp)); return x}).catch(()=>caches.match('index.html')));
      return;
    }
    e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).then(x=>{if(x.ok){const cp=x.clone(); caches.open(VERSION).then(c=>c.put(r,cp))} return x})));
  } else if(/fonts\.(googleapis|gstatic)\.com$/.test(u.host)){
    e.respondWith(caches.open(VERSION).then(async c=>{const h=await c.match(r); const n=fetch(r).then(x=>{if(x.ok)c.put(r,x.clone()); return x}).catch(()=>h); return h||n}));
  }
});
