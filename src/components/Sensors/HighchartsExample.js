import React, { Component } from 'react';
import Highcharts, { dateFormat } from 'highcharts';
import moment from 'moment';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';

// import HighchartsReact from 'highcharts-react'

// const options = {
//   title: {
//     text: 'My stock chart'
//   },
    
//   series: [{
//     data: [[Date.UTC(2013,5,2),0.7695],
// [Date.UTC(2013,5,3),0.7648],
// ...
// [Date.UTC(2013,5,24),0.7623],]
//   }]
// }

Highcharts.setOptions({
  global: {
    useUTC: false
  }
})

class HighchartsExample extends Component {
  componentDidMount() {
    this.highChartsRender()
  }

  componentDidUpdate() {
    this.highChartsRender()
  }

  shouldComponentUpdate(nextProps, nextState) {

    //console.log('HERE',this.props.sensor, nextProps)
    if(this.chart) {
        this.chart.series[0].setData(this.props.gasData.map(x  => 
            [Number(x.level)]  
          ));
    }
    // Don't rerender the page
    if(this.props.gasData.length != 0) {
        return false;
    }
    return true;
}

  highChartsRender = () => {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    })
    this.chart = Highcharts.chart('scatter-plot-graph', {
      chart: {
          type: 'scatter',
          zoomType: 'xy'
      },
      title: {
          text: 'Gas level history'
      },
      xAxis: {
        type: 'datetime',
        // minTickInterval: moment.duration(1, 'month').asMilliseconds(),
          title: {
              enabled: true,
              text: 'Date',
              
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
      },
      yAxis: {
          title: {
              text: 'Level (%)'
          }
      },
      plotOptions: {
          scatter: {
              marker: {
                  radius: 5,
                  states: {
                      hover: {
                          enabled: true,
                          lineColor: 'rgb(100,100,100)'
                      }
                  }
              },
              states: {
                  hover: {
                      marker: {
                          enabled: false
                      }
                  }
              },
              tooltip: {
                  headerFormat: '<b>{series.name}</b><br>',
                  pointFormat: '{point.x} date, {point.y} %'
              }
          }
      },
      series: [{
          name: 'Level',
          color: 'rgba(223, 83, 83, .5)',
          data: 
              this.props.gasData.map(x  => 
          [moment(x.time).format('MM/DD/YYYY').valueOf(), Number(x.level)]  
          )
      }]
    });// end of highcharts
  }
    render() {
        return (
          <div>
              {/* {(JSON.stringify(this.props.gasData.map(x  => {
                 return [moment(x.time).format('MM/DD/YYYY'), Number(x.level)]
              }
                )))} */}
            <div id="scatter-plot-graph">
            
            </div>
        </div>
        )
    }

}

export default withHighcharts(HighchartsExample, Highcharts);