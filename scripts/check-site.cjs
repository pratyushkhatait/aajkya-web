// Run with Playwright available in NODE_PATH. Checks the production Pages path.
const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../dist');
const types = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.mp4':'video/mp4', '.vtt':'text/vtt', '.woff2':'font/woff2', '.ttf':'font/ttf' };
const server = http.createServer((req,res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (!pathname.startsWith('/aajkya-web/')) { res.writeHead(404).end(); return; }
  let file = path.join(root, pathname.slice('/aajkya-web/'.length) || 'index.html');
  if (!file.startsWith(root + '/')) { res.writeHead(403).end(); return; }
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  const stat = fs.statSync(file);
  const contentType = types[path.extname(file)] || 'application/octet-stream';
  if (req.headers.range) {
    const match = /bytes=(\d+)-(\d*)/.exec(req.headers.range);
    const start = +match[1], end = match[2] ? +match[2] : stat.size - 1;
    res.writeHead(206, { 'Content-Type':contentType, 'Content-Range':`bytes ${start}-${end}/${stat.size}`, 'Accept-Ranges':'bytes', 'Content-Length':end-start+1 });
    fs.createReadStream(file,{start,end}).pipe(res);
  } else { res.writeHead(200, {'Content-Type':contentType,'Content-Length':stat.size}); fs.createReadStream(file).pipe(res); }
});
(async()=>{
  await new Promise(resolve=>server.listen(5174,'127.0.0.1',resolve));
  const browser = await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const url = 'http://127.0.0.1:5174/aajkya-web/';
  const errors=[], failed=[];
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1000}});
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400)failed.push(`${r.status()} ${r.url()}`)});
    await page.goto(url);
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForFunction(()=>document.querySelector('h1')?.textContent.includes('banaye'));
    // Warm each lazy-loaded image before taking a full-page capture.
    for(const image of await page.locator('img[loading="lazy"]').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(i=>i.decode());
    }
    await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
    await page.evaluate(()=>scrollTo(0,0));
    fs.mkdirSync(path.resolve(__dirname,'../test-results'),{recursive:true});
    await page.screenshot({path:path.resolve(__dirname,'../test-results/desktop.png'),fullPage:true});
    await page.getByRole('button',{name:'Play chapter 3: See your portions'}).click();
    await page.waitForFunction(()=>{const v=document.querySelector('video');return v.currentTime>=16&&v.currentTime<22&&!v.paused});
    assert.equal(await page.locator('video').evaluate(v=>v.duration),40);
    await page.locator('video').evaluate(v=>v.pause());
    await page.getByText('Can my family use the same meal plan?',{exact:true}).click();
    assert.equal(await page.locator('.faq-list details[open]').count(),1);
    await page.getByText('Read the video transcript',{exact:true}).click();
    assert.equal(await page.locator('.transcript[open] li').count(),7);
    for(const width of [320,390,768,1440]){
      await page.setViewportSize({width,height:900});
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow at ${width}px`);
    }
    await page.setViewportSize({width:390,height:844});
    await page.evaluate(()=>scrollTo(0,0));
    await page.getByRole('button',{name:'Open navigation'}).click();
    await page.getByRole('navigation').getByRole('link',{name:'Questions',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'false');
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:path.resolve(__dirname,'../test-results/mobile.png'),fullPage:true});
    for(const route of ['privacy.html','terms.html','delete-account.html']){
      await page.goto(url+route);
      assert.ok(await page.locator('h1').textContent());
      await page.getByRole('link',{name:'Back to AajKya'}).click();
      await page.waitForSelector('h1');
    }
    const noJs=await browser.newPage({javaScriptEnabled:false});
    await noJs.goto(url);
    assert.ok((await noJs.locator('h1').textContent()).includes('banaye'));
    assert.equal(await noJs.locator('.faq-list details').count(),6);
    assert.equal(await noJs.locator('a[href*="play.google.com"]').count(),5);
    const rendered = fs.readFileSync(path.join(root,'index.html'),'utf8');
    assert.ok(!rendered.includes('<!--app-html-->'));
    assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
    console.log(JSON.stringify({productionSubpath:'pass',prerenderWithoutJS:'pass',mobileMenu:'pass',faqAndTranscript:'pass',videoPlaybackAndChapterSeek:'pass',legalRoutes:'pass',images:'pass',responsiveWidths:[320,390,768,1440],runtimeErrors:errors},null,2));
  } finally {await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
