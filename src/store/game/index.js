import mutations from './mutations'
export default {
    state:{
        killerTime:false,
        witnessTime:false,
        detectiveTime:false,
        meanCard:'',
        clueCard:'',
        progress:0,
        SceneCards:[],
        step:0,
        whichDetective:-1,
        totalPlayer: 5,
    },
    mutations
}