// Model: one exercise ID is shared by the muscle list, folders and active tray.
export const GROUPS = [
  ['chest','Chest','upper'],
  ['mid-back','Mid-Back','upper'],['lats','Lats','upper'],['front-delts','Front Delts & Triceps','upper'],
  ['side-delts','Side Delts','upper'],['rear-delts','Rear Delts','upper'],
  ['biceps','Biceps / Brachialis','upper'],['forearms','Forearms','upper'],
  ['quads','Quads','lower'],['posterior-chain','Posterior Chain','lower'],
  ['calves-adductors','Calves & Adductors','lower'],['core','Core','core']
];
const legacyGroups = {triceps:'front-delts',hamstrings:'posterior-chain',glutes:'posterior-chain','misc-legs':'posterior-chain','quads-glutes':'quads','hamstrings-adductors-calves':'posterior-chain','upper-chest':'chest','mid-chest':'chest',adductors:'calves-adductors',calves:'calves-adductors','core-flexion':'core','core-stability':'core'};
const seedRows = [
  ['Incline Smith Machine Press','chest',1,3,'5–8',180,240],
  ['Incline Cable Fly','chest',2,3,'8–12',120,180],
  ['Pec Deck','chest',3,2,'12–15',120,120],
  ['Chest-Supported T-Bar Row','mid-back',1,3,'6–10',180,180],
  ['Single-Arm Dumbbell Row','lats',2,3,'8–10',120,180],
  ['Half-Kneeling Single-Arm Pulldown','lats',2,3,'8–12',120,120],
  ['Neutral Grip Lat Pulldown','lats',2,3,'8–12',120,120],
  ['Machine Shoulder Press','front-delts',1,3,'6–10',180,180],
  ['Behind-the-Back Cable Lateral Raise','side-delts',2,3,'10–12',120,120],
  ['Dumbbell Lateral Raise','side-delts',3,3,'12–15',90,120],
  ['Reverse Pec Deck','rear-delts',3,3,'12–15',90,120],
  ['Incline Dumbbell Curl','biceps',2,3,'8–10',120,120],
  ['Preacher Curl','biceps',2,3,'10–12',120,120],
  ['Dumbbell Hammer Curl','biceps',3,3,'10–15',90,120],
  ['Cable Wrist Curl','forearms',3,3,'12–15',60,90],
  ['Machine Dips','chest',2,3,'8–10',180,180],
  ['Cross-Body Overhead Cable Triceps Ext.','front-delts',2,3,'10–12',120,120],
  ['Cross-Body Cable Triceps Pushdown','front-delts',3,3,'10–15',90,120],
  ['Hack Squat','quads',1,3,'6–10',180,300],
  ['Seated Leg Extensions','quads',2,3,'10–15',120,120],
  ['Romanian Deadlift (Barbell or DB)','posterior-chain',1,3,'6–8',180,300],
  ['Seated Machine Leg Curl','posterior-chain',2,3,'8–12',120,120],
  ['Barbell Hip Thrust','posterior-chain',2,3,'8–12',120,180],
  ['Seated Adductor Machine','calves-adductors',2,3,'10–15',120,120],
  ['Standing Machine Calf Raise','calves-adductors',3,3,'8–12',90,120],
  ['Weighted Cable Crunches','core',3,3,'10–15',90,90],
  ['Pallof Press','core',3,3,'10–15',90,90],
  ['Bulgarian Split Squat','quads',2,3,'8–12',120,180],
  ['Reverse Curl','forearms',3,2,'10–15',90,120],
  ['Cable Wrist Extension','forearms',3,3,'12–15',60,90],
  ['45-Degree Back Extension','posterior-chain',2,3,'10–15',120,120]
];
const targetCooldowns = [3,7,7,7,7,7,7,7,3,3,3,7,7,3,3,7,7,3,3,3,7,7,7,7,3,3,7,7,3,3];
const rirTargets = ['1–2','0–1','0','1–2','1','1','1','1–2','0–1','0','0','1','0','0','0','1','0–1','0','1–2','0','1–2','0–1','1','0–1','0','0–1','1','1','0','','1'];
export const SEED = seedRows.map(([name,group,tier,sets,reps,min,max],i)=>({id:`e${i+1}`,name,group,tier,sets,reps,rir:rirTargets[i],rest:[min,max],targetCooldown:targetCooldowns[i] || 7,parent:null,seat:'',...(i===29?{archived:true}:{})}));
export const copy = value => structuredClone(value);
export const id = () => crypto.randomUUID();
export const nameKey = name => name.trim().normalize('NFKC').toLowerCase();
export const points = exercise => 4-exercise.tier;
export function localDay(now=new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}
export function ordinal(day) {
  const [y,m,d]=day.split('-').map(Number);
  return Date.UTC(y,m-1,d)/86400000;
}
export const daysBetween = (earlier,later) => Math.max(0,ordinal(later)-ordinal(earlier));
export function initialState() {
  return {version:2,revision:6,groups:copy(GROUPS),hiddenGroups:[],exercises:copy(SEED),history:[],drafts:{},plans:{},epoch:0,fatigueResets:{},
    folders:[{id:'cables',name:'Cable Station',exerciseIds:['e2','e6','e9','e15','e17','e18','e26','e27']}],
    pinned:[],timers:{},clock:{startedAt:null,elapsed:0,ended:false},
    settings:{unit:'lbs',sound:true,haptics:true},rest:{}};
}
export const exerciseById = (s,exerciseId) => s.exercises.find(e=>e.id===exerciseId);
export const dayKey = (day,exerciseId) => `${day}|${exerciseId}`;
export const draftKey = (day,exerciseId,index) => `${day}|${exerciseId}|${index}`;
export const targetSets = (s,exerciseId,day=localDay()) => s.plans[dayKey(day,exerciseId)] || exerciseById(s,exerciseId).sets;
export const dailyRecords = (s,exerciseId,day=localDay()) => s.history.filter(r=>r.exerciseId===exerciseId&&r.day===day).sort((a,b)=>a.index-b.index);
export function completion(s,exerciseId,day=localDay()) {
  const target=targetSets(s,exerciseId,day),done=dailyRecords(s,exerciseId,day).length;
  return {target,done,complete:done===target};
}
export function fatigue(s,day=localDay()) {
  const excluded=new Set(s.fatigueResets[day]||[]);
  const complete=s.exercises.filter(e=>!excluded.has(e.id)&&completion(s,e.id,day).complete);
  return {score:complete.reduce((n,e)=>n+points(e),0),count:complete.length};
}
export function readiness(s,exerciseId,day=localDay()) {
  const record=s.history.filter(r=>r.exerciseId===exerciseId&&r.epoch===s.epoch).sort((a,b)=>b.at.localeCompare(a.at))[0];
  return record?{days:daysBetween(record.day,day),day:record.day,at:record.at}:null;
}
export function readinessStatus(s,exerciseId,day=localDay()) {
  const hit=readiness(s,exerciseId,day),targetCooldown=exerciseById(s,exerciseId).targetCooldown;
  const remaining=hit?Math.max(0,targetCooldown-hit.days):0;
  return {hit,targetCooldown,remaining,ready:remaining===0};
}
export function migrateState(input) {
  // Validate legacy data first; preserve exercise IDs and every historical record.
  const s=copy(validateState(input,{allowMissingCooldown:true,legacy:true}));
  if(s.revision>=6)return validateState(s);
  // Keep existing reverse-curl sessions/drafts at their original planned set count.
  for(const day of new Set([...s.history.filter(r=>r.exerciseId==='e29').map(r=>r.day),...Object.keys(s.drafts).filter(k=>k.split('|')[1]==='e29').map(k=>k.split('|')[0])])){
    s.plans[dayKey(day,'e29')] ||= exerciseById(s,'e29').sets;
  }
  if(s.revision===5)return updatePrescriptions(s);
  if(s.revision===4)return updateMachineExercises(s);
  // Preserve old performances without attributing them to a different movement.
  for(const [eid,oldName] of [['e16','JM Press'],['e15','Cable Wrist Curls & Reverse']]){
    const old=exerciseById(s,eid);
    if(old?.name!==oldName)continue;
    const legacyId=`legacy-${eid}`;
    if(s.history.some(r=>r.exerciseId===eid)){
      s.exercises.push({...copy(old),id:legacyId,name:`${oldName} (Legacy)`,parent:eid});
      for(const r of s.history)if(r.exerciseId===eid)r.exerciseId=legacyId;
      for(const field of ['plans','drafts'])for(const key of Object.keys(s[field])){
        const parts=key.split('|');if(parts[1]!==eid)continue;
        parts[1]=legacyId;s[field][parts.join('|')]=s[field][key];delete s[field][key];
      }
      for(const field of ['timers','rest'])if(s[field][eid]){s[field][legacyId]=s[field][eid];delete s[field][eid];}
      for(const ids of Object.values(s.fatigueResets||{}))for(let i=0;i<ids.length;i++)if(ids[i]===eid)ids[i]=legacyId;
    } else {
      for(const field of ['plans','drafts'])for(const key of Object.keys(s[field]))if(key.split('|')[1]===eid)delete s[field][key];
    }
    old.seat='';
  }
  s.groups=copy(GROUPS);s.hiddenGroups=[];
  for(const exercise of s.exercises)exercise.group=legacyGroups[exercise.group]||exercise.group;
  for(const seed of SEED){
    const existing=exerciseById(s,seed.id);
    if(existing){existing.targetCooldown=seed.targetCooldown;existing.group=seed.group;existing.name=seed.name;existing.tier=seed.tier;existing.rest=copy(seed.rest);existing.reps=seed.reps;existing.sets=seed.sets;}
    else s.exercises.push(copy(seed));
  }
  for(const exercise of s.exercises){
    if(exercise.parent)exercise.group=exerciseById(s,exercise.parent).group;
    if(exercise.targetCooldown===undefined)exercise.targetCooldown=exerciseById(s,exercise.parent)?.targetCooldown ?? 3;
  }
  s.fatigueResets ||= {};
  s.clock.ended ??= false;
  return updateMachineExercises(s);
}
function updateMachineExercises(s) {
  const dips=exerciseById(s,'e16');
  dips.name='Machine Dips';dips.group='chest';
  for(const e of s.exercises)if(e.parent==='e16')e.group='chest';
  exerciseById(s,'e8').name='Machine Shoulder Press';
  archiveExercise(s,'e30');
  return updatePrescriptions(s);
}
function updatePrescriptions(s) {
  for(const seed of SEED){
    const e=exerciseById(s,seed.id);e.rir=seed.rir;
    if(seed.id==='e16'){e.tier=2;e.reps='8–10';}
    if(seed.id==='e29')e.sets=2;
    if(seed.id==='e21'&&e.name==='Romanian Deadlift (Barbell or Dumbbells)')e.name=seed.name;
    if(seed.id==='e17'&&e.name==='Cross-Body Overhead Cable Triceps Extension')e.name=seed.name;
  }
  for(const e of s.exercises)if(e.rir===undefined)e.rir='';
  s.revision=6;
  return validateState(s);
}
export function setRir(s,eid,value){
  if(typeof value!=='string'||!/^$|^([0-9]|10)([–-]([0-9]|10))?$/.test(value))throw Error('Use a RIR number or range from 0 to 10, or leave blank.');
  const nums=value.split(/[–-]/).map(Number);if(nums.length===2&&nums[0]>nums[1])throw Error('RIR range must increase.');
  exerciseById(s,eid).rir=value.replace('-','–');
}
export function previousSession(s,exerciseId,day=localDay()) {
  const records=s.history.filter(r=>r.exerciseId===exerciseId&&r.day<day);
  const lastDay=records.reduce((latest,r)=>r.day>latest?r.day:latest,'');
  return records.filter(r=>r.day===lastDay).sort((a,b)=>a.index-b.index);
}
export function previousSet(s,exerciseId,index,day=localDay()) {
  const session=previousSession(s,exerciseId,day);
  return session.find(r=>r.index===index) || session.at(-1) || null;
}
export function inUnit(record,unit) {
  return record.unit===unit?record.weight:Math.round(record.weight*(unit==='kg'?1/2.2046226218:2.2046226218)*100)/100;
}
export function writeDraft(s,exerciseId,index,field,value,day=localDay()) {
  const key=draftKey(day,exerciseId,index);
  const draft=s.drafts[key] ||= {weight:'',reps:'',partial:false};
  draft[field]=value;
}
export function copyPrevious(s,exerciseId,index,day=localDay()) {
  const previous=previousSet(s,exerciseId,index,day);
  if(!previous)throw Error('No earlier session to copy yet.');
  s.drafts[draftKey(day,exerciseId,index)]={weight:String(inUnit(previous,s.settings.unit)),reps:String(previous.reps),partial:false};
}
export function logSet(s,exerciseId,index,input,now=new Date(),recordId=id()) {
  const exercise=exerciseById(s,exerciseId),day=localDay(now),target=targetSets(s,exerciseId,day);
  if(!exercise||!Number.isInteger(index)||index<0||index>=target)throw Error('This set is outside the daily target.');
  if(dailyRecords(s,exerciseId,day).some(r=>r.index===index))throw Error('This set is already logged.');
  const {weight,reps,partial=false}=input;
  if(String(weight).trim()===''||!Number.isFinite(Number(weight))||Number(weight)<0||Number(weight)>10000)throw Error('Enter a weight from 0 to 10,000. Zero means unweighted.');
  if(String(reps).trim()===''||!Number.isInteger(Number(reps))||Number(reps)<1||Number(reps)>999)throw Error('Enter whole-number reps from 1 to 999.');
  const record={id:recordId,exerciseId,index,day,at:now.toISOString(),weight:Number(weight),reps:Number(reps),unit:s.settings.unit,partial:!!partial,epoch:s.epoch};
  s.history.push(record);delete s.drafts[draftKey(day,exerciseId,index)];
  s.plans[dayKey(day,exerciseId)]=target;
  const seconds=s.rest[exerciseId] || (exercise.rest[0]+exercise.rest[1])/2;
  s.timers[exerciseId]={end:now.getTime()+seconds*1000,duration:seconds,recordId};
  if(s.clock.ended||s.clock.startedAt===null&&s.clock.elapsed===0)startWorkout(s,now.getTime());
  return record;
}
export function unlogSet(s,exerciseId,index,day=localDay()) {
  const record=dailyRecords(s,exerciseId,day).find(r=>r.index===index);
  if(!record)return;
  s.history=s.history.filter(r=>r.id!==record.id);
  s.drafts[draftKey(day,exerciseId,index)]={weight:String(inUnit(record,s.settings.unit)),reps:String(record.reps),partial:record.partial};
  if(s.timers[exerciseId]?.recordId===record.id)delete s.timers[exerciseId];
}
export function changeTarget(s,exerciseId,target,day=localDay()) {
  if(!Number.isInteger(target)||target<1||target>10)throw Error('Daily targets can contain 1–10 sets.');
  if(dailyRecords(s,exerciseId,day).some(r=>r.index>=target))throw Error('Uncheck the last set before removing it.');
  s.plans[dayKey(day,exerciseId)]=target;
  for(let i=target;i<10;i++)delete s.drafts[draftKey(day,exerciseId,i)];
}
export function addAlternate(s,parentId,name,{tier,sets,reps}={},newId=id()) {
  const parent=exerciseById(s,parentId);
  if(!parent)throw Error('Choose a parent exercise.');
  if(typeof name!=='string'||!name.trim()||name.trim().length>100)throw Error('Enter a name from 1–100 characters.');
  if(s.exercises.some(e=>nameKey(e.name)===nameKey(name)))throw Error('That exercise already exists. Add the existing entry to your folder instead.');
  if(tier!==undefined&&(!Number.isInteger(tier)||tier<1||tier>3))throw Error('Choose a tier from 1 to 3.');
  if(sets!==undefined&&(!Number.isInteger(sets)||sets<1||sets>10))throw Error('Choose 1–10 sets.');
  if(reps!==undefined&&(typeof reps!=='string'||!reps.trim()||reps.length>30))throw Error('Enter a rep range.');
  const exercise={...copy(parent),id:newId,parent:parent.parent||parent.id,name:name.trim(),seat:'',tier:tier||parent.tier,sets:sets||parent.sets,reps:reps||parent.reps};
  s.exercises.push(exercise);return exercise;
}
export function setFolder(s,folderId,name,exerciseIds) {
  if(typeof name!=='string'||!name.trim()||name.trim().length>60)throw Error('Name your station (1–60 characters).');
  if(s.folders.some(f=>f.id!==folderId&&nameKey(f.name)===nameKey(name)))throw Error('A station with that name already exists.');
  if(exerciseIds.some(eid=>!exerciseById(s,eid)))throw Error('A selected exercise no longer exists.');
  const folder={id:folderId,name:name.trim(),exerciseIds:[...new Set(exerciseIds)]};
  const index=s.folders.findIndex(f=>f.id===folderId);
  if(index<0)s.folders.push(folder);else s.folders[index]=folder;
}
export function togglePin(s,exerciseId) {
  if(s.pinned.includes(exerciseId)){s.pinned=s.pinned.filter(eid=>eid!==exerciseId);return;}
  if(s.pinned.length===3)throw Error('Three exercises are pinned. Unpin one to make room.');
  s.pinned.push(exerciseId);
}
export function resetCooldowns(s) {s.epoch++;}
export function resetDailyFatigue(s,day=localDay()) {
  const completed=s.exercises.filter(e=>completion(s,e.id,day).complete).map(e=>e.id);
  s.fatigueResets[day]=[...new Set([...(s.fatigueResets[day]||[]),...completed])];
}
export function changeUnits(s,unit) {
  if(unit===s.settings.unit)return;
  for(const draft of Object.values(s.drafts))if(draft.weight!==''&&Number.isFinite(Number(draft.weight)))draft.weight=String(inUnit({weight:Number(draft.weight),unit:s.settings.unit},unit));
  s.settings.unit=unit;
}
export function workoutMillis(s,now=Date.now()) {return s.clock.elapsed+(s.clock.startedAt===null?0:Math.max(0,now-s.clock.startedAt));}
export function pauseClock(s,now=Date.now()) {s.clock.elapsed=workoutMillis(s,now);s.clock.startedAt=null;}
export function startWorkout(s,now=Date.now()) {
  if(s.clock.ended)s.clock.elapsed=0;
  s.clock.ended=false;s.clock.startedAt=now;
}
export function endWorkout(s,now=Date.now()) {
  pauseClock(s,now);s.clock.ended=true;s.timers={};s.pinned=[];
}
export function graphSeries(s,exerciseId,metric='volume',unit=s.settings.unit) {
  const grouped=new Map();
  for(const record of s.history.filter(r=>r.exerciseId===exerciseId)){
    if(metric==='e1rm'&&(record.partial||record.reps>12||record.weight===0))continue;
    const weight=inUnit(record,unit),value=metric==='volume'?weight*record.reps:weight*(1+record.reps/30);
    grouped.set(record.day,metric==='volume'?(grouped.get(record.day)||0)+value:Math.max(grouped.get(record.day)||0,value));
  }
  return [...grouped].sort((a,b)=>a[0].localeCompare(b[0])).map(([day,value])=>({day,value:Math.round(value*100)/100}));
}
export function validateState(s,{allowMissingCooldown=false,legacy=false}={}) {
  const fail=()=>{throw Error('Invalid Flex Log V2 backup. Existing data has not changed.');};
  const obj=x=>x&&typeof x==='object'&&!Array.isArray(x);
  const string=(x,max=100)=>typeof x==='string'&&x.trim().length>0&&x.length<=max;
  const finite=(x,min,max)=>Number.isFinite(x)&&x>=min&&x<=max;
  const int=(x,min,max)=>Number.isInteger(x)&&finite(x,min,max);
  const safeId=x=>string(x,100)&&/^[a-zA-Z0-9_-]+$/.test(x)&&!['__proto__','constructor','prototype'].includes(x);
  const validDay=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(ordinal(x))&&new Date(ordinal(x)*86400000).toISOString().slice(0,10)===x;
  if(!obj(s)||s.version!==2||!Array.isArray(s.exercises)||!Array.isArray(s.history)||!Array.isArray(s.folders)||!Array.isArray(s.pinned)||!obj(s.drafts)||!obj(s.plans)||!obj(s.timers)||!obj(s.rest)||!obj(s.clock)||!obj(s.settings)||!int(s.epoch,0,Number.MAX_SAFE_INTEGER))fail();
  if(s.revision>=4){
    if(!Array.isArray(s.groups)||!Array.isArray(s.hiddenGroups))fail();
    const gids=new Set();for(const g of s.groups){if(!Array.isArray(g)||g.length!==3||!safeId(g[0])||gids.has(g[0])||!string(g[1],60)||!['upper','lower','core'].includes(g[2]))fail();gids.add(g[0]);}
    if(s.hiddenGroups.some(g=>!gids.has(g)))fail();
  }
  const exercises=new Map();
  for(const e of s.exercises){
    if(!(allowMissingCooldown&&e?.targetCooldown===undefined)&&!int(e?.targetCooldown,1,365))fail();
    if(!obj(e)||!safeId(e.id)||exercises.has(e.id)||!string(e.name)||!((s.groups||GROUPS).some(g=>g[0]===e.group)||legacy&&Object.hasOwn(legacyGroups,e.group))||!int(e.tier,1,3)||!int(e.sets,1,10)||!string(e.reps,30)||!Array.isArray(e.rest)||e.rest.length!==2||!e.rest.every(n=>int(n,15,900))||e.rest[0]>e.rest[1]||typeof e.seat!=='string'||e.seat.length>200)fail();
    if(s.revision>=6&&(typeof e.rir!=='string'||!/^$|^([0-9]|10)([–-]([0-9]|10))?$/.test(e.rir)||e.rir.includes('–')&&Number(e.rir.split('–')[0])>Number(e.rir.split('–')[1])))fail();
    if(e.archived!==undefined&&typeof e.archived!=='boolean')fail();
    exercises.set(e.id,e);
  }
  if((legacy?SEED.slice(0,27):SEED).some(e=>!exercises.has(e.id)))fail();
  if(!(legacy&&s.fatigueResets===undefined)){
    if(!obj(s.fatigueResets))fail();
    for(const [day,excluded] of Object.entries(s.fatigueResets))
      if(!validDay(day)||!Array.isArray(excluded)||new Set(excluded).size!==excluded.length||excluded.some(eid=>!exercises.has(eid)))fail();
  }
  if(!(legacy&&s.clock.ended===undefined)&&typeof s.clock.ended!=='boolean')fail();
  for(const e of s.exercises)if(e.parent!==null&&(!exercises.has(e.parent)||e.parent===e.id||exercises.get(e.parent).parent!==null))fail();
  for(const [key,value] of Object.entries(s.plans)){const [day,eid,...extra]=key.split('|');if(extra.length||!validDay(day)||!exercises.has(eid)||!int(value,1,10))fail();}
  const records=new Map(),cells=new Set();
  for(const r of s.history){
    if(!obj(r)||!safeId(r.id)||records.has(r.id)||!exercises.has(r.exerciseId)||!validDay(r.day)||!Number.isFinite(Date.parse(r.at))||!int(r.index,0,9)||!finite(r.weight,0,10000)||!int(r.reps,1,999)||!['lbs','kg'].includes(r.unit)||typeof r.partial!=='boolean'||!int(r.epoch,0,s.epoch))fail();
    const key=draftKey(r.day,r.exerciseId,r.index);
    if(cells.has(key)||r.index>=targetSets(s,r.exerciseId,r.day))fail();
    cells.add(key);records.set(r.id,r);
  }
  for(const [key,d] of Object.entries(s.drafts)){
    const [day,eid,index,...extra]=key.split('|');
    if(extra.length||!validDay(day)||!exercises.has(eid)||!/^\d$/.test(index)||Number(index)>=targetSets(s,eid,day)||cells.has(key)||!obj(d)||typeof d.weight!=='string'||d.weight.length>40||typeof d.reps!=='string'||d.reps.length>40||typeof d.partial!=='boolean')fail();
  }
  const folderIds=new Set();
  for(const f of s.folders){if(!obj(f)||!safeId(f.id)||folderIds.has(f.id)||!string(f.name,60)||!Array.isArray(f.exerciseIds)||new Set(f.exerciseIds).size!==f.exerciseIds.length||f.exerciseIds.some(eid=>!exercises.has(eid)))fail();folderIds.add(f.id);}
  if(s.pinned.length>3||new Set(s.pinned).size!==s.pinned.length||s.pinned.some(eid=>!exercises.has(eid)))fail();
  for(const [eid,t] of Object.entries(s.timers))if(!exercises.has(eid)||!obj(t)||!finite(t.end,0,8.64e15)||!finite(t.duration,1,86400)||records.get(t.recordId)?.exerciseId!==eid)fail();
  for(const [eid,n] of Object.entries(s.rest))if(!exercises.has(eid)||!int(n,15,900))fail();
  if(!['lbs','kg'].includes(s.settings.unit)||typeof s.settings.sound!=='boolean'||typeof s.settings.haptics!=='boolean'||!finite(s.clock.elapsed,0,8.64e15)||(s.clock.startedAt!==null&&!finite(s.clock.startedAt,0,8.64e15)))fail();
  return s;
}

export function groupReadiness(s,gid,day=localDay()) {
  const hits=s.exercises.filter(e=>e.group===gid&&!e.archived).map(e=>readiness(s,e.id,day)).filter(Boolean);
  const hit=hits.sort((a,b)=>a.days-b.days)[0]||null;
  const remaining=hit?Math.max(0,3-hit.days):0;
  return {hit,remaining,ready:remaining===0};
}
export function renameExercise(s,eid,name){
  if(typeof name!=='string'||!name.trim()||name.trim().length>100)throw Error('Enter a name from 1–100 characters.');
  if(s.exercises.some(e=>e.id!==eid&&!e.archived&&nameKey(e.name)===nameKey(name)))throw Error('That exercise name already exists.');
  exerciseById(s,eid).name=name.trim();
}
export function archiveExercise(s,eid){
  const ids=s.exercises.filter(e=>e.id===eid||e.parent===eid).map(e=>e.id);
  for(const e of s.exercises)if(ids.includes(e.id))e.archived=true;
  s.pinned=s.pinned.filter(id=>!ids.includes(id));
  for(const id of ids)delete s.timers[id];
  for(const f of s.folders)f.exerciseIds=f.exerciseIds.filter(id=>!ids.includes(id));
}
export function renameGroup(s,gid,name){
  if(typeof name!=='string'||!name.trim()||name.trim().length>60)throw Error('Enter a name from 1–60 characters.');
  if(s.groups.some(g=>g[0]!==gid&&nameKey(g[1])===nameKey(name)))throw Error('That category name already exists.');
  s.groups.find(g=>g[0]===gid)[1]=name.trim();
}
export function archiveGroup(s,gid){
  if(!s.hiddenGroups.includes(gid))s.hiddenGroups.push(gid);
  for(const e of s.exercises.filter(e=>e.group===gid))archiveExercise(s,e.id);
}
export function moveExercise(s,eid,gid){
  if(!s.groups.some(g=>g[0]===gid)||s.hiddenGroups.includes(gid))throw Error('Choose an active category.');
  const e=exerciseById(s,eid);e.group=gid;e.parent=null;e.archived=false;
  for(const child of s.exercises.filter(x=>x.parent===eid))child.group=gid;
}
export function createExercise(s,gid,name,{tier=2,sets=3,reps='8–12',rest=120}={},newId=id()){
  if(!Number.isInteger(tier)||tier<1||tier>3||!Number.isInteger(sets)||sets<1||sets>10||!Number.isInteger(rest)||rest<15||rest>900||!reps.trim()||reps.length>30)throw Error('Check the tier, sets, reps and rest duration.');
  const e={id:newId,name:'',group:gid,tier,sets,reps,rir:'',rest:[rest,rest],targetCooldown:3,parent:null,seat:''};
  s.exercises.push(e);try{renameExercise(s,newId,name);moveExercise(s,newId,gid);}catch(error){s.exercises.pop();throw error;}return e;
}

// Browser UI is isolated from the model so the same logic can be tested in Node.
if(typeof document!=='undefined')boot();
function boot() {
  const $=selector=>document.querySelector(selector);
  const html=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const key=`flex-log:v2:${new URL('.',location.href).pathname}`;
  const dateLabel=day=>new Date(`${day}T12:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
  const exactTime=at=>new Date(at).toLocaleString(undefined,{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'});
  const duration=seconds=>`${Math.floor(Math.max(0,seconds)/60)}:${String(Math.max(0,seconds)%60).padStart(2,'0')}`;
  const since=r=>!r?'Not hit yet':r.days===0?'Last: today':r.days===1?'Last: 1 day ago':`Last: ${r.days} days ago`;
  const readinessLabel=status=>status.ready?'Ready':`Recovering: ${status.remaining} ${status.remaining===1?'day':'days'} remaining`;
  const readinessBadge=eid=>{return '';};
  const metric=r=>`${r.weight} ${r.unit} × ${r.reps}${r.partial?' + P':''}`;
  let state=initialState(),blocked=false,unreadable=null,today=localDay(),undo=null,toastId;
  let audio=null,wake=null,wakePending=false,installPrompt=null,offline='Waiting for offline setup…';
  const ui={page:'muscles',filter:'all',search:'',group:null,exercise:null,folder:null,modal:null,dockExpanded:false,graph:'volume',graphPoint:null,focusSet:0,plate:{bar:45,plates:[]}};
  try{const raw=localStorage.getItem(key);if(raw){try{state=migrateState(JSON.parse(raw));if(JSON.stringify(state)!==raw)persist(state);}catch{blocked=true;unreadable=raw;warn('Saved data could not be read. It has not been overwritten. Open Settings to export the original or restore a V2 backup.');}}}
  catch{blocked=true;warn('Device storage is unavailable. Logging is disabled. Allow site storage and reopen the app.');}
  function warn(text){$('#warning').hidden=false;$('#warning').textContent=text;}
  function persist(next,recovery=false){
    if(blocked&&!recovery){toast('Storage unavailable. This change was not saved.');return false;}
    try{localStorage.setItem(key,JSON.stringify(next));blocked=false;unreadable=null;$('#warning').hidden=true;return true;}
    catch{warn('Could not save this change. Storage may be full or disabled. Export a backup from Settings.');return false;}
  }
  function buzz(pattern=18){try{if(state.settings.haptics)navigator.vibrate?.(pattern);}catch{}}
  function unlockAudio(){try{if(!state.settings.sound)return;const A=window.AudioContext||window.webkitAudioContext;if(!A)return;audio ||=new A();audio.resume().catch(()=>{});const b=audio.createBufferSource();b.buffer=audio.createBuffer(1,1,audio.sampleRate);b.connect(audio.destination);b.start();}catch{}}
  function alarm(){buzz([180,80,180]);if(!state.settings.sound||audio?.state!=='running')return;try{for(let i=0;i<2;i++){const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime+i*.3;o.frequency.value=660+i*220;g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(.13,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+.23);o.connect(g);g.connect(audio.destination);o.start(t);o.stop(t+.24);}}catch{}}
  function dismissUndo(){undo=null;clearTimeout(toastId);$('#toast').hidden=true;}
  function attachFloating(){const parent=$('#dialog').open?$('#dialog'):document.body;for(const el of [$('#timer-dock'),$('#toast')])if(el.parentElement!==parent)parent.append(el);}
  function toast(message,restore){dismissUndo();undo=restore||null;attachFloating();$('#toast').innerHTML=`<span>${html(message)}</span>${restore?'<button data-action="undo">Undo · 3s</button>':''}`;$('#toast').hidden=false;toastId=setTimeout(dismissUndo,3000);}
  function error(message){const el=$('#form-error');if(el){el.textContent=message;el.focus();}else toast(message);}
  function mutate(fn,{render=true,message='',canUndo=false}={}){
    const before=copy(state),next=copy(state);try{fn(next);}catch(e){error(e.message);return false;}
    if(!persist(next))return false;dismissUndo();state=next;if(render)renderAll();
    if(message)toast(message,canUndo?()=>{if(persist(before)){state=before;renderAll();}}:undefined);return true;
  }
  function pips(exerciseId){const c=completion(state,exerciseId,today),records=dailyRecords(state,exerciseId,today);return `<span class="pips ${c.complete?'complete':''}" aria-label="${c.done} of ${c.target} sets"><span aria-hidden="true">${Array.from({length:c.target},(_,i)=>`<i class="${records.some(r=>r.index===i)?'done':''}"></i>`).join('')}</span><small>${c.done}/${c.target}</small></span>`;}
  function renderTop(){
    const f=fatigue(state,today);
    $('#top').innerHTML=`<div class="load-row"><div class="load-label"><span class="eyebrow">DAILY FATIGUE</span><div><strong>${f.score}</strong><span>points <i>·</i> <b>${f.count}</b> ${state.fatigueResets[today]?'exercises counted':'exercises done'}</span></div></div><button class="clock-button" data-action="workout" aria-label="Workout stopwatch"><span class="clock-icon" aria-hidden="true">◷</span><span id="stopwatch">00:00</span><small>${state.clock.ended?'ENDED':state.clock.startedAt!==null?'WORKOUT':state.clock.elapsed?'PAUSED':'START'}</small></button></div><div class="daily-line"><span>${state.fatigueResets[today]?'Since fatigue reset':'Today’s benchmark'} <b>6–7 exercises</b></span><span>${(state.clock.startedAt!==null||state.clock.elapsed>0)&&!state.clock.ended?'<button class="end-workout-button" data-action="end-workout">■ End workout</button>':dateLabel(today)}</span></div>
      <div class="active-tray ${state.pinned.length?'has-pins':''}"><div class="tray-label"><span class="eyebrow">ACTIVE <b>${state.pinned.length}/3</b></span>${state.pinned.length?'<button data-action="clear-pins" class="text-button">Clear</button>':'<span>Pin your superset. Stay in your zone.</span>'}</div>${state.pinned.length?`<div class="pin-grid">${state.pinned.map((eid,i)=>{const e=exerciseById(state,eid),status={ready:true};return `<div class="pin-shell"><button class="pin-card ${status.ready?'ready':'recovering'}" data-action="open" data-id="${eid}"><span class="pin-index">${String.fromCharCode(65+i)}</span><strong>${html(e.name)}</strong><span class="pin-readiness">${since(readiness(state,eid,today))}</span><span class="pin-bottom">${pips(eid)}<small data-countdown="${eid}">${state.timers[eid]?'':'↗'}</small></span></button><button class="unpin-button" data-action="pin" data-id="${eid}" aria-label="Unpin ${html(e.name)}">×</button></div>`;}).join('')}</div>`:''}</div>`;
    tickLabels();
  }
  function exerciseRow(e){const c=completion(state,e.id,today),r=readiness(state,e.id,today),pinned=state.pinned.includes(e.id),status={ready:true};return `<details class="exercise ${status.ready?'ready':'recovering'} ${c.complete?'complete':c.done?'in-progress':''} ${e.parent?'alternate':''}" data-exercise="${e.id}" ${ui.exercise===e.id?'open':''}><summary><div class="exercise-summary"><span class="exercise-name">${html(e.name)}</span>${readinessBadge(e.id)}<span class="exercise-meta">${e.parent?'Alternate · ':''}${since(r)} <i>·</i> T${e.tier} / ${points(e)} pts</span></div>${pips(e.id)}<button class="pin-button ${pinned?'pinned':''}" data-action="pin" data-id="${e.id}" aria-label="${pinned?'Unpin':'Pin'} ${html(e.name)}" aria-pressed="${pinned}">${pinned?'◆':'◇'}</button><span class="chevron" aria-hidden="true">⌄</span></summary>${ui.exercise===e.id?logger(e):''}</details>`;}
  function filtered(exercises){const q=ui.search.toLowerCase().trim();return exercises.filter(e=>!e.archived&&!state.hiddenGroups.includes(e.group)&&(!q||`${e.name} ${state.groups.find(g=>g[0]===e.group)[1]}`.toLowerCase().includes(q))&&(ui.filter==='all'||state.groups.find(g=>g[0]===e.group)[2]===ui.filter));}
  function renderMain(){
    $('#page-title').textContent=ui.page==='muscles'?'Your floor. Your flow.':'Find your station.';
    $('#page-subtitle').textContent=ui.page==='muscles'?'Hold a category or exercise to edit. Ready folders use 3 calendar days.':'Same exercises. One history. Wherever you train.';
    $('#search').placeholder=ui.page==='muscles'?'Find an exercise or muscle…':'Find an exercise in your stations…';
    $('#filters').innerHTML=['all','upper','lower','core'].map(f=>`<button class="filter ${ui.filter===f?'selected':''}" data-action="filter" data-filter="${f}" aria-pressed="${ui.filter===f}">${f==='all'?'All muscles':f==='upper'?'Upper body':f==='lower'?'Lower body':'Core'}</button>`).join('');
    document.querySelectorAll('[data-action=page]').forEach(b=>{b.classList.toggle('selected',b.dataset.page===ui.page);b.setAttribute('aria-current',b.dataset.page===ui.page?'page':'false');});
    const visible=filtered(state.exercises);
    if(ui.page==='muscles'){
      $('#content').innerHTML=state.groups.map(([gid,name])=>{
        const order=['e1','e16','e2','e3','e19','e28','e20','e21','e23','e31','e22','e24','e25'];
        const rank=e=>{const i=order.indexOf(e.parent||e.id);return i<0?100+state.exercises.findIndex(x=>x.id===(e.parent||e.id)):i;};
        const list=visible.filter(e=>e.group===gid).sort((a,b)=>rank(a)-rank(b)||Number(!!a.parent)-Number(!!b.parent));
        if(state.hiddenGroups.includes(gid)||(!list.length&&(ui.search||ui.filter!=='all'&&state.groups.find(g=>g[0]===gid)[2]!==ui.filter)))return '';
        const all=list,status=groupReadiness(state,gid,today),last=status.hit;
        const done=all.filter(e=>completion(state,e.id,today).complete).length;
        return `<details class="muscle ${status.ready?'group-ready':'group-recovering'}" data-group="${gid}" ${ui.group===gid||ui.search?'open':''}><summary><span class="group-icon" aria-hidden="true">${String(state.groups.findIndex(g=>g[0]===gid)+1).padStart(2,'0')}</span><span class="group-name">${html(name)}<small>${list.length} ${list.length===1?'exercise':'exercises'} · ${readinessLabel(status)}${done?` · ${done} done today`:''}</small></span><button class="text-button" data-action="edit-group" data-id="${gid}" aria-label="Edit ${html(name)}">Edit</button><span class="group-last">${last?`Latest: ${last.days===0?'today':`${last.days}d ago`}`:'No recent hit'}</span><span class="chevron" aria-hidden="true">⌄</span></summary><div class="exercise-list">${list.map(exerciseRow).join('')}</div></details>`;
      }).join('') || '<div class="empty">No matching exercises.</div>';
    }else{
      $('#content').innerHTML=`<button class="new-folder" data-action="new-folder"><span>＋</span> Create station folder</button>`+state.folders.map(f=>{
        const list=f.exerciseIds.map(eid=>exerciseById(state,eid)).filter(e=>visible.some(v=>v.id===e.id));
        if(ui.search&&!list.length)return '';
        return `<details class="muscle station" data-folder="${f.id}" ${ui.folder===f.id||ui.search?'open':''}><summary><span class="folder-icon" aria-hidden="true">▱</span><span class="group-name">${html(f.name)}<small>${f.exerciseIds.length} linked exercises</small></span><button class="text-button" data-action="edit-folder" data-id="${f.id}" aria-label="Edit ${html(f.name)}">Edit</button><span class="chevron" aria-hidden="true">⌄</span></summary><div class="exercise-list">${list.length?list.map(exerciseRow).join(''):'<p class="empty">No matching exercises here. Use Edit to add some.</p>'}</div></details>`;
      }).join('');
    }
  }
  function logger(e){
    const r=readiness(state,e.id,today),c=completion(state,e.id,today),records=dailyRecords(state,e.id,today),previous=previousSession(state,e.id,today),unit=state.settings.unit;
    const prior=previous[0];
    return `<section class="logger" data-logger="${e.id}"><div class="prescription"><span>${e.reps} reps</span><span>Target RIR: ${html(e.rir||'Not set')}</span><span>${duration(e.rest[0])}${e.rest[0]!==e.rest[1]?`–${duration(e.rest[1])}`:''} rest</span><span>T${e.tier} · ${points(e)} pts</span></div>

      <div class="memory-line"><span>${r?`Last hit <strong>${dateLabel(r.day)}</strong>`:'No hit in this training block'}</span>${prior?`<small>Previous session: ${dateLabel(prior.day)}</small>`:'<small>Build your baseline.</small>'}</div>
      <label class="seat-label"><span>Pin/Seat Pos</span><input type="text" maxlength="200" autocomplete="off" data-seat="${e.id}" value="${html(e.seat)}" placeholder="${html(e.seat||'e.g. Chair 2')}"></label>
      <div class="set-head"><span>SET</span><span>${unit.toUpperCase()}</span><span>REPS</span><span title="Lengthened partials">P</span><span>DONE</span></div>
      <div class="sets">${Array.from({length:c.target},(_,index)=>{
        const rec=records.find(r=>r.index===index),draft=state.drafts[draftKey(today,e.id,index)]||{weight:'',reps:'',partial:false},last=previousSet(state,e.id,index,today);
        const weight=rec?inUnit(rec,unit):draft.weight,reps=rec?rec.reps:draft.reps;
        return `<div class="set-block ${rec?'logged':''}" data-row="${index}" data-id="${e.id}"><div class="set-row"><span class="set-num">${index+1}</span><input type="number" step="any" min="0" max="10000" inputmode="decimal" autocomplete="off" aria-label="Set ${index+1} weight in ${unit}" data-field="weight" data-id="${e.id}" data-index="${index}" value="${html(weight)}" placeholder="${last?inUnit(last,unit):'—'}" ${rec?'disabled':''}><input type="number" step="1" min="1" max="999" inputmode="numeric" autocomplete="off" aria-label="Set ${index+1} full reps" data-field="reps" data-id="${e.id}" data-index="${index}" value="${html(reps)}" placeholder="${last?last.reps:'—'}" ${rec?'disabled':''}><label class="partial-label" title="Lengthened partials after full reps"><input type="checkbox" data-field="partial" data-id="${e.id}" data-index="${index}" aria-label="Set ${index+1} included lengthened partials" ${rec?.partial||!rec&&draft.partial?'checked':''} ${rec?'disabled':''}><span aria-hidden="true">P</span></label><button class="set-check" role="checkbox" aria-checked="${!!rec}" data-action="set" data-id="${e.id}" data-index="${index}" aria-label="${rec?'Uncheck':'Complete'} set ${index+1}">${rec?'✓':'+'}</button></div><div class="row-memory"><span>${rec?`Saved ${exactTime(rec.at)}${rec.partial?' · + partials':''}`:last?`Last: ${metric(last)} · ${dateLabel(last.day)}`:'No previous set · 0 = unweighted'}</span>${!rec&&last?`<button data-action="copy" data-id="${e.id}" data-index="${index}" aria-label="Copy previous session into set ${index+1}">↺ Use last</button>`:''}</div></div>`;
      }).join('')}</div>
      <div class="logger-tools"><div class="target-stepper"><button data-action="target-minus" data-id="${e.id}" aria-label="Remove one planned set">−</button><span>${c.target} sets</span><button data-action="target-plus" data-id="${e.id}" aria-label="Add one planned set">+</button></div><button data-action="tools" data-id="${e.id}">± Load tools</button></div>

      <div class="logger-links"><button data-action="edit-exercise" data-id="${e.id}">Edit exercise</button><button data-action="graph" data-id="${e.id}">↗ Progression</button><button data-action="alternate" data-id="${e.id}">＋ Custom alternate</button></div>
      <div class="logger-bottom"><span>${c.complete?(state.fatigueResets[today]?.includes(e.id)?'✓ Complete · fatigue reset':`✓ Complete · ${points(e)} fatigue points`):`${c.done}/${c.target} logged · points after all sets`}</span><button class="text-button" data-action="rest-setting" data-id="${e.id}">Rest ${duration(state.rest[e.id]||(e.rest[0]+e.rest[1])/2)}</button></div>
    </section>`;
  }

  // Dialog contents are rendered separately from the persistent timer dock.
  function head(kicker,title,back=false){return `<header class="dialog-head"><div><span class="eyebrow">${html(kicker)}</span><h2 id="dialog-title">${html(title)}</h2></div><button class="icon-button" data-action="${back?'back':'close'}" aria-label="${back?'Back to exercise':'Close'}">${back?'←':'×'}</button></header>`;}
  function showModal(kind,eid=null,extra={}){ui.modal={kind,id:eid,...extra};renderModal();if(!$('#dialog').open)$('#dialog').showModal();$('#dialog').scrollTop=0;attachFloating();}
  function closeModal(){$('#dialog').close();ui.modal=null;renderTop();renderMain();attachFloating();}
  function renderModal(){
    if(!ui.modal)return;
    const {kind,id:eid}=ui.modal,e=eid?exerciseById(state,eid):null;
    let content='';
    if(kind==='log')content=head(state.groups.find(g=>g[0]===e.group)[1],e.name)+`<div class="dialog-body">${state.pinned.length>1?`<nav class="superset-tabs" aria-label="Active superset">${state.pinned.map((pid,i)=>`<button data-action="open" data-id="${pid}" class="${pid===eid?'selected':''}"><span>${String.fromCharCode(65+i)}</span>${html(exerciseById(state,pid).name)}<small data-countdown="${pid}"></small></button>`).join('')}</nav>`:''}${logger(e)}</div>`;
    if(kind==='alternate')content=head('INDEPENDENT HISTORY','Add custom alternate',true)+`<form id="alternate-form" class="dialog-body" data-parent="${eid}"><p class="hint">Under ${html(e.name)}. This variation gets its own history, readiness, seat memory and fatigue points.</p><label>Name<input name="name" type="text" maxlength="100" required placeholder="e.g. Lying Leg Curl" autocomplete="off"></label><div class="form-grid"><label>Tier<select name="tier">${[1,2,3].map(t=>`<option value="${t}" ${t===e.tier?'selected':''}>Tier ${t} · ${4-t} pts</option>`).join('')}</select></label><label>Sets<input type="number" name="sets" value="${e.sets}" min="1" max="10" required></label></div><label>Rep range<input type="text" name="reps" value="${html(e.reps)}" maxlength="30" required></label><label>Target RIR<input name="rir" maxlength="5" value="${html(e.rir||'')}" placeholder="e.g. 1–2"></label><p class="hint">Rest is inherited from the parent. This alternate’s last-hit date remains independent.</p><button class="primary full" type="submit">Create alternate</button><p id="form-error" class="error" tabindex="-1" role="alert"></p></form>`;
    if(kind==='folder'){
      const folder=state.folders.find(f=>f.id===ui.modal.folderId);
      content=head('LINKED, NOT DUPLICATED',folder?'Edit station':'Create a station')+`<form id="folder-form" class="dialog-body" data-folder="${folder?.id||''}"><label>Station name<input name="name" type="text" maxlength="60" required value="${html(folder?.name||'')}" placeholder="e.g. Cable Station"></label><p class="hint">Select exercises to link. Logs and seat settings update everywhere.</p><div class="folder-checklist">${state.groups.map(([gid,name])=>`<fieldset><legend>${html(name)}</legend>${state.exercises.filter(e=>e.group===gid&&!e.archived).map(e=>`<label class="folder-choice"><input type="checkbox" name="exercise" value="${e.id}" ${folder?.exerciseIds.includes(e.id)?'checked':''}><span>${html(e.name)}${e.parent?'<small>Custom alternate</small>':''}</span></label>`).join('')}</fieldset>`).join('')}</div><button type="submit" class="primary full">Save station</button>${folder?`<button type="button" class="danger full" data-action="delete-folder" data-id="${folder.id}">Delete folder · keep exercise history</button>`:''}<p id="form-error" class="error" tabindex="-1" role="alert"></p></form>`;
    }
    if(kind==='settings')content=head('LOCAL. PRIVATE. YOURS.','Settings')+`<div class="dialog-body"><label class="setting-row"><span>Weight unit<small>Original history units are preserved.</small></span><select id="units"><option value="lbs" ${state.settings.unit==='lbs'?'selected':''}>lbs</option><option value="kg" ${state.settings.unit==='kg'?'selected':''}>kg</option></select></label><label class="setting-row"><span>Timer sound</span><input type="checkbox" id="sound" ${state.settings.sound?'checked':''}></label><label class="setting-row"><span>Haptic feedback</span><input type="checkbox" id="haptics" ${state.settings.haptics?'checked':''}></label><div class="settings-actions"><button data-action="export">↓ Export / Backup Data</button><button data-action="import">↑ Restore V2 Backup</button>${unreadable!==null?'<button data-action="raw-export">Download unreadable original</button>':''}<button data-action="install">↗ Install app</button><button class="danger" data-action="reset-fatigue">Reset Daily Fatigue</button><button class="danger" data-action="reset-cooldowns">Reset All Cooldowns</button></div><input id="backup-file" type="file" accept=".json,application/json" hidden><p class="hint">Reset Daily Fatigue clears today’s score and counted exercises, keeping set checkmarks and cooldowns. Newly completed exercises add points again. Resetting cooldowns marks every folder Ready and clears its last-hit indicator for this block. It preserves weights, reps, dates, partial flags, seat positions and today’s completed sets / points. Undo is available for 3 seconds.</p><p class="hint">${state.history.length} saved sets · ${state.exercises.length} exercises<br>${html(offline)}</p><p class="hint">Rest days count local calendar midnights, not 24-hour periods. A muscle folder becomes Ready three calendar days after its most recent logged set. Exercise timestamps help you choose rotations; logging is always available. These are planning labels, not a physiological recovery measurement. Tier points are your planning score.</p><p class="hint">Export before clearing site data, changing browsers or moving devices. Phone settings can block wake lock, sound or vibration. Background / locked-screen alerts are not guaranteed.</p><p id="form-error" class="error" tabindex="-1" role="alert"></p></div>`;
    if(kind==='workout')content=head('NO RUSH. JUST GOOD SETS.','Workout clock')+`<div class="dialog-body"><div class="big-clock" id="big-clock">${duration(Math.floor(workoutMillis(state)/1000))}</div><p class="hint">Starts with your first logged set, or start it manually. Keeps elapsed time through navigation and reloads.</p><div class="button-row"><button class="primary" data-action="clock-toggle">${state.clock.ended?'Start new workout':state.clock.startedAt!==null?'Pause':state.clock.elapsed?'Resume':'Start'}</button><button data-action="end-workout" class="danger" ${state.clock.ended?'disabled':''}>End workout</button></div><p class="hint">End workout saves the final duration, stops all rest timers and clears the active tray. Your logs, cooldowns and fatigue stay intact. Reset fatigue separately in Settings.</p></div>`;
    if(kind==='rest')content=head('EXERCISE TIMER',e.name,true)+`<form id="rest-form" class="dialog-body" data-id="${eid}"><label>Rest in seconds<input type="number" min="15" max="900" step="1" name="seconds" value="${state.rest[eid]||(e.rest[0]+e.rest[1])/2}" required></label><p class="hint">Prescribed range: ${duration(e.rest[0])}–${duration(e.rest[1])}. Applies to this exercise’s next checked set.</p><button class="primary full">Save rest duration</button><p id="form-error" class="error" tabindex="-1" role="alert"></p></form>`;
    if(kind==='edit-exercise')content=head('YOUR EXERCISE','Edit exercise')+`<form id="exercise-edit-form" class="dialog-body" data-id="${eid}"><label>Name<input name="name" maxlength="100" required value="${html(e.name)}"></label><label>Target RIR<input name="rir" maxlength="5" value="${html(e.rir||'')}" placeholder="e.g. 1–2"></label><label>Category<select name="group">${state.groups.filter(g=>!state.hiddenGroups.includes(g[0])).map(g=>`<option value="${g[0]}" ${e.group===g[0]?'selected':''}>${html(g[1])}</option>`).join('')}</select></label><button class="primary full">Save changes</button><button type="button" class="danger full" data-action="archive-exercise" data-id="${eid}">Delete exercise</button><p class="hint">Deleting removes this exercise and its alternates from active lists. History remains in your backup. Undo is available for 3 seconds.</p><p id="form-error" class="error" role="alert"></p></form>`;
    if(kind==='edit-group'){
      const gid=ui.modal.groupId,g=state.groups.find(g=>g[0]===gid);
      content=head('YOUR CATEGORY','Edit category')+`<form id="group-edit-form" class="dialog-body" data-group="${gid}"><label>Name<input name="name" maxlength="60" required value="${html(g[1])}"></label><button class="primary full">Save name</button><button type="button" data-action="add-exercise" data-id="${gid}">＋ Add an exercise</button><label>Move or restore an existing exercise here<select name="existing"><option value="">Choose exercise…</option>${state.exercises.filter(e=>e.group!==gid||e.archived).map(e=>`<option value="${e.id}">${html(e.name)}${e.archived?' (deleted)':''}</option>`).join('')}</select></label><button type="button" data-action="move-existing" data-id="${gid}">Add selected exercise</button><button type="button" class="danger full" data-action="archive-group" data-id="${gid}">Delete category and its exercises</button><p class="hint">Saved history stays in your backup. Undo is available for 3 seconds.</p><p id="form-error" class="error" role="alert"></p></form>`;
    }
    if(kind==='new-exercise')content=head('YOUR MOVEMENT','Add exercise')+`<form id="exercise-new-form" class="dialog-body" data-group="${ui.modal.groupId}"><label>Name<input name="name" maxlength="100" required></label><div class="form-grid"><label>Tier<select name="tier"><option value="1">Tier 1 · 3 pts</option><option value="2" selected>Tier 2 · 2 pts</option><option value="3">Tier 3 · 1 pt</option></select></label><label>Sets<input name="sets" type="number" min="1" max="10" value="3" required></label></div><label>Rep range<input name="reps" maxlength="30" value="8–12" required></label><label>Target RIR<input name="rir" maxlength="5" placeholder="e.g. 1–2"></label><label>Rest (seconds)<input name="rest" type="number" min="15" max="900" value="120" required></label><button class="primary full">Add exercise</button><p id="form-error" class="error" role="alert"></p></form>`;
    if(kind==='tools')content=toolsPanel(e);
    if(kind==='graph')content=graphPanel(e);
    $('#dialog-content').innerHTML=content;
    tickLabels();
  }
  function toolsPanel(e){
    const unit=state.settings.unit,plateList=unit==='lbs'?[45,35,25,10,5,2.5]:[20,15,10,5,2.5,1.25];
    const total=Number(ui.plate.bar)+2*ui.plate.plates.reduce((n,p)=>n+p,0),c=completion(state,e.id,today);
    return head('TAPS, NOT MENTAL MATH','Load tools',true)+`<div class="dialog-body"><label>Apply to set<select id="tool-set">${Array.from({length:c.target},(_,i)=>`<option value="${i}" ${i===ui.focusSet?'selected':''} ${dailyRecords(state,e.id,today).some(r=>r.index===i)?'disabled':''}>Set ${i+1}</option>`).join('')}</select></label><p class="hint">Quick steps use the unfinished input, or its previous-session weight when empty.</p><div class="button-row">${[-5,5,10].map(n=>`<button data-action="quick-weight" data-id="${e.id}" data-amount="${n}">${n>0?'+':''}${n} ${unit}</button>`).join('')}</div><div class="plate-box"><span class="eyebrow">SYMMETRICAL PLATE LOADING</span><div class="plate-total">${total.toLocaleString()}<small>${unit} total</small></div><label>Bar / sled starting weight<input id="plate-bar" type="number" min="0" max="1000" step="any" value="${ui.plate.bar}"></label><p class="hint">Tap a plate to add it to <strong>each side</strong>.</p><div class="plate-buttons">${plateList.map(n=>`<button data-action="plate-add" data-amount="${n}">${n}</button>`).join('')}</div><p class="plate-list">Per side: ${ui.plate.plates.length?ui.plate.plates.join(' + '):'No plates'}</p><div class="button-row"><button data-action="plate-remove">Remove last pair</button><button data-action="plate-clear">Clear plates</button></div><button class="primary full" data-action="plate-apply" data-id="${e.id}">Use ${total} ${unit}</button></div><p id="form-error" class="error" tabindex="-1" role="alert"></p></div>`;
  }
  function graphPanel(e){
    const series=graphSeries(state,e.id,ui.graph),volume=ui.graph==='volume',unit=state.settings.unit;
    const width=380,height=220,pad={left:52,right:16,top:20,bottom:38};
    const max=Math.max(1,...series.map(p=>p.value)),minDay=series.length?ordinal(series[0].day):0,maxDay=series.length?ordinal(series.at(-1).day):0;
    const x=p=>pad.left+(maxDay===minDay?(width-pad.left-pad.right)/2:(ordinal(p.day)-minDay)/(maxDay-minDay)*(width-pad.left-pad.right));
    const y=p=>height-pad.bottom-p.value/max*(height-pad.top-pad.bottom);
    const chosen=series[ui.graphPoint ?? series.length-1];
    const chart=series.length?`<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="chart-title chart-desc"><title id="chart-title">${html(e.name)}: ${volume?'daily volume load':'estimated one-rep max'}</title><desc id="chart-desc">${series.length} training days. Values are also listed in the table below. Select a point to inspect it.</desc>${[0,.5,1].map(v=>`<line x1="${pad.left}" x2="${width-pad.right}" y1="${height-pad.bottom-v*(height-pad.top-pad.bottom)}" y2="${height-pad.bottom-v*(height-pad.top-pad.bottom)}" stroke="#283125"/><text x="${pad.left-8}" y="${height-pad.bottom-v*(height-pad.top-pad.bottom)+4}" text-anchor="end">${Math.round(max*v).toLocaleString()}</text>`).join('')}<path d="${series.map((p,i)=>`${i?'L':'M'} ${x(p)} ${y(p)}`).join(' ')}" fill="none" stroke="#cefb79" stroke-width="2.5"/>${series.map((p,i)=>`<circle cx="${x(p)}" cy="${y(p)}" r="${i===(ui.graphPoint??series.length-1)?6:4}" fill="#cefb79" stroke="#11180b" stroke-width="2" data-point="${i}" tabindex="0" role="button" aria-label="${dateLabel(p.day)}: ${p.value} ${unit}${volume?' reps':''}"><title>${dateLabel(p.day)} · ${p.value.toLocaleString()}</title></circle>`).join('')}<text x="${pad.left}" y="${height-10}">${dateLabel(series[0].day)}</text>${series.length>1?`<text x="${width-pad.right}" y="${height-10}" text-anchor="end">${dateLabel(series.at(-1).day)}</text>`:''}</svg>`:'<div class="empty chart-empty">Your next baseline starts here.<br>Log a set to build this graph.</div>';
    return head('YOUR PROGRESS',e.name,true)+`<div class="dialog-body"><div class="segmented"><button data-action="graph-metric" data-metric="volume" class="${volume?'selected':''}">Volume load</button><button data-action="graph-metric" data-metric="e1rm" class="${!volume?'selected':''}">Estimated 1RM</button></div><div class="graph-value"><strong>${chosen?chosen.value.toLocaleString():'—'}</strong><span>${volume?`${unit} × reps`:unit}${chosen?` · ${dateLabel(chosen.day)}`:''}</span></div>${chart}<p class="hint">${volume?'Daily sum of recorded weight × full reps. Partial flags are retained, but extra partial reps are not counted. More sets also raise volume.':'Best Epley estimate per day: weight × (1 + full reps ÷ 30). Only sets with 1–12 reps, nonzero load and no partial flag qualify. This is an estimate, not a tested maximum.'} Values use ${unit}. For dumbbells, use a consistent per-hand convention.</p>${series.length?`<details class="data-table"><summary>Show daily values (${series.length})</summary><table><thead><tr><th>Date</th><th>${volume?'Volume load':'e1RM'}</th></tr></thead><tbody>${[...series].reverse().map(p=>`<tr><td>${dateLabel(p.day)}</td><td>${p.value.toLocaleString()}</td></tr>`).join('')}</tbody></table></details>`:''}<details class="data-table"><summary>Set history (${state.history.filter(r=>r.exerciseId===e.id).length})</summary>${[...state.history].reverse().filter(r=>r.exerciseId===e.id).map(r=>`<div class="history-row"><span>${exactTime(r.at)}<small>Set ${r.index+1}</small></span><b>${metric(r)}</b></div>`).join('')||'<p class="hint">No sets yet.</p>'}</details></div>`;
  }
  function renderDock(){
    const timers=Object.entries(state.timers).sort((a,b)=>a[1].end-b[1].end),dock=$('#timer-dock');
    dock.hidden=!timers.length;document.body.classList.toggle('has-timers',!!timers.length);attachFloating();
    if(!timers.length){releaseWake();return;}
    const first=timers[0],e=exerciseById(state,first[0]);
    dock.innerHTML=`<div class="dock-summary"><button data-action="dock-toggle" class="dock-main" aria-expanded="${ui.dockExpanded}"><span class="dock-time" data-countdown="${e.id}"></span><span><strong>${html(e.name)}</strong><small>${timers.length} independent ${timers.length===1?'timer':'timers'} <i>·</i> <span id="wake-label">Screen awake</span></small></span><b aria-hidden="true">${ui.dockExpanded?'⌄':'⌃'}</b></button><button class="dock-add" data-action="timer-plus" data-id="${e.id}" aria-label="Add 30 seconds to ${html(e.name)}">+30</button></div>${ui.dockExpanded?`<div class="timer-list">${timers.map(([eid])=>`<div class="timer-item"><button class="timer-exercise" data-action="open" data-id="${eid}">${html(exerciseById(state,eid).name)}<strong data-countdown="${eid}"></strong></button><button data-action="timer-minus" data-id="${eid}" aria-label="Subtract 30 seconds">−30</button><button data-action="timer-plus" data-id="${eid}" aria-label="Add 30 seconds">+30</button><button data-action="timer-stop" data-id="${eid}" aria-label="Stop ${html(exerciseById(state,eid).name)} timer">×</button></div>`).join('')}</div>`:''}`;
    tickLabels();acquireWake();measureDock();
  }
  function measureDock(){document.documentElement.style.setProperty('--dock-space',$('#timer-dock').hidden?'0px':`${$('#timer-dock').getBoundingClientRect().height+16}px`);}
  async function acquireWake(){if(wake||wakePending||!Object.keys(state.timers).length||document.visibilityState!=='visible'||!navigator.wakeLock)return;wakePending=true;try{const lock=await navigator.wakeLock.request('screen');if(!Object.keys(state.timers).length){await lock.release();return;}wake=lock;lock.addEventListener('release',()=>{if(wake===lock)wake=null;tickLabels();});}catch{}finally{wakePending=false;tickLabels();}}
  function releaseWake(){const lock=wake;wake=null;lock?.release().catch(()=>{});measureDock();}
  function tickLabels(){
    document.querySelectorAll('[data-countdown]').forEach(el=>{const timer=state.timers[el.dataset.countdown];el.textContent=timer?duration(Math.max(0,Math.ceil((timer.end-Date.now())/1000))):'';});
    const elapsed=duration(Math.floor(workoutMillis(state)/1000));if($('#stopwatch'))$('#stopwatch').textContent=elapsed;if($('#big-clock'))$('#big-clock').textContent=elapsed;
    if($('#wake-label'))$('#wake-label').textContent=wake?'screen awake':'wake lock off';
  }
  function tick(){
    const day=localDay();if(day!==today){today=day;dismissUndo();renderAll();toast('A new calendar day. Today’s sets and fatigue start fresh.');}
    const ended=Object.entries(state.timers).filter(([,t])=>t.end<=Date.now());
    if(ended.length){const next=copy(state);ended.forEach(([eid])=>delete next.timers[eid]);if(persist(next))state=next;else ended.forEach(([eid])=>delete state.timers[eid]);renderDock();alarm();const names=ended.map(([eid])=>exerciseById(state,eid).name).join(', ');$('#announce').textContent=`Rest complete: ${names}`;if(!undo)toast(`Ready: ${names}`);}
    tickLabels();
  }
  function renderAll(){renderTop();renderMain();renderModal();renderDock();}
  function currentRow(eid,index){const scope=$('#dialog').open?$('#dialog-content'):$('#content');return scope.querySelector(`[data-row="${index}"][data-id="${eid}"]`);}
  function focusNext(eid){const records=dailyRecords(state,eid,today),index=Array.from({length:targetSets(state,eid,today)},(_,i)=>i).find(i=>!records.some(r=>r.index===i));if(index!==undefined){ui.focusSet=index;const input=currentRow(eid,index)?.querySelector('[data-field=weight]');input?.focus({preventScroll:true});input?.scrollIntoView({block:'nearest',behavior:'auto'});}}
  function openExercise(eid){showModal('log',eid);}
  function download(text,name){const url=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  async function restore(file){if(!file)return;try{if(file.size>40*1024*1024)throw Error('Choose a V2 backup smaller than 40 MB.');const next=migrateState(JSON.parse(await file.text()));if(!confirm(`Restore ${next.history.length} sets? This replaces your current V2 data. Export a backup first if you want to keep it.`))return;if(persist(next,true)){state=next;dismissUndo();renderAll();toast('Backup restored.');}}catch(e){error(e instanceof SyntaxError?'That file is not valid JSON. Existing data is unchanged.':e.message);}}
  async function install(){if(installPrompt){const p=installPrompt;installPrompt=null;await p.prompt();return;}error('Open the HTTPS app in Chrome → browser menu → Install app / Add to Home screen. On iPhone: Safari → Share → Add to Home Screen.');}
  function applyLoad(eid,weight){const index=ui.focusSet;if(!Number.isFinite(weight)||weight<0||weight>10000){error('Choose a load from 0 to 10,000.');return;}if(dailyRecords(state,eid,today).some(r=>r.index===index)){error('Choose an unfinished set.');return;}if(mutate(s=>writeDraft(s,eid,index,'weight',String(Math.round(weight*100)/100),today),{render:false})){openExercise(eid);renderMain();currentRow(eid,index)?.querySelector('[data-field=reps]')?.focus();}}

  document.addEventListener('click',event=>{
    const point=event.target.closest('[data-point]');if(point){ui.graphPoint=Number(point.dataset.point);renderModal();return;}
    const b=event.target.closest('[data-action]');if(!b)return;const a=b.dataset.action,eid=b.dataset.id,index=Number(b.dataset.index);
    if(b.closest('summary'))event.preventDefault();
    if(a==='edit-exercise'){showModal('edit-exercise',eid);return;}
    if(a==='edit-group'){showModal('edit-group',null,{groupId:eid});return;}
    if(a==='add-exercise'){showModal('new-exercise',null,{groupId:eid});return;}
    if(a==='move-existing'){const selected=$('#group-edit-form select').value;if(!selected)return;if(mutate(s=>moveExercise(s,selected,eid),{render:false})){closeModal();renderAll();}return;}
    if(a==='archive-exercise'||a==='archive-group'){
      if(mutate(s=>a==='archive-exercise'?archiveExercise(s,eid):archiveGroup(s,eid),{render:false,message:'Removed from active lists. History kept.',canUndo:true})){closeModal();renderAll();}return;
    }
    if(a==='undo'){const fn=undo;dismissUndo();fn?.();return;}
    if(a==='close'){closeModal();return;}
    if(a==='back'){openExercise(ui.modal.id);return;}
    if(a==='page'){ui.page=b.dataset.page;ui.exercise=null;renderMain();return;}
    if(a==='filter'){ui.filter=b.dataset.filter;renderMain();return;}
    if(a==='open'){openExercise(eid);return;}
    if(a==='pin'){mutate(s=>togglePin(s,eid));return;}
    if(a==='clear-pins'){mutate(s=>{s.pinned=[];});return;}
    if(a==='set'){
      if(localDay()!==today){today=localDay();renderAll();toast('Midnight crossed. Review today’s inputs before logging.');return;}
      unlockAudio();const row=currentRow(eid,index),record=dailyRecords(state,eid,today).find(r=>r.index===index);
      const values={weight:row.querySelector('[data-field=weight]').value,reps:row.querySelector('[data-field=reps]').value,partial:row.querySelector('[data-field=partial]').checked};
      const completedBefore=completion(state,eid,today).complete;
      if(mutate(s=>record?unlogSet(s,eid,index,today):logSet(s,eid,index,values),{message:record?'Set unchecked.':'Set saved.',canUndo:true})){buzz();if(!record){if(!completedBefore&&completion(state,eid,today).complete&&!state.fatigueResets[today]?.includes(eid))$('#announce').textContent=`${exerciseById(state,eid).name} complete. ${points(exerciseById(state,eid))} points added.`;focusNext(eid);}}return;
    }
    if(a==='copy'){if(mutate(s=>copyPrevious(s,eid,index,today))){buzz();currentRow(eid,index)?.querySelector('[data-field=weight]')?.focus({preventScroll:true});}return;}
    if(a==='target-plus'||a==='target-minus'){mutate(s=>changeTarget(s,eid,targetSets(s,eid,today)+(a==='target-plus'?1:-1),today));return;}
    if(a==='graph'){ui.graph='volume';ui.graphPoint=null;showModal('graph',eid);return;}
    if(a==='graph-metric'){ui.graph=b.dataset.metric;ui.graphPoint=null;renderModal();return;}
    if(a==='alternate'){showModal('alternate',eid);return;}
    if(a==='settings'){showModal('settings');return;}
    if(a==='workout'){showModal('workout');return;}
    if(a==='rest-setting'){showModal('rest',eid);return;}
    if(a==='new-folder'){showModal('folder');return;}
    if(a==='edit-folder'){showModal('folder',null,{folderId:eid});return;}
    if(a==='delete-folder'){if(mutate(s=>{s.folders=s.folders.filter(f=>f.id!==eid);},{render:false,message:'Folder removed. History kept.',canUndo:true})){closeModal();renderAll();}return;}
    if(a==='reset-cooldowns'){mutate(resetCooldowns,{message:'Cooldowns reset. History and points kept.',canUndo:true});return;}
    if(a==='clock-toggle'){unlockAudio();mutate(s=>{if(s.clock.startedAt!==null)pauseClock(s);else startWorkout(s);});return;}
    if(a==='end-workout'){mutate(s=>endWorkout(s),{message:'Workout ended. Logs and final time saved.',canUndo:true});return;}
    if(a==='reset-fatigue'){mutate(s=>resetDailyFatigue(s,today),{message:'Daily fatigue reset. Logs and cooldowns kept.',canUndo:true});return;}
    if(a==='dock-toggle'){ui.dockExpanded=!ui.dockExpanded;renderDock();return;}
    if(a==='timer-plus'||a==='timer-minus'||a==='timer-stop'){
      mutate(s=>{const t=s.timers[eid];if(!t)return;if(a==='timer-stop'){delete s.timers[eid];return;}const remaining=Math.max(0,Math.ceil((t.end-Date.now())/1000)),seconds=Math.max(0,Math.min(86400,remaining+(a==='timer-plus'?30:-30)));t.end=Date.now()+seconds*1000;t.duration=Math.max(t.duration,seconds);},{render:false});renderDock();tick();return;
    }
    if(a==='export'){download(JSON.stringify(state,null,2),`flex-log-v2-${today}.json`);return;}
    if(a==='raw-export'){download(unreadable||'','flex-log-unreadable.json');return;}
    if(a==='import'){$('#backup-file').click();return;}
    if(a==='install'){install();return;}
    if(a==='tools'){const unfinished=Array.from({length:targetSets(state,eid,today)},(_,i)=>i).filter(i=>!dailyRecords(state,eid,today).some(r=>r.index===i));if(!unfinished.length){toast('All sets are logged. Add a set to use load tools.');return;}if(!unfinished.includes(ui.focusSet))ui.focusSet=unfinished[0];ui.plate={bar:state.settings.unit==='lbs'?45:20,plates:[]};showModal('tools',eid);return;}
    if(a==='quick-weight'){const draft=state.drafts[draftKey(today,eid,ui.focusSet)],last=previousSet(state,eid,ui.focusSet,today);const base=draft?.weight!==undefined&&draft.weight!==''?Number(draft.weight):last?inUnit(last,state.settings.unit):0;applyLoad(eid,Math.max(0,base+Number(b.dataset.amount)));return;}
    if(a==='plate-add'){ui.plate.plates.push(Number(b.dataset.amount));renderModal();return;}
    if(a==='plate-remove'){ui.plate.plates.pop();renderModal();return;}
    if(a==='plate-clear'){ui.plate.plates=[];renderModal();return;}
    if(a==='plate-apply'){if(String(ui.plate.bar).trim()===''||!Number.isFinite(Number(ui.plate.bar))||Number(ui.plate.bar)<0||Number(ui.plate.bar)>1000){error('Enter a bar / sled weight from 0 to 1,000.');return;}applyLoad(eid,Number(ui.plate.bar)+2*ui.plate.plates.reduce((n,p)=>n+p,0));return;}
  });
  document.addEventListener('keydown',event=>{if(event.target.matches('[data-point]')&&['Enter',' '].includes(event.key)){event.preventDefault();event.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
  $('#content').addEventListener('click',event=>{
    const summary=event.target.closest('summary');if(!summary||event.target.closest('[data-action]'))return;const details=summary.parentElement;
    if(details.matches('[data-group]')){event.preventDefault();ui.group=details.open?null:details.dataset.group;ui.exercise=null;renderMain();}
    if(details.matches('[data-folder]')){event.preventDefault();ui.folder=details.open?null:details.dataset.folder;ui.exercise=null;renderMain();}
    if(details.matches('[data-exercise]')){event.preventDefault();ui.exercise=details.open?null:details.dataset.exercise;renderMain();}
  });
  document.addEventListener('focusin',event=>{if(event.target.matches('[data-field=weight]'))ui.focusSet=Number(event.target.dataset.index);});
  document.addEventListener('input',event=>{
    const el=event.target;
    if(el.id==='search'){ui.search=el.value;renderMain();return;}
    if(el.matches('[data-seat]')){mutate(s=>{exerciseById(s,el.dataset.seat).seat=el.value;},{render:false});return;}
    if(el.matches('[data-field]')){
      const eid=el.dataset.id,index=Number(el.dataset.index),field=el.dataset.field;
      mutate(s=>writeDraft(s,eid,index,field,field==='partial'?el.checked:el.value,today),{render:false});
      if(field!=='partial'){const last=previousSet(state,eid,index,today),previous=last?(field==='weight'?inUnit(last,state.settings.unit):last.reps):null;el.classList.toggle('overload',previous!==null&&el.value!==''&&Number(el.value)>previous);}
    }
    if(el.id==='plate-bar'){ui.plate.bar=el.value;const total=Number(el.value)+2*ui.plate.plates.reduce((n,p)=>n+p,0);$('.plate-total').innerHTML=`${Number.isFinite(total)?total:'—'}<small>${state.settings.unit} total</small>`;const button=$('[data-action=plate-apply]');button.textContent=`Use ${Number.isFinite(total)?total:'—'} ${state.settings.unit}`;}
  });
  document.addEventListener('change',event=>{const el=event.target;
    if(el.id==='units')mutate(s=>changeUnits(s,el.value));
    if(el.id==='sound'){mutate(s=>{s.settings.sound=el.checked;});unlockAudio();}
    if(el.id==='haptics'){mutate(s=>{s.settings.haptics=el.checked;});buzz();}
    if(el.id==='backup-file')restore(el.files[0]);
    if(el.id==='tool-set')ui.focusSet=Number(el.value);
  });
  document.addEventListener('submit',event=>{
    const form=event.target;if(!['alternate-form','folder-form','rest-form','exercise-edit-form','group-edit-form','exercise-new-form'].includes(form.id))return;event.preventDefault();const data=new FormData(form);
    if(form.id==='exercise-edit-form'){if(mutate(s=>{renameExercise(s,form.dataset.id,String(data.get('name')));setRir(s,form.dataset.id,String(data.get('rir')).trim());if(exerciseById(s,form.dataset.id).group!==data.get('group'))moveExercise(s,form.dataset.id,String(data.get('group')));},{render:false})){closeModal();renderAll();}return;}
    if(form.id==='group-edit-form'){if(mutate(s=>renameGroup(s,form.dataset.group,String(data.get('name'))),{render:false})){closeModal();renderAll();}return;}
    if(form.id==='exercise-new-form'){if(mutate(s=>{const created=createExercise(s,form.dataset.group,String(data.get('name')),{tier:Number(data.get('tier')),sets:Number(data.get('sets')),reps:String(data.get('reps')),rest:Number(data.get('rest'))});setRir(s,created.id,String(data.get('rir')).trim());},{render:false})){ui.group=form.dataset.group;closeModal();renderAll();}return;}
    if(form.id==='alternate-form'){let created;const originFolder=ui.page==='stations'?ui.folder:null;
      if(mutate(s=>{created=addAlternate(s,form.dataset.parent,String(data.get('name')),{tier:Number(data.get('tier')),sets:Number(data.get('sets')),reps:String(data.get('reps')).trim()});setRir(s,created.id,String(data.get('rir')).trim());if(originFolder){const f=s.folders.find(f=>f.id===originFolder);if(f&&!f.exerciseIds.includes(created.id))f.exerciseIds.push(created.id);}},{render:false})){renderTop();renderMain();openExercise(created.id);toast('Alternate added with independent history.');}
    }
    if(form.id==='folder-form'){const fid=form.dataset.folder||id();if(mutate(s=>setFolder(s,fid,String(data.get('name')),data.getAll('exercise')),{render:false})){ui.page='stations';ui.folder=fid;closeModal();renderAll();toast('Station saved. All entries stay linked.');}}
    if(form.id==='rest-form'){const seconds=Number(data.get('seconds'));if(mutate(s=>{if(!Number.isInteger(seconds)||seconds<15||seconds>900)throw Error('Choose 15–900 whole seconds.');s.rest[form.dataset.id]=seconds;},{render:false})){openExercise(form.dataset.id);toast('Rest duration saved.');}}
  });
  let hold=null,suppressClickUntil=0;
  function editTarget(target){
    if(target.closest('input,select,textarea,[data-action=pin]'))return null;
    const summary=target.closest('summary');
    if(summary){const d=summary.parentElement;if(d.dataset.exercise)return ()=>showModal('edit-exercise',d.dataset.exercise);if(d.dataset.group)return ()=>showModal('edit-group',null,{groupId:d.dataset.group});if(d.dataset.folder)return ()=>showModal('folder',null,{folderId:d.dataset.folder});}
    const pin=target.closest('.pin-card');if(pin)return ()=>showModal('edit-exercise',pin.dataset.id);
    if(target.closest('#dialog-title')&&ui.modal?.id)return ()=>showModal('edit-exercise',ui.modal.id);
    return null;
  }
  function cancelHold(){if(hold)clearTimeout(hold.timer);hold=null;}
  document.addEventListener('pointerdown',event=>{
    cancelHold();if(event.button!==0)return;const edit=editTarget(event.target);if(!edit)return;
    hold={x:event.clientX,y:event.clientY,timer:setTimeout(()=>{suppressClickUntil=Date.now()+900;cancelHold();buzz();edit();},550)};
  });
  document.addEventListener('pointermove',event=>{if(hold&&Math.hypot(event.clientX-hold.x,event.clientY-hold.y)>10)cancelHold();});
  for(const type of ['pointerup','pointercancel','scroll'])document.addEventListener(type,cancelHold,true);
  document.addEventListener('click',event=>{if(Date.now()<suppressClickUntil){event.preventDefault();event.stopImmediatePropagation();}},true);
  document.addEventListener('contextmenu',event=>{const edit=editTarget(event.target);if(edit){event.preventDefault();cancelHold();if(Date.now()>=suppressClickUntil)edit();}},true);
  document.addEventListener('keydown',event=>{if(event.key==='F2'||event.shiftKey&&event.key==='F10'){const edit=editTarget(event.target);if(edit){event.preventDefault();edit();}}});
  let swipe=null;
  document.addEventListener('pointerdown',event=>{const row=event.target.closest('[data-row]');if(row&&!event.target.closest('input,button,label')&&!row.classList.contains('logged'))swipe={x:event.clientX,y:event.clientY,eid:row.dataset.id,index:Number(row.dataset.row)};else swipe=null;});
  document.addEventListener('pointerup',event=>{if(swipe&&event.clientX-swipe.x>65&&Math.abs(event.clientY-swipe.y)<40){const {eid,index}=swipe;if(mutate(s=>copyPrevious(s,eid,index,today)))buzz();}swipe=null;});
  document.addEventListener('pointercancel',()=>{swipe=null;});
  $('#dialog').addEventListener('close',()=>{if(!$('#dialog').open){ui.modal=null;renderTop();renderMain();attachFloating();}});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){tick();acquireWake();}else releaseWake();});
  window.addEventListener('pageshow',()=>{tick();acquireWake();});
  window.addEventListener('resize',measureDock);
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;});
  window.addEventListener('storage',event=>{if(event.key!==key)return;try{state=event.newValue?migrateState(JSON.parse(event.newValue)):initialState();dismissUndo();renderAll();toast('Updated from another tab.');}catch{blocked=true;warn('Another tab saved unreadable data. Export your current log before reloading.');}});
  if('serviceWorker' in navigator&&(location.protocol==='https:'||['localhost','127.0.0.1'].includes(location.hostname))){navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(()=>navigator.serviceWorker.ready).then(()=>{offline='Offline app files are ready on this device.';if(ui.modal?.kind==='settings')renderModal();}).catch(()=>{offline='Offline setup failed. Reopen while online to retry.';if(ui.modal?.kind==='settings')renderModal();});}
  else offline='Use HTTPS or localhost to enable offline installation.';
  renderAll();tick();setInterval(tick,250);
}
