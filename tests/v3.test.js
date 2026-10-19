import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,copy,exerciseById,logSet,completeWithHistory,activeIds,urgency,folderUrgency,fatigueGoal,archiveExercise,addAlternate,migrateState,validateState,vibrationPattern} from '../app.js';
const at=new Date('2026-10-01T12:00:00');
test('explicit cycles produce 38 + 16 weekly points and a 14-point goal',()=>{
 const s=initialState();assert.deepEqual(s.exercises.filter(e=>!e.archived&&e.restCycle===3).map(e=>e.id),['e11','e15','e20','e22','e24','e32','e25','e30']);assert.deepEqual(fatigueGoal(s),{weekly7:38,weekly3:16,weekly:54,daily:14});
 addAlternate(s,'e1','Alternate Press',{},'other-press');assert.equal(fatigueGoal(s).weekly,54);archiveExercise(s,'e1');assert.equal(fatigueGoal(s).weekly,52);
});
test('zero typing adopts prior values, converts units, preserves typed zero and refuses missing baseline',()=>{
 const s=initialState();logSet(s,'e1',0,{weight:100,reps:8,partial:true},at,'prior');s.settings.unit='kg';
 const next=new Date('2026-10-08T12:00:00');const a=completeWithHistory(s,'e1',0,{weight:'',reps:'',partial:false},next,'new');assert.equal(a.weight,45.36);assert.equal(a.reps,8);assert.equal(a.partial,false);assert.deepEqual(s.pinned,['e1']);
 const b=completeWithHistory(s,'e1',1,{weight:'0',reps:'10'},next,'typed');assert.equal(b.weight,0);assert.equal(b.reps,10);
 const before=copy(s);assert.throws(()=>completeWithHistory(s,'e2',0,{weight:'',reps:''},next,'missing'));assert.deepEqual(s,before);
});
test('a fourth auto-pin rotates oldest pin without losing any independent timer',()=>{
 const s=initialState();for(const eid of ['e1','e2','e3','e4'])completeWithHistory(s,eid,0,{weight:25,reps:8},at,eid);
 assert.deepEqual(s.pinned,['e2','e3','e4']);assert.equal(activeIds(s).length,4);assert.equal(Object.keys(s.timers).length,4);validateState(s);
});
test('exercise heat honors explicit 3-day and 7-day cycles',()=>{
 const s=initialState();for(const eid of ['e1','e20'])logSet(s,eid,0,{weight:25,reps:8},at,eid);
 assert.equal(urgency(s,'e1','2026-10-04').level,'cold');assert.equal(urgency(s,'e20','2026-10-04').level,'due');assert.equal(urgency(s,'e1','2026-10-08').level,'due');assert.equal(urgency(s,'e1','2026-10-12').level,'due');assert.equal(urgency(s,'e2','2026-10-12').level,'due');
});
test('complementary parents show the due counterpart; unrelated due muscles still signal',()=>{
 const s=initialState();logSet(s,'e12',0,{weight:25,reps:8},at,'incline');logSet(s,'e13',0,{weight:25,reps:8},new Date('2026-10-12T12:00:00'),'preacher');
 assert.equal(urgency(s,'e12','2026-10-12').level,'due');assert.equal(folderUrgency(s,['e12','e13','e14'],'2026-10-12').level,'due');
 logSet(s,'e24',0,{weight:25,reps:8},at,'adductors');logSet(s,'e25',0,{weight:25,reps:8},new Date('2026-10-12T12:00:00'),'calves');assert.equal(folderUrgency(s,['e24','e25'],'2026-10-12').level,'due');
});

test('haptic control uses bounded durations with an actual zero/off state',()=>{
 assert.equal(vibrationPattern(0),0);assert.ok(vibrationPattern(.2)<vibrationPattern(1));assert.deepEqual(vibrationPattern(1,true),[250,90,250]);
});
