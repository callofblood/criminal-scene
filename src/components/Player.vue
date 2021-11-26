<template>
<div class='player' @click='selectPlayer(num)'>
    <img :src="imgUrl" alt="">
    <div class='cards'>
        <v-card class='means' v-for='(i,id) in meansNum' :key='i' :cname='cname[id+num*4]' :ename='ename[id+num*4]' :id='id' @getSonValue='meansCardClick' ref='means'></v-card>
        <v-card class='clues' v-for='(i,id) in cluesNum' :key='i+4' :cname='cname[id+num*4+20]' :ename='ename[id+num*4+20]' :id='id' @getSonValue='cluesCardClick' ref='clues'></v-card>
    </div>
    <div class='stations'>
    <div class='el-icon-close-notification icon' ></div>
    <div class='el-icon-microphone icon'></div>
    </div>
    <!-- <el-button @click='resetCards'>reset</el-button> -->
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import card from "./card/CommonCard";
import bus from '../router/bus.js'
export default {
    props: ["imgUrl", "num", ],
    data() {
        return {
            meansNum: 4,
            cluesNum: 4,
            meansClick: 0,
            cluesClick: 0
        };
    },
    computed: {
        ...mapState({
            cname: state => state.card.cname,
            ename: state => state.card.ename,
            ifChoose: state => (state.player.killer == -1 ? false : true),
            killerTime:state=>state.game.killerTime
        })
        // ...mapGetters(['playerByIdentity'])
    },
    components: {
        "v-card": card
    },
    mounted() {
        // console.log(this.playerByIdentity('killer'))
        // console.log(this.whichKiller)
        bus.$on('reset', () => {
            this.resetCards()
        })
    },
    methods: {
        selectPlayer(num) {
            // console.log(num)
            if (!this.ifChoose && this.killerTime) {
                console.log(num, this.ifChoose);
                let bza = {
                    identity: "killer",
                    id: num
                };
                this.$store.commit("selectPlayer", bza);
            }
        },
        meansCardClick(val) {
            //val是点了第几张卡
            if (this.$store.state.player.killer == this.num && this.meansClick < 1&&this.killerTime) { //this.num指第几个玩家

                this.meansClick++
                this.$refs.means[val.id].$el.style.background = "#ff0";
                // console.log(this.$refs.means[val.id].$el.firstChild.innerText)
                let cardName=this.$refs.means[val.id].$el.firstChild.innerText
                this.$store.commit('gameSetCard',{cardType:'meanCard',cardName})
            }
        },
        cluesCardClick(val) {
            if (this.$store.state.player.killer == this.num && this.cluesClick < 1 &&this.killerTime) { //this.num指第几个玩家
                this.cluesClick++
                this.$refs.clues[val.id].$el.style.background = "#ff0";
                let cardName=this.$refs.clues[val.id].$el.firstChild.innerText
                this.$store.commit('gameSetCard',{cardType:'clueCard',cardName})
            }
        },
        resetCards() {
            for (let i = 0; i < 4; i++) {
                this.$refs.clues[i].$el.style.background = "#fff";
            }
            for (let i = 0; i < 4; i++) {
                this.$refs.means[i].$el.style.background = "#f00";
            }
            this.meansClick = 0
            this.cluesClick = 0

        },

    }
};
</script>

<style lang="scss">
.player {
    height: 250px;
    border: 2px dashed #000;
    border-radius: 20px;
    width: 550px;
    overflow: hidden;

    .name {
        line-height: 20px;
    }

    img {
        width: 125px;
        height: 125px;
        float: left;
        padding: 1px;
        border-radius: 20px;
    }

    .cards {
        width: 400px;
        float: right;
        margin-left: 15px;
        overflow: hidden;
        .means,
        .clues {
            border: 1px solid #f00;
            box-sizing: border-box;
            margin-left: 20px;
            height: 125px;
            width: 80px;
            float: right;
            overflow: hidden;
            background: #f00;

            .cname {
                line-height: 15px;
                height: 15px;
                font-size: 15px;
            }

            .ename {
                line-height: 10px;
                height: 10px;
                font-size: 10px;
            }

            &:hover {
                background: rgb(133, 214, 133);
            }
        }

        .clues {
            background: #fff;
        }
    }
    .el-icon-close-notification.icon{
        // float: left;
        
        font-size:50px;
    }
    .el-icon-microphone.icon{
        // float: left;
        margin-left:20px;
        font-size:50px;
    }
    .stations{
        position: absolute;
        bottom:20px;
        left:20px;
    }
}

</style>
