<template>
<div class='SceneCard' >
    <div class='title'>标题</div>
    <div class='desc' v-for='(item,id) in num' :key='id' @click='handleClick(id)' ref='desc'>
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
            report: []
        }
    },
    methods: {
        handleClick(id) {
            // console.log(id)
            if (this.witnessTime) {

                let ifadd = this.SceneCardIndex[this.index];
                // console.log(ifadd)
                // console.log(this.SceneCardIndex)
                if (ifadd == undefined) { //确保没有重复
                    this.click = id //判断点的是哪个
                    let mark = {}
                    mark[this.index] = this.click
                    this.$store.commit('changeWeight', 1)
                    this.$store.commit('changeSceneCardIndex', mark)
                    this.weight = this.$store.state.card.weight
                    this.getWitnessReport()
                }

            }
            

        },
        getWitnessReport() {
            let lastKey=-1
            // let report=[]
            for (let key in this.SceneCardIndex) {
                // console.log('key:' + key)
                // if(this.index==key){
                    //  let cname = this.$refs.desc[this.SceneCardIndex[key]].children[0]
                //     report.push(cname)
                // }
                lastKey=key
            }
            let cname = this.$refs.desc[this.SceneCardIndex[lastKey]].children[0].innerText
            console.log(cname)
            // console.log(report)
            this.$store.commit('setSceneCard',cname)

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
            ifreset: state => state.card.SceneCardReset
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
            font-family: "Eater";
            text-align: center;

        }

        .ename {
            font-size: 1em;
            font-family: "Caesar Dressing";
            text-align: center;

        }

        &:hover {

            background: aqua;

        }
    }

}
</style>
