# The Responses are Not What They Seem

A quote API for the cult classic TV movie series: Twin Peaks - made in Node.Js and Express.

## Usage

### API

Launch the express app with: `yarn start` or `node server.js`. Then you have three options:

#### I. Random quote endpoint

`/api/quotes/recommend`

http://localhost:5000/api/quotes/recommend

```javascript
{"id":62,"quoteText":"Donna Hayward: There's things you can't get in books.\nHarold Smith: There are things you can't get anywhere… but we dream they can be found in other people.","quoteTextOnly":"There's things you can't get in books.\nThere are things you can't get anywhere… but we dream they can be found in other people.","persons":["Donna Hayward","Harold Smith"],"copyright":{"license":"CC-BY-SA 3.0.","licenseDetails":"https://creativecommons.org/licenses/by-sa/3.0/","source":"https://en.wikiquote.org/wiki/Twin_Peaks"}}
```

#### II. Quote by ID endpoint

`/api/quotes/{id}`

e.g.: http://localhost:5000/api/quotes/20

```javascript
;[
  {
    id: 20,
    quoteText: 'Dale Cooper: Nothing beats the taste sensation when maple syrup [claps his hands] collides with ham.',
    quoteTextOnly: 'Nothing beats the taste sensation when maple syrup [claps his hands] collides with ham.',
    persons: ['Dale Cooper'],
    copyright: {
      license: 'CC-BY-SA 3.0.',
      licenseDetails: 'https://creativecommons.org/licenses/by-sa/3.0/',
      source: 'https://en.wikiquote.org/wiki/Twin_Peaks'
    }
  }
]
```

#### III. Quote by search parameter

`/api/quotes?q={keyword}`

e.g.: http://localhost:5000/api/quotes?q=Gordon%20Cole

```javascript
;[
  {
    id: 64,
    quoteText:
      "Gordon Cole: YOU'LL HAVE TO SPEAK UP. HEARING'S GONE. LONG STORY. GOT THESE THINGS CRANKED UP TO THE MAX.",
    quoteTextOnly: "YOU'LL HAVE TO SPEAK UP. HEARING'S GONE. LONG STORY. GOT THESE THINGS CRANKED UP TO THE MAX.",
    persons: ['Gordon Cole'],
    copyright: {
      license: 'CC-BY-SA 3.0.',
      licenseDetails: 'https://creativecommons.org/licenses/by-sa/3.0/',
      source: 'https://en.wikiquote.org/wiki/Twin_Peaks'
    }
  },
  {
    id: 65,
    quoteText: 'Gordon Cole: COOPER, YOU REMIND ME TODAY OF A SMALL MEXICAN CHIHUAHUA.',
    quoteTextOnly: 'COOPER, YOU REMIND ME TODAY OF A SMALL MEXICAN CHIHUAHUA.',
    persons: ['Gordon Cole'],
    copyright: {
      license: 'CC-BY-SA 3.0.',
      licenseDetails: 'https://creativecommons.org/licenses/by-sa/3.0/',
      source: 'https://en.wikiquote.org/wiki/Twin_Peaks'
    }
  },
  {
    id: 70,
    quoteText: "Gordon Cole: HEADIN' ON OVER TO BEND, OREGON. WHOLE LOTTA SHAKIN' GOING ON IN BEND!",
    quoteTextOnly: "HEADIN' ON OVER TO BEND, OREGON. WHOLE LOTTA SHAKIN' GOING ON IN BEND!",
    persons: ['Gordon Cole'],
    copyright: {
      license: 'CC-BY-SA 3.0.',
      licenseDetails: 'https://creativecommons.org/licenses/by-sa/3.0/',
      source: 'https://en.wikiquote.org/wiki/Twin_Peaks'
    }
  },
  {
    id: 85,
    quoteText:
      "Gordon Cole: DON'T LET'EM RATTLE YOU, COOP. THESE GUYS MAKE A LIVING LOOKING THROUGH OTHER PEOPLE'S DRAWERS. MAY A SMILE BE YOUR UMBRELLA. WE'VE ALL HAD OUR SOCKS TOSSED AROUND. CATCH YOU LATER.",
    quoteTextOnly:
      "DON'T LET'EM RATTLE YOU, COOP. THESE GUYS MAKE A LIVING LOOKING THROUGH OTHER PEOPLE'S DRAWERS. MAY A SMILE BE YOUR UMBRELLA. WE'VE ALL HAD OUR SOCKS TOSSED AROUND. CATCH YOU LATER.",
    persons: ['Gordon Cole'],
    copyright: {
      license: 'CC-BY-SA 3.0.',
      licenseDetails: 'https://creativecommons.org/licenses/by-sa/3.0/',
      source: 'https://en.wikiquote.org/wiki/Twin_Peaks'
    }
  },
  {
    id: 175,
    quoteText: 'Gordon Cole: WE ARE LIKE THE DREAMER WHO DREAMS AND THEN LIVES INSIDE THE DREAM.',
    quoteTextOnly: 'WE ARE LIKE THE DREAMER WHO DREAMS AND THEN LIVES INSIDE THE DREAM.',
    persons: ['Gordon Cole'],
    copyright: {
      license: 'CC-BY-SA 3.0.',
      licenseDetails: 'https://creativecommons.org/licenses/by-sa/3.0/',
      source: 'https://en.wikiquote.org/wiki/Twin_Peaks'
    }
  }
]
```

### Updating the content

A puppeteer (headless chrome) script crawls for quotes on [Wiki Qoute](https://en.wikiquote.org/wiki/Twin_Peaks).

Run: `yarn scrape` or `node quoteCollector.js` to update the JSON file.

# Copyright

## HTTP status descriptions

See in `copyright` for each quotes. Content is licensed under CC-BY-SA 3.0.

## Software

MIT License

Copyright (c) 2019 David Barton

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
