import React,{ Component } from 'react';
import { BrowserRouter,Link } from 'react-router-dom';
import Router from '../../router'
import { Layout } from 'antd';
const { Sider, Content } = Layout;
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import 'antd/dist/antd.css'
class Index extends Component{
    render(){
        return <Layout>
            <Sider>
                <div style={{ width: 200,color:'#666' }}>
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    >
                        <Menu.Item key="1">
                            <Link to="/index/home">
                                <Icon type="pie-chart" />
                                <span>首页概况</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>广告管理</span></span>}>
                            <Menu.Item key="5"><Link to="/index/plan">广告计划</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/index/unit">广告单元</Link></Menu.Item>
                            <Menu.Item key="7"><Link to="/index/idea">广告创意</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3">
                            <Link to="/index/dataCenter">
                                <Icon type="inbox" />
                                <span>数据中心</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>管理工具</span>
                        </Menu.Item>
                    </Menu>
                </div>
            </Sider>
            <Content className="content">
                <Router routes={this.props.routeChild}></Router>
            </Content>
        </Layout>
    }
}
export default Index
