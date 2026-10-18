import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,completeWithHistory,changeTarget,copy,activeIds,fatigue,localDay,validateState} from '../app.js';
const now=new Date('2026-10-17T12:00:00');
const log=(s,eid,i)=>completeWithHistory(s,eid,i,{weight:25,reps:10},now,`${eid}-${i}`);
test('third completed set removes only its own pin and timer, retaining score and history',()=>{
 const s=initialState();log(s,'e2',0);log(s,'e1',0);log(s,'e1',1);const other=copy(s.timers.e2),before=copy(s);
 assert.ok(s.pinned.includes('e1'));assert.ok(s.timers.e1);log(s,'e1',2);assert.ok(!s.pinned.includes('e1'));assert.ok(!s.timers.e1);assert.ok(!activeIds(s).includes('e1'));assert.deepEqual(s.timers.e2,other);assert.deepEqual(s.pinned,['e2']);assert.equal(s.history.length,4);assert.equal(fatigue(s,localDay(now)).score,2);validateState(s);
 // The existing Undo snapshot contains the former pin and running deadline.
 assert.ok(before.pinned.includes('e1'));assert.ok(before.timers.e1);validateState(before);
});
test('two-set and adjusted four-set exercises stop only when all planned sets are done',()=>{
 const s=initialState();log(s,'e29',0);assert.ok(s.timers.e29);log(s,'e29',1);assert.ok(!s.timers.e29);assert.ok(!s.pinned.includes('e29'));
 changeTarget(s,'e1',4,localDay(now));for(let i=0;i<3;i++)log(s,'e1',i);assert.ok(s.timers.e1);assert.ok(s.pinned.includes('e1'));log(s,'e1',3);assert.ok(!s.timers.e1);assert.ok(!s.pinned.includes('e1'));
});
test('out-of-order checkmarks wait for the final unfinished set, not row number',()=>{
 const s=initialState();log(s,'e1',2);assert.ok(s.timers.e1);log(s,'e1',0);assert.ok(s.timers.e1);log(s,'e1',1);assert.ok(!s.timers.e1);assert.ok(!s.pinned.includes('e1'));
});
