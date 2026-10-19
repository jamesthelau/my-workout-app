import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,editExercise,exerciseById,logSet,writeDraft,copy,migrateState,fatigueGoal,targetSets} from '../app.js';
const day='2026-10-18';
const values={name:'My Press',sets:4,reps:'10-15',tier:3,rir:'0–1',restMin:90,restMax:150,restCycle:3,group:'chest',seat:'Seat 4'};
test('all exercise fields persist and update goal and subsequent rest timers',()=>{
 const s=initialState();logSet(s,'e1',0,{weight:50,reps:8},new Date('2026-10-18T12:00:00'),'a');s.rest.e1=300;const timer=copy(s.timers.e1),history=copy(s.history);
 editExercise(s,'e1',values,day);const e=exerciseById(s,'e1');assert.equal(e.name,'My Press');assert.equal(e.sets,4);assert.equal(e.reps,'10–15');assert.equal(e.tier,3);assert.equal(e.rir,'0–1');assert.deepEqual(e.rest,[90,150]);assert.equal(e.restCycle,3);assert.equal(e.seat,'Seat 4');assert.equal(s.rest.e1,undefined);assert.deepEqual(s.timers.e1,timer);assert.deepEqual(s.history,history);
 assert.deepEqual(fatigueGoal(s),{weekly7:36,weekly3:18,weekly:54,daily:14});assert.deepEqual(migrateState(JSON.parse(JSON.stringify(s))),s);
 logSet(s,'e1',1,{weight:50,reps:12},new Date('2026-10-18T12:05:00'),'b');assert.equal(s.timers.e1.duration,120);
});
test('set edits preserve previous session targets and reject hidden records or drafts atomically',()=>{
 const s=initialState();logSet(s,'e1',2,{weight:50,reps:8},new Date('2026-10-17T12:00:00'),'past');delete s.plans['2026-10-17|e1'];editExercise(s,'e1',values,day);assert.equal(targetSets(s,'e1','2026-10-17'),3);assert.equal(targetSets(s,'e1',day),4);
 logSet(s,'e1',2,{weight:50,reps:8},new Date('2026-10-18T12:00:00'),'today');let before=copy(s);assert.throws(()=>editExercise(s,'e1',{...values,sets:2},day));assert.deepEqual(s,before);
 writeDraft(s,'e1',3,'weight','45x2',day);before=copy(s);assert.throws(()=>editExercise(s,'e1',{...values,sets:3},day));assert.deepEqual(s,before);
});
test('invalid fields are rejected together without partial edits',()=>{
 for(const patch of [{sets:0},{tier:4},{restMin:151},{restMax:901},{reps:'15–8'},{reps:'abc'},{rir:'11'},{restCycle:5},{group:'missing'}]){
  const s=initialState(),before=copy(s);assert.throws(()=>editExercise(s,'e1',{...values,...patch},day));assert.deepEqual(s,before);
 }
});
