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

'use strict'

const twinpeaks = require('./twinpeaksQuotes.json')

// random number from the available IDs
const randomizer = quotesArray => {
  const quotesLength = twinpeaks.quotes.length
  const randomizeNumberBetweenZeroAnd = max => {
    return Math.floor(Math.random() * Math.floor(max))
  }
  const availableIdChecker = quotesArray => {
    const availableIds = quotesArray.map(el => el.id)
    return availableIds
  }
  const availableIds = availableIdChecker(quotesArray)
  let randomInteger = randomizeNumberBetweenZeroAnd(quotesLength)
  while (!availableIds.includes(randomInteger)) {
    // console.log(`${randomInteger} is not among ${availableIds}`)
    randomInteger = randomizeNumberBetweenZeroAnd(quotesLength)
  }
  return randomInteger
}

// recommend a quote randomly

/*
 * @param {string [and NOT boolean!]} profanity: (optional) filter criteria (true|false|true,false)
 * @param {string} relevance: (optional) filter criteria (1|2|3|1,2|2,3|1,3|1,2,3)
 * @return {object} recommendedResult: a random recommendation matches the two filter criteria
 */

const recommend = (profanity, relevance) => {
  const twinpeaksQuotesArray = twinpeaks.quotes
  const profValue = profanity && profanity.match(/^(true|false)$/) ? profanity : 'true,false'
  const relValue = relevance && relevance.match(/^(1|2|3|1,2|2,3|1,3|1,2,3)$/) ? relevance : '1,2,3'

  const queriedArray = twinpeaksQuotesArray.filter(quote => {
    const profanityRegex = RegExp(quote.profanity, 'g')
    const relevanceRegex = RegExp(quote.relevance, 'g')
    if (profValue.match(profanityRegex) && relValue.match(relevanceRegex)) return quote
  })

  const randomId = randomizer(queriedArray)
  const recommendedResult = queriedArray.filter(quote => {
    if (quote.id == randomId) return quote
  })
  return recommendedResult
}

// get quote by its ID
const getId = id => {
  const idResult = twinpeaks.quotes.filter(quote => {
    if (quote.id == id) return quote
  })
  return idResult
}

// searches based on string query
const search = query => {
  const queryRegex = RegExp(query, 'gi')
  const personResult = twinpeaks.quotes.filter(quote => {
    if (queryRegex.test(quote.quoteText)) return quote
  })
  return personResult
}

module.exports = { recommend, getId, search }
