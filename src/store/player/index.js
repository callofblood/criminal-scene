import getters from './getters'
import mutations from './mutations'
export default {
    state: {
        avatars: [{
                imgUrl: require('@/assets/player/1.jpg'),
                id: 0,
                identity: 'detective',
                ifHaveAsserted:false,
                score:0
            },
            {
                imgUrl: require('@/assets/player/2.jpg'),
                id: 1,
                identity: 'detective',
                ifHaveAsserted:false,
                score:0
            },
            {
                imgUrl: require('@/assets/player/3.jpg'),
                id: 2,
                identity: 'detective',
                ifHaveAsserted:false,
                score:0                
            },
            {
                imgUrl: require('@/assets/player/4.jpg'),
                id: 3,
                identity: 'detective',
                ifHaveAsserted:false,
                score:0                
            },
            {
                imgUrl: require('@/assets/player/5.jpg'),
                id: 4,
                identity: 'detective',
                ifHaveAsserted:false,
                score:0                
            },
        ],
        // totalPlayer: 5,
        
        isCollapse: false,
        killer:-1,
        
    },
    getters,
    mutations


}