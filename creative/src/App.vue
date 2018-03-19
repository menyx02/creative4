<template>
  <div id="app">
     <app-header/>
    <router-view/>
    <footer>
        <a class="FooterP" href="https://github.com/menyx02/creative4">GitHub Repository</a>
      </footer>

      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
export default {
  name: 'App',
  components: { AppHeader }
}
</script>

<style>
body {
  margin:0px;
}

h1 {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: gray;
    padding: 0px;
  }

  footer a {
    color: white;
    text-decoration: none;
    font-size: 15px;
    margin-left: 15px;
    font-family: 'Nunito', sans-serif;
  }
</style>
