import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,exerciseById,groupReadiness,readiness,logSet,migrateState,copy,renameExercise,renameGroup,archiveExercise,archiveGroup,moveExercise,createExercise,validateState,resetCooldowns,fatigue} from '../app.js';
process.env.TZ='America/Los_Angeles';

test('folder uses latest hit and three midnights while movements retain independent dates',()=>{
 const s=initialState();logSet(s,'e28',0,{weight:20,reps:10},new Date('2026-10-08T20:00:00-07:00'),'b');logSet(s,'e19',0,{weight:100,reps:8},new Date('2026-10-12T20:00:00-07:00'),'h');
 assert.equal(groupReadiness(s,'quads','2026-10-14').remaining,1);assert.equal(groupReadiness(s,'quads','2026-10-15').ready,true);
 assert.equal(readiness(s,'e28','2026-10-15').days,7);assert.equal(readiness(s,'e19','2026-10-15').days,3);
 // A recovering folder never prevents another set.
 logSet(s,'e19',1,{weight:100,reps:8},new Date('2026-10-12T21:00:00-07:00'),'h2');resetCooldowns(s);assert.equal(groupReadiness(s,'quads').ready,true);assert.equal(s.history.length,3);
});
test('rename, move, add and delete survive migration and backup without changing history',()=>{
 const s=initialState();for(let i=0;i<3;i++)logSet(s,'e19',i,{weight:100,reps:8},new Date(),`log-${i}`);
 const history=copy(s.history),score=fatigue(s);renameExercise(s,'e19','My Hack Squat');renameGroup(s,'quads','Quad Work');
 createExercise(s,'quads','Leg Press',{tier:2,sets:3,reps:'8–12',rest:180},'custom-leg');moveExercise(s,'custom-leg','posterior-chain');
 archiveExercise(s,'e19');let next=migrateState(JSON.parse(JSON.stringify(s)));assert.equal(exerciseById(next,'e19').name,'My Hack Squat');assert.equal(exerciseById(next,'e19').archived,true);assert.deepEqual(next.history,history);assert.deepEqual(fatigue(next),score);
 assert.equal(next.groups.find(g=>g[0]==='quads')[1],'Quad Work');archiveGroup(next,'posterior-chain');next=migrateState(next);assert.ok(next.hiddenGroups.includes('posterior-chain'));assert.ok(exerciseById(next,'e31').archived);moveExercise(next,'e31','quads');assert.equal(exerciseById(next,'e31').archived,false);validateState(next);
});
