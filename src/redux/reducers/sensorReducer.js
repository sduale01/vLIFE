const sensorReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SENSOR':
      console.log(action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default sensorReducer;
  