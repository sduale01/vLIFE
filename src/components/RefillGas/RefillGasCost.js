import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// material ui
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// css
import './RefillStyle.css'

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      color: 'white'
    },
    table: {
      minWidth: 10,
    },
  });

class RefillGasCost extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_REFILL_TOTAL'});
    }

    render() {
        const {classes} = this.props;
        return (
            <div id="refill-container">
                <h4>Amount spent on gas per month</h4>
                {/* {JSON.stringify(this.props.refillTotal)} */}
                <Paper className={classes.root}>
                    <Table id="table-style" className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.props.refillCost.map(refill => 
                            <TableRow>
                                <TableCell>{moment(refill.refill_date).format('MM-DD-YYYY')}</TableCell>
                                <TableCell  align="right">{refill.gas_price}</TableCell>
                            </TableRow>
                        )}
                            <TableRow>
                                <TableCell align="center">Total</TableCell>
                                {this.props.refillTotal && this.props.refillTotal.length > 0 && (
                                <TableCell align="right">{this.props.refillTotal[0].sum}</TableCell>
                                )}
                            </TableRow>
                        </TableBody>
                    </Table>    
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    refillCost: state.refillCost,
    refillTotal: state.refillTotal,
});
export default connect(mapStateToProps)(withStyles(styles)(RefillGasCost));