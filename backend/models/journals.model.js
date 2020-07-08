const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    _id: { type: String },
    name: { type: String },
    message: {type: String },
    time: { type: Number },
  },
  {
    timestamps: true,
  }
).plugin(findOrCreate);

module.exports = mongoose.model("journals", usersSchema);
