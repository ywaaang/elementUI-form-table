<template>
  <div id="app">
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.nav {
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  background-color: #eee;
}
</style>
