const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const {ObjectId} = mongoose.Schema.Types

const foodPicPostSchema = new Schema(
  {
    _id: { type: String },
    description: { type: String },
    photo: {
      type: String,
      default: "no photo",
    },
    likes: [{ type: String }],
    comments: [
      {
        text: String,
        postedBy: String,
      },
    ],
    postedBy: { type: String },
    dateTime: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodPicturePostings", foodPicPostSchema);
