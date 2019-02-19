import React, {Component} from 'react';
import { connect } from 'react-redux';

class RefillGasCost extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         refillTotal: ''
    //     };
    // }

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_REFILL_TOTAL'});
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.refillTotal !== this.props.refillTotal) {
    //         this.setState({
    //             refillTotal: this.props.refillTotal,
    //         });
    //     }
    // }

    render() {
        return (
            <div>
                
                <h1>Amount spent on gas per month</h1>
                {JSON.stringify(this.props.refillTotal)}
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
                                <td>{refill.refill_date}</td>
                                <td>{refill.gas_price}</td>
                            </tr>
                        )}
                        <tr>
                            <td>TOTAL</td>
                            {this.props.refillTotal && this.props.refillTotal.length > 0 && (
                                <td>{this.props.refillTotal[0].sum}</td>
                            )}
                            
                            {/* <td>{[1]}</td> */}
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