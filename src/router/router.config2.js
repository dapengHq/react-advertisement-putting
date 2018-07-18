import React,{Component} from 'react'
// const Classify = () => import(/* webpackChunkName: "Classify" */ '@/views/classify/classify.vue')
import Plan from '@/views/plan'
import DataCenter from '@/views/dataCenter'
import Loadable from 'react-loadable';

function Loading(props) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

const LoadableBar = Loadable({
    loader: () => import('@/views/home'),
    loading: Loading,
    delay: 300, // 0.3 seconds
});

class MyComponent extends React.Component {
  render() {
    return <LoadableBar/>
  }
}

let router = {
    routes:[
        {
            path:'/home',
            component: MyComponent,
            exact:true
        },
        {
            path:'/unit',
            component:  MyComponent,
        },
        {
            path:'/idea',
            component:  MyComponent,
        },
        {
            path:'/plan',
            component: Plan
        },
        {
            path:'/dataCenter',
            component: DataCenter
        }
    ]
}
export default router.routes