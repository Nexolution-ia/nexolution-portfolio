import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
const require=createRequire(import.meta.url);
let playwright;
try{playwright=require('playwright')}catch{playwright=require(process.env.PLAYWRIGHT_MODULE || join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'))}
const browser=await playwright.chromium.launch({channel:'chrome',headless:true});
const results=[];
try{
  for(const [name,width,height,motion] of [['desktop-motion',1440,900,'no-preference'],['mobile-motion',390,844,'no-preference'],['reduced-motion',390,844,'reduce']]){
    const page=await browser.newPage({viewport:{width,height},reducedMotion:motion});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const result=await page.evaluate(()=>({canvas:getComputedStyle(document.body).backgroundColor,brand:getComputedStyle(document.documentElement).getPropertyValue('--blue').trim(),titleMotion:getComputedStyle(document.querySelector('.hero h1 span')).animationName,logo:[...document.querySelectorAll('.wordmark img')].every(img=>img.complete&&img.naturalWidth>0),overflow:document.documentElement.scrollWidth>innerWidth}));
    if(!result.logo)throw Error(`${name}: logo did not load`);
    if(result.brand!=='#06213d')throw Error(`${name}: brand navy not applied`);
    if(result.overflow)throw Error(`${name}: horizontal overflow`);
    if((motion==='reduce')!==(result.titleMotion==='none'))throw Error(`${name}: unexpected title motion ${result.titleMotion}`);
    await page.locator('.project-visual').first().scrollIntoViewIfNeeded();
    if(motion==='no-preference'){
      await page.waitForFunction(()=>document.querySelector('.project-visual')?.classList.contains('is-in-view'));
      result.projectMotion=await page.locator('.project-visual').first().evaluate(el=>getComputedStyle(el).animationName);
      if(result.projectMotion!=='project-uncover')throw Error(`${name}: project reveal absent`);
    }else{
      result.projectMotion=await page.locator('.project-visual').first().evaluate(el=>getComputedStyle(el).animationName);
      if(result.projectMotion!=='none')throw Error('Reduced motion still animates projects');
    }
    await page.waitForTimeout(800);
    await page.screenshot({path:`.impeccable/review/${name}.png`});
    if(errors.length)throw Error(`${name}: ${errors.join(', ')}`);
    results.push({name,...result});await page.close();
  }
  await writeFile('.impeccable/review/motion-checks.json',JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
}finally{await browser.close()}
