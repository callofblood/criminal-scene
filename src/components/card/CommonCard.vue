<template>
<div class='Card' @click='handleClick'>
    <div class='cname'>{{cname}}</div>
    <div class='ename'>{{ename}}</div>
    <img :src="imgUrl" alt="" class='cardImg'> 
</div>
</template>

<script>
export default {
    props:['cname','ename','id'],
    data() {
        return {
          
            imgUrl: require('@/assets/meansCard/1.jpg')
        }
    },
    methods:{
        handleClick(){
            // console.log('click')
            let boo={
                str:'click',
                id:this.id
            }
            this.$emit('getSonValue',boo)
        }
    }
}
</script>

<style lang="scss" scope>
.Card {
    border-radius: 10px;
    
    img.cardImg{
        width: 75px;
        height:75px;
        // background:#ff0;
    }
    .cname,.ename{
        font-family: 黑体
    }
    
}

</style>
