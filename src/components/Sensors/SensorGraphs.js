import React, {Component} from 'react';
import {connect} from 'react-redux';
import HighchartsExample from './HighchartsExample';
import DeleteChart from './DeleteChart';
import RefillGasCost from '../RefillGas/RefillGasCost';
// import GoogleMaps from '../GoogleMaps/GoogleMaps';
// import Highcharts from "highcharts";
// import HighchartsReact from 'highcharts-react-official';

class SensorGraphs extends Component {
  // GETS table data on page load
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_GAS_DATA'})
    this.props.dispatch({type: 'FETCH_GAS_PRICE'})
    // this.props.dispatch({type: 'FETCH_REFILL_TOTAL'})
    this.startPolling();
}
// stops refresh when you leave page
componentWillUnmount() {
  clearInterval(this.interval);
}
// refreshes list every 2 seconds
  startPolling() {
    this.interval = setInterval(
      () => { 
        this.props.dispatch({type: 'FETCH_GAS_DATA'});
      }, 1000);
  }
  handleGoBack = () => {
    this.props.history.goBack();
  }
    render() {  
        return (
            <div>
              <button onClick={this.handleGoBack}>BACK</button>
              {console.log(this.props.location.pathname)
              }
                <HighchartsExample gasData={this.props.gasData}/>
                {/* {JSON.stringify(this.props.gasData)} */}
                {/* <GoogleMaps /> */}
                <DeleteChart />
                <RefillGasCost />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    gasData: state.gasData
});
export default connect(mapStateToProps)(SensorGraphs);