import React,{ Component } from 'react';
// 引入 echarts 主模块。
import * as echarts from 'echarts';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
import http from '../utils/http';
import './home.css'
class Home extends Component{
    constructor(){
        super()
        this.state={
            flag:true
        }
        this.echartInstance=''
        this.option = {
            xAxis: {
                type: 'category',
                data: [],
                boundaryGap: false
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        }
    }
    render(){
        let {flag}=this.state
        return (
            <div className='home'>
                <header className=".header">
                    <div></div>
                    <div>
                        <span>
                            账号名：
                            账号id
                        </span>
                    </div>
                </header>
                <section className="section">
                    <div className='home-nav'>
                        <dl>
                            <dt><i className='icon iconfont'>&#xe72e;</i></dt>
                            <dd>
                                <span>现金账户</span>
                                <b>¥126,560,00</b>
                            </dd>
                        </dl>
                        <dl>
                            <dt><i className='icon iconfont'>&#xe726;</i></dt>
                            <dd>
                                <span>现金账户</span>
                                <b>¥126,560,00</b>
                            </dd>
                        </dl>
                    </div>
                    <div className='home-cont'>
                        <div className='home-overall'>
                            <h4>整体情况</h4>
                            <div className="rili">
                                <RangePicker
                                onChange={this.onCalendarChange}
                                format={dateFormat}
                                />
                            </div>
                            <ol className='home-Inquire'>
                                <li onClick={()=>{this.cNames()}} className={flag?'active':''}>近7天</li>
                                <li onClick={()=>{this.cNames()}} className={!flag?'active':''}>近30天</li>
                            </ol>
                        </div>
                        <div className='home-clickrate'>
                            <p>
                                <span>曝光率（次）</span>
                                <b>278,456</b>
                            </p>
                            <p>
                                <span>曝光率（次）</span>
                                <b>278,456</b>
                            </p>
                            <p>
                                <span>曝光率（次）</span>
                                <b>278,456</b>
                            </p>
                            <p>
                                <span>曝光率（次）</span>
                                <b>278,456</b>
                            </p>
                        </div>
                        <div className="echart" ref="echart"></div>
                    </div>
                </section>
            </div>
        )
    }
    componentDidMount() {
        this.echartInstance = echarts.init(this.refs.echart)
        this.setOption([moment().subtract(7, 'days').format(dateFormat), moment().format(dateFormat)])
        window.onresize = ()=> {
            this.echartInstance.resize()
        }
    }
    onCalendarChange=(date,dateString)=>{
        this.setOption(dateString)
    }
    setOption(dateString) {
        let option = this.option;
        let a = moment(new Date(dateString[0]))
        let b = moment(new Date(dateString[1]))
        let days = b.diff(a, 'days')
        let arrTime = [];
        for (let i = 0; i <= days; i++) {
            arrTime.unshift(moment(new Date(dateString[1])).subtract(i, 'days').format(dateFormat))
        }
        this.option.xAxis.data = arrTime
        http.post('/dsp-report/index', {
            count: days + 1
        }).then(res => {
            option.series[0].data = res.data.dataY1
            this.echartInstance.setOption(option);
        })
    }
    echarts(arrTime) {
       
    }
    cNames(){
        this.setState({
            flag:!this.state.flag
        })
    }
}
export default Home