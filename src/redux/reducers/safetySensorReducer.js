const safetySensorReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SAFETY_SENSOR':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default safetySensorReducer;