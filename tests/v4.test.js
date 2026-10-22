import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {initialState,copy,migrateState,validateState,exerciseById,logSet,unlogSet,resetCooldowns,urgency,folderUrgency,homeGroups,COMPLEMENTARY,fatigueGoal,writeDraft,addAlternate} from '../app.js';
process.env.TZ='America/Los_Angeles';
let serial=0;
const log=(s,eid,when='2026-10-19T12:00:00-07:00',index=0)=>logSet(s,eid,index,{weight:45,reps:10},new Date(when),`v4-${++serial}`);
const level=(s,eid,day='2026-10-19')=>urgency(s,eid,day).level;

test('every mapped pair enters recovery on the first set, reverses on counterpart and survives reload',()=>{
 for(const [a,b] of COMPLEMENTARY.filter(sides=>sides[1].length===1)){
  const s=initialState();assert.equal(level(s,a[0]),'due');assert.equal(level(s,b[0]),'due');
  log(s,a[0]);assert.equal(level(s,a[0]),'cold');assert.equal(level(s,b[0]),'recovering');
  log(s,b[0],'2026-10-19T12:01:00-07:00');assert.equal(level(s,a[0]),'recovering');assert.equal(level(s,b[0]),'cold');
  const n=migrateState(JSON.parse(JSON.stringify(s)));assert.equal(level(n,a[0]),'recovering');assert.equal(level(n,b[0]),'cold');
  log(n,a[0],'2026-10-19T12:02:00-07:00',1);assert.equal(level(n,a[0]),'cold');assert.equal(level(n,b[0]),'recovering');
 }
});
test('complex pair waits for both back extension and hip thrust after latest RDL, in either order',()=>{
 for(const bundle of [['e31','e23'],['e23','e31']]){
  const s=initialState();log(s,'e31','2026-10-18T12:00:00-07:00');log(s,'e23','2026-10-18T12:01:00-07:00');log(s,'e21');
  assert.equal(level(s,'e21'),'cold');for(const eid of bundle)assert.equal(level(s,eid),'recovering');
  log(s,bundle[0],'2026-10-19T12:01:00-07:00');assert.equal(level(s,bundle[0]),'cold');assert.equal(level(s,bundle[1]),'recovering');assert.equal(level(s,'e21'),'cold');
  log(s,bundle[0],'2026-10-19T12:02:00-07:00',1);assert.equal(level(s,'e21'),'cold');
  log(s,bundle[1],'2026-10-19T12:03:00-07:00');assert.equal(level(s,'e21'),'recovering');for(const eid of bundle)assert.equal(level(s,eid),'cold');
  log(s,'e21','2026-10-19T12:04:00-07:00',1);assert.equal(level(s,'e21'),'cold');for(const eid of bundle)assert.equal(level(s,eid),'recovering');
 }
});
test('equal timestamps follow log insertion order; undone counterpart restores original cold state',()=>{
 const s=initialState();log(s,'e1');const before=copy(s);log(s,'e16');assert.equal(level(s,'e1'),'recovering');assert.equal(level(s,'e16'),'cold');
 unlogSet(s,'e16',0,'2026-10-19');assert.equal(level(s,'e1'),'cold');assert.equal(level(s,'e16'),'recovering');assert.equal(level(before,'e1'),'cold');
});
test('paired, standalone 7-day and standalone 3-day states reset on local midnight boundaries across DST',()=>{
 const s=initialState();for(const eid of ['e1','e8','e20','e30','e21'])log(s,eid,'2026-10-30T23:59:00-07:00');
 for(const eid of ['e1','e21']){assert.equal(level(s,eid,'2026-11-04'),'cold');assert.equal(level(s,eid,'2026-11-05'),'due');}
 assert.equal(level(s,'e8','2026-11-05'),'cold');assert.equal(level(s,'e8','2026-11-06'),'due');
 for(const eid of ['e20','e30']){assert.equal(level(s,eid,'2026-11-01'),'cold');assert.equal(level(s,eid,'2026-11-02'),'due');}
});
test('reset epochs clear both sides without deleting history; unavailable or 3-day counterpart uses standalone rule',()=>{
 const s=initialState();log(s,'e1');log(s,'e16','2026-10-19T12:01:00-07:00');const history=copy(s.history);
 resetCooldowns(s);assert.equal(level(s,'e1'),'due');assert.equal(level(s,'e16'),'due');assert.deepEqual(s.history,history);
 log(s,'e1','2026-10-19T12:02:00-07:00',1);assert.equal(level(s,'e1'),'cold');assert.equal(level(s,'e16'),'recovering');
 log(s,'e16','2026-10-19T12:03:00-07:00',1);exerciseById(s,'e16').restCycle=3;
 assert.equal(level(s,'e1'),'cold');assert.equal(level(s,'e16','2026-10-22'),'due');
 exerciseById(s,'e16').restCycle=7;exerciseById(s,'e16').archived=true;assert.equal(level(s,'e1'),'cold');
});
test('Upper and Lower contain exact main groups and share identical floating IDs and state',()=>{
 const s=initialState(),upper=homeGroups(s,'upper'),lower=homeGroups(s,'lower');
 assert.deepEqual(upper.main.map(g=>g[1]),['Chest','Mid-Back','Lats','Front Delts & Triceps','Biceps']);
 assert.deepEqual(lower.main.map(g=>g[1]),['Quads','Posterior Chain','Adductors']);
 assert.deepEqual(upper.floating.map(g=>g[1]),['Side & Rear Delts','Forearms','Calves','Core']);assert.deepEqual(upper.floating,lower.floating);
 assert.equal(exerciseById(s,'e29').group,'biceps');assert.equal(exerciseById(s,'e30').group,'forearms');assert.equal(exerciseById(s,'e25').group,'calves');
 assert.equal(s.exercises.filter(e=>!e.archived).length,32);assert.deepEqual(fatigueGoal(s),{weekly7:38,weekly3:16,weekly:54,daily:14});
 log(s,'e26');assert.equal(level(s,'e26'),'cold');assert.equal(level(s,'e27'),'recovering');assert.equal(folderUrgency(s,['e26','e27'],'2026-10-19').level,'cold');
});
test('real revision 8 migration preserves all logged data and editable prescriptions, then remains idempotent',()=>{
 const s=JSON.parse(readFileSync(new URL('./fixtures/v8.json',import.meta.url),'utf8'));
 exerciseById(s,'e1').name='My press';exerciseById(s,'e1').sets=4;exerciseById(s,'e1').rest=[150,180];exerciseById(s,'e1').seat='Seat 4';s.groups.find(g=>g[0]==='chest')[1]='My chest';
 s.settings.volume=.23;for(const eid of ['e25','e29','e26'])log(s,eid);writeDraft(s,'e25',1,'weight','45x2','2026-10-19');addAlternate(s,'e29','EZ reverse curl',{},'reverse-alt');
 const before=copy(s),n=migrateState(s);assert.deepEqual(s,before);assert.equal(n.revision,10);
 for(const field of ['history','drafts','plans','timers','pinned','folders','clock','settings','fatigueResets','rest'])assert.deepEqual(n[field],before[field],field);
 assert.deepEqual(exerciseById(n,'e1'),exerciseById(s,'e1'));assert.equal(n.groups.find(g=>g[0]==='chest')[1],'My chest');assert.equal(exerciseById(n,'reverse-alt').group,'biceps');
 assert.equal(exerciseById(n,'e30').archived,false);assert.equal(exerciseById(n,'e30').restCycle,3);assert.equal(exerciseById(n,'e25').group,'calves');
 assert.equal(level(n,'e26'),'cold');assert.equal(level(n,'e27'),'recovering');validateState(n);assert.deepEqual(migrateState(n),n);
});
