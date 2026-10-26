// Absolute deadlines survive delayed ticks; Android can still suspend this worker.
let timers={},options={},interval=null;
const sent=new Set();
function pulse(){
  const now=Date.now();
  for(const [id,timer] of Object.entries(timers)){
    const token=`${id}:${timer.end}`;
    if(timer.end>now||sent.has(token))continue;
    sent.add(token);
    if(options.notifications&&navigator.serviceWorker?.getRegistration){
      navigator.serviceWorker.getRegistration(options.scope).then(reg=>{
        if(timers[id]?.end===timer.end)reg?.active?.postMessage({type:'rest-due',id,end:timer.end,name:timer.name,sound:options.sound,haptics:options.haptics});
      }).catch(()=>{});
    }
  }
  self.postMessage({type:'tick'});
}
self.onmessage=event=>{
  if(event.data?.type!=='sync')return;
  timers=event.data.timers||{};options=event.data.options||{};
  const active=new Set(Object.entries(timers).map(([id,t])=>`${id}:${t.end}`));
  for(const token of sent)if(!active.has(token))sent.delete(token);
  if(interval!==null)clearInterval(interval);interval=null;
  if(Object.keys(timers).length){pulse();interval=setInterval(pulse,250);}
};
