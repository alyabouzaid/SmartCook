const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const {ObjectId} = mongoose.Schema.Types

const foodPicPostSchema = new Schema(
  {
    _id: { type: String },
    description: { type: String },
    image: {
      type: Array,
      default: [],
      // default: "no photo",
    },
    likes: [{ type: String }],
    likesLength: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        text: String,
        postedByFirstName: String,
        postedByFullName: String,
        postedByEmail: String,
      },
    ],
    postedByFirstName: { type: String },
    postedByFullName: { type: String },
    postedByEmail: { type: String },
    dateTime: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodPicturePostings", foodPicPostSchema);
