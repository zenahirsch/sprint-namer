const emojis = [
  "bug",
  "pig",
  "pretzel",
  "ice_skate",
  "panda_face",
  "lemon",
  "carrot",
  "volcano",
  "taxi",
  "crystal_ball",
  "fire",
  "pie",
  "pizza",
  "cherry_blossom",
  "butterfly",
  "pig_nose",
  "monkey_face",
  "tooth",
  "alien",
  "space_invader",
  "clown_face",
  "unicorn_face",
  "shell",
  "sunflower",
  "banana",
  "hamburger",
  "rainbow",
  "basketball",
  "dna",
  "coffin",
  "shrimp",
  "umbrella",
];

class EmojiPicker {
  constructor() {
    this.emojis = emojis;
  }

  getRandomEmoji() {
    const randomInt = Math.random() * this.emojis.length;
    return this.emojis.splice(Math.floor(randomInt), 1)[0];
  }
}

exports.EmojiPicker = EmojiPicker;
