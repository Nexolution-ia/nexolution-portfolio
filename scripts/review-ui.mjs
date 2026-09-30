import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
const require=createRequire(import.meta.url);
let playwright;
try{playwright=require('playwright')}catch{playwright=require(process.env.PLAYWRIGHT_MODULE || join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'))}
const browser=await playwright.chromium.launch({channel:'chrome',headless:true});
const results=[];
await mkdir('.impeccable/review',{recursive:true});
try{
 for(const [name,width,height] of [['comp',1536,1024],['desktop',1440,1000],['tablet',1024,900],['mobile',390,844],['small-mobile',320,740]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce',colorScheme:'light'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:`.impeccable/review/${name}.png`,fullPage:name!=='comp'});
  if(name==='mobile')await page.screenshot({path:'.impeccable/review/mobile-viewport.png'});
  const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,headline:document.querySelector('h1').getBoundingClientRect().toJSON(),stage:document.querySelector('.showcase').getBoundingClientRect().toJSON(),button:document.querySelector('.hero .button').getBoundingClientRect().toJSON(),font:getComputedStyle(document.querySelector('h1')).fontFamily}));
  if(layout.overflow)throw Error(`${name}: horizontal overflow`);
  await page.getByRole('tab',{name:'Gestão',exact:true}).click();
  await page.getByRole('button',{name:'Simular avanço de contato'}).click();
  if(await page.locator('[data-column="talk"] #moving-lead').count()!==1)throw Error('CRM interaction failed');
  await page.getByRole('tab',{name:'E-commerce',exact:true}).click();
  await page.getByRole('button',{name:'Simular atualização do pedido'}).click();
  if(await page.locator('#order-status').innerText()!=='Pedido enviado')throw Error('Order interaction failed');
  await page.getByRole('tab',{name:'Atendimento',exact:true}).click();await page.getByRole('button',{name:'Reproduzir fluxo'}).click();
  if(!(await page.locator('#demo-status').innerText()).includes('concluído'))throw Error('Replay reduced motion failed');
  await page.getByRole('button',{name:'CRM & gestão',exact:true}).click();
  if(await page.locator('.project:visible').count()!==2)throw Error('CRM filter failed');
  await page.locator('.project:visible summary').first().click();
  if(await page.locator('.project:visible details[open]').count()!==1)throw Error('Project expansion failed');
  await page.getByRole('button',{name:'Agendamento',exact:true}).click();if(await page.locator('.project:visible').count()!==1)throw Error('Schedule filter failed');
  await page.getByRole('button',{name:'Todas as aplicações'}).click();if(await page.locator('.project:visible').count()!==6)throw Error('All filter failed');
  await page.locator('#tab-atendimento').focus();await page.keyboard.press('ArrowRight');
  if(await page.locator('#tab-gestao').getAttribute('aria-selected')!=='true')throw Error('Keyboard tab navigation failed');
  if(errors.length)throw Error(errors.join('\n'));
  results.push({name,width,height,layout,checks:'tabs, keyboard, demo actions, filters, details, no page errors: passed'});await page.close();
 }
 const normal=await browser.newPage({viewport:{width:1440,height:1000}});await normal.goto('http://127.0.0.1:4173/');await normal.getByRole('button',{name:'Reproduzir fluxo'}).click();await normal.getByRole('tab',{name:'Gestão',exact:true}).click();await normal.waitForTimeout(2500);if(await normal.locator('#demo-action').isDisabled())throw Error('Timer cancellation failed');await normal.close();
 await writeFile('.impeccable/review/checks.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close()}
