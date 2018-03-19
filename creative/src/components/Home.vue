<template>
  <div class="MyBook">
   <h1>eCook</h1>

   <p>Welcome to eCook! </p>
   <p>We provide the easiest way for you to store and manage your recipes online!</p>
   <p>And for those times when you need some inspiration, visit our recipe searcher!</p>

  </div>
</template>

<script>
 export default {
   name: 'Home',
   data () {
     return {
     }
   },

   methods: {

   }
  }
</script>

<style scoped>
.MyBook {
  background-image: url("/static/images/kitchen.jpg");
  position: absolute;
  top: 54px;
  right: 0;
  bottom: 0;
  left: 0;
}
h1 {
  margin-bottom: 100px;
  color: white;
  font-size: 80px;
}
p {
  text-align: center;
  font-size: 30px;
  color: white;
}


</style>



