import test from 'node:test';
import assert from 'node:assert/strict';
import {SEED,initialState,copy,migrateState,validateState,readinessStatus,logSet,resetCooldowns,addAlternate,fatigue} from '../app.js';
process.env.TZ='America/Los_Angeles';
const at=new Date('2026-10-12T20:00:00-07:00');

test('three-day target becomes Ready at its third local midnight',()=>{
  const s=initialState();logSet(s,'e20',0,{weight:100,reps:8},at,'three-day');
  assert.equal(readinessStatus(s,'e20','2026-10-12').remaining,3);
  assert.equal(readinessStatus(s,'e20','2026-10-13').remaining,2);
  assert.equal(readinessStatus(s,'e20','2026-10-14').ready,false);
  assert.equal(readinessStatus(s,'e20','2026-10-15').ready,true);
  assert.equal(readinessStatus(s,'e20','2026-10-20').remaining,0);
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
  const s=initialState();assert.equal(readinessStatus(s,'e20','2026-10-12').ready,true);
  for(let i=0;i<3;i++)logSet(s,'e20',i,{weight:100,reps:8},at,`set-${i}`);
  const records=copy(s.history);assert.equal(fatigue(s,'2026-10-12').score,1);
  resetCooldowns(s);assert.equal(readinessStatus(s,'e20','2026-10-12').ready,true);
  assert.equal(fatigue(s,'2026-10-12').score,1);assert.deepEqual(s.history,records);
});

test('new alternates inherit the parent target but have independent readiness',()=>{
  const s=initialState();logSet(s,'e22',0,{weight:50,reps:12},at,'parent');
  const alternate=addAlternate(s,'e22','Lying Curl',{},'lying-curl');
  assert.equal(alternate.targetCooldown,3);
  assert.equal(readinessStatus(s,'lying-curl','2026-10-13').ready,true);
  assert.equal(readinessStatus(s,'e22','2026-10-13').remaining,2);
});
test('migration rejects invalid cooldowns or corrupted history before changing data',()=>{
  for(const value of [0,-1,1.5,'7',null,366]){
    const s=initialState();s.exercises[0].targetCooldown=value;assert.throws(()=>migrateState(s));
  }
  const old=initialState();old.exercises.forEach(e=>delete e.targetCooldown);old.history=[{exerciseId:'missing'}];
  assert.throws(()=>migrateState(old));
});
test('three-day cooldown remains calendar-based through DST, not 72 elapsed hours',()=>{
  const s=initialState();logSet(s,'e20',0,{weight:100,reps:8},new Date('2026-03-07T23:00:00-08:00'),'dst');
  assert.equal(readinessStatus(s,'e20','2026-03-09').remaining,1);
  assert.equal(readinessStatus(s,'e20','2026-03-10').ready,true);
});
