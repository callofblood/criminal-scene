export default {
    detectivesHaveAsserted:function(state){
        let tmp=state.avatars.filter(item=>item.ifHaveAsserted==true)
        return tmp
    }
    
}