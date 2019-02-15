import React, {Component} from 'react';
import {connect} from 'react-redux';

class DeleteChart extends Component {
    constructor() {
        super();

        this.state = {
            deleteFrequency: 0,
        }
    }

    handleSelectChange = (event) => {
        this.setState({
            deleteFrequency: event.target.value,
        });
    }

    handleDeleteChart = (event) => {
        event.preventDefault();
        console.log(this.state.deleteFrequency);
        this.props.dispatch({type: 'DELETE_GAS_CHART', payload: this.state.deleteFrequency})
        
    }
    render() {
        return (
            <div>
                <h2>Delete Chart</h2>
                <form onSubmit={this.handleDeleteChart}>
                    <select onChange={this.handleSelectChange}>
                        <option selected disabled>Select Frequency</option>
                        <option value="1">Houry</option>
                        <option value="2">Daily</option>
                        <option value="3">Weeky</option>
                        <option value="4">Monthly</option>
                    </select>
                    <button>Delete Chart</button>
                </form>
                
            </div>
        );
    }
}

export default connect()(DeleteChart);