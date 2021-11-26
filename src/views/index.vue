<template>
<div class='home'>
    <el-container style='height:100vh'>
        <el-aside width="auto"><v-aside></v-aside></el-aside>
        <el-container>
            <el-header><v-header></v-header></el-header>
            <el-main><v-main></v-main></el-main>
            <el-footer><v-footer></v-footer></el-footer>
        </el-container>
    </el-container>

</div>
</template>

<script>
// import player from '@/components/player'
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'
export default {
    data() {
        return {}
    },
    components: {
        'v-aside': Aside,
        'v-header':Header,
        'v-main':Main,
        'v-footer':Footer
    }

}
</script>

<style lang="scss">
@import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");

.el-header,
.el-footer {
    background-color: rgb(106, 111, 173);
    // color: #333;
    text-align: center;
    
}

.el-aside {
    background-color: rgb(203, 164, 229);
    color: #333;
    text-align: center;
   
}

.el-main {
    background-color: #ccc;
    color: #333;
    text-align: center;
  
    padding-top: 0;
}

body>.el-container {
    margin-bottom: 40px;

}
</style>
