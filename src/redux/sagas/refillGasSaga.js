import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* refillGas() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('api/refillGas', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    console.log(response.data);
    
    yield put({ type: 'SET_GAS_REFILL', payload: response.data });
  } catch (error) {
    console.log('refill Gas GET get request failed', error);
  }
} // end of refillGas

function* addGasPrice(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log(action.payload);
    
    yield axios.post('/api/refillGas/gasPrice', action.payload)
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

    const response = yield axios.get('/api/refillGas/gasPrice', config);
    yield put({type: 'SET_GAS_PRICE', payload: response.data})
  } catch(error) {
    console.log('error in making GET request to /refillgas/gasprice');
    
  }
}

function* sensorSaga() {
  yield takeLatest('FETCH_REFILL', refillGas);
  yield takeLatest('ADD_GAS_PRICE', addGasPrice)
  yield takeLatest('FETCH_GAS_PRICE', fetchGasPrice)
}

export default sensorSaga;
