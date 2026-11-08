#!/usr/bin/env node
// Create/update a SideStore-compatible AltSource ONLY after publishing a real IPA.
import fs from 'node:fs';

const required=['APP_VERSION','BUILD_VERSION','IPA_URL','IPA_SIZE','RELEASE_DATE','ICON_URL'];
for(const name of required) if(!process.env[name]) throw new Error('Missing '+name);
const {APP_VERSION,BUILD_VERSION,IPA_URL,IPA_SIZE,RELEASE_DATE,ICON_URL}=process.env;
const SOURCE_URL='https://raw.githubusercontent.com/lumicho111/rabbitkeeper-ios/main/source.json';
const BUNDLE_ID='app.ii.phone';
if(!/^\d+\.\d+\.\d+$/.test(APP_VERSION)) throw new Error('Invalid app version');
if(!/^\d+$/.test(BUILD_VERSION)||Number(BUILD_VERSION)<1) throw new Error('Invalid buildVersion');
if(!/^\d{4}-\d{2}-\d{2}$/.test(RELEASE_DATE)||Number.isNaN(Date.parse(RELEASE_DATE))) throw new Error('Invalid date');
if(!/^https:\/\/github\.com\/lumicho111\/rabbitkeeper-ios\/releases\/download\/[^/]+\/[^/]+\.ipa$/.test(IPA_URL)) throw new Error('IPA URL must point to a GitHub Release in the iOS repository');
if(!/^https:\/\//.test(ICON_URL)) throw new Error('Icon must use HTTPS');
if(!Number.isSafeInteger(Number(IPA_SIZE))||Number(IPA_SIZE)<1) throw new Error('Invalid IPA byte size');

const path='source.json';
const source=fs.existsSync(path)?JSON.parse(fs.readFileSync(path,'utf8')):{
  name:'RabbitKeeper',subtitle:'RabbitKeeper iOS 更新源',
  identifier:'app.ii.rabbitkeeper.source',sourceURL:SOURCE_URL,
  description:'RabbitKeeper 的 iOS 自签安装与更新',iconURL:ICON_URL,apps:[]
};
if(!Array.isArray(source.apps)) throw new Error('Invalid AltSource apps array');
source.sourceURL=SOURCE_URL;
source.iconURL=ICON_URL;
let app=source.apps.find(item=>item.bundleIdentifier===BUNDLE_ID);
if(source.apps.length>0&&!app) throw new Error('Existing app Bundle ID differs; refusing to replace source history');
if(!app){
  app={
    name:'RabbitKeeper',bundleIdentifier:BUNDLE_ID,developerName:'RabbitKeeper',
    subtitle:'互动小手机',localizedDescription:'RabbitKeeper iOS 自签安装版',
    iconURL:ICON_URL,category:'utilities',versions:[]
  };
  source.apps.push(app);
}
if(!Array.isArray(app.versions)) throw new Error('Invalid app versions');
app.iconURL=ICON_URL;
const next={
  version:APP_VERSION,buildVersion:BUILD_VERSION,date:RELEASE_DATE,
  localizedDescription:process.env.RELEASE_NOTES||'RabbitKeeper iOS 更新',
  downloadURL:IPA_URL,size:Number(IPA_SIZE),minOSVersion:process.env.MIN_IOS||'13.0'
};
const duplicate=app.versions.find(v=>String(v.buildVersion)===BUILD_VERSION);
if(duplicate){
  if(duplicate.version!==APP_VERSION||duplicate.downloadURL!==IPA_URL||duplicate.size!==Number(IPA_SIZE)) throw new Error('Build number already published with different artifact');
  console.log('Existing identical version; preserving it (idempotent retry)');
} else {
  const builds=app.versions.map(v=>Number(v.buildVersion));
  if(builds.some(x=>!Number.isFinite(x))) throw new Error('Existing nonnumeric buildVersion');
  if(builds.length&&Number(BUILD_VERSION)<=Math.max(...builds)) throw new Error('Build number must increase for updates');
  app.versions.unshift(next);
}
fs.writeFileSync(path,JSON.stringify(source,null,2)+'\n','utf8');
console.log('Source updated:',APP_VERSION,'build',BUILD_VERSION,'version entries:',app.versions.length);
