import React, {Component} from 'react';
import {connect} from 'react-redux';


import Highcharts from 'highcharts';

class SensorList extends Component {
    componentDidMount() {
        this.highChartsRender();
        // this.startPoling();
    }

    componentDidUpdate() {
        this.highChartsRender();
    }

    shouldComponentUpdate(nextProps, nextState) {

        //console.log('HERE',this.props.sensor, nextProps)
        if(this.chart) {
            this.chart.series[0].setData([107, 31, parseFloat(this.props.sensor.map(x => (x.level))), 83, 2], true);
        }
        // Don't rerender the page
        if(this.props.sensor.length != 0) {
            return false;
        }
        return true;
    }

    getGasData = () => {
        console.log('this si wher gas data will go.');
        
    }
    highChartsRender() {
        this.chart = Highcharts.chart({
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
                },
                series: {
                    allowPointSelect: true,
                    point: {
                        events: {
                            select: () => {
                                this.props.history.push('/graphdata')
                                
                            }
                        }
                    }
                }
            },
            credits: {
                enabled: false
            },
            data : {
                enablePolling: true,
                dataRefreshRate: 1
            },
            series: [{
                name: 'Level',
                
                data: [87, 31, parseFloat(this.props.sensor.map(x => (x.level))), 37]
            }]
        });
    }

    
    // handleShowGasData =() => {
    //     this.props.history.push('/graphdata');
    // }
    render() {
        
        return(
            <div>
                {/* {JSON.stringify(this.props.sensor)}
                <ul>
                    {this.props.sensor.map(x => {
                        return <li key={x.id}>Sensor name: Gas level: {x.level}
                                <button onClick={this.handleShowGasData}>See Data</button>
                                </li>
                    })}
                </ul> */}
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