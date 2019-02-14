import React, {Component} from 'react';
import {connect} from 'react-redux';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';

const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6]
      }
    ]
  };

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
      }, 2000);
  }

  

    render() {  
        return (
            <div>
                {/* {JSON.stringify(this.props.gasData)} */}
                <h1>this page will display a graph</h1>
                {/* <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={options}
                /> */}
                <ul>
                    {this.props.gasData.map(row => {
                        return <li>{row.level}: {row.time}</li>
                    })}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    gasData: state.gasData
});
export default connect(mapStateToProps)(SensorGraphs);