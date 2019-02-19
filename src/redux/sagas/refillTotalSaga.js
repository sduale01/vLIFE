import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRefillTotal() {
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
    
        const response = yield axios.get('/api/gasPrice/refillTotal', config);
        console.log('total spent on gas is:', response.data);
        
        yield put({type: 'SET_REFILL_TOTAL', payload: response.data})
      } catch(error) {
        console.log('error in making GET request to /api/gasprice.refillTotal');
        
      }
  }

  function* refillTotalSaga() {
    yield takeLatest('FETCH_REFILL_TOTAL', fetchRefillTotal)
  }

  export default refillTotalSaga;