const puppeteer = require('puppeteer')
const iPhone = puppeteer.devices['iPhone X'];
const assert = require('assert')

let browser
let page


describe('Chrome Headless Search', async () => {
  it('navigates to search page and open the first resut and assert that', async () => {

    browser = await puppeteer.launch({
      headless: true
    });
    console.log("Browser Status: " + browser.isConnected())
    page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto('https://google.com', {
      waitUntil: "networkidle2"
    });
    console.log(browser.isConnected())

    const query = await page.$("[name='q']")
    await query.click()
    await query.type("NETSOL", {
      delay: 50
    })


    const search = await page.$("[aria-label='Google Search']")
    await search.click()
    await page.waitForNavigation({
      waitUntil: 'networkidle0'
    });

    const result = await page.$("#rso > div > div > div > div > div > a > div > div")
    const title = await page.evaluate(() => document.querySelector('#rso > div > div > div > div > div > a > div > div').textContent);
    const text = await page.evaluate(() => document.querySelector('#rso > div > div > div > div > div > a > div').textContent);
    console.log("Title: " + title)
    console.log("First Result: " + text)

    await result.click()
    await page.waitForNavigation({
      waitUntil: 'networkidle0'
    });
    const url = await page.url()
    console.log(url)

    assert(url, text)
    await page.screenshot({
      path: 'TC2_iPhoneX.png'
    });
    await browser.close()
  }).timeout(160000)
});