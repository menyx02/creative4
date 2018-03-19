<template>
  <div class="MyBook">
   <h1> MyBook</h1>
   <button v-on:click="get"></button>
   <button v-on:click="add"></button>
   <button v-on:click="deleteItem"></button>
   <button v-on:click="update"></button>

  </div>
</template>

<script>
import axios from 'axios';
 export default {
   name: 'MyBook',
   data () {
     return {
       selected: 'beef',
       recipes: [],
     }
   },
   computed: {

   },
   created: function() {
     this.get();
   },
   methods: {
     get: function() {
       axios.get(`/api/recipes/`).then(response => {
         console.log(response.data);
         this.recipes = response.data;
       }).catch(err => {
         console.log("error get items");
       });
       console.log(this.recipes);
     },
     add: function() {
       axios.post(`/api/recipes/add`, {
         name: this.selected,
         ingredients: [],
         steps: [],
         servings: 1,
       }).then(response => {
         console.log(response.data);
         this.recipes = response.data;
       }).catch(err => {
         console.log("error add function");
       });
     },
     deleteItem: function(item) {
       axios.delete('/api/recipes/' + this.selected).then(response => {

       }).catch(err => {
         console.log("error delete function");
       });
     },
     update: function() {
       axios.put(`/api/recipes/` + this.selected, {

       }).then(response => {

       }).catch(err => {
         console.log("error update function");
       });
     },
   }
  }
</script>

<style scoped>

</style>
