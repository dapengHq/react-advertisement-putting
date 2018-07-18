import React,{Component} from 'react'
import Loading from './loading/loading'
class DynamicCom extends Component{
    constructor(){
        super();
        this.state={
            Comp:null
        }
    }
    render(){
        let {Comp} = this.state;
        if (Comp) {
            return <Comp />;
        }else{
            return <Loading></Loading>
        }
    }
     componentDidMount(){
        this.props.Com().then((res) => {
            setTimeout(() => {
                this.setState({
                    Comp: res.default
                })
            },1500);
        })
    }
}

function HighComp(Com) {
    return class extends Component {
        render(){
            return <DynamicCom Com={Com}></DynamicCom>
        }
    }
}
export default HighComp;