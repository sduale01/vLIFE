import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

// my components
import SensorList from './SensorList';
// import StopCar from './StopCar';
import RefillGas from '../RefillGas/RefillGas';


import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';

// css
import './Sensors.css'


// import { green100 } from 'material-ui/styles/colors';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  setSpeedButton: {
    backgroundImage: 'linear-gradient(to right top, #54d1c0, #31b996, #18a06a, #11863c, #156d00)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  stopCarButton: {
    backgroundImage: 'linear-gradient(to left top, #f58ee2, #f069af, #e14579, #c92444, #a70b0e)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  sliderDiv: {
    display: 'flex',
    width: 300,
  },
  slider: {
    padding: '10px 0px',
  },


  labelStyleOuter: {
    width: '30px',
    height: '30px',
    borderRadius: '50% 50% 50% 0',
    background: 'black',
    position: 'absolute',
    transform: 'rotate(-45deg)',
    top: '-40px',
    left: '-9px',
  },
  labelStyleInner: {
    transform: 'rotate(45deg)',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    top: '3px',
    right: '0px',
    fontSize: '10px',
  },

}); // endo of styles

class Sensors extends Component {

  state = {
    speed: 0,
  }
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_SENSOR'});
    this.props.dispatch({type: 'FETCH_REFILL'});
    this.startPolling();
  }

  startPolling() {
    this.interval = setInterval(
      () => { 
        this.props.dispatch({type: 'FETCH_SENSOR'})
        this.props.dispatch({type: 'FETCH_REFILL'});
      }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // grabs the value of the input field
  handleChange = (event, speed) => {
    this.setState({ speed });
  };

  // will run stop car button is pressed
  handleStopCar = () => {
    console.log('stop car pressed');
    axios.post('/api/gas/stoptask').then(response => {
        this.props.dispatch({type: 'FETCH_SENSOR'});
    }).catch(error => {
        console.log('error in POST', error);
        
    })
}
  // Runs when submit is pressed
  handleSubmit = (event) => {
    // event.preventDefault();
    console.log(this.state);
    axios.post(`/api/gas`, this.state).then(response => {
      this.props.dispatch({type: 'FETCH_SENSOR'});
    }).catch(error => {
      console.log('error in client side PUT', error);
    });
  }
  render() {
    const {classes} = this.props;
    const {speed} = this.state;
    return (
      <div id="sensor-container">
        <div id="speed-slider" className={classes.sliderDiv}>
        <Slider
          classes={{ container: classes.slider }}
          value={speed}
          min={0}
          max={85}
          step={1}
          onChange={this.handleChange}
          label={
            <div style={styles.labelStyleOuter}>
              <div style={styles.labelStyleInner}>
                {speed}
              </div>
            </div>
          }
        />
        </div>
        <h2 id="speed-display">Speed: {speed}mph</h2>
        <div id="start-stop-buttons">
          <Button id="b1" className={classes.setSpeedButton} onClick={this.handleSubmit}>Set Speed</Button>
          <Button id="b2" className={classes.stopCarButton} onClick={this.handleStopCar}>Stop Car</Button>
        </div>
        
        
        <SensorList history={this.props.history}/>
        <RefillGas />

        
        
    </div>
    )
  }
}

export default connect()(withStyles(styles)(Sensors));
