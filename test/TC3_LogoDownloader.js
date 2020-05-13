const puppeteer = require('puppeteer');
const assert = require('assert')
const request = require("request");
const filesystem = require("fs");

let browser
let page


describe("Alert Verifcation", async () => {
  it(".....", async () => {

    browser = await puppeteer.launch({
      headless: false
    })
    page = await browser.newPage()
    await page.goto("https://www.uet.edu.pk/", {
      waitUntil: "networkidle2"
    });


    let $imgPath = await page.evaluate(x => {
      return document.querySelector(".logo").src;
    });
  
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