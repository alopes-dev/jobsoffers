import { takeEvery, takeLatest, all, put, call } from 'redux-saga/effects';
import { ReducerTypes } from '../actions/actionsTypes'
import IService from '../../../../../services/service';

const iService = new IService();

function apiGet(data) {
    try {
        return iService.fetch({ table: "Estados", properties: "Designacao  Id" })
    } catch (error) { return error }
}

function apiGetTipoFormacaos() {
    try {
        return iService.fetch({ table: "Estados", properties: "Designacao  Id" })
    } catch (error) { return error }
}

function* asyncGetOportunidade(action) {
    const response = yield call(apiGet, action.data);
    const { data } = yield response.json()
    console.log(data)
        // yield put({ type: "SET_PLANOID", data: allCoberturaPlano })
}


function* watchPlanoAsync() {
    yield takeLatest(ReducerTypes.ASYNC_ADD_OPORTUNITY, asyncGetOportunidade)
}

export default function* root() {

    yield all([
        watchPlanoAsync()
    ])
}