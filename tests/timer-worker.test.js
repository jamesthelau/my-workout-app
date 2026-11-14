import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const flush=()=>new Promise(resolve=>setImmediate(resolve));
test('worker checks absolute deadlines, not elapsed ticks; cancellation, replacement and permissions are respected',async()=>{
 let now=1000,pulse,posts=[],ticks=[];const self={postMessage:m=>ticks.push(m)};
 const context={self,Date:{now:()=>now},Set,Object,navigator:{serviceWorker:{getRegistration:async()=>({active:{postMessage:m=>posts.push(m)}})}},setInterval(fn){pulse=fn;return 1;},clearInterval(){pulse=null;}};
 vm.runInNewContext(readFileSync(new URL('../timer-worker.js',import.meta.url),'utf8'),context);
 const sync=(timers,notifications=true)=>self.onmessage({data:{type:'sync',timers,options:{notifications,scope:'https://example.test/',sound:true,haptics:true}}});
 sync({a:{end:3000,name:'Row'},b:{end:4000,name:'Curl'}});await flush();assert.equal(posts.length,0);
 now=5000;pulse();await flush();assert.equal(posts.length,2);assert.equal(posts[0].end,3000);pulse();await flush();assert.equal(posts.length,2);
 sync({});assert.equal(pulse,null);
 now=6000;sync({a:{end:7000,name:'Row'}});sync({a:{end:9000,name:'Row'}});now=8000;pulse();await flush();assert.equal(posts.length,2);
 sync({});now=10000;assert.equal(pulse,null);
 sync({c:{end:9500,name:'Press'}},false);await flush();assert.equal(posts.length,2);assert.ok(ticks.length>0);
});
test('service worker deduplicates page/worker expiry alerts and notification clicks focus the app',async()=>{
 const handlers={},shown=[];let focused=0,closed=0;
 const self={registration:{scope:'https://example.test/flex/',getNotifications:async()=>[],showNotification:async(title,options)=>shown.push({title,options})},clients:{matchAll:async()=>[{url:'https://example.test/flex/',focus:async()=>focused++}],openWindow:async()=>{throw Error('Should reuse open app');}},addEventListener:(type,fn)=>handlers[type]=fn};
 vm.runInNewContext(readFileSync(new URL('../sw.js',import.meta.url),'utf8'),{self,URL,Set,Promise,Date,Number,String});
 let pending;const data={type:'rest-due',id:'e1',end:Date.now()-1000,name:'Press',sound:true,haptics:true};
 for(let i=0;i<2;i++){handlers.message({data,source:{url:'https://example.test/flex/'},waitUntil:p=>pending=p});await pending;}
 assert.equal(shown.length,1);assert.equal(shown[0].title,'Rest complete');assert.equal(shown[0].options.tag,'rest:e1');
 handlers.message({data:{...data,id:'e2',sound:false},waitUntil:p=>pending=p});await pending;assert.equal(shown[1].options.silent,true);assert.equal(shown[1].options.vibrate,undefined);
 handlers.notificationclick({notification:{close:()=>closed++},waitUntil:p=>pending=p});await pending;assert.equal(focused,1);assert.equal(closed,1);
});
test('rest alerts replace per exercise, clear selectively and reject late expiry messages',async()=>{
 const handlers={},live=[],shown=[];let now=10000;
 const self={registration:{scope:'https://example.test/flex/',getNotifications:async({tag}={})=>live.filter(n=>!tag||n.tag===tag),showNotification:async(title,options)=>{
  for(const n of [...live])if(n.tag===options.tag)n.close();
  const n={...options,close(){const i=live.indexOf(n);if(i>=0)live.splice(i,1);}};live.push(n);shown.push(n);
 }},addEventListener:(type,fn)=>handlers[type]=fn};
 vm.runInNewContext(readFileSync(new URL('../sw.js',import.meta.url),'utf8'),{self,URL,Date:{now:()=>now}});
 const send=data=>{let pending;handlers.message({data,waitUntil:p=>pending=p});return pending;};
 await send({type:'rest-due',id:'e1',end:1000});await send({type:'rest-due',id:'e1',end:2000});
 assert.equal(live.length,1);assert.equal(live[0].data.end,2000);
 await send({type:'rest-due',id:'e2',end:3000});
 await send({type:'rest-clear',ids:['e1'],before:4000});assert.deepEqual(live.map(n=>n.data.exerciseId),['e2']);
 await send({type:'rest-due',id:'e1',end:3500});assert.equal(shown.length,3);
 await send({type:'rest-due',id:'e1',end:5000});assert.equal(live.length,2);
 // Old app versions used one tag per timer. Those alerts are cleaned up too.
 const legacy={tag:'rest:e3:6000',close(){live.splice(live.indexOf(legacy),1);}};live.push(legacy);
 const unrelated={tag:'other',close(){throw Error('Must not close unrelated alerts');}};live.push(unrelated);
 await send({type:'rest-clear',before:10000});assert.deepEqual(live,[unrelated]);
 await send({type:'rest-due',id:'e4',end:9000});assert.equal(live.length,1);
 now=12000;await send({type:'rest-due',id:'e1',end:11000});assert.equal(live.length,2);
});
test('clearing during notification delivery closes the in-flight alert',async()=>{
 const handlers={},live=[];let release,started;
 const ready=new Promise(resolve=>started=resolve);
 const self={registration:{scope:'https://example.test/flex/',getNotifications:async()=>live,showNotification:async()=>{
  started();await new Promise(resolve=>release=resolve);const n={tag:'rest:e1',data:{exerciseId:'e1',end:1000},close(){live.splice(live.indexOf(n),1);}};live.push(n);
 }},addEventListener:(type,fn)=>handlers[type]=fn};
 vm.runInNewContext(readFileSync(new URL('../sw.js',import.meta.url),'utf8'),{self,URL,Date:{now:()=>3000}});
 let due,clear;handlers.message({data:{type:'rest-due',id:'e1',end:1000},waitUntil:p=>due=p});await ready;
 handlers.message({data:{type:'rest-clear',ids:['e1'],before:3000},waitUntil:p=>clear=p});release();await due;await clear;assert.equal(live.length,0);
});
test('worker drops stale expiries after suspension but still delivers fresh deadlines',async()=>{
 let now=100000,pulse;const posts=[],self={postMessage(){}};
 vm.runInNewContext(readFileSync(new URL('../timer-worker.js',import.meta.url),'utf8'),{self,Date:{now:()=>now},navigator:{serviceWorker:{getRegistration:async()=>({active:{postMessage:m=>posts.push(m)}})}},setInterval(fn){pulse=fn;return 1;},clearInterval(){}});
 self.onmessage({data:{type:'sync',timers:{old:{end:1000},fresh:{end:99000}},options:{notifications:true}}});await flush();assert.deepEqual(posts.map(p=>p.id),['fresh']);
 now=200000;pulse();await flush();assert.equal(posts.length,1);
});
test('service worker rejects stale messages and avoids system alerts while app is visible',async()=>{
 const handlers={},shown=[];let visible=false;
 const self={registration:{scope:'https://example.test/flex/',getNotifications:async()=>[],showNotification:async(t,o)=>shown.push(o)},clients:{matchAll:async()=>[{url:'https://example.test/flex/',visibilityState:visible?'visible':'hidden'}]},addEventListener:(type,fn)=>handlers[type]=fn};
 vm.runInNewContext(readFileSync(new URL('../sw.js',import.meta.url),'utf8'),{self,URL,Date:{now:()=>100000}});
 const send=async end=>{let pending;handlers.message({data:{type:'rest-due',id:'e1',end},waitUntil:p=>pending=p});await pending;};
 await send(1000);assert.equal(shown.length,0);visible=true;await send(99000);assert.equal(shown.length,0);visible=false;await send(99500);assert.equal(shown.length,1);
});
