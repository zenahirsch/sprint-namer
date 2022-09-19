const fetch = require("node-fetch");

const WORDS_ENDPOINT = "https://api.datamuse.com/words";

class WordSuggester {
  constructor(theme, letter) {
    this.theme = theme;
    this.letter = letter;
  }

  async getForThemeAndLetter(numWords) {
    const response = await fetch(
      `${WORDS_ENDPOINT}?ml=${encodeURIComponent(this.theme)}&sp=${
        this.letter
      }*&max=${numWords}`
    );

    const data = await response.json();
    return data.map((d) => d.word);
  }
}

exports.WordSuggester = WordSuggester;
