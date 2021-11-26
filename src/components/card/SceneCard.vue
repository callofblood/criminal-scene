<template>
<div class='SceneCard'>
    <div class='title'>标题</div>
    <div class='desc' v-for='(item,id) in num' :key='id' @click='handleClick(id)'>
        <div class='weight' v-if='id==click'>{{weight}}</div>
        <span class='cname'>{{SceneCname[id+6*index]}}</span><br>
        <span class='ename'>{{SceneEname[id+6*index]}}</span>
    </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
export default {
    props: ['index'], //用index来区分是第几张卡
    data() {
        return {
            num: 6,
            ifshow: false,
            click: -1,
            weight: -1,

        }
    },
    methods: {
        handleClick(id) {
            // console.log(id)
            if (this.witnessTime) {
                
                
                let ifadd = this.SceneCardIndex.findIndex(item => Object.keys(item)[0] == this.index);
                // console.log(ifadd)
                // console.log(this.SceneCardIndex)
                if (ifadd == -1) { //确保没有重复
                    this.click = id //判断点的是哪个
                    let mark={}
                    mark[this.index]=this.click
                    this.$store.commit('changeWeight',1)
                    this.$store.commit('changeSceneCardIndex', mark)
                    this.weight = this.$store.state.card.weight
                }
                
                
            }

        },
        getWitnessReport(){
            console.log()
        }

    },
    mounted() {

    },
    watch: {
        ifreset() {
            this.click = -1
        }
    },
    computed: {
        ...mapState({
            SceneCname: state => state.card.SceneCname,
            SceneEname: state => state.card.SceneEname,
            SceneCardIndex: state => state.card.SceneCardIndex,
            witnessTime: state => state.game.witnessTime,
            ifreset:state=>state.card.SceneCardReset
            // weight:state=>state.card.weight
        }),
       

    }
}
</script>

<style lang="scss">
.SceneCard {
    border: 1px solid #fff;
    width: 200px;
    background: rgb(170, 140, 140);
    color: #fff;
    border-radius: 20px;

    .title {
        height: 30px;
        line-height: 30px;
        font-size: 2em;
        font-family: "PINGFang SC";
        margin-top: 10px;
    }

    .desc {
        margin: 20px auto;
        width: 100px;
        height: 70px;
        // border: 1px solid #000;
        position: relative;

        .weight {
            position: absolute;
            font-style: italic;
            font-size: 2em;
            font-weight: bolder;
            color: red;
            border-radius: 50% 50% 50% 50%;
            border: 5px solid #f00;
            width: 50px;
            height: 50px;
            bottom: 10px;
            left: -50px;
        }

        .cname {
            font-size: 2em;
            font-family: "黑体";
            text-align: center;

        }

        .ename {
            font-size: 1em;
            font-family: "等距更纱黑体 Slab SC Xlight";
            text-align: center;

        }

        &:hover {

            background: aqua;

        }
    }

}
</style>
