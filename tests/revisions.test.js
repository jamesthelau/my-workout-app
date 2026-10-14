import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,migrateState,logSet,exerciseById,fatigue,togglePin,copy} from '../app.js';
const at=new Date('2026-10-14T12:00:00');
test('old JM and combined wrist histories migrate independently and idempotently',()=>{
 const s=initialState();s.exercises=s.exercises.filter(e=>!['e29','e30'].includes(e.id));
 s.folders[0].exerciseIds=s.folders[0].exerciseIds.filter(id=>id!=='e30');
 exerciseById(s,'e16').name='JM Press';exerciseById(s,'e15').name='Cable Wrist Curls & Reverse';
 for(const eid of ['e15','e16'])for(let i=0;i<3;i++)logSet(s,eid,i,{weight:50,reps:10},at,`${eid}-${i}`);
 const before=fatigue(s);const next=migrateState(s);
 assert.equal(next.history.length,6);assert.equal(next.history.filter(r=>r.exerciseId==='e16').length,0);
 assert.equal(next.history.filter(r=>r.exerciseId==='legacy-e16').length,3);
 assert.equal(next.history.filter(r=>r.exerciseId==='legacy-e15').length,3);
 assert.deepEqual(fatigue(next),before);assert.equal(exerciseById(next,'e16').name,'Dips');
 assert.deepEqual(migrateState(next),next);
});
test('unpinning one exercise leaves other pins, timers and history unchanged',()=>{
 const s=initialState();for(const eid of ['e1','e2','e3']){togglePin(s,eid);logSet(s,eid,0,{weight:50,reps:10},at,eid);}
 const timers=copy(s.timers),history=copy(s.history);togglePin(s,'e2');
 assert.deepEqual(s.pinned,['e1','e3']);assert.deepEqual(s.timers,timers);assert.deepEqual(s.history,history);
});
test('both glute rotations use seven days and wrist movements have separate records',()=>{
 const s=initialState();for(const eid of ['e23','e28'])assert.equal(exerciseById(s,eid).targetCooldown,7);
 assert.equal(exerciseById(s,'e29').name,'Reverse Curl');assert.equal(exerciseById(s,'e30').name,'Cable Wrist Extension');
 logSet(s,'e15',0,{weight:20,reps:12},at,'wrist');assert.equal(s.history.filter(r=>r.exerciseId==='e30').length,0);
});
