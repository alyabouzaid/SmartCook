const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const recipes = require("../models/recipes.model");

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
        .then(result => {
            return result.json()})
        .then((results) => {
            console.log(results);
            res.json(results);
        })
        .catch((err) => console.log(err));
});

router.get("/users/:email", (req, res) => {
    recipes.find({email: req.params.email})
        .then((journals) => res.send(journals))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {

    const rq = req.body.recipe;
    const email = req.body.email;
    const recipe = {
        uri: rq.uri,
        label: rq.label,
        image: rq.image,
        source: rq.source,
        url: rq.url,
        sharedAs: rq.sharedAs,
        yield: rq.yield,
        dietLabels: rq.dietLabels,
        healthLabels: rq.healthLabels,
        ingredientLines: rq.ingredientLines,
        ingredients: rq.ingredients,
        calories: rq.calories,
        totalWeight: rq.totalWeight,
        totalTime: rq.totalTime
    };
    const name = rq.label;
    const newRecipe = new recipes({
        email,
        name,
        recipe,
    });

    newRecipe
        .save()
        .then((recipe) => res.send(recipe))
        .catch((err) => res.status(400).json("Error: " + err))
});

router.get("/search/:id", (req, res) => {
    console.log(req.params.id);
    recipes.findById(req.params.id)
        .then((recipe) => res.json(recipe))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/delete/:id", (req, res) => {
    recipes
        .findByIdAndDelete(req.params.id)
        .then(() => res.json("Posting is deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/deleteall", (req, res) => {
    recipes
        .remove({})
        .then(() => res.json("All Postings are deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/popular", (req, res) => {
    recipes.find({})
        .then((recipes) => {
            let dict = {};
            for(const recipe of recipes){
                if(!dict[recipe.name]){
                    dict[recipe.name] = recipe;
                    dict[recipe.name]["count"] = 0;
                }
                dict[recipe.name]["count"]++;
            }
            let rets = Object.values(dict).sort((a, b) => (a["count"] - b["count"]));
            if(rets.length > 50){
                rets = rets.slice(0, 50);
            }
            res.json(rets);
        })
        .catch((err) => {res.status(400).json("Error: " + err); console.log(err);});
});

module.exports = router;
