// 'h3 > span > i' => episode numbers
// group of multiple
// 'dl > dd > b' => person name
// 'dl > dd' => person name + quote

// https://en.wikiquote.org/wiki/Twin_Peaks

/*
MIT License

Copyright (c) 2019 David Barton (theDavidBarton)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const puppeteer = require('puppeteer')
const fs = require('fs')
let finalObj = { quotes: [] }
let finalObjJSON
let obj

async function quoteCollector() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto('https://en.wikiquote.org/wiki/Twin_Peaks')
  const quoteLength = await page.$$eval('dl', el => el.length)

  for (let i = 0; i < quoteLength; i++) {
    try {
      let quote = await page.evaluate(el => el.textContent, (await page.$$('dl'))[i])
      let persons = quote.match(/((\S|^)[A-Z][a-z]+.[A-Z][a-z]+\:.)|((\S|^)[A-Z][a-z]+\:.)/gm)
      persons = persons.map(el => el.replace(/\:./gm, ''))
      let quoteTextOnly = quote.replace(/((\S|^)[A-Z][a-z]+.[A-Z][a-z]+\:.)|((\S|^)[A-Z][a-z]+\:.)/gm, '')
      quoteTextOnly = quoteTextOnly.trim()

      obj = {
        id: i + 1,
        quoteText: quote,
        quoteTextOnly: quoteTextOnly,
        persons: persons,
        copyright: {
          license: 'CC-BY-SA 3.0.',
          licenseDetails: 'https://creativecommons.org/licenses/by-sa/3.0/',
          source: 'https://en.wikiquote.org/wiki/Twin_Peaks'
        }
      }

      finalObj.quotes.push(obj)
    } catch (e) {
      console.error(e)
    }
    console.log(i)
    console.log(JSON.stringify(finalObj))
  }

  await browser.close()

  // write to file
  finalObjJSON = JSON.stringify(finalObj)
  console.log(finalObjJSON)
  fs.writeFileSync('twinpeaksQuotes.json', finalObjJSON)
}
quoteCollector()
