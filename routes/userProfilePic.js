const router = require("express").Router();
const users = require("../models/users.model");

router.put("/add/:email", (req, res) => {
  users
    .findOneAndUpdate(
      {
        email: req.params.email,
      },
      {
        userUploadedPic: req.body.image,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
});

router.get("/", (req, res) => {
  users
    .findOne({ email: req.query.email })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json("Error: ", err));
});

module.exports = router;
