import Mock from 'mockjs'
import store from '@/store/index'
let cname = []
let ename = []

let n=store.state.player.totalPlayer+1
export default {

    genCommonCard() {
        for (let i = 1; i <= 100*n; i++) {
            cname.push(Mock.Random.cword(2))
            ename.push(Mock.Random.word())
        }
        return {
            cname,
            ename
        }
    }
    
}