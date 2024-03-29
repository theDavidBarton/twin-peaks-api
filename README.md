[![Actions Status](https://github.com/theDavidBarton/twin-peaks-api/workflows/CI/badge.svg)](https://github.com/theDavidBarton/twin-peaks-api/actions)
![crocodile](https://img.shields.io/badge/crocodiles_in_the_basement-%F0%9F%90%8A_yes-orange.svg)
[![npm package](https://img.shields.io/npm/v/twin-peaks-api.svg)](https://www.npmjs.com/package/twin-peaks-api)

# The Responses are Not What They Seem

A quote API for the cult classic TV movie series: Twin Peaks - made in Node.Js and Express.

Available at: _see link in the repository's 'about' section_ (see endpoints and usage below)

![welcome-to-twin-peaks](https://welcometotwinpeaks.com/wp-content/uploads/welcome-to-twin-peaks-sign-51201.jpg)

## Usage

### Node api

```javascript
const { recommend, getId, search } = require('twin-peaks-api')

const recommendedQuote = recommend() // optional params: [profanity {string}], [relevance {string}] see usage at HTTP api
const getQuoteById = getId(20)
const searchQuote = search('the giant')
```

### HTTP api

Launch the express app with: `yarn start` or `node server.js`. Then you have three options:

#### I. Random quote

**endpoint:** `/api/1/quotes/recommend`

**method:** `GET`

**parameter (optional):** `?relevance=` accepted parameters: `1`; `2`; `3`; `1,2`; `2,3`; `1,3` or `1,2,3` (defaults to `1,2,3`!) 1 is the more relevant quote while 3 is very redundant and has more quoted persons (which is most likely not that catchy). You can check the sorting conditions in [quoteCollector.js](./quoteCollector.js)'s relevanceDecider function.

**parameter (optional):** `?profanity=` accepted a boolean `true`, `false` or `true,false` value (defaults to `true,false`!) English profane words and phrases retrieved from [Luis von Ahn’s Research Group (Carnegie Mellon)](https://www.cs.cmu.edu/~biglou/resources/bad-words.txt).

http://localhost:5000/api/1/quotes/recommend?relevance=1&profanity=false

**success response:**

code: `200`

```json
[
  {
    "id": 62,
    "quoteText": "Donna Hayward: There's things you can't get in books.\nHarold Smith: There are things you can't get anywhere… but we dream they can be found in other people.",
    "quoteTextOnly": "There's things you can't get in books.\nThere are things you can't get anywhere… but we dream they can be found in other people.",
    "persons": ["Donna Hayward", "Harold Smith"],
    "profanity": false,
    "relevance": 1,
    "copyright": {
      "license": "CC-BY-SA 3.0.",
      "licenseDetails": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://en.wikiquote.org/wiki/Twin_Peaks"
    }
  }
]
```

**error response:**

code: `404`

```json
{ "error": "no such id!" }
```

#### II. Quote by ID

**endpoint:** `/api/1/quotes/{id}`

**method:** `GET`

e.g.: http://localhost:5000/api/1/quotes/20

**success response:**

code: `200`

```json
[
  {
    "id": 20,
    "quoteText": "Dale Cooper: Nothing beats the taste sensation when maple syrup [claps his hands] collides with ham.",
    "quoteTextOnly": "Nothing beats the taste sensation when maple syrup [claps his hands] collides with ham.",
    "persons": ["Dale Cooper"],
    "profanity": false,
    "relevance": 1,
    "copyright": {
      "license": "CC-BY-SA 3.0.",
      "licenseDetails": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://en.wikiquote.org/wiki/Twin_Peaks"
    }
  }
]
```

**error response:**

code: `404`

```json
{ "error": "no such id!" }
```

#### III. Quote by search parameter

**endpoint:** `/api/1/quotes?q={keyword}` (spaces will be decoded like: ?q=the%20man%20from%20another%20place)

**method:** `GET`

**parameter (mandatory):** `?q=`

e.g.: http://localhost:5000/api/1/quotes?q=giant

**success response:**

code: `200`

```json
[
  {
    "id": 42,
    "quoteText": "The Giant: The owls are not what they seem.",
    "quoteTextOnly": "The owls are not what they seem.",
    "persons": ["The Giant"],
    "profanity": false,
    "relevance": 1,
    "copyright": {
      "license": "CC-BY-SA 3.0.",
      "licenseDetails": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://en.wikiquote.org/wiki/Twin_Peaks"
    }
  },
  {
    "id": 54,
    "quoteText": "Sheriff Truman: So, what did this giant sound like, huh? I mean, did he have a big, booming voice or what?\nDale Cooper: No, no! He spoke softly, distinctly.\nAlbert Rosenfield: And you gave him the beans you were supposed to use to buy a cow.\nDale Cooper: No, Albert! I gave him my ring.\nAlbert Rosenfield: Okay. Uh, confining my conclusions to the planet Earth…",
    "quoteTextOnly": "So, what did this giant sound like, huh? I mean, did he have a big, booming voice or what?\nNo, no! He spoke softly, distinctly.\nAnd you gave him the beans you were supposed to use to buy a cow.\nNo, Albert! I gave him my ring.\nOkay. Uh, confining my conclusions to the planet Earth…",
    "persons": ["Sheriff Truman", "Dale Cooper", "Albert Rosenfield"],
    "profanity": true,
    "relevance": 1,
    "copyright": {
      "license": "CC-BY-SA 3.0.",
      "licenseDetails": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://en.wikiquote.org/wiki/Twin_Peaks"
    }
  },
  {
    "id": 69,
    "quoteText": "The Giant: It is happening again. It is happening again.",
    "quoteTextOnly": "It is happening again. It is happening again.",
    "persons": ["The Giant"],
    "profanity": false,
    "relevance": 1,
    "copyright": {
      "license": "CC-BY-SA 3.0.",
      "licenseDetails": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://en.wikiquote.org/wiki/Twin_Peaks"
    }
  },
  {
    "id": 116,
    "quoteText": "[Windom Earle has Major Briggs tied up to a giant dartboard.]\nWindom Earle: What is the capital of North Carolina?\nMajor Briggs: Raleigh.\nWindom Earle: Fat load of good that'll do me.",
    "quoteTextOnly": "[Windom Earle has Major Briggs tied up to a giant dartboard.]\nWhat is the capital of North Carolina?\nRaleigh.\nFat load of good that'll do me.",
    "persons": ["Windom Earle", "Major Briggs"],
    "profanity": false,
    "relevance": 1,
    "copyright": {
      "license": "CC-BY-SA 3.0.",
      "licenseDetails": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://en.wikiquote.org/wiki/Twin_Peaks"
    }
  }
]
```

**"error" response:** (no results found)

code: `200`

```json
[]
```

### Updating the content

A puppeteer (headless chrome) script crawls for quotes on [Wiki Quote](https://en.wikiquote.org/wiki/Twin_Peaks).

Run: `yarn scrape` or `node quoteCollector.js` to update the JSON file.

### Deploy to environment

`git push heroku master`

# Copyright

## Quotes

See in `copyright` for each quotes. Content is licensed under CC-BY-SA 3.0.

## Software

MIT License

Copyright (c) 2019 David Barton

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
