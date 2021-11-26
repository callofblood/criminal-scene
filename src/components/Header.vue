<template>
    <div class='header'>
        <!-- <div class='l-part'>
            <el-button icon='el-icon-view' 
            @click='handleCollapse'
            size='mini'></el-button>
        </div> -->
        
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        handleCollapse(){
            
            this.$store.commit('asideCollapse')
        }
    }

}
</script>
<style lang='scss' scope>
.l-part{
    display:flex;
    align-items: center;
    margin-top:1vh;
}

</style>
