const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    author: { type: String },
    title: { type: String },
    body: {type: String },
    images: { type : Array , "default" : [] } ,
  },
  {
    timestamps: true,
  }
).plugin(findOrCreate);

module.exports = mongoose.model("journals", usersSchema);
