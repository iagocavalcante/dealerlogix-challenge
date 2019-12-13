export default class PhoneSpelling {
  
  constructor () {
    this.map = {
      "2": ["a", "b", "c"],
      "3": ["d", "e", "f"],
      "4": ["g", "h", "i"],
      "5": ["j", "k", "l"],
      "6": ["m", "n", "o"],
      "7": ["p", "q", "r", "s"],
      "8": ["t", "u", "v"],
      "9": ["w", "x", "y", "z"]
    };
  }

  generateWords(digits) {
    var letters = [];
    for (let i = 0; i < digits.length; i++) {
      letters.push(this.map[digits[i]]);
    }

    this.progress = 0;
    this.word = '';
    this.limit = digits.length;
    this.words = [];

    this.wordGenerator(letters, this.progress, this.word, this.limit);
    
    return this.words;
  }

  wordGenerator(letters, progress, word, limit) {
    if (progress == limit) {
      this.words.push(word);
    } else {
      for (var i = 0; i < letters[progress].length; i++) {
        const nextWord = word + letters[progress][i];

        this.wordGenerator(letters, progress + 1, nextWord, limit);
      }
    }
  }
}