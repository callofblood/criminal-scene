<template>
<div class='hint'>
    <div class='timer'>
        {{getTime}}
    </div>
    <el-button plain @click="OK" v-show='true'>
        {{hints[step]}}
    </el-button>
    <el-button type="primary" class='reset' @click='handleReset'>重置</el-button>
    <!-- <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    <!-- <el-alert title="错误提示的文案" type="error"></el-alert> -->
</div>
</template>

<script>
import bus from "../../router/bus.js";
import {
    mapState
} from "vuex";


export default {
    data() {
        return {
            active: 0,

            seconds: 120,
            timer: null,
            hints: [
                "游戏开始",
                "凶手确认",
                "目击者确认",
                "侦探确认",
                "侦探确认",
                "侦探确认",
                "侦探确认",
                "侦探确认",
                "目击者确认调换",
                "侦探确认",
                "侦探确认",
                "侦探确认",
                "侦探确认",
                "侦探确认",
            ]
        };
    },
    methods: {
        OK() {
            if (this.step == 0) {
                bus.$emit("reset");
                this.$notify({
                    title: "游戏开始",
                    message: "请凶手选择作案手段和线索",
                    showClose: false
                });
                this.$store.commit("killerMove", true);
                this.timerStart();
            }
            if (this.step == 1) {
                if (this.meanCard != "" && this.clueCard != "") {
                    bus.$emit("reset");
                    this.$message({
                        type: "success",
                        message: "凶手已确认"
                    });
                    this.$store.commit("gameProgress", 5);
                    this.$store.commit("killerMove", false);
                    this.timerReset();
                    bus.$emit('addActivity', `凶手为@[*]@号，作案工具:@[*]@,现场线索:@[*]@;`)
                    this.$notify({
                        title: "目击现场",
                        message: "请目击者选定权重，1至6重要性递减",
                        showClose: false
                    });

                    this.$store.commit("witnessMove", true);
                    this.timerStart();
                } else {
                    this.$alert("没有选满两张卡，请凶手重新选择", "Error", {
                        confirmButtonText: "确定"
                    });
                    this.$store.commit("gameStep", -1);
                }
            }

            if (this.step == 2) {
                if (this.weight == 6) {
                    this.$message({
                        type: "success",
                        message: "目击者已确认，请调查员侦察现场"
                    });
                    this.$store.commit("gameProgress", 5);
                    this.$store.commit("witnessMove", false);

                    this.timerReset();
                    this.timerStart();
                    //随机选一名玩家行动
                    this.$store.commit('detectiveMove')
                    this.$store.commit("detectiveAlter");
                    bus.$emit("chooseWhichDetective");
                    bus.$emit('addActivity', '目击者给出的信息是:@' + this.SceneCards + '@,(重要性递减);')
                } else {
                    this.$alert("没有选满六张卡，请目击者重新选择", "Error", {
                        confirmButtonText: "确定"
                    });
                    // this.step--;
                    this.$store.commit("gameStep", -1);
                }
            }
            if (this.step >= 3 && this.step <= 7) {
                this.detectivesMove()
            }

            if (this.step == 7) {
                this.$store.commit("witnessMove", 'reselect');
            }
            if (this.step >= 8 && this.step <= 12) {
                this.detectivesMove()

            }
            // this.step += 1;

            this.$store.commit("gameStep", 1);
        },
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        handleReset() {
            if (this.step == 1) {
                //凶手已选择卡，需要重置//理论上应该不可以选第二次，
                bus.$emit("reset");
                this.$store.commit("deepReset");
            }
            if (this.step == 2) {
                this.$store.commit("resetSceneCard");
                this.$store.commit("gameResetSceneCard");
            }
            if (this.step >= 3 && this.step <= 7) {
                bus.$emit("reset");
                bus.$emit('resetSuspectAndAssert')
            }
        },
        timerStart() {
            if (this.timer) clearInterval(this.timer);
            let that = this;

            this.timer = setInterval(function () {
                if (that.seconds >= 1) that.seconds--;

                if (that.seconds <= 0 && that.step == 1) {
                    clearInterval(that.timer);
                    that
                        .$alert("凶手选择超时，调查员胜利，游戏重新开始", "重开", {
                            confirmButtonText: "Remake",
                            showClose: false
                        })
                        .then(() => {
                            that.$router.go(0);
                        })
                        .catch(() => {
                            that.$router.go(0);
                        });
                    //
                }
                if (that.seconds <= 0 && that.step == 2) {
                    clearInterval(that.timer);
                    that
                        .$alert("目击者选择超时，凶手胜利，游戏重新开始", "重开", {
                            confirmButtonText: "Remake",
                            showClose: false
                        })
                        .then(() => {
                            that.$router.go(0);
                        })
                        .catch(() => {
                            that.$router.go(0);
                        });
                    //
                }
                if (that.seconds <= 0 && that.step >= 3 && that.step <= 7) {
                    clearInterval(that.timer);

                    that.$message({
                        type: 'warning',
                        message: "目击者选择超时，自动确认"
                    });
                    that.OK()
                }
            }, 1000);
        },
        timerReset() {
            this.seconds = 120;
            clearInterval(this.timer);
            console.log(this.timer);
        },
        detectivesMove() {
            bus.$emit('sendSuspect')
            bus.$emit('sendAssert')
            // bus.$emit('ifskip')
            this.$store.commit("detectiveAlter"); //改变发言人
            bus.$emit("chooseWhichDetective"); //给player组件传值，改变背景色
            bus.$emit("reset"); //清空所有以质疑的
            if (!this.gameOver) {
                console.log(this.gameOver)
                this.timerReset(); //重置时间
                this.timerStart();
            }else{
                clearInterval(this.timer)
            }
            this.$store.commit("gameProgress", 5);
            bus.$emit('resetSuspectAndAssert')
        }
    },
    mounted() {
        // this.open1()
        // this.step++\
        // let that = this
        // bus.$on('gameOver', () => {
        //     window.clearInterval(that.timer)
        // })
    },
    computed: {
        ...mapState({
            meanCard: state => state.game.meanCard,
            clueCard: state => state.game.clueCard,
            weight: state => state.card.weight,
            step: state => state.game.step,
            killer: state => state.player.killer,
            SceneCards: state => state.game.SceneCards,
            gameOver: state => state.game.gameOver
        }),
        getTime() {
            let min = parseInt(this.seconds / 60);
            let sec = this.seconds - Number(min * 60);
            if (sec < 10) sec = "0" + sec;
            return "0" + min + ":" + sec;
        }
    }
};
</script>

<style lang="scss">
.hint {
    height: auto;
    font-size: 3em;
    // margin-top: 10px;

    .reset {
        margin-top: 10px;
    }

    .timer {
        float: left;
        font-size: 3em;
        line-height: 1em;
        position: absolute;
        left: 200px;
        margin-top: 0px;
    }
}
</style>
