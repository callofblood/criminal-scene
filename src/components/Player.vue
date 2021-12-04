<template>
<div class='player' @click='selectPlayer(num)' :class='nowDetective'>
    <img :src="imgUrl" alt="">
    <div class='cards'>
        <v-card class='means' v-for='(i,id) in meansNum' :key='i' :cname='cname[id+num*4]' :ename='ename[id+num*4]' :id='id' @getSonValue='meansCardClick' ref='means'></v-card>
        <v-card class='clues' v-for='(i,id) in cluesNum' :key='i+4' :cname='cname[id+num*4+20]' :ename='ename[id+num*4+20]' :id='id' @getSonValue='cluesCardClick' ref='clues'></v-card>
    </div>
    <div class='stations'>
        <div class='suspectButton button'>
            <el-button type="warning" round @click='suspect'>怀疑</el-button>
        </div>
        <div class='assertButton button'>
            <el-button type="danger" round @click='assert'>断言</el-button>
        </div>
    </div>
    <!-- <el-button @click='resetCards'>reset</el-button> -->
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import card from "./card/CommonCard";
import bus from "../router/bus.js";
export default {
    props: ["imgUrl", "num", 'which'],
    data() {
        return {
            meansNum: 4,
            cluesNum: 4,
            meansClick: 0,
            cluesClick: 0,
            nowDetective: '',
            suspected: false,
            meansSuspect: [],
            cluesSuspect: [],
            meansAssert: [],
            cluesAssert: [],
            ifSuspect: false,
            ifAssert: false
        };
    },
    computed: {
        ...mapState({
            cname: state => state.card.cname,
            ename: state => state.card.ename,
            ifChoose: state => (state.player.killer == -1 ? false : true),
            killerTime: state => state.game.killerTime,
            detectiveTime: state => state.game.detectiveTime,
            step: state => state.game.step,
            whichDetective: state => state.game.whichDetective,
            meanCard: state => state.game.meanCard,
            clueCard: state => state.game.clueCard
        })
        // ...mapGetters(['playerByIdentity'])
    },
    components: {
        "v-card": card
    },
    mounted() {
        // console.log(this.playerByIdentity('killer'))
        // console.log(this.whichKiller)
        bus.$on("reset", () => {
            this.resetCards();

        });
        bus.$on('chooseWhichDetective', () => {
            this.chooseWhichDetective()
        })

        bus.$on('sendSuspect', () => {
            if (this.meansSuspect.length > 0 || this.cluesSuspect.length > 0) { //判断是否有被怀疑
                let suspected = ''
                if (this.meansSuspect) suspected = Object.keys(this.meansSuspect[0])[0] //标定被怀疑的ID
                if (this.cluesSuspect) suspected = Object.keys(this.meansSuspect[0])[0]
                let suspectMes = this.whichDetective + `号侦探怀疑${suspected}号:`

                if (this.meansSuspect.length > 0) { //依次加入
                    suspectMes += '作案手法:@'
                    for (let i in this.meansSuspect) {
                        suspectMes += this.meansSuspect[i][suspected] + '  '
                    }
                }

                if (this.cluesSuspect.length > 0) { //依次加入
                    suspectMes += '@现场线索:@'
                    for (let i in this.cluesSuspect) {
                        suspectMes += this.cluesSuspect[i][suspected] + '  '

                    }
                }
                suspectMes += '@'
                // console.log(suspectMes)

                bus.$emit('addActivity', suspectMes) //传给log
                this.meansSuspect = []
                this.cluesSuspect = []
                this.ifSuspect = true
            }
        })
        bus.$on('sendAssert', () => {
            if (this.meansAssert.length > 0 && this.cluesAssert.length > 0) { //判断是否有被怀疑
                let asserted = ''
                asserted = Object.keys(this.meansAssert[0])[0] //标定被怀疑的ID
                let assertMes = this.whichDetective + `号侦探断言${asserted}号:`

                assertMes += '作案手法:@'
                for (let i in this.meansAssert) {
                    assertMes += this.meansAssert[i][asserted] + '  '
                }

                assertMes += '@现场线索:@'
                for (let i in this.cluesAssert) {
                    assertMes += this.cluesAssert[i][asserted] + '  '
                }

                assertMes += '@'
                // console.log(suspectMes)

                bus.$emit('addActivity', assertMes) //传给log

                console.log(Object.values(this.meansAssert[0]))
                let m = Object.values(this.meansAssert[0])[0]
                let c = Object.values(this.cluesAssert[0])[0]
                if (m == this.meanCard && c == this.clueCard) {
                    console.log('破案成功')
                    this.$message({
                        type: "success",
                        message: this.whichDetective + "号已找出凶手，凶手是" + asserted + "号"
                    });
                    this.end()
                }
                this.meansAssert = []
                this.cluesAssert = []
                this.ifAssert = true
            }
        })
        bus.$on('ifskip', () => {
            if (!this.ifSuspect && !this.ifAssert) {
                if (this.whichDetective == this.which) {
                    let skipMsg = this.whichDetective + `号侦探本回合待机`
                    bus.$emit('addActivity', skipMsg) //传给log
                }
            }
        })
        bus.$on('resetSuspectAndAssert', () => {
                this.resetSuspect()
                this.resetAssert()
            }),
            bus.$on('checkAssert', () => {
                this.checkAssert()
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
            if (
                this.$store.state.player.killer == this.num &&
                this.meansClick < 1 &&
                this.killerTime
            ) {
                //this.num指第几个玩家

                this.meansClick++;
                this.$refs.means[val.id].$el.style.background = "#ff0";
                let cardName = this.$refs.means[val.id].$el.firstChild.innerText;
                this.$store.commit("gameSetCard", {
                    cardType: "meanCard",
                    cardName
                });
                // console.log(this.$store.state.game)
            }
            if (this.suspected) {
                this.$refs.means[val.id].$el.style.background = "#ff0";
                let id = this.which //标定怀疑的对象
                let fm = {}
                fm[id] = this.$refs.means[val.id].$el.firstChild.innerText
                this.meansSuspect.push(fm)
            }
            if (this.asserted && this.meansClick < 1) {
                this.meansClick++;
                this.$refs.means[val.id].$el.style.background = "orange";
                let id = this.which //标定怀疑的对象
                let fm = {}
                fm[id] = this.$refs.means[val.id].$el.firstChild.innerText
                this.meansAssert.push(fm)

            }
        },
        cluesCardClick(val) {
            if (
                this.$store.state.player.killer == this.num &&
                this.cluesClick < 1 &&
                this.killerTime
            ) {
                //this.num指第几个玩家
                this.cluesClick++;
                this.$refs.clues[val.id].$el.style.background = "#ff0";
                let cardName = this.$refs.clues[val.id].$el.firstChild.innerText;
                this.$store.commit("gameSetCard", {
                    cardType: "clueCard",
                    cardName
                });
            }
            if (this.suspected) {
                this.$refs.clues[val.id].$el.style.background = "#ff0";
                let id = this.which
                let fm = {}
                fm[id] = this.$refs.clues[val.id].$el.firstChild.innerText
                this.cluesSuspect.push(fm)
            }
            if (this.asserted && this.cluesClick < 1) {
                this.cluesClick++;
                this.$refs.clues[val.id].$el.style.background = "orange";
                let id = this.which
                let fm = {}
                fm[id] = this.$refs.clues[val.id].$el.firstChild.innerText
                this.cluesAssert.push(fm)
            }
        },
        resetCards() {
            for (let i = 0; i < 4; i++) {
                this.$refs.clues[i].$el.style.background = "#fff";
            }
            for (let i = 0; i < 4; i++) {
                this.$refs.means[i].$el.style.background = "#f00";
            }
            this.meansClick = 0;
            this.cluesClick = 0;
        },
        suspect() {
            if (this.detectiveTime) {
                if (this.which != this.whichDetective) this.suspected = true
                else {
                    this.$alert("你不能质疑自己！", "Are you OK?", {
                        confirmButtonText: "I'm OK"
                    });
                }
            }
        },
        assert() {
            if (this.detectiveTime) {
                if (this.which != this.whichDetective) this.asserted = true
                else {
                    this.$alert("你不能断言自己！", "Are you OK?", {
                        confirmButtonText: "I'm OK"
                    });
                }
            }
        },
        chooseWhichDetective() {
            if (this.which == this.whichDetective) this.nowDetective = "nowDetective";
            else {
                this.nowDetective = ''
            }
        },
        resetSuspect() {
            this.meansSuspect = []
            this.cluesSuspect = []
        },
        resetAssert() {
            this.meansAssert = []
            this.cluesAssert = []

        },
        checkAssert() {
            if (this.meansAssert[0] == this.meanCard &&
                this.cluesAssert[0] == this.clueCard) {
                return true
            } else {
                return false
            }
        },
        end() {
            this.$router.push('/scoreboard')
        }
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

    // background:#f00;
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

    .suspectButton.button {
        // float: left;

        font-size: 25px;
    }

    .assertButton.button {
        // float: left;
        // margin-left:20px;
        font-size: 25px;
    }

    .stations {
        position: absolute;
        bottom: 10px;
        left: 50px;
    }
}

.nowDetective {
    background: #000;
}
</style>
