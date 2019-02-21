import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';

// import HighchartsReact from 'highcharts-react'

const options = {
  title: {
    text: 'My stock chart'
  },
    
  series: [{
    data: [[Date.UTC(2013,5,2),0.7695],
[Date.UTC(2013,5,3),0.7648],
...
[Date.UTC(2013,5,24),0.7623],]
  }]
}

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
          // <div>
          //   <h1>vljfldafldf</h1>
          //   <HighchartsReact 
          //     highcharts={Highcharts}
          //     constructorType={'stockChart'}
          //     options={options}
          //   />
          // </div>
        )
    }

}

export default withHighcharts(HighchartsExample, Highcharts);