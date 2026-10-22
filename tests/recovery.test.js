import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,logSet,unlogSet,urgency,folderUrgency,addAlternate,migrateState,resetCooldowns} from '../app.js';
process.env.TZ='America/Los_Angeles';
let serial=0;
const hit=(s,id,day,index=0)=>logSet(s,id,index,{weight:40,reps:8},new Date(`${day}T23:59:00`),`recovery-${++serial}`);
const level=(s,id,day)=>urgency(s,id,day).level;
test('simple pair rests at day 0/1/2 and becomes due on third local midnight across DST',()=>{
 const s=initialState();hit(s,'e1','2026-10-30');
 for(const [day,elapsed] of [['2026-10-30',0],['2026-10-31',1],['2026-11-01',2]]){
  const u=urgency(s,'e16',day);assert.equal(u.level,'recovering');assert.deepEqual(u.recovery,{days:elapsed,remaining:3-elapsed,day:'2026-10-30'});
  assert.equal(level(s,'e1',day),'cold');assert.equal(folderUrgency(s,['e1','e16'],day).level,'cold');
 }
 assert.equal(level(s,'e16','2026-11-02'),'due');assert.equal(level(s,'e1','2026-11-02'),'cold');
 assert.equal(folderUrgency(s,['e1','e16'],'2026-11-02').level,'due');
 for(const id of ['e1','e16'])assert.equal(level(s,id,'2026-11-05'),'due');
});
test('old own hit plus recent counterpart shows recovering, and additional sets restart the boundary',()=>{
 const s=initialState();hit(s,'e1','2026-10-01');hit(s,'e16','2026-10-06');
 const u=urgency(s,'e1','2026-10-07');assert.equal(u.hit.days,6);assert.equal(u.recovery.days,1);
 hit(s,'e16','2026-10-07');assert.equal(level(s,'e1','2026-10-09'),'recovering');assert.equal(level(s,'e1','2026-10-10'),'due');
 unlogSet(s,'e16',0,'2026-10-07');assert.equal(level(s,'e1','2026-10-09'),'due');
});
test('complex pair starts RDL recovery only after both members, counting from later member in either order',()=>{
 for(const [first,second] of [['e31','e23'],['e23','e31']]){
  const s=initialState();hit(s,'e21','2026-10-01');
  for(const id of [first,second])assert.equal(level(s,id,'2026-10-03'),'recovering');
  hit(s,first,'2026-10-04');assert.equal(level(s,'e21','2026-10-04'),'cold');assert.equal(level(s,second,'2026-10-04'),'due');
  hit(s,second,'2026-10-05');assert.equal(level(s,'e21','2026-10-07'),'recovering');assert.equal(level(s,'e21','2026-10-08'),'due');
  assert.equal(folderUrgency(s,['e21','e31','e23'],'2026-10-07').level,'cold');
  unlogSet(s,second,0,'2026-10-05');assert.equal(level(s,'e21','2026-10-06'),'cold');
 }
 const s=initialState();hit(s,'e31','2026-10-01');assert.equal(level(s,'e21','2026-10-01'),'due');
 hit(s,'e23','2026-10-02');assert.equal(level(s,'e21','2026-10-02'),'recovering');
});
test('variations, reload and undo share recovery; unrelated due slots still light the folder',()=>{
 const s=initialState();addAlternate(s,'e1','Other press',{},'press-alt');hit(s,'press-alt','2026-10-20');
 const n=migrateState(JSON.parse(JSON.stringify(s)));assert.equal(level(n,'e16','2026-10-21'),'recovering');
 assert.equal(folderUrgency(n,['e1','e16','e20'],'2026-10-21').level,'due');
 unlogSet(n,'press-alt',0,'2026-10-20');assert.equal(level(n,'e16','2026-10-21'),'due');
 resetCooldowns(s);assert.equal(level(s,'e16','2026-10-21'),'due');
});
