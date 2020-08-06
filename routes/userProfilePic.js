const router = require("express").Router();
const users = require("../models/users.model");
const foodPicturePost = require("../models/foodPictures.model");

router.get("/", (req, res) => {
    users
        .findOne({ email: req.query.email })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json("Error: ", err));
});

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

router.put("/updatePostAvatar/:email", (req, res) => {
    foodPicturePost
        .update(
            {
                postedByEmail: req.params.email,
            },
            {
                $set: {
                    postedByUploadedPic: req.body.image,
                },
            },
            {
                multi: true,
                new: true,
                useFindAndModify: false,
            }
        )
        .then((posts) => res.status(200).json(posts))
        .catch((err) => res.status(400).json("Error: ", err));
});

router.put("/updatePostCommentAvatar/:email", (req, res) => {
    foodPicturePost
        .update(
            {},
            {
                $set: { "comments.$[elem].postedByUploadedPic": req.body.image },
            },
            {
                multi: true,
                arrayFilters: [{ "elem.postedByEmail": req.params.email }],
                new: true,
                useFindAndModify: false,
            }
        )
        .then((posts) => res.status(200).json(posts))
        .catch((err) => res.status(400).json("Error: ", err));
});

module.exports = router;
