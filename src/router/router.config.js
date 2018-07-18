// import Home from '@/views/home'
// const Classify = () => import(/* webpackChunkName: "Classify" */ '@/views/classify/classify.vue')
// import Unit from '@/views/unit'
// import Idea from '@/views/idea'
// import Plan from '@/views/plan'
// import DataCenter from '@/views/dataCenter'
import {Redirect} from 'react-router-dom'
import HighComp from './dynamiccom'
import Login from '@/views/login/login'
import Index from '@/views/Index/Index'
let router = {
    routes:[
        {
            path: '/',
            exact: true,
            component: () => <Redirect from="/" to="/index/home"></Redirect>
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/index',
            component:Index,
            children:[
                {
                    path: '/index/home',
                    component: HighComp(()=>import(/* webpackChunkName: "home" */ '@/views/home')),
                },
                {
                    path: '/index/unit',
                    component: HighComp(()=>import(/* webpackChunkName: "unit" */ '@/views/unit')),
                },
                {
                    path: '/index/idea',
                    component: HighComp(()=>import(/* webpackChunkName: "idea" */ '@/views/idea')),
                },
                {
                    path: '/index/plan',
                    component: HighComp(()=>import(/* webpackChunkName: "plan" */ '@/views/plan')),
                },
                {
                    path: '/index/dataCenter',
                    component: HighComp(()=>import(/* webpackChunkName: "dataCenter" */ '@/views/dataCenter')),
                }
            ]
        }
    ]
}
export default router.routes