#!/usr/bin/env node
// Prepare an AltStore Classic source entry only after a verified IPA is published.
// Run from the repository root with required environment variables.
import fs from "node:fs";
const required=["APP_VERSION","BUILD_VERSION","IPA_URL","IPA_SIZE","RELEASE_DATE","ICON_URL"];
for(const key of required) if(!process.env[key]) throw new Error("Missing "+key);
const {APP_VERSION,BUILD_VERSION,IPA_URL,IPA_SIZE,RELEASE_DATE,ICON_URL}=process.env;
if(!/^\d+\.\d+\.\d+$/.test(APP_VERSION)) throw new Error("Invalid APP_VERSION");
if(!/^\d+$/.test(BUILD_VERSION)||Number(BUILD_VERSION)<1) throw new Error("Invalid BUILD_VERSION");
if(!/^\d{4}-\d{2}-\d{2}$/.test(RELEASE_DATE)||Number.isNaN(Date.parse(RELEASE_DATE))) throw new Error("Invalid RELEASE_DATE");
if(!/^https:\/\//.test(IPA_URL)||!IPA_URL.toLowerCase().endsWith(".ipa")) throw new Error("IPA_URL must be an HTTPS .ipa URL");
if(!/^https:\/\//.test(ICON_URL)) throw new Error("ICON_URL must be HTTPS");
if(!Number.isSafeInteger(Number(IPA_SIZE))||Number(IPA_SIZE)<=0) throw new Error("Invalid IPA_SIZE");
const bundleIdentifier=process.env.BUNDLE_ID||"app.ii.phone";
const version={version:APP_VERSION,buildVersion:BUILD_VERSION,date:RELEASE_DATE,localizedDescription:process.env.RELEASE_NOTES||"版本更新",downloadURL:IPA_URL,size:Number(IPA_SIZE),minOSVersion:process.env.MIN_IOS||"13.0"};
const path="source.json";
const source=fs.existsSync(path)?JSON.parse(fs.readFileSync(path,"utf8")):{name:"RabbitKeeper",identifier:"app.ii.rabbitkeeper.source",sourceURL:"https://lumicho111.github.io/rabbitkeeper-ios/source.json",apps:[]};
const app=source.apps.find(a=>a.bundleIdentifier===bundleIdentifier);
if(source.apps.length && !app) throw new Error("Existing bundle ID differs; refusing to reset app history");
const item=app||{name:"RabbitKeeper",bundleIdentifier,developerName:"RabbitKeeper",subtitle:"互动小手机",localizedDescription:"RabbitKeeper iOS",iconURL:ICON_URL,versions:[]};
if(app&&item.versions.some(v=>v.buildVersion===BUILD_VERSION)) throw new Error("Duplicate buildVersion");
if(app&&Number(BUILD_VERSION)<=Math.max(...item.versions.map(v=>Number(v.buildVersion)||0))) throw new Error("Build number must increase");
if(!app) source.apps.push(item);
item.iconURL=ICON_URL;
item.versions.unshift(version);
fs.writeFileSync(path,JSON.stringify(source,null,2)+"\n");
console.log("Wrote source.json for",APP_VERSION,BUILD_VERSION);
