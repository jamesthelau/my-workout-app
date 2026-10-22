import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,copy,migrateState,validateState,exerciseById,logSet,unlogSet,completeWithHistory,copyPrevious,changeUnits,writeDraft,graphSeries,parseWeightEntry,parseWeight,weightText,urgency,folderUrgency,resetCooldowns,addAlternate} from '../app.js';
process.env.TZ='America/Los_Angeles';
let serial=0;
const at='2026-10-20T12:00:00-07:00',day='2026-10-20';
const log=(s,eid,index=0,when=at,weight=45)=>logSet(s,eid,index,{weight,reps:10},new Date(when),`v5-${++serial}`);
const finish=(s,eid,when=at)=>{for(let i=0;i<exerciseById(s,eid).sets;i++)log(s,eid,i,when);};
const level=(s,eid,d=day)=>urgency(s,eid,d).level;
const delts=['e9','e10','e11'];

test('plate math and flat weights accept trailing notes without including note numbers in the total',()=>{
 for(const [text,total,note] of [
  ['45x5, 25x2 (Felt heavy)',275,'(Felt heavy)'],['45 * 2, 25 Felt heavy on set 3',115,'Felt heavy on set 3'],
  ['45 lbs',45,'lbs'],['45, felt heavy',45,'felt heavy'],['45 - felt heavy',45,'- felt heavy'],['0 assisted',0,'assisted'],['2.5x2, .25 (seat 4)',5.25,'(seat 4)'],['45 extra slow',45,'extra slow'],['45 xtra effort',45,'xtra effort']
 ])assert.deepEqual(parseWeightEntry(text),{weight:total,weightNote:note});
 assert.deepEqual(parseWeightEntry('red band level 3'),{weight:null,weightNote:'red band level 3'});
 for(const text of ['45x','45,','45,,25','45x2x3','-5','10000,1 (heavy)'])assert.throws(()=>parseWeightEntry(text));
});
test('notes survive logging, history, unchecking, unit changes, explicit copy and backup; graphs stay numeric',()=>{
 const s=initialState();const r=log(s,'e1',0,at,'45x5, 25x2 (Felt heavy)');assert.equal(r.weight,275);assert.equal(r.weightNote,'(Felt heavy)');assert.equal(graphSeries(s,'e1')[0].value,2750);
 assert.deepEqual(migrateState(JSON.parse(JSON.stringify(s))),s);validateState(s);
 copyPrevious(s,'e1',0,'2026-10-21');assert.equal(s.drafts['2026-10-21|e1|0'].weight,'275 (Felt heavy)');
 changeUnits(s,'kg');assert.equal(s.drafts['2026-10-21|e1|0'].weight,'124.74 (Felt heavy)');assert.equal(r.unit,'lbs');
 unlogSet(s,'e1',0,day);assert.equal(s.drafts[`${day}|e1|0`].weight,'124.74 (Felt heavy)');
 log(s,'e1',0,at,s.drafts[`${day}|e1|0`].weight);assert.equal(s.history[0].weightNote,'(Felt heavy)');validateState(s);
});
test('text-only loads retain their labels through autofill and units and never become zero-valued graph points',()=>{
 const s=initialState();log(s,'e1',0,at,'red band');assert.equal(s.history[0].weight,null);assert.deepEqual(graphSeries(s,'e1'),[]);assert.deepEqual(graphSeries(s,'e1','e1rm'),[]);
 changeUnits(s,'kg');const next=completeWithHistory(s,'e1',0,{weight:'',reps:''},new Date('2026-10-21T12:00:00-07:00'),'text-next');assert.equal(next.weight,null);assert.equal(next.weightNote,'red band');
 copyPrevious(s,'e1',1,'2026-10-21');assert.equal(s.drafts['2026-10-21|e1|1'].weight,'red band');changeUnits(s,'lbs');assert.equal(s.drafts['2026-10-21|e1|1'].weight,'red band');
 assert.deepEqual(migrateState(JSON.parse(JSON.stringify(s))),s);validateState(s);const bad=copy(s);delete bad.history[0].weightNote;assert.throws(()=>validateState(bad));
 log(s,'e1',1,'2026-10-21T12:01:00-07:00',50);assert.deepEqual(graphSeries(s,'e1'),[{day:'2026-10-21',value:500}]);
});
test('blank numeric autofill copies the prior weight without repeating prior subjective notes',()=>{
 const s=initialState();log(s,'e1',0,at,'100 (hard today)');const r=completeWithHistory(s,'e1',0,{weight:'',reps:''},new Date('2026-10-21T12:00:00-07:00'),'numeric-next');assert.equal(r.weight,100);assert.equal(r.weightNote,undefined);
});
test('pair toggles on shifted days and only six days since its most recent activity resets both',()=>{
 for(const offset of [3,4,6]){
  const s=initialState();log(s,'e1',0,'2026-10-01T23:59:00-07:00');log(s,'e16',0,`2026-10-0${1+offset}T00:01:00-07:00`);
  assert.equal(level(s,'e1',`2026-10-0${1+offset}`),'recovering');assert.equal(level(s,'e16',`2026-10-0${1+offset}`),'cold');
 }
 const s=initialState();log(s,'e1',0,'2026-10-01T12:00:00-07:00');log(s,'e1',0,'2026-10-06T12:00:00-07:00');
 assert.equal(level(s,'e1','2026-10-11'),'cold');assert.equal(level(s,'e16','2026-10-11'),'due');
 assert.equal(level(s,'e1','2026-10-12'),'due');assert.equal(level(s,'e16','2026-10-12'),'due');
});
test('six-day inactivity fully forgets the old complex cycle when training resumes',()=>{
 const s=initialState();log(s,'e31',0,'2026-10-01T12:00:00-07:00');log(s,'e23',0,'2026-10-01T12:01:00-07:00');log(s,'e21',0,'2026-10-02T12:00:00-07:00');
 for(const eid of ['e21','e31','e23'])assert.equal(level(s,eid,'2026-10-08'),'due');
 log(s,'e31',0,'2026-10-08T12:00:00-07:00');assert.equal(level(s,'e31','2026-10-08'),'cold');assert.equal(level(s,'e23','2026-10-08'),'due');assert.equal(level(s,'e21','2026-10-08'),'due');
});
test('delts folder completes after one full lateral choice and the full due reverse pec deck',()=>{
 const s=initialState();finish(s,'e9');assert.equal(folderUrgency(s,delts,day).level,'due');
 log(s,'e11',0);log(s,'e11',1);assert.equal(folderUrgency(s,delts,day).level,'cold');log(s,'e11',2);
 assert.deepEqual(folderUrgency(s,delts,day),{ratio:0,level:'cold',dailyComplete:true});assert.equal(level(s,'e10'),'recovering');
 assert.equal(folderUrgency(s,delts,'2026-10-21').level,'cold');
 unlogSet(s,'e11',2,day);assert.equal(folderUrgency(s,delts,day).level,'cold');
});
test('recent standalone isolation is not required today; an optionally started exercise must still be finished',()=>{
 const s=initialState();finish(s,'e11','2026-10-19T12:00:00-07:00');finish(s,'e9');assert.equal(folderUrgency(s,delts,day).dailyComplete,true);
 log(s,'e11',0);assert.equal(folderUrgency(s,delts,day).level,'cold');log(s,'e11',1);log(s,'e11',2);assert.equal(folderUrgency(s,delts,day).dailyComplete,true);
 log(s,'e10',0);assert.equal(folderUrgency(s,delts,day).level,'cold');
});
test('posterior folder needs the entire two-exercise side plus the due leg curl',()=>{
 const s=initialState(),ids=['e21','e31','e23','e22'];finish(s,'e22');finish(s,'e31');assert.equal(folderUrgency(s,ids,day).level,'due');finish(s,'e23');assert.equal(folderUrgency(s,ids,day).dailyComplete,true);assert.equal(level(s,'e21'),'recovering');
 const a=initialState();finish(a,'e21');finish(a,'e22');assert.equal(folderUrgency(a,ids,day).dailyComplete,true);
});
test('custom alternates fill their workout slot, cooldown reset releases the daily completion override',()=>{
 const s=initialState();addAlternate(s,'e9','Other lateral',{},'alt-lateral');finish(s,'alt-lateral');finish(s,'e11');assert.equal(folderUrgency(s,[...delts,'alt-lateral'],day).dailyComplete,true);
 resetCooldowns(s);assert.equal(folderUrgency(s,[...delts,'alt-lateral'],day).level,'due');
});
test('revision 9 upgrade changes only schema revision, retaining edits, notes, ongoing targets and timers',()=>{
 const s=initialState();s.revision=9;log(s,'e1');writeDraft(s,'e1',1,'weight','45x2 (next set)',day);exerciseById(s,'e1').name='My press';const before=copy(s),n=migrateState(s);
 assert.deepEqual(s,before);assert.deepEqual(n,{...before,revision:10});assert.deepEqual(migrateState(n),n);
});
