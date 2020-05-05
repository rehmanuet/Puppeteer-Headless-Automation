const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];


(async () => {


  const browser = await puppeteer.launch({

    headless: false
  });
  // const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  // const context = await browser.createIncognitoBrowserContext();
  // Create a new page in a pristine context.
  // const page = await context.newPage();
  // await page.emulate(iPhone);
  // page.setViewport({
  //   "width": 1440,
  //   "height": 10000
  // })
  await page.goto('https://google.com');
  console.log(browser.isConnected())
  await browser.close()
  // await browser.on('disconnected');
  console.log(browser.isConnected())
}
)();

