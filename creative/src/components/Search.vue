<template>
  <div class="Search">
   <h1> Search</h1>
   <!-- how to erase this field after seacrh  -->
   <input id="questionInput" type="text" v-model="query" autocomplete="off">
   <button @click="lookup">Look up</button>

   <div class="recipeCard" v-for="item in recipes" :key="item.label" @click="redirect(item)"> {{item.name}}</div>

  </div>
</template>

<script>
import axios from 'axios';
 export default {
   name: 'Search',
   data() {
     return  {
        api_id: 'c25d680b',
        api_key: '9616a4b666dc38d14ded21c65f1743f5',
        query: '',
        recipes: [],
     }
   },
   methods: {
     redirect: function(item) {
      window.location.href = item.url;
     },
     lookup: function() {
       axios.get(`https://api.edamam.com/search?q=${this.query}&app_id=${this.api_id}&app_key=${this.api_key}`).then(response => {
         if(response.data.count === 0) {
           alert("Sorry, your search didn't find anything. Try with a different name");
         }
        this.recipes = [];
        console.log(response);
        for(var i = 0; i < 10; i++) {

            let nameArray =  response.data.hits[i].recipe.label;
            let imageArray = response.data.hits[i].recipe.image;
            let caloriesArray = response.data.hits[i].recipe.calories;
            let ingredientLinesArray =  response.data.hits[i].recipe.ingredientLines;
            let urlArray =  response.data.hits[i].recipe.url;

            let item = {name: nameArray, image: imageArray, calories: caloriesArray,
            ingredientLines: ingredientLinesArray, url: urlArray};

           this.recipes.push(item);
        }

        this.query = '';
       }).catch(err => {
         console.log("error lookup function");
       });
     }
   }
  }
</script>

<style scoped>
.Search {
  text-align: center;
}

.recipeCard {
  background-color: red;
}
</style>
