import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,addAlternate,selectVariation,visibleSlots,slotCompletion,urgency,fatigue,fatigueGoal,folderUrgency,completeWithHistory,unlogSet,previousSet,exerciseById,graphSeries,migrateState,resetDailyFatigue,validateState,editExercise} from '../app.js';
process.env.TZ='America/Los_Angeles';
let n=0;
const day='2026-10-20';
function log(s,eid,i=0,date=day,weight='45x2, 25 (Felt heavy)'){return completeWithHistory(s,eid,i,{weight,reps:10},new Date(`${date}T12:00:00-07:00`),`slot-${++n}`);}
function finish(s,eid,date=day){for(let i=0;i<exerciseById(s,eid).sets;i++)log(s,eid,i,date);}
test('variation logs toggle the root complementary pair and reset both after six quiet midnights',()=>{
 const s=initialState();addAlternate(s,'e1','Alternate press',{},'alt');
 log(s,'alt');for(const id of ['e1','alt'])assert.equal(urgency(s,id,day).level,'cold');
 log(s,'e16',0,'2026-10-23');assert.equal(urgency(s,'alt','2026-10-23').level,'recovering');
 assert.equal(urgency(s,'e16','2026-10-28').level,'cold');
 for(const id of ['e1','alt','e16'])assert.equal(urgency(s,id,'2026-10-29').level,'due');
 unlogSet(s,'e16',0,'2026-10-23');assert.equal(urgency(s,'e1','2026-10-23').level,'cold');
});
test('one slot award, separate histories and seat notes, shared standalone cooldown and folder completion',()=>{
 const s=initialState(),goal=fatigueGoal(s);addAlternate(s,'e9','Other lateral',{},'alt');
 exerciseById(s,'alt').seat='Seat 4';exerciseById(s,'e9').seat='Seat 1';
 finish(s,'alt');finish(s,'e11');assert.equal(folderUrgency(s,['e9','e10','e11'],day).dailyComplete,true);
 assert.equal(previousSet(s,'e9',0,'2026-10-21'),null);assert.equal(previousSet(s,'alt',0,'2026-10-21').weight,115);
 assert.deepEqual(graphSeries(s,'e9'),[]);assert.equal(graphSeries(s,'alt')[0].value,3450);
 assert.deepEqual(fatigueGoal(s),goal);assert.equal(fatigue(s,day).score,2);finish(s,'e9');assert.equal(fatigue(s,day).score,2);
 assert.deepEqual(migrateState(JSON.parse(JSON.stringify(s))),s);assert.equal(exerciseById(s,'alt').seat,'Seat 4');
 resetDailyFatigue(s,day);assert.equal(fatigue(s,day).score,0);validateState(s);
 const t=initialState();addAlternate(t,'e22','Lying curl',{},'curl');finish(t,'curl');assert.equal(urgency(t,'e22','2026-10-22').level,'cold');assert.equal(urgency(t,'e22','2026-10-23').level,'due');
});
test('switching mid-slot combines work, ends all slot timers and leaves unrelated timers running',()=>{
 const s=initialState();addAlternate(s,'e1','Other press',{},'alt');log(s,'e1');log(s,'e22');log(s,'alt');
 assert.deepEqual(slotCompletion(s,'e1',day),{done:2,target:3,complete:false});assert.ok(!s.pinned.includes('e1'));assert.ok(s.timers.alt);assert.ok(!s.timers.e1);
 log(s,'alt',1);assert.equal(slotCompletion(s,'e1',day).complete,true);assert.equal(fatigue(s,day).score,2);assert.ok(!s.timers.alt);assert.ok(s.timers.e22);assert.ok(!s.pinned.includes('alt'));
 unlogSet(s,'alt',1,day);assert.equal(fatigue(s,day).score,0);assert.equal(slotCompletion(s,'e1',day).complete,false);
});
test('home, stations and search return one selected variation per slot; restore retains selection',()=>{
 const s=initialState();addAlternate(s,'e1','Zebra press',{},'alt');selectVariation(s,'alt');
 const rows=visibleSlots(s,s.exercises);assert.equal(rows.length,32);assert.ok(rows.some(e=>e.id==='alt'));assert.ok(!rows.some(e=>e.id==='e1'));
 assert.equal(visibleSlots(s,[exerciseById(s,'e1'),exerciseById(s,'alt')]).length,1);
 assert.equal(visibleSlots(s,s.exercises,'zebra')[0].id,'alt');assert.equal(visibleSlots(s,s.exercises,'convergent')[0].id,'e1');
 const next=migrateState(JSON.parse(JSON.stringify(s)));assert.equal(next.selectedVariants.e1,'alt');
 exerciseById(next,'alt').archived=true;assert.equal(visibleSlots(next,[exerciseById(next,'e1')])[0].id,'e1');
});
test('editing a variation keeps its slot relationship and edits shared planning on the root',()=>{
 const s=initialState();addAlternate(s,'e1','Other press',{},'alt');const a=exerciseById(s,'alt');
 editExercise(s,'alt',{...a,restMin:90,restMax:120,group:'mid-back',tier:3,restCycle:3,seat:'Seat 2'},day);
 assert.equal(exerciseById(s,'alt').parent,'e1');assert.equal(exerciseById(s,'e1').group,'mid-back');assert.equal(exerciseById(s,'e1').tier,3);assert.equal(exerciseById(s,'e1').restCycle,3);assert.equal(exerciseById(s,'e1').seat,'');validateState(s);
});
