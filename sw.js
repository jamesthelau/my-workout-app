// Increment the version after changing any offline app file.
const PREFIX = `flex-log-v2:${self.registration.scope}:`;
const CACHE = `${PREFIX}6.9.0`;
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

// Serialize alerts and dismissals so an in-flight alert cannot outlive its clear.
const announced=new Set(),cleared=new Map();
let clearedAll=0,alerts=Promise.resolve();
self.addEventListener('message',event=>{
  const m=event.data,source=event.source?.url;
  if(source&&!source.startsWith(self.registration.scope))return;
  if(m?.type==='rest-clear'&&Number.isFinite(m.before)){
    const before=Math.min(m.before,Date.now());
    if(Array.isArray(m.ids))m.ids.filter(id=>typeof id==='string').forEach(id=>cleared.set(id,Math.max(cleared.get(id)||0,before)));
    else clearedAll=Math.max(clearedAll,before);
    alerts=alerts.catch(()=>{}).then(async()=>{
      for(const n of await self.registration.getNotifications()){
        if(!n.tag?.startsWith('rest:'))continue;
        const id=n.data?.exerciseId||n.tag.split(':')[1];
        const end=n.data?.end||Number(n.tag.split(':')[2])||0;
        if((!Array.isArray(m.ids)||m.ids.includes(id))&&end<=before)n.close();
      }
    });
    event.waitUntil(alerts.catch(()=>{}));return;
  }
  if(m?.type!=='rest-due'||typeof m.id!=='string'||!Number.isFinite(m.end)||m.end>Date.now())return;
  const token=`${m.id}:${m.end}`,tag=`rest:${m.id}`;
  alerts=alerts.catch(()=>{}).then(async()=>{
    if(Date.now()-m.end>15000||m.end<=Math.max(clearedAll,cleared.get(m.id)||0)||announced.has(token))return;
    const windows=await self.clients?.matchAll({type:'window',includeUncontrolled:true})||[];
    if(windows.some(c=>c.url.startsWith(self.registration.scope)&&c.visibilityState==='visible'))return;
    const existing=await self.registration.getNotifications({tag});
    if(existing.some(n=>n.data?.end>=m.end)){announced.add(token);return;}
    const options={body:`${String(m.name||'Exercise').slice(0,100)} · Ready for your next set`,tag,icon:'./icons/icon-192.png',data:{url:self.registration.scope,exerciseId:m.id,end:m.end},silent:m.sound===false};
    if(m.sound!==false&&m.haptics!==false)options.vibrate=[200,100,200];
    if(Date.now()-m.end>15000||m.end<=Math.max(clearedAll,cleared.get(m.id)||0))return;
    await self.registration.showNotification('Rest complete',options);
    announced.add(token);
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
