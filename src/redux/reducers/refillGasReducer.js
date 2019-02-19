import { combineReducers } from 'redux';
const refillGasReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GAS_REFILL':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default refillGasReducer;