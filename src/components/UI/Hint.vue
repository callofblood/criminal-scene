<template>
<div class='hint'>
    <el-button plain @click="open1" v-show='true'>
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
            step: 0,
            hints: ["游戏开始", "确认", "目击者复述现场", "确认", "......"]
        };
    },
    methods: {
        open1() {
            if (this.step == 0) {
                bus.$emit("reset");
                this.$notify({
                    title: "游戏开始",
                    message: "请凶手选择作案手段和线索",
                    showClose: false
                });
                this.$store.commit("killerMove", true);
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
                } else {
                    this.$alert("没有选满两张卡，请凶手重新选择", "Error", {
                        confirmButtonText: "确定"
                    });
                    this.step--;
                }
            }
            if (this.step == 2) {
                this.$notify({
                    title: "目击现场",
                    message: "请目击者选定权重，1至6重要性递减",
                    showClose: false
                });
                console.log("作案手段:" + this.meanCard);
                console.log("现场线索:" + this.clueCard);
                this.$store.commit("witnessMove");
            }
            if (this.step == 3) {
                if (this.weight == 6) {
                    this.$message({
                        type: "success",
                        message: "目击者已确认"
                    });
                    this.$store.commit("gameProgress", 5);
                }else{
                    this.$alert("没有选满六张卡，请目击者重新选择", "Error", {
                        confirmButtonText: "确定"
                    });
                    this.step--;
                }
            }
            this.step += 1;
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
            if(this.step==3){
                this.$store.commit("resetSceneCard");
                this.$store.commit("gameResetSceneCard");
                
            }
        }
    },
    mounted() {
        // this.open1()
        // this.step++
    },
    computed: {
        ...mapState({
            meanCard: state => state.game.meanCard,
            clueCard: state => state.game.clueCard,
            weight: state => state.card.weight
        })
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
}
</style>
