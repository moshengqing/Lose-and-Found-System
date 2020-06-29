import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/user/index'
import detail from '@/pages/user/detail'
import lose from '@/pages/user/lose'
import found from '@/pages/user/found'
import me from '@/pages/user/me'
import login from '@/pages/login'
import NotFound from '@/pages/NotFound'
import admin from '@/pages/admin/admin'
import user_list from '@/pages/admin/user_list'
import add_user from '@/pages/admin/add_user'
import loselist from '@/pages/admin/loselist'
import foundlist from '@/pages/admin/foundlist'
import sucesse from '@/pages/admin/sucesse'
import chart from '@/pages/admin/chart'
import user from '@/pages/user/user'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/user',
      name: 'user',
      component: user,
      children:[
        {path: "index",components: {index: index,}},
        {path: "lose",components: {lose: lose,}},
        {path:"found",components:{found:found}},
        {path:"me",components:{me:me}},
        {path:"detail",components:{detail:detail}},
      ],
      linkActiveClass:'router-link-active'
    },
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children:[
        {path:"add_user",components: {add_user: add_user,}},
        {path:"user_list",components:{user_list:user_list}},
        {path:"loselist",components:{loselist:loselist}},
        {path:"foundlist",components:{foundlist:foundlist}},
        {path:"sucesse",components:{sucesse:sucesse}},
        {path:"chart",components:{chart:chart}}
      ]


    },
   {path:'*',component:NotFound}
    
  
  ],
  linkActiveClass:'router-link-active'
})
