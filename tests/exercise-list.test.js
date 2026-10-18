import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {initialState,migrateState,validateState,exerciseById,logSet,copy,previousSet,writeDraft,addAlternate,fatigueGoal,targetSets,localDay,GROUPS} from '../app.js';
const oldState=()=>JSON.parse(readFileSync(new URL('./fixtures/v7.json',import.meta.url),'utf8'));
const at=new Date('2026-10-17T12:00:00'), day=localDay(at);
test('revision 8 upgrades real revision 7 data without mixing replacement baselines',()=>{
 const s=oldState();s.settings.volume=.23;s.settings.unit='kg';s.clock.elapsed=1234;
 for(const eid of ['e1','e16','e5','e6','e9','e10','e25','e27','e20'])logSet(s,eid,0,{weight:50,reps:8},at,`old-${eid}`);
 s.pinned=['e1','e20'];s.rest.e1=200;writeDraft(s,'e1',1,'weight','45x2',day);addAlternate(s,'e1','Custom press',{},'custom');
 const before=copy(s),n=migrateState(s);
 assert.deepEqual(s,before);assert.equal(n.revision,8);assert.equal(n.history.length,before.history.length);
 for(const eid of ['e1','e16','e5','e6','e9','e10','e25','e27']){
  const archived=exerciseById(n,`v7-${eid}`);assert.ok(archived.archived);assert.equal(archived.name,exerciseById(before,eid).name);
  assert.deepEqual(n.history.find(r=>r.exerciseId===archived.id),{...before.history.find(r=>r.exerciseId===eid),exerciseId:archived.id});
  assert.equal(previousSet(n,eid,0,'2026-10-18'),null);assert.ok(!n.timers[eid]);
 }
 assert.deepEqual(n.drafts[`${day}|v7-e1|1`],before.drafts[`${day}|e1|1`]);assert.equal(exerciseById(n,'custom').parent,'v7-e1');
 assert.deepEqual(n.settings,before.settings);assert.deepEqual(n.clock,before.clock);assert.deepEqual(n.timers.e20,before.timers.e20);assert.deepEqual(n.pinned,['e20']);assert.deepEqual(n.folders,before.folders);
 assert.deepEqual(fatigueGoal(n),{weekly7:38,weekly3:14,weekly:52,daily:13});validateState(n);assert.deepEqual(migrateState(n),n);
 exerciseById(n,'e1').name='My chest press';assert.deepEqual(migrateState(n),n);
});
test('existing two-set pec deck session stays complete while future sessions use three sets',()=>{
 const s=oldState();for(let i=0;i<2;i++)logSet(s,'e3',i,{weight:50,reps:12},at,`pec-${i}`);
 delete s.plans[`${day}|e3`];const n=migrateState(s);assert.equal(targetSets(n,'e3',day),2);assert.equal(targetSets(n,'e3','2026-10-18'),3);assert.deepEqual(n.history,s.history);
});
test('older supported revisions upgrade through the same matrix and validate',()=>{
 for(const rev of [4,5,6]){const s=oldState();s.revision=rev;const n=migrateState(s);validateState(n);assert.equal(n.revision,8);assert.equal(n.exercises.filter(e=>!e.archived).length,31);assert.equal(fatigueGoal(n).daily,13);}
});
test('31 active exercises retain three lower folders and merged delts with independent muscle tags',()=>{
 const s=initialState();assert.equal(s.exercises.filter(e=>!e.archived).length,31);
 assert.deepEqual(GROUPS.filter(g=>g[2]==='lower').map(g=>g[1]),['Quads','Posterior Chain','Calves & Adductors']);
 assert.equal(s.exercises.filter(e=>!e.archived&&['quads','posterior-chain','calves-adductors'].includes(e.group)).length,10);
 assert.equal(exerciseById(s,'e11').group,'side-delts');assert.deepEqual(exerciseById(s,'e11').muscles,['rear-delts']);assert.deepEqual(exerciseById(s,'e32').muscles,['hip-abductors']);
 assert.equal(exerciseById(s,'e26').restCycle,7);assert.equal(exerciseById(s,'e27').restCycle,7);
});
