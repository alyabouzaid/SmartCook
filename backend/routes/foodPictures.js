const router = require("express").Router();
const { uuid } = require("uuidv4");
var mongoose = require("mongoose");
const foodPicturePost = require("../models/foodPictures.model");

// get all postings request
router.get("/allpost", (req, res) => {
  // setTimeout(() => {
  foodPicturePost
    .find()
    .sort("-likesLength")
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
  // }, 4000);
});

// get highest like post (feature post) request
router.get("/featuredPost", (req, res) => {
  foodPicturePost
    .find()
    .sort("-likesLength")
    .limit(3)
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
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
    .findOneAndUpdate(
      {
        _id: req.params.id,
        likes: { $ne: req.body.user },
      },
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
  // console.log("route:", req.body.username);
  foodPicturePost
    // .findByIdAndRemove(req.params.id)
    // .findOneAndDelete({
    //   _id: req.params.id,
    //   postedBy: req.body.user,
    // })
    // .findOneAndDelete({
    //   $and: [{ _id: req.params.id }, { postedBy: req.body.user }],
    // })
    .remove({
      postedBy: req.body.username,
      _id: req.params.id,
      // postedBy: { $eq: req.body.user },
    })
    // .then(() => res.status(200).json("Post is deleted."))
    .then(() => res.status(200).json(`${req.body.username}`))
    .catch((err) => res.status(400).json("Error: cannot find user "));
});

//delete all request
router.delete("/deleteAll", (req, res) => {
  foodPicturePost
    .remove({})
    .then(() => res.status(200).json("All posts are deleted."))
    .catch((err) => res.status(400).json("Error: ", err));
});

module.exports = router;
