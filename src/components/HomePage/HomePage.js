import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import cyan from '@material-ui/core/colors/cyan'
// import { createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';

// const theme = createMuiTheme({
//   palette: {
//     primary: purple,
//     secondary: {
//       main: '#f44336',
//     },
//   },
// });

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      height: '350px',
      width: '355px',
      backgroundImage: 'linear-gradient(to bottom, #a37e93, #a6799e, #a376ad, #9876be, #8378d1, #7c79db, #737be5, #677def, #7e7bf1, #9379f2, #a876f2, #bb72f0)',
      fontSize: 30,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'

    },
    input: {
      display: 'none',
    },
  });


class HomePage extends Component {

    handleFluid = () => {
        this.props.history.push('/fluids')
    }

    handleSafetySensor = () => {
        this.props.history.push('/safetysensors')
    }
    render(){
        const {classes} = this.props;
        const {themes} = this.props;
        return (
            <div>
                <Button onClick={this.handleFluid} variant="contained" className={classes.button}>FLUIDS</Button>
                <Button onClick={this.handleSafetySensor} variant="contained" className={classes.button}>SAFETY SENSORS</Button>
            </div>
        );
    }
}

export default (withStyles(styles)(HomePage));