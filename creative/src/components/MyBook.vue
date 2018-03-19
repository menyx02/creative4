<template>
  <div class="MyBook">
   <h1> MyBook</h1>

  <div id="optionsBar">
    <p v-on:click="setState('list')">My Recipes </p>
    <p v-on:click="setState('add')">Add New </p>
    <!-- <p v-on:click="setState('edit')">Edit </p>
    <p v-on:click="setState('delete')">Delete </p> -->
    <input type="text" v-model="selected">
  </div>


  <div id="listContainer" v-if="state === 'list'">My Recipes
    <li v-for="item in recipes" :key="item.name" v-on:click="setSelected(item.name)">
       {{item.name}}
    </li>
  </div>


  <div id="addContainer" v-else-if="state === 'add'">Add New
    <input type="text" v-model="name"> name
    <input type="text" v-model="servings">servings
    <input type="text" v-model="ingredients">ingredients
    <input type="text" v-model="steps">steps

    <button v-on:click="addRecipe">Add</button>
  </div>

  <div id="editContainer" v-else-if="state === 'edit'">Edit


    <button v-on:click="editRecipe">Update</button>
  </div>


  <div id="selectedContainer" v-else-if="state === 'selected'">Selected
    {{selectedRecipe.name}}
    <br>
    {{selectedRecipe.servings}}
    <br>
    {{selectedRecipe.ingredients}}
    <br>
    {{selectedRecipe.steps}}

    <button v-on:click="deleteRecipe">Delete</button>
    <button v-on:click="setState('edit')">Edit</button>

  </div>
  </div>
</template>

<script>
import axios from 'axios';
 export default {
   name: 'MyBook',
   data () {
     return {
       selected: '',
       selectedRecipe: {},
      recipes: [],
      state: '',
      name: '',
      servings: '',
      ingredients: '',
      steps: '',
     }
   },
   watch: {
   },
   created: function() {
     this.getRecipes();
   },
   methods: {
     updateSelectedRecipe: function() {
        let recipesMap = this.recipes.map(recipe => { return recipe.name; });
        let index = recipesMap.indexOf(this.selected);
        let recipe = this.recipes[index];
        this.selectedRecipe = recipe;
     },
     setSelected: function(selected) {
       this.selected = selected;
       this.updateSelectedRecipe();
       this.setState('selected');
     },
     setState: function(state) {
       this.state = state;
       this.getRecipes();
     },
     getRecipes: function() {
       axios.get(`/api/recipes/`).then(response => {
         this.recipes = response.data;
       }).catch(err => {
         console.log("error get items");
       });
     },
     addRecipe: function() {
       axios.post(`/api/recipes/add`, {
         name: this.name,
         servings: this.servings,
         ingredients: [this.ingredients],
         steps: [this.steps],
       }).then(response => {
         this.recipes = response.data;
         this.name = '';
         this.servings = '';
         this.ingredients = '';
         this.steps = '';
       }).catch(err => {
         console.log("error add function");
       });
     },
     deleteRecipe: function(item) {
       axios.delete('/api/recipes/' + this.selected).then(response => {
         this.recipes = response.data;
         this.setState('list');
       }).catch(err => {
         console.log("error delete function");
       });
     },
     editRecipe: function() {
       axios.put(`/api/recipes/` + this.selected, {
          name: this.selected,
         ingredients: [],
         steps: [],
         servings: 5,
       }).then(response => {
         this.recipes = response.data;
         this.setState('selected');

       }).catch(err => {
         console.log("error update function");
       });
     },
   }
  }
</script>

<style scoped>
#a {
  background-color: red;
}
#b {
  background-color: orange;
}
#c {
  background-color: pink;
}
</style>
