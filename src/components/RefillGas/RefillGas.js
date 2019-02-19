import React, {Component} from 'react';
import {connect} from 'react-redux';

class RefillGas extends Component {
    handleClick = () => {
        console.log('show popup clicked');
    }
    render() {
        const alertm = () => {
            if (this.props.refillGas.greater == true) {
                prompt("how much did you spend on gas:", "amount here")
            }
        }
        
        return (
            <div>
                <h4>This will display a prompt when gas has been refilled</h4>
                {JSON.stringify(this.props.refillGas)}
                <form >
                    <input />
                </form>
                {alertm()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    refillGas: state.refillGas,
})
export default connect(mapStateToProps)(RefillGas);