import React, {Component} from 'react';
import * as Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react';

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
    render() {  
        return (
            <div>
                <h1>this page will display a graph</h1>
                {/* <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={options}
                /> */}
            </div>
        );
    }
}

export default SensorGraphs;