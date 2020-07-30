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
    },
    likesByEmail: [{ type: String }],
    likesByFullName: [{ type: String }],
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
        postedByGoogleDefaultPic: {
          type: String,
          default: "",
        },
      },
    ],
    postedByFirstName: { type: String },
    postedByFullName: { type: String },
    postedByEmail: { type: String },
    postedByGoogleDefaultPic: {
      type: String,
      default: "",
    },
    dateTime: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodPicturePostings", foodPicPostSchema);
