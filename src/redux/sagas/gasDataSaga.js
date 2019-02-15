import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchGasData() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('api/gasdata', config);
    // console.log(response.data);
    
    yield put({ type: 'SET_GAS_DATA', payload: response.data });
  } catch (error) {
    console.log('Gas GAS request failed', error);
  }
}

function* deleteGasChart(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield axios.delete(`/api/gasdata/${action.payload}`, config)

    yield put({ type: 'SET_GAS_DATA'});
  } catch (error) {
    console.log('Gas DELETE request failed');
    
  }
  
}

function* gasDataSaga() {
  yield takeLatest('FETCH_GAS_DATA', fetchGasData);
  yield takeLatest('DELETE_GAS_CHART', deleteGasChart)
}

export default gasDataSaga;
