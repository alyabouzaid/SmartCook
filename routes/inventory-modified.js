const router = require("express").Router();
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const inventoryList = require("../models/inventoryList.model");

// get all inventories
router.get("/", (req, res) => {
  inventoryList
    .find({ email: req.query.email })
    .then((inventory) => res.status(200).json(inventory))
    .catch((err) => res.status(400).json("Error: ", err));
});

router.post("/", function (req, res, next) {
  console.log(req.body.email);
  console.log(req.body.inventory[0]);

  Streams.update(
    { email: req.body.email },
    { $push: { inventory: req.body.inventory[0] } }
  ).catch((err) => console.log(err));

  res.setHeader("Content-Type", "application/json");
  res.send({});
});

router.delete("/:email", function (req, res, next) {
  console.log(req.params.email);

  Streams.update(
    { email: req.params.email },
    { $set: { inventory: [] } }
  ).catch((err) => console.log(err));

  res.setHeader("Content-Type", "application/json");
  res.send({});
});

router.delete("/:email/:key", function (req, res, next) {
  console.log(req.params.email);

  Streams.update(
    { email: req.params.email },
    { $pull: { inventory: { key: req.params.key } } }
  ).catch((err) => console.log(err));

  res.setHeader("Content-Type", "application/json");
  res.send({});
});

module.exports = router;
