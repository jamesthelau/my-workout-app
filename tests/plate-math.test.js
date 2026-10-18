import test from 'node:test';
import assert from 'node:assert/strict';
import {parseWeight,initialState,completeWithHistory,changeUnits,validateState,copy,graphSeries,migrateState,writeDraft} from '../app.js';
test('plate blocks add and factors multiply without evaluating code',()=>{
 for(const [input,total] of [['45x5, 25x2',275],['45x2, 10',100],['45x2, 25',115],[' 45 * 2 , 2.5X2 ',95],['.5x2, .25',1.25],['0',0],['0.1, 0.2',.3],['10000',10000]])assert.equal(parseWeight(input),total);
 for(const bad of ['',',45','45,','45,,25','45x','45x2x3','-5','1e3','Infinity','10/2','45+25','0xFF','alert(1)','1;2','10000,1',NaN,Infinity,null,'1'.repeat(201)])assert.throws(()=>parseWeight(bad));
});
test('shorthand saves only numeric weight and numeric graph values, then survives backup',()=>{
 const s=initialState();const record=completeWithHistory(s,'e1',0,{weight:'45x2, 25',reps:'8'},new Date('2026-10-17T12:00:00'),'plate');assert.equal(record.weight,115);assert.equal(typeof record.weight,'number');assert.equal(graphSeries(s,'e1')[0].value,920);assert.deepEqual(migrateState(JSON.parse(JSON.stringify(s))),s);validateState(s);
 const before=copy(s);assert.throws(()=>completeWithHistory(s,'e1',1,{weight:'45x',reps:8},new Date('2026-10-17T12:00:00'),'invalid'));assert.deepEqual(s,before);
});
test('unit changes resolve expressions before converting and reject incomplete drafts atomically',()=>{
 const s=initialState();writeDraft(s,'e1',0,'weight','45x2, 25','2026-10-17');changeUnits(s,'kg');assert.equal(s.drafts['2026-10-17|e1|0'].weight,'52.16');
 writeDraft(s,'e2',0,'weight','45x','2026-10-17');const before=copy(s);assert.throws(()=>changeUnits(s,'lbs'));assert.deepEqual(s,before);
});
test('long expression drafts roundtrip without requiring a single scrolling line',()=>{
 const s=initialState();const expression=Array(20).fill('2.5x2').join(', ');writeDraft(s,'e1',0,'weight',expression,'2026-10-17');assert.equal(parseWeight(expression),100);validateState(s);assert.deepEqual(migrateState(JSON.parse(JSON.stringify(s))),s);
});
