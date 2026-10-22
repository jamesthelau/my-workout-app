import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
test('the five requested files exist and manifest supports repository-path standalone install',async()=>{
  for(const file of ['index.html','styles.css','app.js','sw.js','manifest.json'])await access(new URL(file,root));
  const m=JSON.parse(await readFile(new URL('manifest.json',root),'utf8'));
  assert.equal(m.display,'standalone');assert.equal(m.scope,'./');assert.equal(m.start_url,'./');
  for(const icon of m.icons)await access(new URL(icon.src,root));
  assert.ok(m.icons.some(i=>i.sizes==='192x192'));assert.ok(m.icons.some(i=>i.sizes==='512x512'));
});
test('offline cache returns app shell/assets and removes only this app’s old cache',async()=>{
  const script=await readFile(new URL('sw.js',root),'utf8');
  const scope='https://example.github.io/flex-log/',handlers={},store=new Map(),deleted=[];
  const self={registration:{scope},location:{origin:'https://example.github.io'},clients:{claim:async()=>{}},addEventListener:(type,fn)=>{handlers[type]=fn;}};
  const current=`flex-log-v2:${scope}:6.2.0`;
  let added=[];
  const caches={open:async()=>({addAll:async urls=>{added=urls;urls.forEach(url=>store.set(url,{url}));},match:async url=>store.get(url)}),keys:async()=>[current,`flex-log-v2:${scope}:old`,'unrelated'],delete:async key=>deleted.push(key)};
  vm.runInNewContext(script,{self,caches,URL,fetch:()=>{throw Error('Unexpected network call');}});
  let pending;handlers.install({waitUntil:p=>{pending=p;}});await pending;
  for(const url of added)await access(new URL(url.slice(scope.length)||'index.html',root));
  handlers.activate({waitUntil:p=>{pending=p;}});await pending;assert.deepEqual(deleted,[`flex-log-v2:${scope}:old`]);
  handlers.fetch({request:{method:'GET',url:scope+'?launch=1',mode:'navigate'},respondWith:p=>{pending=p;}});
  assert.equal((await pending).url,scope+'index.html');
  handlers.fetch({request:{method:'GET',url:scope+'app.js?version=2',mode:'cors'},respondWith:p=>{pending=p;}});
  assert.equal((await pending).url,scope+'app.js');
});
