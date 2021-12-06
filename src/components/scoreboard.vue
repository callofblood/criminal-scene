<template>
<div class='scoreboard'>
    <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>

    <el-dialog title="计分板" :visible.sync="dialogTableVisible" class='table'>
        <el-table :data="tableData" border style="width: 100%">

            <el-table-column prop="player" label="player">
                <template slot-scope="scope">
                    <slot><img :src='tableData[scope.$index].imgUrl'></slot>
                </template>
            </el-table-column>

            <el-table-column prop="identity" label="identity">
                <template slot-scope="scope">
                    <slot>{{tableData[scope.$index].identity}}</slot>
                </template>
            </el-table-column>

            <el-table-column prop="score" label="score">
                <template slot-scope="scope">
                    <slot>{{scope.$index}}</slot>
                </template>
            </el-table-column>

            <el-table-column prop="Assert&Truth" label="Assert&Truth">
                <template >
                    <slot>{{meanCard}}、{{clueCard}}</slot>
                </template>
            </el-table-column>

        </el-table>
    </el-dialog>

</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    data() {
        return {
            tableData: [

            ],
            dialogTableVisible: false,
            dialogFormVisible: false,

        }
    },
    computed: {
        ...mapState({
            avatars: state => state.player.avatars,
            meanCard:state=>state.game.meanCard,
            clueCard:state=>state.game.clueCard,
        })
    },
    mounted() {
        console.log(this.avatars)
        this.tableData = this.avatars
    },
}
</script>

<style lang="scss">
.scoreboard {
    .el-dialog {
        width: auto;
        height: 80%;
        margin-left: 600px;

        .el-dialog__header {
            // height:10%;
        }

        .el-table__header-wrapper {
            height: 10%;
        }
    }

    tr .cell {
        height: auto;
        text-align: center;
        line-height: 60px;
        font-size: 3em;
        width: auto;
    }

    img {
        width: 150px;
        height: 150px;
        border-radius:50%;
    }
}

// div.scoreboard.scoreboard > div > 
// #app > div > section > section > main > div > div.scoreboard.scoreboard > div > div.el-table__header-wrapper > table > thead > tr > th.el-table_1_column_1.is-leaf.el-table__cell > div
</style>
