const router = require("express").Router();
const mongoose = require("mongoose");
let User = require("../../models/User");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));


router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const newUser = new User({
    name,
    email,
  });

  newUser
    .save()
    .then(() => res.json("User ajouter!"))
    .catch((err) => res.status(400).json("Error: " + err));
});


// Get a user by id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;
