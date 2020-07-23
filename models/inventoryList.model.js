const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var inventorySchema = new Schema(
  {
    email: String,
    inventory: [
      {
        key: Number,
        description: String,
        amount: Number,
        targetAmount: Number,
        selected: Boolean,
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Inventories", inventorySchema);
