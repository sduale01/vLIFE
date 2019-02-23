import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class RefillGasCost extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_REFILL_TOTAL'});
    }

    render() {
        return (
            <div>
                
                <h1>Amount spent on gas per month</h1>
                {/* {JSON.stringify(this.props.refillTotal)} */}
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.refillCost.map(refill => 
                            <tr>
                                <td>{moment(refill.refill_date).format('DD-MM-YYYY')}</td>
                                <td>{refill.gas_price}</td>
                            </tr>
                        )}
                        <tr>
                            <td>TOTAL</td>
                            {this.props.refillTotal && this.props.refillTotal.length > 0 && (
                                <td>{this.props.refillTotal[0].sum}</td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    refillCost: state.refillCost,
    refillTotal: state.refillTotal,
});
export default connect(mapStateToProps)(RefillGasCost);