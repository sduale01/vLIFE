import React, {Component} from 'react';
import {connect} from 'react-redux';

class SensorList extends Component {

    
    handleShowGasData =() => {
        this.props.history.push('/graphdata');
    }
    render() {
        return(
            <div>
                {/* {JSON.stringify(this.props.sensor)} */}
                <ul>
                    {this.props.sensor.map(x => {
                        return <li key={x.id}>Sensor name: Gas level: {x.level}
                                <button onClick={this.handleShowGasData}>See Data</button>
                                </li>
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