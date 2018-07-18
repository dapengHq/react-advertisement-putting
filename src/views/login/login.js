import React,{ Component } from 'react';
import './login.css'
import http from '@/utils/http'
import {setCookie} from '@/utils/cookie'
class Login extends Component{
    constructor(){
        super()
        this.state={
            id: 1531309908499,
            flag:false,
            obj: {
                visibility: ''
            },
            info:'1223',
            username:'',
            password:'',
            vcode:''
        }
    }
    render(){
        let {id,info,obj,username,password,vcode} = this.state
        return (
            <div className="container">
        <div className="h2">
            <b>作业帮</b> · 智能营销平台</div>
        <div className="icon-title">
            <div className="icon-title-con">
                <i className="iconbg"></i>
                <div className="title">
                    <p className="title-big">智能营销平台</p>
                    <p className="title-small">网络新生态 &nbsp;&nbsp;&nbsp;智能助力广告营销</p>
                </div>
            </div>
        </div>
        <div className="login-form">
            <h3 className="account-landing">
                <span>账户登录</span>
            </h3>
            <div className="error-title" style={obj}>
                <i className="error-icon"></i>
                <span className="error-title-text">{info}</span>
            </div>
            <div className="form-wrap">
                <input type="text" value={username} name="username" onChange={this.changeHandler} className="form-input form-text" placeholder="用户名"/>
                <input type="password" value={password} name="password" onChange={this.changeHandler} className="form-input form-password" placeholder="密码"/>
                <div className="vcode">
                    <input type="text" value={vcode} name="vcode" onChange={this.changeHandler} className="code-text" placeholder="请输入验证码"/>
                    <div className="verify-code">
                        <img onClick={this.imgid} src={`https://e.zuoyebang.com/dsp-admin/captcha.jpg?${id}`} alt="请求验证码失败" title="点击更换验证码"/>
                    </div>
                </div>
                <button className="up-login" type="button" onClick={this.Login}>登 录</button>
                <p className="forget">忘记密码</p>
            </div>
            <div className="forget-down">
                <p className="forget-down-title">获取新密码，请发送邮件至</p>
                <p className="forget-down-email">consult@zuoyebang.com</p>
                <span className="ok-email">已复制</span>
            </div>
            <h2>©2018&nbsp;小船出海教育科技（北京）有限公司&nbsp;作业帮</h2>
        </div>
    </div>
        )
    }
    imgid=()=>{
        this.setState({
            id:++this.state.id
        })
    }
    changeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    Login=()=>{
        let {username,password,vcode,info} = this.state;
        if(username==''){
            this.setState({
                obj:{
                    visibility: 'visible',
                },
                info:'请输入用户名'
            })
            return;
        }
        if(password==''){
            this.setState({
                obj:{
                    visibility: 'visible',
                },
                info:'请输入密码'
            })
            return;
        }
        if (vcode == '') {
            this.setState({
                obj: {
                    visibility: 'visible',
                },
                info: '请输入验证码'
            })
            return;
        }
        this.setState({
            obj: {
                visibility: '',
            },
            info: ''
        })
        http.post('/dsp-admin/user/login',{
            username,
            password
        }).then(res=>{
            if (res.success == 0) {
                console.log(res)
                setCookie('token', res.token)
                this.props.history.push({
                    pathname: '/index'
                })
            }else{
                console.log(res)
            }
        })
    }
}
export default Login


