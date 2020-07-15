var express = require("express");
var router = express.Router();

const journals = require("../models/journals.model");

router.get("/", (req, res) => {
  journals.find()
      .then((journals) => res.send(journals))
      .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const author = req.body.author;
  const email = req.body.email;
  const title = req.body.title;
  const body = req.body.body;
  const images = req.body.images;

  const newJournal = new journals({
    author,
    email,
    title,
    body,
    images,
  });

  newJournal
      .save()
      .then((journal) => res.send(journal))
      .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/search/:id", (req, res) => {
  console.log(req.params.id);
  journals.findById(req.params.id)
      .then((journal) => res.json(journal))
      .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/delete/:id", (req, res) => {
  journals
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Posting is deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/deleteall", (req, res) => {
  journals
    .remove({})
    .then(() => res.json("All Postings are deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", (req, res) => {
  journals.findById(req.params.id)
      .then((journal) => {
        journal.author = req.body.author;
        journal.title = req.body.title;
        journal.body = req.body.body;
        journal.images = req.body.images;
        journal
            .save()
            .then((journal) => res.send(journal))
            .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
