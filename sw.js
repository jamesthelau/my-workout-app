// Increment the version after changing any offline app file.
const PREFIX = `flex-log-v2:${self.registration.scope}:`;
const CACHE = `${PREFIX}6.5.1`;
const FILES = ['./','index.html','styles.css','app.js','timer-worker.js','manifest.json','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png'];
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

// Serialize expiry messages from the page and worker to prevent duplicate alerts.
const announced=new Set();
let alerts=Promise.resolve();
self.addEventListener('message',event=>{
  const m=event.data;
  if(m?.type!=='rest-due'||typeof m.id!=='string'||!Number.isFinite(m.end)||m.end>Date.now())return;
  const source=event.source?.url;
  if(source&&!source.startsWith(self.registration.scope))return;
  const tag=`rest:${m.id}:${m.end}`;
  alerts=alerts.catch(()=>{}).then(async()=>{
    if(announced.has(tag))return;
    if((await self.registration.getNotifications({tag})).length){announced.add(tag);return;}
    const options={body:`${String(m.name||'Exercise').slice(0,100)} · Ready for your next set`,tag,icon:'./icons/icon-192.png',data:{url:self.registration.scope},silent:m.sound===false};
    if(m.sound!==false&&m.haptics!==false)options.vibrate=[200,100,200];
    await self.registration.showNotification('Rest complete',options);
    announced.add(tag);
  });
  event.waitUntil(alerts.catch(()=>{}));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(async clients=>{
    const client=clients.find(c=>c.url.startsWith(self.registration.scope));
    if(client)return client.focus();
    return self.clients.openWindow(self.registration.scope);
  }));
});
