<template>
  <div>
    <nav>
      <router-link to="/">Kodu</router-link>
      |
      <router-link to="/">Registreeru</router-link>
      |
      <router-link to="/">Logi sisse</router-link>
      |
    </nav>
    <router-view/>
    </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


nav {
  padding: 30px;
  justify-content: center;

}

nav a {
  font-weight: bold;
  color: maroon;
}

nav a.router-link-exact-active {
  color: maroon;
}

</style>
<script setup>
</script>