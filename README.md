## 广告投放系统

 *1 项目介绍

    *1.1 该项目运用于网页的广告投放,运用了react框架,react-router路由,redux管理数据,结合redux-saga请求管理数据,以及一些UI框架antd,还有就是对页面性能的优化,比如路由实现懒加载,压缩img/js,减少http请求等等...

    *1.2 在项目开始,我们对react-router进行了封装,前期可能会繁琐一些,后期谁这路由页面的增多会更方便,如下:

        *1.2.1  import Login from '@/views/login/login'
                import Index from '@/views/Index/Index'
                let router = {
                    routes:[
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
                                }
                            ]
                        }
                    ]
                }
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
                        </Switch>
                    }
                }

 *2 项目主要功能模块为 登录模块(没有注册) 首页概况 广告管理 广告创意 广告计划...

    *2.1 登录模块

        *2.1.1 广告投放系统其他后台管理系统登录功能有些差异,广告投放系统不用注册账户,与这个系统合作的用户,我们数据库中写一个用户信息给用户,在让其登录,在登录页是不可以注册的.

        *2.1.2 当你点击登录按钮时,此时会收集表单里的value值,传到后台与数据库的用户信息进行对比,如果不正确,会在提示用户信息不正确,重新输入;如果正确,在前台会生成一个token字段,放到cookie里并设置有效时间(把token字段放到请求头里写一个字段获取cookie,这样每次请求后台接口时,都会携带方便),传到后台,后台对接收到的字段进行加密处理,之后一些操作...返回对应的用户信息;

        *2.1.2 用户信息正确,跳转路由到内部功能模块,之后如果token字段过期失效,页面会重定向到login页面,登录后会调到重定向之前的页面(传参)

    *2.2 首页概况模块

        *2.2.1 页面用antd排版,页面中用到了antd中的区间日历选择器,还有moment时间处理的一个api,还有earchts折线图;

        *2.2.2 选中区间日历时,会更具选择日历区间,向后台发起数据请求,放回一个数据列表,再结合echarts API动态的重绘折线图

    *2.3 广告计划模块

        *2.3.1 页面中用到了antd中的Table组件,并对table表格数据进行增删改查,动态向后台返回每条数据的对应的key值,返回对需要(增加/删除/改变/查询)的数据

    *2.4 ...模块

 *3 项目总结

    *3.1 后台管理的实现基于数据接口的实现,要与后台紧密配合

    *3.2 对公共组件业务逻辑的封装,减少代码的耦合

    *3.1 需要熟练的掌握moment antd acharts API
