<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/memory_cards_game">Memory Cards Game</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>
body {
  background-color: rgb(255, 249, 249);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #00aeff;
}
</style>
