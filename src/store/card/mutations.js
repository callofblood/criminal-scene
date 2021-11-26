export default {
    addCardName(state,{cname,ename}){
        state.cname=cname
        state.ename=ename

    },
    addSceneCardName(state,{SceneCname,SceneEname}){
        state.SceneCname=SceneCname
        state.SceneEname=SceneEname
   
    },
    changeWeight(state,weight){
        state.weight+=weight
        console.log(state.weight)
    },
    changeSceneCardIndex(state,index){
        
        state.SceneCardIndex.push(index)
        console.log(state.SceneCardIndex)
    },
    resetSceneCard(state){
        state.SceneCardReset=!state.SceneCardReset
        state.weight=0
        state.SceneCardIndex=[]
        // state.SceneCardReset=false
        
    }
}