const router = require("express").Router();
const mongoose = require("mongoose");
let Tweet = require("../../models/Tweet");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));



// Get all tweets
router.route("/").get((req, res) => {
  Tweet.find()
    .then((tweet) => res.json(tweet))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a specific tweet by id
router.route("/:id").get((req, res) => {
  Tweet.findById(req.params.id)
    .then((tweet) => res.json({"id": tweet.id, "user":tweet.user, "content":tweet.content}))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a tweet with comments
router.route("/:id/comments").get((req, res) => {
  Tweet.findById(req.params.id)
    .then((tweet) => res.json({"id": tweet.id, "user":tweet.user, "content":tweet.content, "comments":tweet.comments}))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get number of comments for a tweet
router.route("/:id/comments/count").get((req, res) => {
  Tweet.findById(req.params.id)
    .then((tweet) => res.json({"count": tweet.comments.length}))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a tweet with retweets



// Create a new tweet
router.route("/create").post((req, res) => {
  const user = req.body.user;
  const content = req.body.content;
  const comments = req.body.comments;

  const newTweet = new Tweet({
    user,
    content,
    comments,
  });

  newTweet
    .save()
    .then(() => res.json("tweet ajouter!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
