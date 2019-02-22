import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from './ListItem';

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
                {/* {JSON.stringify(this.props.safetySensor)} */}
                {/* <table>
                    <thead>
                        <th>
                            <td>Name</td>
                            <td>Faulty?</td>
                            <td>Desctiption</td>
                        </th>
                    </thead>
                    <tbody>
                        {this.props.safetySensor && (
                            this.props.safetySensor.map(x => 
                                <ListItem key={x.id} x={x} />
                            )
                        )}
                    </tbody>
                </table> */}
                <div>
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