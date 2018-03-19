const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('dist'));


//Key of recipes is name of recipe
let recipes = [];
let id = 0;
//Structrue of recipe
let recipe = { name: '',
            ingredients:[],
            steps:[],
            servings: 0,
            };


//Get all recipes
app.get('/api/recipes', (req, res) => {
    res.send(recipes);
});

//Add a recipe
app.post('/api/recipes/add', (req, res) => {
    var isduplicate = false;
    //Don't accept duplicate names
    recipes.forEach(function(element) {
        if(element.name === req.body.name) {
            isduplicate = true;
        }
    });

    if(isduplicate) return;

    recipe = {name: req.body.name, ingredients: req.body.ingredients,
    steps: req.body.steps, servings: req.body.servings};
    recipes.push(recipe);

    id += 1;
    res.send(recipes);
});

//Delete a recipe
app.delete('/api/recipes/:name', (req, res) => {
    let name = req.params.name;
    let recipesMap = recipes.map(recipe => { return recipe.name; });
    let index = recipesMap.indexOf(name);
    if (index === -1) {
        res.status(404).send("Sorry, that item doesn't exist");
        return;
    }
    recipes.splice(index, 1);
    id -= 1;
    res.send(recipes);
});

//Update a recipe
app.put('/api/recipes/:name', (req, res) => {
    let name = req.params.name;
    let recipesMap = recipes.map(recipe => { return recipe.name; });
    let index = recipesMap.indexOf(name);
    let recipe = recipes[index];


    recipe = {name: req.body.name, ingredients: req.body.ingredients,
        steps: req.body.steps, servings: req.body.servings};
    recipes[index] = recipe;
    res.send(recipes);
});






app.listen(3000, () => console.log('Server listening on port 3000!'));
