import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_DATA } from '../constants/ActionTypes';
import { fetchDataSuccess } from '../actions/index';
import httpClient from '../config/httpService';

const getDataRequestCall = async (url, payload) => {
  return httpClient({
    url: url,
    method: "get"
  })
}

function* getDataRequest({ payload }) {
  try {
    let url = 'http://ec2-34-237-52-245.compute-1.amazonaws.com:8000/offers';
    if (payload) url = url + payload;
    const getDataConversation = yield call(getDataRequestCall, url, payload);
    yield put(fetchDataSuccess(getDataConversation));
  } catch (error) {
    console.error(error);
  }
}

export function* getData() {
  yield takeEvery(GET_DATA, getDataRequest);
}



export default function* rootSaga() {
  yield all([fork(getData)]);
}