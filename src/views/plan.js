import React,{ Component } from 'react';
import {Table } from "antd"
import {connect} from 'react-redux'
import {mapStateToProps,mapDispatchToProps} from './map/mapprops'
import { Modal, Button } from 'antd';

class Plan extends Component{
    constructor(){
        super();
        this.state = {
            visible: false,
            id:''
        }
    }
    render(){
        let that = this;
        let columns = [{
            title: '姓名',
            dataIndex: 'operatorName'
        }, {
            title: '推广目的',
            dataIndex: 'promotionType',
            key: 'promotionType',
        }, {
            title: '计划日预算',
            dataIndex: 'dayBudget',
            key: 'dayBudget',
        }, {
            title: '曝光量',
            dataIndex: 'exposeNum',
            key: 'exposeNum',
        }, {
            title: '点击量',
            dataIndex: 'clickNum',
            key: 'clickNum',
        }, {
            title: '点击率',
            dataIndex: 'clickRate',
            key: 'clickRate',
        }, {
            title: '点击均价',
            dataIndex: 'clickPrice',
            key: 'clickPrice',
        }, {
            title: '千次展示均价；',
            dataIndex: 'cpmPrice',
            key: 'cpmPrice',
        }, {
            title: '总消耗',
            dataIndex: 'consumed',
            key: 'consumed',
        }, {
            key: 'action',
            render: (text, record) => {
                    function del(){
                         that.setState({
                             visible: true,
                             id: record.key
                         });
                    }
                    return (<span onClick={()=>{del()}}>
                        x
                    </span>)
                
            }
        }];
        return <div>
            <Table dataSource={this.props.dataSource} columns={columns} />
            <div>
                <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>您确定要删除吗？</p>
                </Modal>
            </div>
        </div>
    }
    componentDidMount(){
        this.props.getTable()
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        this.props.delTable(this.state.id)
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Plan)