import React, {Component} from 'react';

class SafetySensors extends Component {
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

export default SafetySensors;