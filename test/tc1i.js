const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];
try {
(async () => {
 
  const browser = await puppeteer.launch({headless: false});
  console.log("Browser Status: "+browser.isConnected())
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://google.com',{waitUntil:"networkidle2"});
  console.log(browser.isConnected())
  const query = await page.$("[name='q']")
  await query.click()
  await query.type("NETSOL",{ delay: 50 })
 

  const search = await page.$("[aria-label='Google Search']")
  await search.click()
  await page.waitForNavigation({waitUntil: 'networkidle0'});

  const result= await page.$("#rso > div > div > div > div > div > a > div > div")
 
  const text = await page.evaluate(() => document.querySelector('#rso > div > div > div > div > div > a > div > div').textContent);
  const text1 = await page.evaluate(() => document.querySelector('#rso > div > div > div > div > div > a > div').textContent);
  console.log(text)
  console.log(text1)
  await result.click()
  await page.waitForNavigation({waitUntil: 'networkidle0'});
  
  gitconsole.log(page.url())
 await browser.close()
}
)();

} catch (err) {
  console.error(err)
}