<template>
<div class='aside'>

    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse()">
        <el-menu-item-group>
            <el-menu-item index="avatar.id" v-for='(avatar,id) in avatars' :key='avatar.id'>
                <v-player :imgUrl='avatar.imgUrl' :which='avatar.id' :num='id' ref='players'></v-player>
            </el-menu-item>
        </el-menu-item-group>
    </el-menu>
</div>
</template>

<style lang="scss">
.aside {
    background-color: rgb(203, 164, 229);

    .el-menu--collapse {
        width: 140px;
    }
}

.el-menu-vertical-demo {
    width: 600px;
    height: 100%;
    padding: 0;
    background: rgb(203, 164, 229);

    .el-menu-item-group {
        background: rgb(203, 164, 229);
    }

    .el-menu-item {
        height: 250px;
        margin-bottom: 50px;
        // margin-top:100px;
    }

    

    .el-menu-item:last-child {
        margin-bottom: 0px;
    }

    .el-menu-item.is-active {
        color: #000;
        background: rgb(203, 164, 229)
    }

}
</style>

<script>
import Player from './Player.vue'
import axios from 'axios'
import {mapState} from 'vuex'
import bus from "../router/bus.js";
export default {
    data() {
        return {
            imgUrl: '',
            avatars: [],

        };
    },
    methods: {
        isCollapse() {
            return this.$store.state.player.isCollapse
        },
        getCard() {
            axios.get('/genCommonCard').then(res => {
                let cname = res.data.cname
                let ename = res.data.ename
                this.$store.commit('addCardName', {
                    cname,
                    ename
                })
            })
        },
        resetPlayerBackground(){
             for (let i = 0; i < this.avatars.length; i++) {
                this.$refs.players[i].$el.style.background = "rgb(203, 164, 229)";
            }
        }
    },
    computed:{
        ...mapState({
            // killer:state=>state.player.killer
        })
    },
    mounted() {
        bus.$on('resetPlayerBackground',()=>{
            this.resetPlayerBackground()
        })
        this.avatars = this.$store.state.player.avatars
        this.getCard()
        
    },
    components: {
        'v-player': Player
    }
}
</script>
