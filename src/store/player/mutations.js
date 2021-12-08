export default {
    asideCollapse(state) {
        
        
        state.isCollapse = !state.isCollapse;
    },
    selectPlayer(state,bza){
       
        let identity=bza.identity
        let id=bza.id
        state[identity]=id;//给killer赋值
        state.avatars[id].identity=identity
        console.log(state)
    },
    haveAsserted(state,which){
        state.avatars[which].ifHaveAsserted=true
    },
    addScore(state,obj){
        let index=obj.index
        let score=obj.score
        state.avatars[index].score+=score
    }
}