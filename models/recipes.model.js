const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        email: String,
        name: String,
        recipe: {uri: String,  label: String, image: String, source: String, url: String, sharedAs: String,
            yield: Number, dietLabels: Array, healthLabels: Array, ingredientLines: Array,
            ingredients: Array, calories: Number, totalWeight: Number, totalTime: Number},
    },
    {
        timestamps: true,
    }
).plugin(findOrCreate);

module.exports = mongoose.model("recipes", usersSchema);
