const mongoose = require("mongoose");

const zzzCharacter = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  info: {
    Rank: { type: String, default: "" },
    Attribute: { type: String, default: "" },
    "Real Name": { type: String, default: "" },
    Gender: { type: String, default: "" },
    Height: { type: String, default: "" },
    Birthday: { type: String, default: "" },
    Species: { type: String, default: "" },
    "Model Type": { type: String, default: "" },
    Faction: { type: String, default: "" },
    ExclusiveWEngine: { type: String, default: "" },
    Namecards: { type: String, default: "" },
    "Release Date": { type: String, default: "" },
    Relatives: { type: String, default: "" },
    English: { type: String, default: "" },
    Chinese: { type: String, default: "" },
    Japanese: { type: String, default: "" },
    Korean: { type: String, default: "" },
  },

  image: {
    type: String,
    default: "",
  },

  // optional thêm cho tracking
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Character", zzzCharacter);
