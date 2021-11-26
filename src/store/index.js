import Vue from 'vue'
import Vuex from 'vuex'
import player from './player/index'
import card from './card/index'
import game from './game/index'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        player,
        card,
        game
    }
})