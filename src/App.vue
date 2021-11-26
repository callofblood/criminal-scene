<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

// import player from './components/player'

export default {
  name: 'App',
  components: {
    // 'v-home':home
  }
}
</script>

<style lang='scss'>

  #app{
    height:100vh;
    text-align: center;
  }
  body{
    margin:0;
    padding:0;
    border:0
  }
</style>
