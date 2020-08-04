const router = require("express").Router();
const { uuid } = require("uuidv4");
const foodPicturePost = require("../models/foodPictures.model");
var ObjectId = require("mongodb").ObjectID;

router.get("/allPost", (req, res) => {
  foodPicturePost
    .find()
    .sort("-createdAt")
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
});

router.get("/featuredPost", (req, res) => {
  foodPicturePost
    .find({
      createdAt: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) },
    })
    .sort("-likesLength")
    .limit(3)
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
});

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
    .catch((err) => res.status(400).json("Error: ", err));
});

router.get("/myPost", (req, res) => {
  foodPicturePost
    .find({ postedByEmail: req.query.email })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: ", err));
});

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

router.put("/deleteComment/:id", (req, res) => {
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

router.delete("/deletePost/:id", (req, res) => {
  foodPicturePost
    .remove({
      postedByEmail: req.body.email,
      _id: req.params.id,
    })
    .then(() => res.status(200).json("Post is deleted."))
    .catch((err) => res.status(400).json("Error: cannot find user "));
});

router.delete("/deleteAll", (req, res) => {
  foodPicturePost
    .remove({})
    .then(() => res.status(200).json("All posts are deleted."))
    .catch((err) => res.status(400).json("Error: ", err));
});

module.exports = router;
