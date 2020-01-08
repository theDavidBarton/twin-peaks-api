[![Actions Status](https://github.com/theDavidBarton/twin-peaks-api/workflows/CI/badge.svg)](https://github.com/theDavidBarton/twin-peaks-api/actions)
![heroku](https://img.shields.io/badge/Heroku-true-430098.svg?logo=heroku)

# The Responses are Not What They Seem

A quote API for the cult classic TV movie series: Twin Peaks - made in Node.Js and Express.

Available at: [https://twin-peaks-api.herokuapp.com](https://twin-peaks-api.herokuapp.com/api/quotes/recommend) (see endpoints and usage below)

![welcome-to-twin-peaks](https://welcometotwinpeaks.com/wp-content/uploads/welcome-to-twin-peaks-sign-51201.jpg)

## Usage

### API

Launch the express app with: `yarn start` or `node server.js`. Then you have three options:

#### I. Random quote

**endpoint:** `/api/quotes/recommend`

**method:** `GET`

**parameter (optional):** `?relevance=` accepted parameters: `1`,`2`,`3`,`1,2`,`2,3`,`1,3`,`1,2,3` (defaults to `1,2,3`!) 1 is the more relevant quote while 3 is very redundant and has more quoted persons (which is most likely not that catchy). You can check the sorting conditions in [quoteCollector.js](./quoteCollector.js)'s relevanceDecider function.

**parameter (optional):** `?profanity=` accepted a boolean `true`, `false` or `true,false` value (defaults to `true,false`!) English profane words and phrases retrieved from [Luis von Ahn’s Research Group (Carnegie Mellon)](https://www.cs.cmu.edu/~biglou/resources/bad-words.txt).

http://localhost:5000/api/quotes/recommend?relevance=1&profanity=false (or https://twin-peaks-api.herokuapp.com/api/...)

**success response:**

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

```json
{ "error": "no such id!" }
```

#### II. Quote by ID

**endpoint:** `/api/quotes/{id}`

**method:** `GET`

e.g.: http://localhost:5000/api/quotes/20 (or https://twin-peaks-api.herokuapp.com/api/quotes/20)

**success response:**

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

```json
{ "error": "no such id!" }
```

#### III. Quote by search parameter

**endpoint:** `/api/quotes?q={keyword}` (spaces will be decoded like: ?q=the%20man%20from%20another%20place)

**method:** `GET`

**parameter (mandatory):** `?q=`

e.g.: http://localhost:5000/api/quotes?q=giant (or https://twin-peaks-api.herokuapp.com/api/quotes?q=giant)

**success response:**

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

```json
[]
```

### Updating the content

A puppeteer (headless chrome) script crawls for quotes on [Wiki Qoute](https://en.wikiquote.org/wiki/Twin_Peaks).

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
