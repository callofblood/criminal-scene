import getters from './getters'
import mutations from './mutations'
export default {
    state: {
        avatars: [{
                imgUrl: require('@/assets/player/1.jpg'),
                id: 1,
                identity: '',
            },
            {
                imgUrl: require('@/assets/player/2.jpg'),
                id: 2,
                identity: '',
            },
            {
                imgUrl: require('@/assets/player/3.jpg'),
                id: 3,
                identity: '',
            },
            {
                imgUrl: require('@/assets/player/4.jpg'),
                id: 4,
                identity: '',
            },
            {
                imgUrl: require('@/assets/player/5.jpg'),
                id: 5,
                identity: '',
            },
        ],
        totalPlayer: 5,
        isCollapse: false,
        killer:-1,
        
    },
    getters,
    mutations


}