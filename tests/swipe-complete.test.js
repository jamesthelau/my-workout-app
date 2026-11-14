import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,logSet,completeFromPrevious,changeUnits,unlogSet} from '../app.js';
const prior=new Date(2026,10,12,12),now=new Date(2026,10,14,12),day='2026-11-14';
test('first-row swipe completes latest historical set for the same exercise',()=>{
 const s=initialState();logSet(s,'e1',0,{weight:100,reps:8},prior);
 logSet(s,'e1',1,{weight:110,reps:6},new Date(prior.getTime()+1000));
 logSet(s,'e2',0,{weight:200,reps:12},new Date(prior.getTime()+2000));
 const r=completeFromPrevious(s,'e1',0,now);assert.equal(r.weight,110);assert.equal(r.reps,6);assert.ok(s.timers.e1);assert.ok(s.pinned.includes('e1'));
 assert.throws(()=>completeFromPrevious(s,'e1',0,now),/already complete/);
 unlogSet(s,'e1',0,day);assert.equal(s.drafts[`${day}|e1|0`].weight,'110');
});
test('swipe copies above, overwrites destination values, retains only destination drops',()=>{
 const s=initialState();logSet(s,'e1',0,{weight:'45x2 + 25 (hard)',reps:8,drops:[{weight:50,reps:8}]},now);
 s.drafts[`${day}|e1|1`]={weight:'999',reps:'2',drops:[{weight:'60',reps:'10'}]};
 const r=completeFromPrevious(s,'e1',1,now);assert.equal(r.weight,115);assert.equal(r.reps,8);assert.equal(r.drops[0].weight,60);
});
test('missing sources and invalid source drafts do not save a set',()=>{
 const s=initialState(),before=JSON.stringify(s);
 assert.throws(()=>completeFromPrevious(s,'e1',0,now),/No earlier session/);
 assert.throws(()=>completeFromPrevious(s,'e1',1,now),/above first/);assert.equal(JSON.stringify(s),before);
 s.drafts[`${day}|e1|0`]={weight:'100',reps:'oops'};
 assert.throws(()=>completeFromPrevious(s,'e1',1,now));assert.equal(s.history.length,0);
});
test('historical load converts units and textual loads remain usable',()=>{
 const s=initialState();logSet(s,'e1',0,{weight:100,reps:8},prior);changeUnits(s,'kg');
 assert.equal(completeFromPrevious(s,'e1',0,now).weight,45.36);
 const t=initialState();logSet(t,'e1',0,{weight:'bodyweight',reps:12},prior);
 const r=completeFromPrevious(t,'e1',0,now);assert.equal(r.weight,null);assert.equal(r.weightNote,'bodyweight');
});
