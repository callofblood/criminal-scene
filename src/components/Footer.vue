<template>
<div class='footer'>
    <div class='progress'>
        <el-progress :percentage="progress"></el-progress>
    </div>
</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            
        }
    },
    computed:{
        ...mapState({
            progress:state=>state.game.progress
        })
    }
}
</script>
<style lang="scss">
.footer {
    div.progress>div>div.el-progress-bar {
        margin-top:25px;
    }
}
</style>
