import React, {Component} from 'react';
import {connect} from 'react-redux';

class RefillGas extends Component {
    constructor() {
        super();

        this.state = {
            refillCost: 0,
        }
    }
    handleClick = () => {
        console.log('show popup clicked');
    }

    alertm = () => {
        if (this.props.refillGas.greater == true) {
            let refillPrice = Number(prompt("how much did you spend on gas:", "amount here"));
            // this.setState({
            //     refillCost: refillPrice,
            // });
            return refillPrice;
        }
    }
    render() {
        
        
        return (
            <div>
                <h4>This will display a prompt when gas has been refilled</h4>
                {JSON.stringify(this.props.refillGas)}
                {this.alertm()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    refillGas: state.refillGas,
})
export default connect(mapStateToProps)(RefillGas);