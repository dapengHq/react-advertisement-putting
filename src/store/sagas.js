import { call, put, takeEvery, fork, take} from 'redux-saga/effects'
import http from '@/utils/http'
import { message } from 'antd'

function* fetchlist(payload) {
    const list = yield call(http.post, '/dsp-advert/adunits/list');
    yield put({
        type:"fetch_table1",
        payload:list
    })
}

function* deltable(payload){
    const list1 = yield call(http.get, `/del/list`,{id:payload.id} );
      if (list1.code == 1) {
        yield put({
            type: 'fetch_table'
        })
        yield message.info('删除成功!')
      } else {
        yield message.info('删除失败!')
      }
}
export default function *mysaga(){
    yield takeEvery("fetch_table", fetchlist);
    yield takeEvery("del_table", deltable);
}