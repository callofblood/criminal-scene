<template>
<div class='log'>

    <h1 class='title'>Key Information</h1>
    <el-timeline :reverse="reverse" class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <el-timeline-item v-for="(activity,id) in activities" :key="id" class="infinite-list-item">
           <p v-html='activity'></p>
        </el-timeline-item>
    </el-timeline>

</div>
</template>

<script>
import bus from '@/router/bus.js'
export default {
    data() {
        return {
            reverse: true,
            count: 0,
            activities: [
                // {
                //     content: '活动按期开始',
                //     timestamp: '2018-04-15'
                // }, {
                //     content: '通过审核',
                //     timestamp: '2018-04-13'
                // },
                // {
                //     content: '创建成功',
                //     timestamp: '2018-04-11'
                // }

            ],

        };
    },
    methods: {
        load() {
            // this.count += 2
            // let that =this

            // setTimeout(function(){
            //     that.count++
            // },1000)

        },
        addActivity(content) {
            content=this.addColor(content)
            this.activities.push(
                content,
            )
        },
        addColor(info){
           
            let pattern=/(@(.+?)@)/g
            let rs=info.replace(pattern,"<span style='color:red'>$2</span>")
            
            return rs
        }
    },
    mounted() {
        bus.$on('addActivity', (content) => {
            this.addActivity(content)
        })
    },
    filter:{
        
    }
}
</script>

<style lang="scss">
.log {
    border: 1px dashed #000;
    height: 500px;
    width: 500px;
    text-align: left;
    overflow-y: scroll;

    // font-size: 2em;
    .title {
        text-align: center;
        line-height: 2em;

        // margin-bottom:5px;
        margin: 0;
        font-size: 2em;
        font-family: "Black And White Picture";
    }

    .infinite-list {
        padding-top: 15px;
        // margin-top:15px;

        font-weight: bolder;
        padding-left: 5px;

        .infinite-list-item {
            font-family: "微软雅黑 Light";
            font-size: 1em;
        }
    }
}
</style>
