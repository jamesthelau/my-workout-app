import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,logSet,unlogSet,copySetAbove,editDrop,writeDraft,graphSeries,validateState,migrateState,changeUnits} from '../app.js';
const now=new Date(2026,9,21,12),day='2026-10-21';
test('swipe copies the row above, protects entered values, and does not copy drops',()=>{
 const s=initialState();logSet(s,'e1',0,{weight:'45x5 (heavy)',reps:8,drops:[{weight:'100',reps:10}]},now);
 assert.equal(copySetAbove(s,'e1',0,day),false);
 assert.equal(copySetAbove(s,'e1',1,day),true);
 const draft=s.drafts[`${day}|e1|1`];assert.equal(draft.weight,'225 (heavy)');assert.equal(draft.reps,'8');assert.equal(draft.drops,undefined);
 draft.reps='9';assert.equal(copySetAbove(s,'e1',1,day),false);assert.equal(draft.reps,'9');
 assert.equal(copySetAbove(s,'e1',2,day),true);assert.equal(s.drafts[`${day}|e1|2`].reps,'9');
});
test('drops preserve numeric volume, parent set count, undo, backup and unit conversion',()=>{
 const s=initialState();const r=logSet(s,'e1',0,{weight:100,reps:8,drops:[{weight:'25x2 (slow)',reps:6},{weight:'band',reps:10},{weight:'',reps:''}]},now);
 assert.equal(r.drops.length,2);assert.equal(r.drops[0].weight,50);assert.equal(s.history.length,1);
 assert.equal(graphSeries(s,'e1')[0].value,1100);assert.equal(graphSeries(s,'e1','e1rm')[0].value,126.67);
 assert.deepEqual(migrateState(JSON.parse(JSON.stringify(s))).history,s.history);
 unlogSet(s,'e1',0,day);assert.equal(s.drafts[`${day}|e1|0`].drops[0].weight,'50 (slow)');
 changeUnits(s,'kg');assert.equal(s.drafts[`${day}|e1|0`].drops[0].weight,'22.68 (slow)');validateState(s);
});
test('drop editing removes rounds and rejects incomplete rounds before logging',()=>{
 const s=initialState();editDrop(s,'e1',0,'add',0,'','',day);
 editDrop(s,'e1',0,'edit',0,'weight','45x2',day);
 assert.throws(()=>logSet(s,'e1',0,{weight:100,reps:8,drops:s.drafts[`${day}|e1|0`].drops},now));assert.equal(s.history.length,0);
 editDrop(s,'e1',0,'edit',0,'reps','8',day);validateState(s);
 editDrop(s,'e1',0,'remove',0,'','',day);assert.equal(s.drafts[`${day}|e1|0`].drops.length,0);
 s.drafts[`${day}|e1|0`].drops=[{weight:3,reps:'8'}];assert.throws(()=>validateState(s));
});
