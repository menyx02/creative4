<template>
  <div class="Search">
   <h1> Search</h1>
   <!-- how to erase this field after seacrh  -->
   <input id="questionInput" type="text" v-model="query">
   <button @click="lookup">Look up</button>
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
     }
   },
   methods: {
     lookup: function() {
       axios.get(`https://api.edamam.com/search?q=${this.query}&app_id=${this.api_id}&app_key=${this.api_key}`, {
         query: '',
       }).then(response => {
         this.query = '';
         console.log(response);

         console.log(response.data.hits[0].recipe.label);
         console.log(response.data.hits[0].recipe.image);
         console.log(response.data.hits[0].recipe.calories);
         console.log(response.data.hits[0].recipe.ingredientLines);
         console.log(response.data.hits[0].recipe.url);
       }).catch(err => {

       });
     }
   }
  }
</script>

<style scoped>

</style>
