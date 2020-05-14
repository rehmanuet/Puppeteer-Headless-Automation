const puppeteer = require('puppeteer');
const assert = require('assert')
const request = require("request");
const filesystem = require("fs");

let browser
let page


describe("Chrome Headless Execution", async () => {
  it("should open the website then locate the logo and download it", async () => {

    browser = await puppeteer.launch({
      headless: true
    })
    page = await browser.newPage()
    await page.goto("https://www.uet.edu.pk/", {
      waitUntil: "networkidle2"
    });


    let $imgPath = await page.evaluate(x => {
      return document.querySelector(".logo").src;
    });
    assert.ok($imgPath)
    console.log("Extracted Image URI: " + $imgPath)
    await page.goto($imgPath);

    function download(uri, filename, callback) {
      request.head(uri, function(err, res, body) {
        request(uri)
          .pipe(filesystem.createWriteStream(filename))
          .on("close", callback);
      })
    };

    download($imgPath, "logo.png", function() {
      console.log("Image has been downloaded");
    });
    
    browser.close()
  
  }).timeout(160000)
})