import Mock from 'mockjs'
import CommonCard from './mockData/CommonCard'
import SceneCard from './mockData/SceneCard';
Mock.mock('/genCommonCard',CommonCard.genCommonCard)
Mock.mock('/genSceneCard',SceneCard.genSceneCard)