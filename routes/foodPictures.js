const router = require("express").Router();
const { uuid } = require("uuidv4");
var mongoose = require("mongoose");
const foodPicturePost = require("../models/foodPictures.model");
var ObjectId = require("mongodb").ObjectID;

// get all posts
router.get("/allPost", (req, res) => {
  // setTimeout(() => {
  foodPicturePost
    .find()
    // .sort("-likesLength")
    .sort("-createdAt")
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
  // }, 2000);
});

// get highest like post (feature post)
router.get("/featuredPost", (req, res) => {
  foodPicturePost
    .find()
    .sort("-likesLength")
    .limit(3)
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
});

// add new post
router.post("/addPost", (req, res) => {
  const _id = uuid();
  const description = req.body.description;
  const image = req.body.image;
  const postedByFirstName = req.body.userFirstName;
  const postedByFullName = req.body.userFullName;
  const postedByEmail = req.body.email;
  const postedByGoogleDefaultPic = req.body.googleDefaultPic;
  const postedByUploadedPic = req.body.userUploadedPic;
  const dateTime = new Date().toLocaleString();

  const post = new foodPicturePost({
    _id,
    description,
    image,
    postedByFirstName,
    postedByFullName,
    postedByEmail,
    postedByGoogleDefaultPic,
    postedByUploadedPic,
    dateTime,
  });
  post
    .save()
    .then(() => res.status(200).json(post))
    // .then(() => res.json("Hii"))
    .catch((err) => res.status(400).json("Error: ", err));
});

// get all individual posts
router.get("/myPost", (req, res) => {
  // setTimeout(() => {
  foodPicturePost
    // .find({ postedBy: req.user })
    .find({ postedByEmail: req.query.email })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
  // }, 2000);
});

// add post like
router.put("/addLike/:id", (req, res) => {
  foodPicturePost
    .findOneAndUpdate(
      {
        _id: req.params.id,
        likesByEmail: { $ne: req.body.email },
        likesByFullName: { $ne: req.body.name },
      },
      {
        $push: { likesByEmail: req.body.email, likesByFullName: req.body.name },
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

// add post comment
router.put("/addComment/:id", (req, res) => {
  const comment = {
    text: req.body.comment,
    postedByFirstName: req.body.userFirstName,
    postedByFullName: req.body.userFullName,
    postedByEmail: req.body.email,
    postedByGoogleDefaultPic: req.body.googleDefaultPic,
    postedByUploadedPic: req.body.userUploadedPic,
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

// update post description
router.put("/editDescription/:id", (req, res) => {
  foodPicturePost
    .findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.editedPostDescription,
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

// update post comment
router.put("/editComment/:id", (req, res) => {
  foodPicturePost
    .findOneAndUpdate(
      {
        _id: req.params.id,
        "comments._id": ObjectId(req.body.commentId),
      },
      {
        $set: { "comments.$.text": req.body.editedComment },
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

//delete post comment
router.put("/deleteComment/:id", (req, res) => {
  // console.log("route:", req.body.username);
  foodPicturePost
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { comments: { _id: ObjectId(req.body.commentId) } },
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

// delete food post
router.delete("/deletePost/:id", (req, res) => {
  // console.log("route:", req.body.username);
  foodPicturePost
    .remove({
      postedByEmail: req.body.email,
      _id: req.params.id,
      // postedBy: { $eq: req.body.user },
    })
    .then(() => res.status(200).json("Post is deleted."))
    // .then(() => res.status(200).json(`${req.body.username}`))
    .catch((err) => res.status(400).json("Error: cannot find user "));
});

//delete all post (not implemented in frontend)
router.delete("/deleteAll", (req, res) => {
  foodPicturePost
    .remove({})
    .then(() => res.status(200).json("All posts are deleted."))
    .catch((err) => res.status(400).json("Error: ", err));
});

module.exports = router;
