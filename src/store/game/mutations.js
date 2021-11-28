export default {
    killerMove(state,move){
        state.killerTime=move
        console.log(state)
    },
    gameSetCard(state,option){
        state[option.cardType]=option.cardName
        console.log(state)
    },
    deepReset(state){
        state.meanCard=''
        state.clueCard=''
    },
    witnessMove(state){
        state.witnessTime=true
    },
    gameProgress(state,add){
        state.progress+=add
    },
    setSceneCard(state,card){
        state.SceneCards.push(card)
        console.log(state.SceneCards)
    },
    gameResetSceneCard(state){
        state.SceneCards=[]
    },
    gameStep(state,add){
        state.step+=add
    },
    detectiveAlter(state){
        if(state.whichDetective==-1){
            state.whichDetective=Math.floor(Math.random()*state.totalPlayer)
        }else{
            state.whichDetective=(state.whichDetective+1)%state.totalPlayer
        }
        if(state.step==7)state.whichDetective=-1
    }

}
