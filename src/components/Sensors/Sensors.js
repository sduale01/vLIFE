import React, {Component} from 'react';
import {connect} from 'react-redux';
import SensorList from './SensorList';
import axios from 'axios';

class Sensors extends Component {
  constructor() {
    super();
    this.state = {
      speed: 0,
    }
  }
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_SENSOR'});
    this.startPolling();
  }

  startPolling() {
    this.interval = setInterval(
      () => { 
        this.props.dispatch({type: 'FETCH_SENSOR'});
      }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // grabs the value of the input field
  handleChange = (event) => {
    this.setState({
      speed: event.target.value,
    })
  }

  // Runs when submit is pressed
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios.post(`/api/gas`, this.state).then(response => {
      this.props.dispatch({type: 'FETCH_SENSOR'});
    }).catch(error => {
      console.log('error in client side PUT', error);
    });
  }

  // Runs when stop car button is pressed
  // handleStopCar = () => {
  //   console.log('stop btn pressed');
    
  // }
  render() {
    return (
      <div>
        <div>
        </div>
        {/* This form is for choosing the car speed */}
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="number" min="0" max="85" />
          <button>Set Speed</button>
        </form>
        {/* <button onClick={this.handleStopCar}>Stop Car</button> */}
        <h3>Sensor Name</h3>
        <SensorList />
        
        
    </div>
    )
  }
}

export default connect()(Sensors);
