import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import sensorSaga from './sensorSaga';
import gasDataSaga from './gasDataSaga';
import refillGasSaga from './refillGasSaga';
import refillCostSaga from './refillCostSaga';
import refillTotalSaga from './refillTotalSaga';
import safetySensorSaga from './safetySensorSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    sensorSaga(),
    gasDataSaga(),
    refillGasSaga(),
    refillCostSaga(),
    refillTotalSaga(),
    safetySensorSaga(),
    registrationSaga(),
  ]);
}
