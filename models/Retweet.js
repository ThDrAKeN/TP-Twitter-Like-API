const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RetweetSchema = new Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  tweet_id: {
    type: String,
    ref: "Tweet",
    required: true,
  },
  content: {
    type: String,
  },
});

const Retweet = mongoose.model("Retweet", RetweetSchema);

module.exports = Retweet;
