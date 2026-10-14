import test from 'node:test';
import assert from 'node:assert/strict';
import {SEED,initialState,copy,migrateState,validateState,readinessStatus,logSet,resetCooldowns,addAlternate,fatigue} from '../app.js';
process.env.TZ='America/Los_Angeles';
const at=new Date('2026-10-12T20:00:00-07:00');
test('all 27 target cooldowns exactly match the requested asymmetric matrix',()=>{
  assert.deepEqual(SEED.slice(0,27).map(e=>e.targetCooldown),[3,7,7,7,7,7,7,7,3,3,3,7,7,3,3,7,7,3,3,3,7,7,7,7,3,3,7]);
});
test('three-day target becomes Ready at its third local midnight',()=>{
  const s=initialState();logSet(s,'e1',0,{weight:100,reps:8},at,'three-day');
  assert.equal(readinessStatus(s,'e1','2026-10-12').remaining,3);
  assert.equal(readinessStatus(s,'e1','2026-10-13').remaining,2);
  assert.equal(readinessStatus(s,'e1','2026-10-14').ready,false);
  assert.equal(readinessStatus(s,'e1','2026-10-15').ready,true);
  assert.equal(readinessStatus(s,'e1','2026-10-20').remaining,0);
});
test('seven-day targets and rotation partners stay independent',()=>{
  const s=initialState();logSet(s,'e2',0,{weight:30,reps:10},at,'seven-day');
  assert.equal(readinessStatus(s,'e2','2026-10-18').remaining,1);
  assert.equal(readinessStatus(s,'e2','2026-10-19').ready,true);
  assert.equal(readinessStatus(s,'e3','2026-10-12').ready,true);
  logSet(s,'e21',0,{weight:150,reps:8},at,'hinge');
  assert.equal(readinessStatus(s,'e21','2026-10-15').remaining,4);
  assert.equal(readinessStatus(s,'e22','2026-10-15').ready,true);
});
test('never-trained and reset exercises are Ready without changing today’s points',()=>{
  const s=initialState();assert.equal(readinessStatus(s,'e1','2026-10-12').ready,true);
  for(let i=0;i<3;i++)logSet(s,'e1',i,{weight:100,reps:8},at,`set-${i}`);
  const records=copy(s.history);assert.equal(fatigue(s,'2026-10-12').score,3);
  resetCooldowns(s);assert.equal(readinessStatus(s,'e1','2026-10-12').ready,true);
  assert.equal(fatigue(s,'2026-10-12').score,3);assert.deepEqual(s.history,records);
});
test('old V2 migration adds seed and inherited alternate cooldowns without changing any existing data',()=>{
  const old=initialState();delete old.revision;delete old.groups;delete old.hiddenGroups;addAlternate(old,'e22','Lying Leg Curl',{},'lying');
  old.exercises[0].seat='Chair 2';old.pinned=['e1'];
  logSet(old,'e1',0,{weight:100,reps:8,partial:true},at,'historical');
  old.drafts['2026-10-12|e2|0']={weight:'30',reps:'10',partial:false};
  for(const e of old.exercises)delete e.targetCooldown;
  const original=copy(old),next=migrateState(old);
  assert.equal(next.exercises.find(e=>e.id==='lying').targetCooldown,7);
  assert.deepEqual(next.exercises.slice(0,27).map(e=>e.targetCooldown),SEED.slice(0,27).map(e=>e.targetCooldown));
  const withoutNewFields=copy(next);delete withoutNewFields.revision;delete withoutNewFields.groups;delete withoutNewFields.hiddenGroups;for(const e of withoutNewFields.exercises)delete e.targetCooldown;
  assert.deepEqual(withoutNewFields,original);assert.deepEqual(old,original);
  assert.deepEqual(migrateState(next),next);validateState(next);
});
test('new alternates inherit the parent target but have independent readiness',()=>{
  const s=initialState();logSet(s,'e22',0,{weight:50,reps:12},at,'parent');
  const alternate=addAlternate(s,'e22','Lying Curl',{},'lying-curl');
  assert.equal(alternate.targetCooldown,7);
  assert.equal(readinessStatus(s,'lying-curl','2026-10-13').ready,true);
  assert.equal(readinessStatus(s,'e22','2026-10-13').remaining,6);
});
test('migration rejects invalid cooldowns or corrupted history before changing data',()=>{
  for(const value of [0,-1,1.5,'7',null,366]){
    const s=initialState();s.exercises[0].targetCooldown=value;assert.throws(()=>migrateState(s));
  }
  const old=initialState();old.exercises.forEach(e=>delete e.targetCooldown);old.history=[{exerciseId:'missing'}];
  assert.throws(()=>migrateState(old));
});
test('three-day cooldown remains calendar-based through DST, not 72 elapsed hours',()=>{
  const s=initialState();logSet(s,'e1',0,{weight:100,reps:8},new Date('2026-03-07T23:00:00-08:00'),'dst');
  assert.equal(readinessStatus(s,'e1','2026-03-09').remaining,1);
  assert.equal(readinessStatus(s,'e1','2026-03-10').ready,true);
});
