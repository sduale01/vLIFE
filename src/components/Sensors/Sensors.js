import React, {Component} from 'react';
import {connect} from 'react-redux';
import SensorList from './SensorList';

class Sensors extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_SENSOR'});
  }
  render() {
    return (
      <div>
        <div>
        </div>
        <h3>Sensor Name</h3>
        <SensorList />
        
        
    </div>
    )
  }
}

export default connect()(Sensors);
