import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


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


function* refillGasSaga() {
  yield takeLatest('FETCH_REFILL', refillGas);
}

export default refillGasSaga;
