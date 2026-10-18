import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {initialState,migrateState,exerciseById,logSet,targetSets,fatigue,copy,setRir,addAlternate,validateState,localDay} from '../app.js';
test('all 31 prescriptions exactly match the finalized markdown including RIR',()=>{
 const s=initialState();let group='';const rows=readFileSync(new URL('../EXERCISES.md',import.meta.url),'utf8').trim().split('\n').slice(2);assert.equal(rows.length,31);
 for(const row of rows){const cells=row.split('|').slice(1,-1).map(x=>x.trim());group=cells[0]||group;const e=s.exercises.find(e=>e.name===cells[1]&&!e.archived);assert.ok(e,cells[1]);assert.equal(s.groups.find(g=>g[0]===e.group)[1],group);assert.equal(`${e.sets} × ${e.reps}`,cells[2]);assert.equal(`${e.rir} RIR`,cells[3]);assert.equal(`T${e.tier} / ${4-e.tier}`,cells[5]);const rest=cells[4].replace(/ (min|sec)$/,'').split('–').map(Number).map(n=>cells[4].endsWith('min')?n*60:n);assert.deepEqual(e.rest,rest.length===1?[rest[0],rest[0]]:rest);}
});
test('migration preserves existing third reverse-curl sets and drafts; new sessions use two',()=>{
 const s=initialState();s.revision=5;for(const e of s.exercises)delete e.rir;exerciseById(s,'e29').sets=3;exerciseById(s,'e16').tier=1;exerciseById(s,'e16').reps='6–10';
 const now=new Date('2026-10-14T12:00:00'),day=localDay(now);for(let i=0;i<3;i++)logSet(s,'e29',i,{weight:20,reps:12},now,`reverse-${i}`);
 delete s.plans[`${day}|e29`];s.drafts['2026-10-15|e29|2']={weight:'20',reps:'12',partial:false};const history=copy(s.history),drafts=copy(s.drafts);const n=migrateState(s);
 assert.deepEqual(n.history,history);assert.deepEqual(n.drafts,drafts);assert.equal(targetSets(n,'e29',day),3);assert.equal(targetSets(n,'e29','2026-10-15'),3);assert.equal(targetSets(n,'e29','2026-10-16'),2);assert.equal(fatigue(n,day).score,1);assert.equal(exerciseById(n,'e16').tier,2);assert.equal(exerciseById(n,'e16').rir,'1');assert.deepEqual(migrateState(n),n);
});
test('RIR edits and alternate inheritance survive reload with validation',()=>{
 const s=initialState();setRir(s,'e1','2-3');const alt=addAlternate(s,'e1','Alternate Press',{},'rir-alt');assert.equal(alt.rir,'2–3');assert.deepEqual(migrateState(s),s);assert.throws(()=>setRir(s,'e1','3–1'));assert.throws(()=>setRir(s,'e1','11'));setRir(s,'e1','');validateState(s);const bad=copy(s);exerciseById(bad,'e1').rir='<img>';assert.throws(()=>migrateState(bad));
});
