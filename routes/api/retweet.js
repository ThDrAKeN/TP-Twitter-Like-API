const router = require("express").Router();
const mongoose = require("mongoose");
let Retweet = require("../../models/Retweet");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

router.route("/").get((req, res) => {
  Retweet.find()
    .then((retweet) => res.json(retweet))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
  const user = req.body.user;
  const tweet_id = req.body.tweet_id;
  const content = req.body.content;

  const newRetweet = new Retweet({
    user,
    tweet_id,
    content,
  });

  newRetweet
    .save()
    .then(() => res.json("retweet ajouter!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a retweet by tweet id
router.route("/:id").get((req, res) => {
  Retweet.find({ tweet_id: req.params.id })
    .then((retweet) => res.json(retweet))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get number of retweets for a tweet
router.route("/:id/count").get((req, res) => {
  Retweet.find({ tweet_id: req.params.id })
    .then((retweet) => res.json({ count: retweet.length }))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get retweets by user id
router.route("/user/:id").get((req, res) => {
  Retweet.find({ user: req.params.id })
    .then((retweet) => res.json(retweet))
    .catch((err) => res.status(400).json("Error: " + err));
});



module.exports = router;
