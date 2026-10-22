import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,migrateState,validateState,localDay,SUPPLEMENTS,setSupplement,supplementDates,lastTaken} from '../app.js';
test('ten protocols, five daily and five tactical; logging is idempotent and independent',()=>{
 const s=initialState();assert.equal(SUPPLEMENTS.length,10);assert.equal(SUPPLEMENTS.filter(x=>x.daily).length,5);
 setSupplement(s,'multi','2026-10-22',true);setSupplement(s,'multi','2026-10-22',true);
 setSupplement(s,'choline','2026-10-22',true);assert.equal(s.supplementLog.length,2);assert.equal(s.history.length,0);
 setSupplement(s,'multi','2026-10-22',false);assert.deepEqual(s.supplementLog,[{id:'choline',day:'2026-10-22'}]);
 assert.throws(()=>setSupplement(s,'unknown','2026-10-22',true));
});
test('midnight resets check state without erasing dates, across month and DST boundaries',()=>{
 const s=initialState();setSupplement(s,'multi','2026-10-31',true);setSupplement(s,'choline','2026-10-31',true);
 assert.equal(supplementDates(s,'multi').includes('2026-11-01'),false);
 assert.equal(lastTaken(s,'choline','2026-11-02'),'Last taken: 2 days ago');
 assert.equal(lastTaken(s,'tyrosine','2026-11-02'),'Last taken: never');
 assert.equal(localDay(new Date(2026,10,1,0,0)),'2026-11-01');
 setSupplement(s,'multi','2026-11-01',true);setSupplement(s,'multi','2026-11-01',false);
 assert.deepEqual(supplementDates(s,'multi'),['2026-10-31']);
});
test('backup, legacy migration and validation preserve logs and reject malformed history',()=>{
 const s=initialState();delete s.supplementLog;const old=migrateState(s);setSupplement(old,'ashwagandha','2026-10-22',true);
 const restored=migrateState(JSON.parse(JSON.stringify(old)));assert.deepEqual(restored.supplementLog,old.supplementLog);
 for(const row of [{id:'unknown',day:'2026-10-22'},{id:'multi',day:'2026-02-30'}])assert.throws(()=>validateState({...s,supplementLog:[row]}));
 assert.throws(()=>validateState({...old,supplementLog:[...old.supplementLog,...old.supplementLog]}));
});
