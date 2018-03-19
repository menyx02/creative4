<template>
  <div class="MyBook">
   <h1>MyBook</h1>

  <div id="optionsBar">
    <div>
      <button v-on:click="setState('list')">My Recipes</button>
      <button v-on:click="setState('add')">Add New</button>
    </div>
  </div>

  <div id="empty" v-if="state === 'empty'"> </div>

  <div id="listContainer" v-if="state === 'list'">
    <li v-for="item in recipes" :key="item.name" v-on:click="setSelected(item.name)">
       {{item.name}}
    </li>
  </div>


  <div class="fieldContainer" v-else-if="state === 'add'">
    <div>
      <span>Name: </span>
      <input type="text" v-model="name">
    </div>

    <div>
      <span>Servings: </span>
      <input type="text" v-model="servings">
    </div>

    <div>
      <span>Ingredients: </span>
      <input type="text" v-model="ingredients">

    </div>

    <div>
      <span>Steps: </span>
      <input type="text" v-model="steps">
    </div>

    <div class="fieldButton">
      <button v-on:click="addRecipe">Add</button>
    </div>
  </div>

  <div class="fieldContainer" v-else-if="state === 'edit'">
    <div>
      <span>Name: </span>
      <input type="text" v-model="selectedRecipe.name" :placeholder="selectedRecipe.name">
    </div>

    <div>
      <span>Servings: </span>
      <input type="text" v-model="selectedRecipe.servings" :placeholder="selectedRecipe.servings">
    </div>

    <div>
      <span>Ingredients: </span>
      <input type="text" v-model="selectedRecipe.ingredients" :placeholder="selectedRecipe.ingredients">
    </div>

    <div>
      <span>Steps: </span>
      <input type="text" v-model="selectedRecipe.steps" :placeholder="selectedRecipe.steps">
    </div>

    <div class="fieldButton">
       <button v-on:click="setState('list')">Cancel</button>
       <button v-on:click="editRecipe">Update</button>
    </div>
  </div>


    <div id="selectedContainer" v-else-if="state === 'selected'">
      <div class="recipeCard">
        <div class="title"> {{selectedRecipe.name}}</div>
        <div class="servings">Servings: {{selectedRecipe.servings}}</div>
        <div class="ingredients">
          Ingredients: <p v-for="ingredient in selectedRecipe.ingredients" :key="ingredient.id">{{ingredient}}</p>
        </div>
        <div class="steps">Steps:
          <p v-for="step in selectedRecipe.steps" :key="step.id">{{step}}</p>
        </div>
      </div>
      <div>
        <button v-on:click="deleteRecipe">Delete</button>
        <button v-on:click="setState('edit')">Edit</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyBook",
  data() {
    return {
      selected: "",
      selectedRecipe: {},
      recipes: [],
      state: "",
      name: "",
      servings: "",
      ingredients: "",
      steps: ""
    };
  },
  watch: {},
  created: function() {
    this.getRecipes();
  },
  methods: {
    updateSelectedRecipe: function() {
      let recipesMap = this.recipes.map(recipe => {
        return recipe.name;
      });
      let index = recipesMap.indexOf(this.selected);
      let recipe = this.recipes[index];
      this.selectedRecipe = recipe;
    },
    setSelected: function(selected) {
      this.selected = selected;
      this.updateSelectedRecipe();
      this.setState("selected");
    },
    setState: function(state) {
      if(state === 'list') {
        if(this.recipes.length === 0) {
          state = 'empty';
          alert("You have no recipes. Add a few to start!");
        }
      }
      this.state = state;
      this.getRecipes();
    },
    getRecipes: function() {
      axios
        .get(`/api/recipes/`)
        .then(response => {
          this.recipes = response.data;
        })
        .catch(err => {
          console.log("error get items");
        });
    },
    addRecipe: function() {
      if(this.name === '' ){
        alert("Recipe name can't be empty");
        return;
      }
      axios
        .post(`/api/recipes/add`, {
          name: this.name,
          servings: this.servings,
          ingredients: [this.ingredients],
          steps: [this.steps]
        })
        .then(response => {
          this.recipes = response.data;
          this.name = "";
          this.servings = "";
          this.ingredients = "";
          this.steps = "";
          alert("Your recipe was successfully added.");
        })
        .catch(err => {
          console.log("error add function");
        });
    },
    deleteRecipe: function(item) {
      axios
        .delete("/api/recipes/" + this.selected)
        .then(response => {
          this.recipes = response.data;
          this.setState("list");
          alert("Your recipe was successfully deleted.");
        })
        .catch(err => {
          console.log("error delete function");
        });
    },
    editRecipe: function() {
      if(this.selectedRecipe.name === '' ){
        alert("Recipe name can't be empty");
        return;
      }
      axios.put(`/api/recipes/` + this.selected, {
          name: this.selectedRecipe.name,
          servings: this.selectedRecipe.servings,
          steps: this.selectedRecipe.steps,
          ingredients: this.selectedRecipe.ingredients,
        })
        .then(response => {
          this.recipes = response.data;
          this.setState("selected");
          alert("Your recipe was updated.");
        })
        .catch(err => {
          console.log("error update function");
        });
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 0px;
  color: white;

}
.MyBook {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
   background-image: url("/static/images/mybook.jpg");
  position: absolute;
  top: 54px;
  right: 0;
  bottom: 0;
  left: 0;

}

#optionsBar {
  margin: 35px 0px;
}

#listContainer {
  font-size: 35px;
  width: 35%;
  text-align: center;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
  background-color: #FCFCFC;
}

#listContainer li {
  font-size: 20px;
  list-style-type: none;
  padding: 5px 0px;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0,0,0,.1);
}

#listContainer li:hover  {
  box-shadow: 0 5px 15px rgba(0,0,0,0.20), 0 5px 5px rgba(0,0,0,0.22);
}

.fieldContainer {
  background-color: #FDFDFD;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  padding: 15px 0px;
}

.fieldContainer  div{
  align-self: flex-start;
  margin: 5px 25px;
}

.fieldContainer .fieldButton {
  align-self: center;
}

#selectedContainer {
  background-color: #FBFBFB;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.5);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  width: 35%;
  padding-bottom: 15px;
  font-family: 'Open Sans', sans-serif;
}

.recipeCard {
  margin: 0px auto 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 50px;
  font-weight: bold;
  margin-top: 5px;
}

.servings {
  margin-top: 0px;
  margin-bottom: 25px;
}

.ingredients {
  font-size: 20px;
  font-weight: bold;
  margin: 0px 20px 20px 20px;
  text-align:center;
}

.ingredients p {
  font-size: 18px;
  font-weight: normal;
  margin:0px;
  padding:0px;
}

.steps {
  font-size: 20px;
  font-weight: bold;
  margin: 0px 20px 20px 20px;
  text-align:center;
}

.steps p {
  font-size: 18px;
  font-weight: normal;
  margin:0px;
  padding:0px;
}
</style>
