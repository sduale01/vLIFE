import React, {Component} from 'react';
import { connect } from 'react-redux';

class RefillGasCost extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_GAS_PRICE'})
    }
    render() {
        return (
            <div>
                
                <h1>Amount spent on gas per month</h1>
                {JSON.stringify(this.props.refillGas)}
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.refillGas.map(refill => 
                            <tr>
                                <td>{refill.refill_date}</td>
                                <td>{refill.gas_price}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    refillGas: state.refillGas
});
export default connect(mapStateToProps)(RefillGasCost);