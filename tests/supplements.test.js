import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,migrateState,validateState,localDay,supplementDay,SUPPLEMENTS,setSupplement,supplementDates,lastTaken} from '../app.js';
test('ten protocols, seven daily and three tactical; logging is idempotent and independent',()=>{
 const s=initialState();assert.equal(SUPPLEMENTS.length,10);assert.equal(SUPPLEMENTS.filter(x=>x.daily).length,7);
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

test('supplement days roll at 4am local time across midnight, month and DST changes',()=>{
 process.env.TZ='America/Los_Angeles';
 for(const [date,expected] of [
 ['2026-10-26T00:00:00','2026-10-25'],['2026-10-26T03:59:59','2026-10-25'],
 ['2026-10-26T04:00:00','2026-10-26'],['2026-11-01T03:59:59','2026-10-31'],
 ['2026-11-01T04:00:00','2026-11-01'],['2026-03-08T03:59:59','2026-03-07'],
 ['2026-03-08T04:00:00','2026-03-08'],['2027-01-01T02:00:00','2026-12-31']
 ])assert.equal(supplementDay(new Date(date)),expected);
 const s=initialState();setSupplement(s,'multi',supplementDay(new Date('2026-10-26T02:00:00')),true);
 assert.equal(supplementDates(s,'multi').includes(supplementDay(new Date('2026-10-26T03:59:00'))),true);
 assert.equal(supplementDates(s,'multi').includes(supplementDay(new Date('2026-10-26T04:00:00'))),false);
 assert.equal(localDay(new Date('2026-10-26T02:00:00')),'2026-10-26');
});
