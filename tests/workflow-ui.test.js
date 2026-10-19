import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {initialState,logSet} from '../app.js';
test('UI event flow auto-fills, collapses, restores captured Y, pins and renders hardware controls',()=>{
 const saved=initialState();saved.settings.sound=false;const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);logSet(saved,'e1',0,{weight:135,reps:7},yesterday,'prior-ui');
 let raw=JSON.stringify(saved);const listeners={},nodes=new Map(),classList={toggle(){},add(){},remove(){}};
 const make=()=>({innerHTML:'',textContent:'',style:{},hidden:false,open:false,dataset:{},classList,addEventListener(type,fn){(this.events??={})[type]=fn;},setAttribute(){},append(){},showModal(){this.open=true;},close(){this.open=false;},focus(){},querySelector(selector){if(selector.startsWith('[data-row'))return make();return {value:'',checked:false,focus(){},scrollIntoView(){}};}});
 const body=make();for(const id of ['warning','dialog','toast','top','content','filters','page-title','page-subtitle','search','announce','dialog-content']){const node=make();node.parentElement=body;nodes.set('#'+id,node);}
 const doc={body,visibilityState:'visible',activeElement:{blur(){}},querySelector(selector){return nodes.get(selector)||null;},querySelectorAll(){return [];},getElementById(id){return nodes.get('#'+id)||null;},addEventListener(type,fn){(listeners[type]??=[]).push(fn);}};
 const win={scrollY:400,innerHeight:844,addEventListener(){},scrollTo({top}){this.scrollY=top;}};
 const context={FormData:class {constructor(form){this.values=form.values;}get(key){return this.values[key];}},document:doc,window:win,navigator:{},location:{href:'http://localhost/flex/',protocol:'http:',hostname:'localhost'},localStorage:{getItem(){return raw;},setItem(k,v){raw=v;}},URL,Date,Math,Number,String,JSON,Map,Set,structuredClone,crypto:globalThis.crypto,setInterval(){},setTimeout(){return 1;},clearTimeout(){},requestAnimationFrame(fn){fn();},console};
 vm.runInNewContext(readFileSync(new URL('../app.js',import.meta.url),'utf8').replace(/^export /gm,''),context);
 assert.match(nodes.get('#top').innerHTML,/DAILY GOAL: 13 PTS/);
 const details={open:false,dataset:{group:'chest'},matches(s){return s==='[data-group]';}};
 nodes.get('#content').events.click({target:{closest(s){return s==='summary'?{parentElement:details}:null;}},preventDefault(){}});
 win.scrollY=620;
 function click(action,extra={}){const button={dataset:{action,...extra},closest(){return null;}};const event={target:{closest(selector){return selector==='[data-action]'?button:null;}},preventDefault(){},stopImmediatePropagation(){}};for(const fn of listeners.click||[])fn(event);}
 click('set',{id:'e1',index:'0'});const next=JSON.parse(raw);assert.equal(next.history.at(-1).weight,135);assert.equal(next.history.at(-1).reps,7);assert.deepEqual(next.pinned,['e1']);assert.equal(win.scrollY,400);assert.ok(!nodes.get('#content').innerHTML.includes('data-group="chest" open'));assert.match(nodes.get('#top').innerHTML,/data-countdown="e1"/);
 click('edit-exercise',{id:'e1'});for(const field of ['name','sets','reps','tier','restMin','restMax','rir','restCycle','group','seat'])assert.ok(nodes.get('#dialog-content').innerHTML.includes(`name="${field}"`),field);
 const form={id:'exercise-edit-form',dataset:{id:'e1'},values:{name:'Edited press',sets:'4',reps:'9-12',tier:'3',restMin:'90',restMax:'90',rir:'0',restCycle:'3',group:'chest',seat:'Seat 3'}};
 for(const fn of listeners.submit||[])fn({target:form,preventDefault(){}});
 const edited=JSON.parse(raw).exercises.find(e=>e.id==='e1');assert.equal(edited.name,'Edited press');assert.equal(edited.sets,4);assert.equal(edited.reps,'9–12');assert.deepEqual(edited.rest,[90,90]);assert.equal(edited.tier,3);assert.equal(edited.seat,'Seat 3');
 click('settings');click('misc-tab',{tab:'hardware'});assert.match(nodes.get('#dialog-content').innerHTML,/id="volume"/);assert.match(nodes.get('#dialog-content').innerHTML,/id="hapticIntensity"/);assert.ok(!readFileSync(new URL('../index.html',import.meta.url),'utf8').includes('timer-dock'));
});
