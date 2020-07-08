var express = require('express');
var router = express.Router();


const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const journals = require("../models/journals.model");

const uri = "mongodb://localhost:27017/myapp";
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

router.get("/", (req, res) => {
  journals.find()
      .then((journals) => res.send(journals))
      .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const author = req.body.author;
  const title = req.body.title;
  const body = req.body.body;
  const images = req.body.images;

  const newJournal = new journals({
    author,
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
  journals.findByIdAndDelete(req.params.id)
      .then(() => res.json("Posting is deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/deleteall", (req, res) => {
  journals.remove({})
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
