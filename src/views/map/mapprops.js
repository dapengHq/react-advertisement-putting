import http from '@/utils/http'
import { message} from 'antd'
export function mapStateToProps(state) {
    return {
        dataSource: state.getTable
    }
}
export let mapDispatchToProps=(dispatch)=>{
    return {
        getTable(){
             dispatch({
                type:'fetch_table'
            })
        },
        delTable(id){
            dispatch({
                type:'del_table',
                id
            })
        }
    }
}