<template>
<div class='main'>
    <v-timer class='timer'></v-timer>
    <v-hint></v-hint>
    <v-scenecard v-for='(item,id) in num' 
    :key='id' 
    class='sceneCard'
    :index='id'
    ></v-scenecard>
    <!-- <div class='myself'>
        <v-player :imgUrl='imgUrl' :num='0'></v-player>
    </div> -->
    <el-row class='info'>
 
  <el-col :sm="12" :lg="24">
    <el-result icon="warning" title="警告" subTitle="剩余破案次数:2">
      <template slot="extra">
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
  <el-col :sm="12" :lg="24">
    <el-result icon="info" title="信息提示" subTitle="请注意发言时长">
      <template slot="extra">
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
</el-row>
</div>
</template>

<script>
import axios from 'axios'
import SceneCard from './card/SceneCard'
// import Player from './Player'
import Hint from './UI/Hint'
import Timer from './UI/Timer'
export default {
    components: {
        'v-scenecard': SceneCard,
        // 'v-player':Player,
        'v-hint':Hint,
        'v-timer':Timer
    },
    data() {
        return {
            num: 6,
            imgUrl:require('@/assets/player/1.jpg'),
            
        }
    },
    methods: {
        genSceneCard() {
            axios.get('/genSceneCard').then(res => {
                let SceneCname=res.data.SceneCname
                let SceneEname=res.data.SceneEname
                this.$store.commit('addSceneCardName',{SceneCname,SceneEname})
            })
        }
    },
    mounted() {
        this.genSceneCard()
        
    },
    
}
</script>

<style lang="scss" scope>
.main {
    position: relative;
    // display: flex;
    // align-items: center;
    overflow: hidden;
    height:100%;
    
   
    .sceneCard{
        margin-left:5%;
        margin-top:100px;
        // overflow: hidden;
        width:200px;
        float: left;
        
        // height:600px;
        // margin-bottom:200px;
    }
    .info{
        position: absolute;
        bottom:0;
    }
    .timer{
        float: left;
        font-size:10em;
        line-height: 1em;
        position:absolute;
        left:200px;
        margin-top:0px;
    }
    
}

</style>
