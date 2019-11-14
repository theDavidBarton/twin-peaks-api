# The Responses are Not What They Seem

A quote API for the cult classic TV movie series: Twin Peaks - made in Node.Js and Express.

## Usage

### API

Launch the express app with: `yarn start` or `node server.js`. Then you have three options:

#### I. Random quote endpoint

endpoint: `/api/quotes/recommend`

http://localhost:5000/api/quotes/recommend

```json
[
  {
    "id": 62,
    "quoteText": "Donna Hayward: There's things you can't get in books.\nHarold Smith: There are things you can't get anywhere… but we dream they can be found in other people.",
    "quoteTextOnly": "There's things you can't get in books.\nThere are things you can't get anywhere… but we dream they can be found in other people.",
    "persons": ["Donna Hayward", "Harold Smith"],
    "copyright": {
      "license": "CC-BY-SA 3.0.",
      "licenseDetails": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://en.wikiquote.org/wiki/Twin_Peaks"
    }
  }
]
```

#### II. Quote by ID endpoint

endpoint: `/api/quotes/{id}`

e.g.: http://localhost:5000/api/quotes/20

```json
[
  {
    "id": 20,
    "quoteText": "Dale Cooper: Nothing beats the taste sensation when maple syrup [claps his hands] collides with ham.",
    "quoteTextOnly": "Nothing beats the taste sensation when maple syrup [claps his hands] collides with ham.",
    "persons": ["Dale Cooper"],
    "copyright": {
      "license": "CC-BY-SA 3.0.",
      "licenseDetails": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://en.wikiquote.org/wiki/Twin_Peaks"
    }
  }
]
```

#### III. Quote by search parameter

endpoint: `/api/quotes?q={keyword}` (spaces will be decoded like: ?q=the%20man%20from%20another%20place)

e.g.: http://localhost:5000/api/quotes?q=giant

```json
[
  {
    "id": 42,
    "quoteText": "The Giant: The owls are not what they seem.",
    "quoteTextOnly": "The owls are not what they seem.",
    "persons": ["The Giant"],
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
    "persons": ["Sheriff Truman", "Dale Cooper", "Albert Rosenfield", "Dale Cooper", "Albert Rosenfield"],
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
    "persons": ["Windom Earle", "Major Briggs", "Windom Earle"],
    "copyright": {
      "license": "CC-BY-SA 3.0.",
      "licenseDetails": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://en.wikiquote.org/wiki/Twin_Peaks"
    }
  }
]
```

### Updating the content

A puppeteer (headless chrome) script crawls for quotes on [Wiki Qoute](https://en.wikiquote.org/wiki/Twin_Peaks).

Run: `yarn scrape` or `node quoteCollector.js` to update the JSON file.

# Copyright

## Quotes

See in `copyright` for each quotes. Content is licensed under CC-BY-SA 3.0.

## Software

MIT License

Copyright (c) 2019 David Barton

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
