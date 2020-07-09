const router = require("express").Router();
const { uuid } = require("uuidv4");
var mongoose = require("mongoose");
const foodPicturePost = require("../models/foodPictures.model");

//get all postings request
router.get("/allpost", (req, res) => {
  foodPicturePost
    .find()
    // .populate("postedBy","_id name")
    // .populate("comments.postedBy","_id name")
    // .sort('-createdAt')
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
});

// post request
router.post("/add", (req, res) => {
  const _id = uuid();
  const description = req.body.description;
  const photo = req.body.photo;
  // const likes = req.body.likes;
  // const comments = req.body.comments;
  const postedBy = req.body.user;
  const dateTime = new Date().toLocaleString();

  // if (!description || !photo) {
  //   return res.status(4).json({ error: "Plase include all fields" });
  // }

  const post = new foodPicturePost({
    _id,
    description,
    photo,
    // likes,
    // comments,
    postedBy,
    dateTime,
  });
  post
    .save()
    .then(() => res.status(200).json(post))
    .catch((err) => res.status(400).json("Error: ", err));
});

// get all individual postings request (next sprint)
router.get("/mypost", (req, res) => {
  foodPicturePost
    .find({ postedBy: req.params.user })
    // .populate("PostedBy","_id name")
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
});

// update like request
router.put("/like/:id", (req, res) => {
  foodPicturePost
    .findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: req.body.user }, //check if this is right
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
  // .then((res) => res.status(200).json(res))
  // .then(() => res.status(200).json("Like is updated."))
  // .catch((err) => res.status(400).json("Error: ", err));
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
  // .populate("comments.postedBy","_id name")
  // .populate("postedBy","_id name")
  // .then(() => res.status(200).json("Comment is updated."))
  // .catch((err) => res.status(400).json("Error: ", err));
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
