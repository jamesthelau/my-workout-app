import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,migrateState,logSet,exerciseById,fatigue,togglePin,copy} from '../app.js';
const at=new Date('2026-10-14T12:00:00');

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
