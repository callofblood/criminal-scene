export default {
    asideCollapse(state) {
        
        
        state.isCollapse = !state.isCollapse;
    },
    selectPlayer(state,bza){
       
        let identity=bza.identity
        let id=bza.id
        state[identity]=id;
        state.avatars[id-1].identity=identity
    }
}