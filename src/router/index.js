import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/index.vue'

import VueRouter from 'vue-router';


const originPush = VueRouter.prototype.push
VueRouter.prototype.push=function push(location){
  return originPush.call(this,location).catch(err=>err)
}
Vue.use(Router)
export default new Router({
    mode:'history',
    base:process.env.BASE_URL,
    routes: [
    {
      path: '/',
      component: home,
    //   children:[
    //     {
    //       path:'/',
    //       name:'home',
    //       component:()=>import('../views/Home/Home')
    //     },
    //     {
    //       path:'/mall',
    //       name:'mall',
    //       component:()=>import('../views/Mall/Mall')
    //     },
    //     {
    //       path:'/user',
    //       name:'user',
    //       component:()=>import('../views/User/User')
    //     }
    //   ]
    },
   
  ]
})
