<template>
  <div id="app">
    <router-view/>
    <footer>
        <a class="FooterP" href="https://github.com/menyx02/creative4">GitHub Repository</a>
      </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

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
