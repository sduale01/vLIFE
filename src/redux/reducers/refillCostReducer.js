const refillCostReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GAS_PRICE':
        return action.payload;  
      default:
        return state;
    }
  };

  export default refillCostReducer;
