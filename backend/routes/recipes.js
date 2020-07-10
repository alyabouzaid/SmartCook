const express = require('express');
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

async function getRecommendation (ingredients)  {
    let query = queryBuilder(ingredients);
    const url = `https://api.edamam.com/search?${query}&app_id=43011121&app_key` +
        "=8ded8a6fbd319218357df399687664aa&from=0&to=10&calories=591-722&health=alcohol-free";
    return fetch(url);
}


router.post('/recommendation', (req, res) => {
    const ingredients = req.body.ingredients;
    getRecommendation(ingredients)
        .then((results) => results.json())
        .then((results) =>  {
               console.log(results);
               res.json(results);
        })
        .catch((err) => console.log(err));
});

module.exports = router;