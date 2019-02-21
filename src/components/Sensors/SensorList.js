import React, {Component} from 'react';
import {connect} from 'react-redux';


import Highcharts from 'highcharts';

class SensorList extends Component {
    componentDidMount() {
        this.highChartsRender();
        
    }

    highChartsRender() {
        Highcharts.chart({
            chart: {
                type: 'bar',
                renderTo: 'all-sensors'
            },
            title: {
                text: 'Vehicle Fluid Levels'
            },
            subtitle: {
                text: 'Live Data'
            },
            xAxis: {
                categories: ['Oil', 'Wndshield Wiper', 'Gas', 'Coolant'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Level (Percentage)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Level',
                data: [107, 31, Number(this.props.sensor.map(x => (x.level))), 83, 2]
            }]
        });
    }

    
    handleShowGasData =() => {
        this.props.history.push('/graphdata');
    }
    render() {
        return(
            <div>
                {JSON.stringify(this.props.sensor)}
                <ul>
                    {this.props.sensor.map(x => {
                        return <li key={x.id}>Sensor name: Gas level: {x.level}
                                <button onClick={this.handleShowGasData}>See Data</button>
                                </li>
                    })}
                </ul>
                <div id="all-sensors">
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sensor: state.sensor
});
export default connect(mapStateToProps)(SensorList);