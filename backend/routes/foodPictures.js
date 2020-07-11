const router = require("express").Router();
const { uuid } = require("uuidv4");
var mongoose = require("mongoose");
const foodPicturePost = require("../models/foodPictures.model");

//get all postings request
router.get("/allpost", (req, res) => {
  // setTimeout(() => {
  foodPicturePost
    .find()
    .sort("-likesLength")
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
  // }, 4000);
});

// post request
router.post("/add", (req, res) => {
  const _id = uuid();
  const description = req.body.description;
  const image = req.body.image;
  const postedBy = req.body.user;
  const dateTime = new Date().toLocaleString();

  const post = new foodPicturePost({
    _id,
    description,
    image,
    postedBy,
    dateTime,
  });
  post
    .save()
    .then(() => res.status(200).json(post))
    // .then(() => res.json("Hii"))
    .catch((err) => res.status(400).json("Error: ", err));
});

// get all individual postings request (next sprint)
router.get("/mypost", (req, res) => {
  foodPicturePost
    // .find({ postedBy: req.user })
    .find({ postedBy: `${req.body.user}` })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
});

// update like request
router.put("/like/:id", (req, res) => {
  foodPicturePost
    .findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: req.body.user },
        $inc: { likesLength: 1 },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    .exec((err, result) => {
      if (err) {
        return res.status(400).json("Error: ", err);
      } else {
        return res.status(200).json(result);
      }
    });
});

// update comment request
router.put("/comment/:id", (req, res) => {
  const comment = {
    text: req.body.comment,
    postedBy: req.body.user,
  };
  foodPicturePost
    .findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: comment },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    .exec((err, result) => {
      if (err) {
        return res.status(400).json("Error: ", err);
      } else {
        return res.status(200).json(result);
      }
    });
});

// delete request
router.delete("/delete/:id", (req, res) => {
  foodPicturePost
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json("Post is deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete all request
router.delete("/deleteAll", (req, res) => {
  messagePost
    .remove({})
    .then(() => res.status(200).json("All posts are deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
