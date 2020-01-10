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

const express = require('express')
const cors = require('cors')
const twinpeaks = require('./twinpeaksQuotes.json')

function endpointCreation() {
  try {
    const app = express()
    app.use(cors())
    const port = process.env.PORT || 5000

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

    // providing endpoint for **random** quotes
    app.get('/api/1/quotes/recommend', (req, res) => {
      const twinpeaksQuotesArray = twinpeaks.quotes
      const profValue =
        req.query.profanity && req.query.profanity.match(/^(true|false)$/) ? req.query.profanity : 'true,false'
      const relValue =
        req.query.relevance && req.query.relevance.match(/^(1|2|3|1,2|2,3|1,3|1,2,3)$/) ? req.query.relevance : '1,2,3'

      const queriedArray = twinpeaksQuotesArray.filter(quote => {
        const profanityRegex = RegExp(quote.profanity, 'g')
        const relevanceRegex = RegExp(quote.relevance, 'g')
        if (profValue.match(profanityRegex) && relValue.match(relevanceRegex)) return quote
      })

      const randomId = randomizer(queriedArray)
      const recommendedResult = queriedArray.filter(quote => {
        if (quote.id == randomId) return quote
      })
      recommendedResult[0] ? res.json(recommendedResult) : res.status(404).json({ error: 'no such id!' }) // this condition won't be applied, error handling happens in randomizer()
      console.log(
        `/api/1/quotes/recommend?profanity=${profValue}&relevance=${relValue} endpoint has been called! => ${randomId}`
      )
    })

    // providing a dynamic endpoint for quotes by ID
    app.get('/api/1/quotes/:id', (req, res) => {
      const id = req.params.id
      const idResult = twinpeaks.quotes.filter(quote => {
        if (quote.id == id) return quote
      })
      idResult[0] ? res.json(idResult) : res.status(404).json({ error: 'no such id!' })
      console.log(`/api/1/quotes/${id} endpoint has been called!`)
    })

    // providing a dynamic endpoint for searches
    app.get('/api/1/quotes', (req, res) => {
      const query = req.query.q
      const queryRegex = RegExp(query, 'gi')
      const personResult = twinpeaks.quotes.filter(quote => {
        if (queryRegex.test(quote.quoteText)) return quote
      })
      res.json(personResult)
      console.log(`/api/1/quotes?q=${query} endpoint has been called!`)
    })

    app.listen(port)

    console.log(
      `API is listening on ${port}\nEndpoint is ready at: localhost:${port}/api/1/quotes/ \nCheck documentation at: https://github.com/theDavidBarton/twin-peaks-api`
    )
  } catch (e) {
    console.error(e)
  }
}
endpointCreation()
