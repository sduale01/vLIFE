const refillTotalReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_REFILL_TOTAL':
        return action.payload;  
      default:
        return state;
    }
  };

  export default refillTotalReducer;
