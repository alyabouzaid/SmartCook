const router = require("express").Router();
const users = require("../models/users.model");

// router.put("/add/:email", (req, res) => {
//   users
//     .findOneAndUpdate(
//       {
//         email: req.params.email,
//       },
//       {
//         $set: { userUploadedPic: req.body.image },
//       },
//       {
//         new: true,
//         useFindAndModify: false,
//       }
//     )
//     .exec((err, result) => {
//       if (err) {
//         return res.status(400).json("Error: ", err);
//       } else {
//         return res.status(200).json(result);
//       }
//     });
// });

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
  // setTimeout(() => {
  users
    .find()
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
  // }, 2000);
});

module.exports = router;
