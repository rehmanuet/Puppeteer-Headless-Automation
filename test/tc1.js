const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];
const screenshot = 'example.png'
try {
(async () => {


  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  // const context = await browser.createIncognitoBrowserContext();

  page.setViewport({
    "width": 1440,
    "height": 10000
  })
  await page.goto('https://google.com',{waitUntil:"networkidle2"});
  console.log(browser.isConnected())
  const query = await page.$("[name='q']")
  await query.click()
  await query.type("NorthBay")
  const search = await page.$("[value='Google Search']")

  await page.waitFor(4000)
  await search.click()

  await page.waitFor(4000)

  const options = await page.$$eval('div > div > div.r > a > h3', options => options.map(option =>option.textContent));
  for(i=0;i<options.length;i++){console.log(options[i])}
  
  const divCount = await page.$$eval('div > div > div.r > a', divCount => divCount.map(divCount => divCount.textContent)); 
  for(i=0;i<divCount.length;i++){console.log(divCount[i])}

  await page.screenshot({path: 'example.png'});

  await browser.close()
  console.log(browser.isConnected())



}
)();

} catch (err) {
  console.error(err)
}