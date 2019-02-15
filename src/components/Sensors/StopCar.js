import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class StopCar extends Component {
    handleStopCar = () => {
        console.log('stop car pressed');
        axios.post('/api/gas/stoptask').then(response => {
            this.props.dispatch({type: 'FETCH_SENSOR'});
        }).catch(error => {
            console.log('error in POST', error);
            
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.handleStopCar}>Stop Car</button>
            </div>
        );
    }
}

export default connect()(StopCar);