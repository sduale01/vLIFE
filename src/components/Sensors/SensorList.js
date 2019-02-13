import React, {Component} from 'react';
import {connect} from 'react-redux';

class SensorList extends Component {
    render() {
        return(
            <div>
                {JSON.stringify(this.props.sensor)}
                <ul>
                    {this.props.sensor.map(x => {
                        return <li key={x.id}>{x.sensor_name}</li>
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sensor: state.sensor
});
export default connect(mapStateToProps)(SensorList);