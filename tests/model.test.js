import test from 'node:test';
import assert from 'node:assert/strict';
import {SEED,GROUPS,initialState,copy,localDay,daysBetween,logSet,unlogSet,completion,fatigue,readiness,previousSession,previousSet,writeDraft,copyPrevious,draftKey,targetSets,changeTarget,addAlternate,setFolder,togglePin,resetCooldowns,changeUnits,inUnit,graphSeries,workoutMillis,pauseClock,validateState,exerciseById} from '../app.js';
process.env.TZ='America/Los_Angeles';
const monday=new Date('2026-10-12T20:00:00-07:00');
const tuesday=new Date('2026-10-13T08:00:00-07:00');
let sequence=0;
const record=(s,eid='e1',index=0,at=monday,overrides={})=>logSet(s,eid,index,{weight:'100',reps:'8',partial:false,...overrides},at,`record-${++sequence}`);
const finish=(s,eid='e1',at=monday)=>{for(let i=0;i<targetSets(s,eid,localDay(at));i++)record(s,eid,i,at);};


test('8 PM Monday to 8 AM Tuesday counts one calendar rest day, not 12 hours',()=>{
  const s=initialState();record(s);assert.equal(localDay(monday),'2026-10-12');
  assert.equal(readiness(s,'e1',localDay(tuesday)).days,1);
  assert.equal(readiness(s,'e2',localDay(tuesday)),null);
  assert.equal(readiness(s,'e1','2026-10-15').days,3);
});
test('midnight immediately changes day while seconds apart',()=>{
  const s=initialState();record(s,'e1',0,new Date('2026-10-12T23:59:59-07:00'));
  const now=new Date('2026-10-13T00:00:01-07:00');
  assert.equal(readiness(s,'e1',localDay(now)).days,1);
  assert.equal(completion(s,'e1',localDay(now)).done,0);
  assert.equal(fatigue(s,localDay(now)).score,0);
});
test('calendar arithmetic is independent of DST spring and fall hour changes',()=>{
  const springA=new Date('2026-03-07T20:00:00-08:00'),springB=new Date('2026-03-08T08:00:00-07:00');
  const fallA=new Date('2026-10-31T20:00:00-07:00'),fallB=new Date('2026-11-01T08:00:00-08:00');
  assert.equal(daysBetween(localDay(springA),localDay(springB)),1);
  assert.equal(daysBetween(localDay(fallA),localDay(fallB)),1);
  assert.equal(daysBetween('2026-12-31','2027-01-01'),1);
});
test('fatigue points only accrue at complete target, once per exercise per day',()=>{
  const s=initialState(),day=localDay(monday);record(s);record(s,'e1',1);
  assert.deepEqual(fatigue(s,day),{score:0,count:0});
  record(s,'e1',2);assert.deepEqual(fatigue(s,day),{score:2,count:1});
  assert.throws(()=>record(s,'e1',2));assert.equal(fatigue(s,day).score,2);
  finish(s,'e2');finish(s,'e3');assert.deepEqual(fatigue(s,day),{score:4,count:3});
  unlogSet(s,'e1',2,day);assert.deepEqual(fatigue(s,day),{score:2,count:2});
  validateState(s);
});
test('logging in a folder and muscle view uses same ID without duplication',()=>{
  const s=initialState();setFolder(s,'station1','Cable Corner',['e18']);
  setFolder(s,'station2','Superset Pair',['e18','e17']);
  const fromFolder=s.folders.find(f=>f.id==='station1').exerciseIds[0];finish(s,fromFolder);
  assert.equal(completion(s,'e18',localDay(monday)).done,3);
  assert.equal(fatigue(s,localDay(monday)).score,1);
  assert.equal(s.history.length,3);
  const same=s.folders.find(f=>f.id==='station2').exerciseIds[0];
  assert.equal(readiness(s,same,localDay(tuesday)).days,1);
  exerciseById(s,same).seat='Chair 2';assert.equal(exerciseById(s,fromFolder).seat,'Chair 2');
  s.folders=s.folders.filter(f=>f.id!=='station1');assert.equal(s.history.length,3);validateState(s);
});
test('alternate keeps independent records and seat but shares slot points',()=>{
  const s=initialState();exerciseById(s,'e22').seat='Chair 2';
  const alt=addAlternate(s,'e22','Lying Leg Curl',{},'lying-curl');
  assert.equal(alt.parent,'e22');assert.equal(alt.seat,'');assert.equal(alt.tier,3);
  finish(s,'e22');assert.equal(readiness(s,alt.id,localDay(tuesday)),null);
  assert.equal(previousSession(s,alt.id,localDay(tuesday)).length,0);
  finish(s,alt.id);assert.equal(fatigue(s,localDay(monday)).score,1);
  assert.equal(previousSession(s,alt.id,localDay(tuesday)).length,3);validateState(s);
});
test('reset cooldowns preserves every record, seat, partial flag, graph and today’s score',()=>{
  const s=initialState();exerciseById(s,'e1').seat='Pin 7';finish(s);
  s.history[0].partial=true;
  const before=copy(s),graph=graphSeries(s,'e1');resetCooldowns(s);
  assert.equal(readiness(s,'e1',localDay(monday)),null);
  assert.deepEqual(s.history,before.history);assert.deepEqual(s.exercises,before.exercises);
  assert.deepEqual(graphSeries(s,'e1'),graph);assert.deepEqual(fatigue(s,localDay(monday)),fatigue(before,localDay(monday)));
  record(s,'e1',0,tuesday);assert.equal(readiness(s,'e1',localDay(tuesday)).days,0);validateState(s);
});
test('cooldown reset epoch handles same-millisecond new logs without timestamp ambiguity',()=>{
  const s=initialState();record(s);resetCooldowns(s);record(s,'e1',1,monday);
  assert.equal(readiness(s,'e1',localDay(monday)).days,0);
});
test('three pinned exercises own separate timers; changing one cannot reset the others',()=>{
  const s=initialState();['e1','e2','e3'].forEach(eid=>togglePin(s,eid));
  assert.throws(()=>togglePin(s,'e4'));record(s,'e1');record(s,'e2');record(s,'e3');
  const deadline=s.timers.e2.end;s.timers.e1.end+=30000;delete s.timers.e3;
  assert.equal(s.timers.e2.end,deadline);assert.equal(Object.keys(s.timers).length,2);
  togglePin(s,'e2');assert.ok(s.timers.e2);validateState(s);
});
test('timer uses absolute deadline and midpoint durations including 90 seconds',()=>{
  const s=initialState();record(s,'e1');record(s,'e15');record(s,'e10');
  assert.equal(s.timers.e1.end-monday.getTime(),210000);
  assert.equal(s.timers.e15.duration,90);assert.equal(s.timers.e10.duration,90);
  assert.equal(Math.ceil((s.timers.e1.end-(monday.getTime()+20000))/1000),190);
});
test('previous session excludes today and copies corresponding set with unit conversion',()=>{
  const s=initialState();record(s,'e1',0,monday,{weight:100,reps:8,partial:true});record(s,'e1',1,monday,{weight:90,reps:10});
  record(s,'e1',0,tuesday,{weight:110,reps:9});
  const prev=previousSet(s,'e1',0,localDay(tuesday));assert.equal(prev.weight,100);
  assert.equal(previousSet(s,'e1',2,localDay(tuesday)).weight,90);
  changeUnits(s,'kg');copyPrevious(s,'e1',1,localDay(tuesday));
  assert.deepEqual(s.drafts[draftKey(localDay(tuesday),'e1',1)],{weight:'40.82',reps:'10',partial:false});
  assert.equal(s.history[0].partial,true);validateState(s);
});
test('unit changes preserve original history and convert editable drafts only',()=>{
  const s=initialState();record(s);writeDraft(s,'e1',1,'weight','100',localDay(monday));
  changeUnits(s,'kg');assert.equal(s.history[0].weight,100);assert.equal(s.history[0].unit,'lbs');
  assert.equal(inUnit(s.history[0],'kg'),45.36);assert.equal(s.drafts[draftKey(localDay(monday),'e1',1)].weight,'45.36');
});
test('graph daily volume and e1RM do not mix variants; partial sets excluded from e1RM',()=>{
  const s=initialState();record(s,'e1',0,monday,{weight:100,reps:10});record(s,'e1',1,monday,{weight:110,reps:8,partial:true});
  record(s,'e1',0,tuesday,{weight:120,reps:5});record(s,'e2',0,monday,{weight:300,reps:10});
  assert.deepEqual(graphSeries(s,'e1','volume'),[{day:'2026-10-12',value:1880},{day:'2026-10-13',value:600}]);
  assert.deepEqual(graphSeries(s,'e1','e1rm'),[{day:'2026-10-12',value:133.33},{day:'2026-10-13',value:140}]);
});
test('stopwatch starts on first set, survives reload and respects pause/resume',()=>{
  const s=initialState();record(s);assert.equal(s.clock.startedAt,monday.getTime());
  assert.equal(workoutMillis(s,monday.getTime()+15000),15000);pauseClock(s,monday.getTime()+15000);
  assert.equal(workoutMillis(s,monday.getTime()+30000),15000);
  record(s,'e2',0,new Date(monday.getTime()+30000));assert.equal(s.clock.startedAt,null);
  const roundtrip=validateState(JSON.parse(JSON.stringify(s)));assert.equal(roundtrip.clock.elapsed,15000);
});
test('adjusting target never silently drops logged sets; fatigue recomputes',()=>{
  const s=initialState(),day=localDay(monday);finish(s);changeTarget(s,'e1',4,day);
  assert.equal(fatigue(s,day).score,0);assert.throws(()=>changeTarget(s,'e1',2,day));
  changeTarget(s,'e1',3,day);assert.equal(fatigue(s,day).score,2);validateState(s);
});
test('invalid reps/weight cannot create records or timers; zero weight accepted',()=>{
  for(const input of [{weight:''},{weight:-1},{weight:Infinity},{weight:10001},{reps:''},{reps:0},{reps:1.5},{reps:1000}]){
    const s=initialState();assert.throws(()=>record(s,'e1',0,monday,input));assert.equal(s.history.length,0);assert.deepEqual(s.timers,{});
  }
  const s=initialState();record(s,'e27',0,monday,{weight:0,reps:15});assert.equal(s.history[0].weight,0);
});
test('unchecking reverses fatigue and current readiness, and only its own timer',()=>{
  const s=initialState(),day=localDay(monday);record(s,'e1');record(s,'e2');
  unlogSet(s,'e1',0,day);assert.equal(readiness(s,'e1',day),null);assert.ok(s.timers.e2);assert.ok(!s.timers.e1);
  assert.equal(s.drafts[draftKey(day,'e1',0)].weight,'100');validateState(s);
});
test('undo snapshots restore cooldown epoch, history, seat and timers as one state',()=>{
  const s=initialState();finish(s);exerciseById(s,'e1').seat='Chair 2';
  const before=copy(s);resetCooldowns(s);const undone=copy(before);
  assert.deepEqual(undone,before);assert.equal(readiness(undone,'e1',localDay(monday)).days,0);validateState(undone);
});
test('reject corrupt backup references, duplicate records and unsafe identifiers',()=>{
  const s=initialState();record(s);
  const corruptors=[
    v=>{v.version=1;},v=>{v.history.push(copy(v.history[0]));},v=>{v.history[0].day='2026-02-30';},
    v=>{v.history[0].exerciseId='missing';},v=>{v.history[0].epoch=9;},v=>{v.pinned=['e1','e2','e3','e4'];},
    v=>{v.folders[0].exerciseIds.push('missing');},v=>{v.exercises[0].id='__proto__';},
    v=>{v.timers.e1.recordId='missing';},v=>{v.settings.unit='stones';},v=>{v.clock.elapsed=-1;},
    v=>{v.history.push({...v.history[0],id:'different-id'});},v=>{v.history[0].index=4;},
    v=>{v.drafts['2026-10-12|e1|0']={weight:'1',reps:'1',partial:false};}
  ];
  for(const corrupt of corruptors){const bad=copy(s);corrupt(bad);assert.throws(()=>validateState(bad));}
});
test('custom names are normalized, validated, and cannot duplicate seeded movements',()=>{
  const s=initialState();assert.throws(()=>addAlternate(s,'e1',' convergent machine chest press '));
  assert.throws(()=>addAlternate(s,'e1',''));assert.throws(()=>addAlternate(s,'e1','Other',{tier:4}));
  addAlternate(s,'e22','Lying Curl',{},'lying');assert.throws(()=>addAlternate(s,'e22','LYING CURL'));
  validateState(s);
});
test('complete backup roundtrip includes folders, pins, drafts, partials, seats and clock',()=>{
  const s=initialState();record(s,'e2',0,monday,{partial:true});togglePin(s,'e2');exerciseById(s,'e2').seat='Pulley 4';
  writeDraft(s,'e2',1,'weight','25.5',localDay(monday));setFolder(s,'my-folder','My <Station>',['e2']);
  const restored=validateState(JSON.parse(JSON.stringify(s)));assert.deepEqual(restored,s);
});
