<template>
  <div class="Search">
   <h1> Search</h1>
   <!-- how to erase this field after seacrh  -->
   <input id="questionInput" type="text" v-model="query" autocomplete="off">
   <button @click="lookup">Look up</button>

   <div class="recipeCard" v-for="item in recipes" :key="item.label" @click="redirect(item)">
     <div class="title"> {{item.name}}</div>
     <img :src="item.image">
     <div class="calories"> Calories: {{item.calories}}</div>
     <div class="ingredients">
       Ingredients:
       <p v-for="ingredient in item.ingredientLines" :key="ingredient.id">{{ingredient}}</p>
       </div>
   </div>

  <link href="https://fonts.googleapis.com/css?family=Gudea" rel="stylesheet">
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
       alert("You can click each card to visit the URL for that recipe");
       axios.get(`https://api.edamam.com/search?q=${this.query}&app_id=${this.api_id}&app_key=${this.api_key}`).then(response => {
         if(response.data.count === 0) {
           alert("Sorry, your search didn't find anything. Try with a different name");
         }
        this.recipes = [];
        console.log(response);
        for(var i = 0; i < 10; i++) {

            let nameArray =  response.data.hits[i].recipe.label;
            let imageArray = response.data.hits[i].recipe.image;
            let caloriesArray = response.data.hits[i].recipe.calories.toFixed(2);
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
  font-family: 'Gudea', sans-serif;
   background-image: url("/static/images/cooking.jpg");
  position: absolute;
  top: 54px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: scroll;
}
input {
  margin-bottom: 100px;
}
.recipeCard {
  margin: 0px auto 100px auto;
  width: 40%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FCFCFC;
}
.recipeCard:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.60), 0 10px 10px rgba(0,0,0,0.22);
}

.title {
  font-size: 50px;
  font-weight: bold;
  margin: 15px 0px;
}
.recipeCard img {
  width: 300px;
  height: 300px;
}

.calories {
  margin-bottom: 15px;
}

.ingredients {
  font-size: 20px;
  font-weight: bold;
  margin: 0px 20px 20px 20px;

}

.ingredients p {
  font-size: 18px;
  font-weight: normal;
  margin:0px;
  padding:0px;
}

</style>
