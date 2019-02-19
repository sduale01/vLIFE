import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';


class HighchartsExample extends Component {
    render() {
        return (
            <div className="app">
            {/* {JSON.stringify(this.props.gasData.map(row => Number(row.level)))} */}
            <HighchartsChart >
              <Chart />
        
              <Title>Live Gas Data</Title>
        
              <Legend layout="vertical" align="right" verticalAlign="middle" />
        
              <XAxis type='datetime'>
                <XAxis.Title>Time</XAxis.Title>
                
              </XAxis>
        
              <YAxis>
                <YAxis.Title>Gas(g)</YAxis.Title>
                <LineSeries name="Gas Level" data={this.props.gasData.map(row => Number(row.level))} />
              </YAxis>
            </HighchartsChart>
            
          </div>
        )
    }

}

export default withHighcharts(HighchartsExample, Highcharts);