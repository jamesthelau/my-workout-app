import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {initialState,logSet} from '../app.js';
test('reopening and resuming reconcile expired timers silently; new foreground timers still buzz',()=>{
 let now=new Date(2026,10,14,12).getTime(),buzzes=0,interval;
 class Clock extends Date {constructor(...args){super(...(args.length?args:[now]));}static now(){return now;}}
 const saved=initialState();saved.settings.sound=false;
 logSet(saved,'e1',0,{weight:100,reps:8},new Clock(now-600000));
 logSet(saved,'e2',0,{weight:100,reps:8},new Clock(now-600000));
 let setInput={weight:'',reps:''};
 let raw=JSON.stringify(saved);const listeners={},nodes=new Map(),classList={toggle(){},add(){},remove(){}};
 const make=()=>({innerHTML:'',textContent:'',style:{},hidden:false,open:false,dataset:{},classList,addEventListener(type,fn){(this.events??={})[type]=fn;},setAttribute(){},append(){},showModal(){this.open=true;},close(){this.open=false;},focus(){},querySelector(selector){if(selector.startsWith('[data-row'))return make();return {value:selector==='[data-field=weight]'?setInput.weight:selector==='[data-field=reps]'?setInput.reps:'',checked:false,focus(){},scrollIntoView(){}};}});
 const body=make();for(const id of ['warning','dialog','toast','top','content','filters','page-title','page-subtitle','search','announce','dialog-content']){const node=make();node.parentElement=body;nodes.set('#'+id,node);}
 const doc={body,visibilityState:'visible',activeElement:{blur(){}},querySelector(selector){return nodes.get(selector)||null;},querySelectorAll(){return [];},getElementById(id){return nodes.get('#'+id)||null;},addEventListener(type,fn){(listeners[type]??=[]).push(fn);}};
 const win={scrollY:400,innerHeight:844,addEventListener(){},scrollTo({top}){this.scrollY=top;}};
 const context={FormData:class {constructor(form){this.values=form.values;}get(key){return this.values[key];}},document:doc,window:win,navigator:{vibrate(){buzzes++;}},location:{href:'http://localhost/flex/',protocol:'http:',hostname:'localhost'},localStorage:{getItem(){return raw;},setItem(k,v){raw=v;}},URL,Date:Clock,Math,Number,String,JSON,Map,Set,structuredClone,crypto:globalThis.crypto,setInterval(fn){interval=fn;},setTimeout(){return 1;},clearTimeout(){},requestAnimationFrame(fn){fn();},console};
 vm.runInNewContext(readFileSync(new URL('../app.js',import.meta.url),'utf8').replace(/^export /gm,''),context);

 assert.equal(buzzes,0);assert.equal(Object.keys(JSON.parse(raw).timers).length,0);
 function clickSet(eid){setInput={weight:'100',reps:'8'};const button={dataset:{action:'set',id:eid,index:'1'},closest(){return null;}};for(const fn of listeners.click||[])fn({target:{closest:s=>s==='[data-action]'?button:null},preventDefault(){},stopImmediatePropagation(){}});}
 clickSet('e1');const due=JSON.parse(raw).timers.e1.end;
 doc.visibilityState='hidden';for(const fn of listeners.visibilitychange)fn();now=due+1000;
 const before=buzzes;doc.visibilityState='visible';for(const fn of listeners.visibilitychange)fn();assert.equal(buzzes,before);assert.equal(Object.keys(JSON.parse(raw).timers).length,0);
 clickSet('e2');now=JSON.parse(raw).timers.e2.end;const beforeFresh=buzzes;interval();assert.equal(buzzes,beforeFresh+1);
});
