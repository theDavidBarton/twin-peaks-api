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
const profanityMap = require('./resources/profanityMap.json')
const nameMatcherRegex = /((\S|^)([A-Z][a-z]+..|[A-Z][a-z]+.)([A-Z][a-z]+..|[A-Z][a-z]+.)([A-Z][a-z]+..|[A-Z][a-z]+.)[A-Z][a-z]+\:.)|(((\S|^)([A-Z][a-z]+..|[A-Z][a-z]+.)([A-Z][a-z]+..|[A-Z][a-z]+.)[A-Z][a-z]+\:.)|(\S|^)([A-Z][a-z]+..|[A-Z][a-z]+.)[A-Z][a-z]+\:.)|((\S|^)[A-Z][a-z]+\:.)|((\S|^)[A-Z]+\:.)|Janey-E\sJones\:.|Dale\sCooper's\sdoppelgänger\:/gm
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
      const quote = await page.evaluate(el => el.textContent, (await page.$$('dl'))[i])

      const quoteCleaner = quote => {
        let quoteTextOnly = quote.replace(nameMatcherRegex, '')
        return (quoteTextOnly = quoteTextOnly.trim())
      }

      const quoteTextOnly = quoteCleaner(quote)

      const personCollector = quote => {
        let personsRaw = quote.match(nameMatcherRegex)
        personsRaw = personsRaw.map(el => el.replace(/\:./gm, ''))
        const persons = [...new Set(personsRaw)] // remove duplicates as if a person said multiple lines he/she would present multiple times
        return persons
      }

      const persons = personCollector(quote)

      // _English profane words and phrases retrieved from Luis von Ahn’s Research Group (Carnegie Mellon), url: https://www.cs.cmu.edu/~biglou/resources/bad-words.txt
      const profanityFilter = quoteTextOnly => {
        let profanity = false
        profanityMap.map(el => {
          if (quoteTextOnly.match(el)) {
            console.log(`\n- [${i + 1}] "${quoteTextOnly.substring(0, 30)}" contains profanity: ${el}`)
            profanity = true
          }
        })
        return profanity
      }

      const profanity = profanityFilter(quoteTextOnly)

      const relevanceDecider = quoteTextOnly => {
        let relevance = 1
        if (quoteTextOnly.length > 380 || (persons.length > 2 && quoteTextOnly.match(/\[.+\]/gm))) {
          console.log(`\n- [${i + 1}] relevance is sorted to "2"`)
          relevance = 2
        }
        if (quoteTextOnly.length > 900 || (persons.length > 3 && quoteTextOnly.match(/\[.+\]/gm))) {
          console.log(`\n- [${i + 1}] relevance is sorted to "3"`)
          relevance = 3 // https://www.youtube.com/watch?v=0P_HKQGq730
        }
        return relevance
      }

      const relevance = relevanceDecider(quoteTextOnly)

      obj = {
        id: i + 1,
        quoteText: quote,
        quoteTextOnly: quoteTextOnly,
        persons: persons,
        profanity: profanity,
        relevance: relevance,
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
    // uncomment this for snapshots
    // console.log(JSON.stringify(finalObj))
  }

  await browser.close()

  // write to file
  finalObjJSON = JSON.stringify(finalObj)
  fs.writeFileSync('twinpeaksQuotes.json', finalObjJSON)
}
quoteCollector()
