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
  assert.equal(GROUPS.length,12);
  for(const eid of ['e1','e2','e3'])assert.equal(exerciseById(s,eid).group,'chest');
  for(const eid of ['e26','e27'])assert.equal(exerciseById(s,eid).group,'core');
  assert.equal(exerciseById(s,'e23').group,'posterior-chain');assert.equal(exerciseById(s,'e24').group,'calves-adductors');assert.equal(exerciseById(s,'e25').group,'calves');
  const split=exerciseById(s,'e28');assert.equal(split.group,'quads');assert.equal(split.name,'Bulgarian Split Squat');
  assert.equal(split.sets,3);assert.equal(split.targetCooldown,7);assert.equal(split.tier,2);
});
test('daily fatigue reset zeros score without changing history, pips or readiness',()=>{
  const s=initialState();finish(s,'e1');finish(s,'e3');log(s,'e2',0);
  const before=copy(s),ready=readinessStatus(s,'e1',day);
  assert.deepEqual(fatigue(s,day),{score:3,count:2});resetDailyFatigue(s,day);
  assert.deepEqual(fatigue(s,day),{score:0,count:0});assert.deepEqual(s.history,before.history);
  assert.equal(completion(s,'e1',day).complete,true);assert.deepEqual(readinessStatus(s,'e1',day),ready);
  log(s,'e2',1);log(s,'e2',2);assert.deepEqual(fatigue(s,day),{score:1,count:1});
  resetDailyFatigue(s,day);assert.deepEqual(fatigue(s,day),{score:0,count:0});validateState(s);
});
test('fatigue reset applies only to its date and is independent from cooldown reset',()=>{
  const s=initialState();finish(s,'e1');resetDailyFatigue(s,day);
  assert.equal(readinessStatus(s,'e1',day).ready,false);resetCooldowns(s);
  assert.equal(readinessStatus(s,'e1',day).ready,true);assert.equal(fatigue(s,day).score,0);
  for(let i=0;i<3;i++)logSet(s,'e1',i,{weight:50,reps:10},new Date('2026-10-15T10:00:00-07:00'),`tomorrow-${i}`);
  assert.equal(fatigue(s,'2026-10-15').score,2);
});
test('ending saves final duration, stops timers and pins, preserves logs and fatigue',()=>{
  const s=initialState();finish(s,'e1');s.pinned=['e1'];const records=copy(s.history);
  const endTime=now.getTime()+100000;endWorkout(s,endTime);
  assert.equal(s.clock.ended,true);assert.equal(s.clock.startedAt,null);assert.equal(s.clock.elapsed,100000);
  assert.equal(workoutMillis(s,endTime+60000),100000);assert.deepEqual(s.timers,{});assert.deepEqual(s.pinned,[]);
  assert.deepEqual(s.history,records);assert.equal(fatigue(s,day).score,2);assert.equal(readinessStatus(s,'e1',day).ready,false);
  validateState(JSON.parse(JSON.stringify(s)));
});
test('new workout starts from zero after ending, by button or first new set',()=>{
  const s=initialState();log(s,'e1');endWorkout(s,now.getTime()+1000);
  startWorkout(s,now.getTime()+5000);assert.equal(s.clock.elapsed,0);assert.equal(s.clock.ended,false);
  endWorkout(s,now.getTime()+6000);log(s,'e2');assert.equal(s.clock.elapsed,0);assert.equal(s.clock.ended,false);
  assert.equal(s.history.length,2);
});

test('invalid fatigue reset references and workout-ended flags are rejected',()=>{
  for(const change of [s=>{s.fatigueResets[day]=['missing'];},s=>{s.fatigueResets[day]=['e1','e1'];},s=>{s.fatigueResets['wrong']=[];},s=>{s.clock.ended='yes';}]){
    const s=initialState();change(s);assert.throws(()=>validateState(s));
  }
});
