const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const queryBuilder = (ingredients) => {
  let items = ingredients.map((ingredient) => ingredient.description);
  let query = "q=";
  for (let i = 0; i < items.length; i++) {
    if (i === items.length - 1) {
      query = query + items[i];
    } else {
      query = query + items[i] + "%26";
    }
  }
  return query;
};

async function getRecommendation(ingredients, filter) {
  let query = queryBuilder(ingredients);
  const url =
    `https://api.edamam.com/search?${query}&app_id=43011121&app_key` +
    `=8ded8a6fbd319218357df399687664aa&from=0&to=48&calories=0-${filter.calories}&time=0-${filter.time}&diet=${filter.diet}&health=${filter.healthType}`;
  return fetch(url);
}

router.post("/recommendation", (req, res) => {
  const ingredients = req.body.ingredients;
  const filter = req.body.filter;
  getRecommendation(ingredients, filter)
    // .then((results) => {console.log("666666666666666666") ; return fetch('https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=2%20red%20apple&app_id=bcf76032&app_key=935b4ba268d89ad8e604ad7e26c4187e')
    .then(result2 => {
      console.log("7777777777777"); 
      // console.log(result2.json());
      return result2.json()})
    // })
    // .then((results) => results.json())
    .then((results) => {
      console.log(results);
      res.json(results);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
