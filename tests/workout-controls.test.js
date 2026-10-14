import test from 'node:test';
import assert from 'node:assert/strict';
import {GROUPS,initialState,copy,migrateState,validateState,exerciseById,logSet,fatigue,completion,readinessStatus,resetDailyFatigue,resetCooldowns,endWorkout,startWorkout,workoutMillis,addAlternate} from '../app.js';
process.env.TZ='America/Los_Angeles';
const now=new Date('2026-10-14T10:00:00-07:00'),day='2026-10-14';
let n=0;
const log=(s,eid,i=0)=>logSet(s,eid,i,{weight:50,reps:10},now,`control-${++n}`);
const finish=(s,eid)=>{for(let i=0;i<exerciseById(s,eid).sets;i++)log(s,eid,i);};

test('merged accordions and Bulgarian split squat preserve original exercise IDs',()=>{
  const s=initialState();
  assert.equal(GROUPS.length,14);
  for(const eid of ['e1','e2','e3'])assert.equal(exerciseById(s,eid).group,'chest');
  for(const eid of ['e26','e27'])assert.equal(exerciseById(s,eid).group,'core');
  for(const eid of ['e23','e24','e25'])assert.equal(exerciseById(s,eid).group,'misc-legs');
  const split=exerciseById(s,'e28');assert.equal(split.group,'glutes');assert.equal(split.name,'Bulgarian Split Squat');
  assert.equal(split.sets,3);assert.equal(split.targetCooldown,3);assert.equal(split.tier,1);
});
test('daily fatigue reset zeros score without changing history, pips or readiness',()=>{
  const s=initialState();finish(s,'e1');finish(s,'e3');log(s,'e2',0);
  const before=copy(s),ready=readinessStatus(s,'e1',day);
  assert.deepEqual(fatigue(s,day),{score:4,count:2});resetDailyFatigue(s,day);
  assert.deepEqual(fatigue(s,day),{score:0,count:0});assert.deepEqual(s.history,before.history);
  assert.equal(completion(s,'e1',day).complete,true);assert.deepEqual(readinessStatus(s,'e1',day),ready);
  log(s,'e2',1);log(s,'e2',2);assert.deepEqual(fatigue(s,day),{score:2,count:1});
  resetDailyFatigue(s,day);assert.deepEqual(fatigue(s,day),{score:0,count:0});validateState(s);
});
test('fatigue reset applies only to its date and is independent from cooldown reset',()=>{
  const s=initialState();finish(s,'e1');resetDailyFatigue(s,day);
  assert.equal(readinessStatus(s,'e1',day).ready,false);resetCooldowns(s);
  assert.equal(readinessStatus(s,'e1',day).ready,true);assert.equal(fatigue(s,day).score,0);
  for(let i=0;i<3;i++)logSet(s,'e1',i,{weight:50,reps:10},new Date('2026-10-15T10:00:00-07:00'),`tomorrow-${i}`);
  assert.equal(fatigue(s,'2026-10-15').score,3);
});
test('ending saves final duration, stops timers and pins, preserves logs and fatigue',()=>{
  const s=initialState();finish(s,'e1');s.pinned=['e1'];const records=copy(s.history);
  const endTime=now.getTime()+100000;endWorkout(s,endTime);
  assert.equal(s.clock.ended,true);assert.equal(s.clock.startedAt,null);assert.equal(s.clock.elapsed,100000);
  assert.equal(workoutMillis(s,endTime+60000),100000);assert.deepEqual(s.timers,{});assert.deepEqual(s.pinned,[]);
  assert.deepEqual(s.history,records);assert.equal(fatigue(s,day).score,3);assert.equal(readinessStatus(s,'e1',day).ready,false);
  validateState(JSON.parse(JSON.stringify(s)));
});
test('new workout starts from zero after ending, by button or first new set',()=>{
  const s=initialState();log(s,'e1');endWorkout(s,now.getTime()+1000);
  startWorkout(s,now.getTime()+5000);assert.equal(s.clock.elapsed,0);assert.equal(s.clock.ended,false);
  endWorkout(s,now.getTime()+6000);log(s,'e2');assert.equal(s.clock.elapsed,0);assert.equal(s.clock.ended,false);
  assert.equal(s.history.length,2);
});
test('2.1 migration regroups existing records and alternates without losing linked data',()=>{
  const old=initialState();old.exercises=old.exercises.filter(e=>e.id!=='e28');delete old.fatigueResets;delete old.clock.ended;
  const oldGroups={e1:'upper-chest',e2:'upper-chest',e3:'mid-chest',e23:'glutes',e24:'adductors',e25:'calves',e26:'core-flexion',e27:'core-stability'};
  for(const [eid,group] of Object.entries(oldGroups))exerciseById(old,eid).group=group;
  addAlternate(old,'e23','Machine Hip Thrust',{},'thrust-alternate');
  exerciseById(old,'e23').seat='Chair 4';log(old,'e23');old.folders[0].exerciseIds.push('thrust-alternate');
  const before=copy(old),next=migrateState(old);
  assert.equal(next.exercises.length,29);assert.equal(exerciseById(next,'thrust-alternate').group,'misc-legs');
  assert.equal(exerciseById(next,'e23').seat,'Chair 4');assert.deepEqual(next.history,before.history);
  assert.deepEqual(next.folders,before.folders);assert.deepEqual(next.timers,before.timers);
  assert.deepEqual(next.fatigueResets,{});assert.equal(next.clock.ended,false);
  assert.deepEqual(old,before);assert.deepEqual(migrateState(next),next);validateState(next);
});
test('invalid fatigue reset references and workout-ended flags are rejected',()=>{
  for(const change of [s=>{s.fatigueResets[day]=['missing'];},s=>{s.fatigueResets[day]=['e1','e1'];},s=>{s.fatigueResets['wrong']=[];},s=>{s.clock.ended='yes';}]){
    const s=initialState();change(s);assert.throws(()=>validateState(s));
  }
});
