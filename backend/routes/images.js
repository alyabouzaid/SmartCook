const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');


router.post('/image-upload', (req, res) => {

        let values = Object.values(req.files);
        let promises = values.map(image => cloudinary.v2.uploader.upload(image.path));

    Promise.all(promises)
        .then((results) => {
            console.log(results);
            res.json(results);
        })
        .catch((err) => {console.log(err)})
});

module.exports = router;
