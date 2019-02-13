import React, {Component} from 'react';
import {connect} from 'react-redux';

class Sensors extends Component {
  render() {
    return (
      <div>
        <p>
          This page will show the user's sensors
        </p>
        <div>
          {JSON.stringify(this.props.user)}
        </div>
    </div>
    )
  }
}

const mapReduxStoreToProps = state => ({
  user: state.user
});
export default connect(mapReduxStoreToProps)(Sensors);
