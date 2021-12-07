<template>
<div class='Card' @click='handleClick'>
    <el-badge :value="clickTime" class="item">
        <div class='cname'>{{cname}}</div>
        <div class='ename'>{{ename}}</div>
        <img :src="imgUrl" alt="" class='cardImg'>
    </el-badge>

</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props: ['cname', 'ename', 'id'],
    data() {
        return {

            imgUrl: require('@/assets/meansCard/1.jpg'),
            time:0
        }
    },
    methods: {
        handleClick() {
            // console.log('click')
            let boo = {
                str: 'click',
                id: this.id
            }
            this.$emit('getSonValue', boo)
            
        }
    },
    computed:{
        ...mapState({
            detectiveTime:state=>state.game.detectiveTime
        }),
        clickTime(){
            if(this.time>0){
               return this.time
            }else{
                return ''
            }
        }
    }
}
</script>

<style lang="scss">
.Card {
    border-radius: 10px;

    img.cardImg {
        width: 75px;
        height: 75px;
        // background:#ff0;
    }

    .cname,
    .ename {
        font-family: 黑体
    }

}
</style>
