import Mock from 'mockjs'

let SceneCname = []
let SceneEname = []

export default {

    genSceneCard() {
        for (let i = 1; i <= 6*6; i++) {
            SceneCname.push(Mock.Random.cword(2))
            SceneEname.push(Mock.Random.word())
        }
        return {
            SceneCname,
            SceneEname
        }
    }
    
}