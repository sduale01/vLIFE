import React, {Component} from 'react';
import {connect} from 'react-redux';

class SafetySensors extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_SAFETY_SENSOR'})
    }
    handleBack = () => {
        this.props.history.goBack()
    }
    render() {
        return (
            <div>
                <button onClick={this.handleBack}>Back</button>
                <h1>Show list of vehicle sensors</h1>
            </div>
        )
    }
}

export default connect()(SafetySensors);