// Increment the version after changing any offline app file.
const PREFIX = `flex-log-v2:${self.registration.scope}:`;
const CACHE = `${PREFIX}2.4.0`;
const FILES = ['./','index.html','styles.css','app.js','manifest.json','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png'];
const urls = FILES.map(file=>new URL(file,self.registration.scope).href);
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(urls)));
  // No skipWaiting: do not replace an open workout with a new app version.
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  url.search='';
  if(event.request.mode!=='navigate'&&!urls.includes(url.href))return;
  event.respondWith(caches.open(CACHE).then(async cache=>{
    const cached=await cache.match(event.request.mode==='navigate'?new URL('index.html',self.registration.scope).href:url.href);
    return cached || fetch(event.request);
  }));
});
