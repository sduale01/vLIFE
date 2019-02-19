import React, {Component} from 'react';
import {connect} from 'react-redux';
import HighchartsExample from './HighchartsExample';
// import GoogleMaps from '../GoogleMaps/GoogleMaps';
// import Highcharts from "highcharts";
// import HighchartsReact from 'highcharts-react-official';

class SensorGraphs extends Component {
  // GETS table data on page load
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_GAS_DATA'})
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
    render() {  
        return (
            <div>
                <HighchartsExample gasData={this.props.gasData}/>
                {/* {JSON.stringify(this.props.gasData)} */}
                {/* <GoogleMaps /> */}
                {/* <ul>
                    {this.props.gasData.map(row => {
                        return <li key={row.id}>{row.level}: {row.time}</li>
                    })}
                </ul> */}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    gasData: state.gasData
});
export default connect(mapStateToProps)(SensorGraphs);