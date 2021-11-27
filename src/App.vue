<template>
  <div id="app">
    <router-view v-if='isRouterAlive'></router-view>
  </div>
</template>

<script>

// import player from './components/player'

export default {
  name: 'App',
  components: {
    // 'v-home':home
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(()=>{
        this.isRouterAlive=true
      })
    }
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
