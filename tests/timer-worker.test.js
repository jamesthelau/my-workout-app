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
 assert.equal(shown.length,1);assert.equal(shown[0].title,'Rest complete');assert.equal(shown[0].options.tag,`rest:e1:${data.end}`);
 handlers.message({data:{...data,id:'e2',sound:false},waitUntil:p=>pending=p});await pending;assert.equal(shown[1].options.silent,true);assert.equal(shown[1].options.vibrate,undefined);
 handlers.notificationclick({notification:{close:()=>closed++},waitUntil:p=>pending=p});await pending;assert.equal(focused,1);assert.equal(closed,1);
});
