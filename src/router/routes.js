import React,{ Component } from 'react'
import { Route,Switch,Redirect} from 'react-router-dom'
import {getCookie} from '@/utils/cookie'

class Router extends Component{
    render(){
        return <Switch>
            {
                this.props.routes.map((item,index)=>{
                    return <Route exact={item.exact||false} path={item.path} key={index} render={(location)=>{
                        if (item.path == "/login" || getCookie('token')) {
                            return <item.component {...location} routeChild={item.children}></item.component>
                        }else{
                            return <Redirect to={{pathname:'/login',state:{from:item.path}}}></Redirect>
                        }
                    }}></Route>
                })
            }
            <Route path="/index" render={()=>{
                 return <Redirect to="/index/home"></Redirect>
            }}></Route>
        </Switch>
    }
}

export default Router