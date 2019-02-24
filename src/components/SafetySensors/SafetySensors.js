import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from './ListItem';

import './Safety.css'

class SafetySensors extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_SAFETY_SENSOR'})
    }
    render() {
        return (
            <div>
                <h4 id="safety-header">Sensors</h4>
                {/* {JSON.stringify(this.props.safetySensor)} */}
                <div id="safety-list">
                {this.props.safetySensor && (
                            this.props.safetySensor.map(x => 
                                <ListItem key={x.id} x={x} />
                            )
                        )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    safetySensor: state.safetySensor 
})
export default connect(mapStateToProps)(SafetySensors);