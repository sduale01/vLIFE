import React, {Component} from 'react';
import {connect} from 'react-redux';

class Sensors extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_SENSOR'});
  }
  render() {
    return (
      <div>
        <p>
          This page will show the user's sensors
        </p>
        <div>
          {JSON.stringify(this.props.sensor)}
        </div>
    </div>
    )
  }
}

const mapReduxStoreToProps = state => ({
  sensor: state.sensor
});
export default connect(mapReduxStoreToProps)(Sensors);
