// Public Play data only: no developer credentials or hardcoded application inventory.
import gplay from 'google-play-scraper';
import {readFileSync,writeFileSync,existsSync}from'node:fs';
import {fileURLToPath}from'node:url';
import {resolve,dirname}from'node:path';
import {createHash}from'node:crypto';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const config=JSON.parse(readFileSync(resolve(root,'catalog/sources.json'),'utf8'));
const ids=config.developers.map(x=>x.id);if(ids.length!==new Set(ids).size||ids.some(x=>!/^\d{19}$/.test(x)))throw Error('Invalid/duplicate publisher IDs');
const packagePattern=/^[A-Za-z][A-Za-z0-9_]*(\.[A-Za-z][A-Za-z0-9_]*)+$/;
const validIcon=value=>{try{const u=new URL(value);return u.protocol==='https:'&&['googleusercontent.com','gstatic.com','ggpht.com'].some(h=>u.hostname===h||u.hostname.endsWith('.'+h));}catch{return false;}};
const fetchProfile=(id,lang)=>gplay.developer({devId:id,lang,country:config.country,num:250,throttle:3,requestOptions:{timeout:{request:20000},retry:{limit:2}}});
const merged=new Map(),sources=[];
for(const id of ids){
 let base;try{base=await fetchProfile(id,'en');}catch(e){if(e.status===404){sources.push({developerId:id,state:'not_found',appCount:0});console.log('No public profile yet:',id);continue;}throw Error('Publisher fetch failed ('+id+'): '+(e.status||'network/parser'));}
 if(!Array.isArray(base)||base.length>=250)throw Error('Incomplete/oversized publisher result: '+id);
 sources.push({developerId:id,state:'available',appCount:base.length});
 for(const app of base){if(!packagePattern.test(app.appId)||!app.title||!validIcon(app.icon))throw Error('Invalid public app metadata');if(!merged.has(app.appId))merged.set(app.appId,{packageName:app.appId,title:app.title,titles:{en:app.title},iconUrl:app.icon,playUrl:'https://play.google.com/store/apps/details?id='+encodeURIComponent(app.appId),developerId:id});}
 for(const lang of config.languages.filter(x=>x!=='en')){
  try{for(const app of await fetchProfile(id,lang)){const row=merged.get(app.appId);if(row&&row.developerId===id&&app.title)row.titles[lang]=app.title;}}
  catch(e){console.log('Using English title fallback:',id,lang,e.status||'fetch_error');}
 }
 console.log('Public apps read:',id,base.length);
}
const apps=[...merged.values()].sort((a,b)=>a.packageName.localeCompare(b.packageName));
const verifiedDate=new Date().toISOString().slice(0,10);
const signature=createHash('sha256').update(JSON.stringify({verifiedDate,country:config.country,sources,apps})).digest('hex');
const target=resolve(root,'catalog/apps-v1.json');const previous=existsSync(target)?JSON.parse(readFileSync(target,'utf8')):null;
if(previous?.signature===signature){console.log('Catalogue unchanged; no new snapshot needed.');process.exit(0);}
const output={schemaVersion:1,generatedAt:new Date().toISOString(),verifiedDate,referenceCountry:config.country,signature,sources,apps};
writeFileSync(target,JSON.stringify(output,null,2)+'\n');console.log('Updated unified public catalogue:',apps.length,'apps;',sources.length,'publisher sources');
