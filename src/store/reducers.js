import {combineReducers} from 'redux'

function getTable(state=[],action){
    if (action.type == 'fetch_table1') {
        return action.payload.list
    } 
    return state
}
function deltab(state=[],action){
    if(action.type=='del_table1'){
        return action.payload
    }
    return state
}
export default combineReducers({
    getTable,
    deltab
})