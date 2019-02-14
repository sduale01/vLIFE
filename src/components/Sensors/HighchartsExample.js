import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';

const plotOptions = {
  series: {
    pointStart: 0 
  }
};

const HighchartsExample = (props) => (
  <div className="app">
    {JSON.stringify(props.gasData)}
    <HighchartsChart plotOptions={plotOptions}>
      <Chart />

      <Title>Live Gas Data</Title>

      <Legend layout="vertical" align="right" verticalAlign="middle" />

      <XAxis>
        <XAxis.Title>Time</XAxis.Title>
        
      </XAxis>

      <YAxis>
        <YAxis.Title>Gas(g)</YAxis.Title>
        <LineSeries name="Gas Level" data={[0,10,20,30,40,50,60,70,80,90,100]} />
      </YAxis>
    </HighchartsChart>
  </div>
);

export default withHighcharts(HighchartsExample, Highcharts);