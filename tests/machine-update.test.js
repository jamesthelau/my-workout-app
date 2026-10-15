import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,migrateState,logSet,exerciseById,copy,renameExercise} from '../app.js';
test('machine update moves dips, archives wrist extensions and preserves history and later edits',()=>{
 const old=initialState();old.revision=4;const dips=exerciseById(old,'e16');dips.name='Dips';dips.group='front-delts';exerciseById(old,'e8').name='Seated Dumbbell Shoulder Press';exerciseById(old,'e30').archived=false;
 old.folders[0].exerciseIds.push('e30');old.pinned=['e30','e16'];
 for(const eid of ['e8','e16','e30'])logSet(old,eid,0,{weight:40,reps:8},new Date(),`old-${eid}`);
 renameExercise(old,'e19','My Hack Squat');const history=copy(old.history);const next=migrateState(old);
 assert.deepEqual(next.history,history);assert.equal(exerciseById(next,'e16').group,'chest');assert.equal(exerciseById(next,'e16').name,'Machine Dips');assert.equal(exerciseById(next,'e8').name,'Machine Shoulder Press');assert.ok(exerciseById(next,'e30').archived);
 assert.deepEqual(next.pinned,['e16']);assert.ok(!next.timers.e30);assert.ok(!next.folders[0].exerciseIds.includes('e30'));assert.equal(exerciseById(next,'e19').name,'My Hack Squat');
 renameExercise(next,'e16','My Machine Dips');assert.deepEqual(migrateState(next),next);
 assert.equal(initialState().exercises.filter(e=>!e.archived).length,30);
});
