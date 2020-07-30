const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    email: { type: String },
    firstName: { type: String },
    fullName: { type: String },
    googleDefaultPic: {
      type: String,
      default: "",
    },
    userUploadedPic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
).plugin(findOrCreate);

module.exports = mongoose.model("users", usersSchema);
