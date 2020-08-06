var express = require("express");
var router = express.Router();
const inventoryList = require("../models/inventoryList.model");

router.get("/:email", function (req, res, next) {
  inventoryList
      .find({ email: req.params.email })
      .then((userInventory) => res.send(userInventory[0].inventory))
      .catch((err) => res.json( err));

});

router.post("/", function (req, res, next) {
  inventoryList.updateOne(
      { email: req.body.email },
      { $push: { inventory: req.body.inventory[0] }}, {upsert:true}
  ).then((ret) => res.json(ret))
      .catch((err) => res.json(err));
});

router.post("/edit", function (req, res, next) {
  console.log(String(req.params.description))
  inventoryList.updateOne(
      { email: req.body.email,"inventory.description": req.body.description},
      { $inc:  {"inventory.$.amount":req.body.amount }  }
  ).then((ret) => res.json(ret))
      .catch((err) => res.json(err));
});

router.delete("/:email", function (req, res, next) {
  inventoryList.updateOne(
      { email: req.params.email },
      { $set: { inventory: [] } }
  ).then((ret) => res.json(ret))
      .catch((err) => res.json(err));

});

router.delete("/:email/:key", function (req, res, next) {
  inventoryList.updateOne(
      { email: req.params.email },
      { $pull: { inventory: { key: req.params.key } } }
  ).then((ret) => res.json(ret))
      .catch((err) => res.json(err));
});

module.exports = router;
