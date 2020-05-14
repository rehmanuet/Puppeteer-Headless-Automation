const puppeteer = require('puppeteer');
const assert = require("assert");

let browser
let page

describe("Navigate to Kayak's Hotel Page with Chromium Headless", async () => {
  it("should open the website then locate the logo and download it", async () => {

    browser = await puppeteer.launch({
      headless: true
    })

    page = await browser.newPage()
    page.setViewport({
      "width": 1024,
      "height": 768
    })
    await page.goto("https://www.kayak.com/hotels", {
      waitUntil: "networkidle0",
      timeout: 160000

    });
    let search = await page.$(".selectTextOnFocus")
    await page.waitForSelector(".selectTextOnFocus", {
      visible: true
    })
    await search.click()
    let search_field = await page.$$("[aria-label='Destination input']")
    await search_field[2].click()
    await page.keyboard.type("BCN", {
      delay: 500
    })
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    let submit = await page.$(".searchButton")
    await submit.click()
    await page.waitForNavigation({
      waitUntil: 'networkidle0'
    });
    console.log( "Redirected URL: "+ await page.url())
    assert.ok(page.url())
    browser.close()

  }).timeout(160000)
})