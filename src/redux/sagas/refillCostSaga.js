import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addGasPrice(action) {
    try {
      console.log(action.payload);
      
      yield axios.post('/api/gasPrice', action.payload)
      yield put({type: 'SET_GAS_PRICE'})
    }catch (error) {
      console.log('error in sending POST to /refellGas/gasprice');
    }
  } // end of addGasPrice
  
  // Get gas price from gas budget db table
  function* fetchGasPrice() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      const response = yield axios.get('/api/gasPrice', config);
      console.log(response.data);
      
      yield put({type: 'SET_GAS_PRICE', payload: response.data})
    } catch(error) {
      console.log('error in making GET request to /refillgas/gasprice');
      
    }
  }

  // function* fetchRefillTotal() {
  //   try {
  //       const config = {
  //         headers: { 'Content-Type': 'application/json' },
  //         withCredentials: true,
  //       };
    
  //       const response = yield axios.get('/api/gasPrice/refillTotal', config);
  //       console.log('total spent on gas is:', response.data);
        
  //       yield put({type: 'SET_REFILL_TOTAL', payload: response.data})
  //     } catch(error) {
  //       console.log('error in making GET request to /refillgas/gasprice');
        
  //     }
  // }

  function* refillCostSaga() {
    yield takeLatest('ADD_GAS_PRICE', addGasPrice);
    yield takeLatest('FETCH_GAS_PRICE', fetchGasPrice);
    // yield takeLatest('FETCH_REFILL_TOTAL', fetchRefillTotal)
  }

  export default refillCostSaga;