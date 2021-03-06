import React, { Component } from 'react';
import {connect} from 'react-redux';

// import componenets I made
import RegisterCar from './RegisterCar.js';
// import RegisterAutoShop from './RegisterAutoShop.js';

// material ui
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    car_make: '',
    car_model: '',
    car_year: 0,
    // shop_name: '',
    // shop_address: '',
    // shop_number: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          car_make: this.state.car_make,
          car_model: this.state.car_model,
          car_year: this.state.car_year,
          // shop_name: this.state.shop_name,
          // shop_address: this.state.shop_address,
          // shop_number: this.state.shop_address,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className={classes.container} onSubmit={this.registerUser}>
          <h3>Register</h3>
          <TextField
            label="Username"
            className={classes.textField}
            type="text"
            name="username"
            margin="normal"
            variant="outlined"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
          <TextField
            label="Password"
            className={classes.textField}
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
          <TextField
              label="Make"
              className={classes.textField}
              type="text"
              name="make"
              margin="normal"
              variant="outlined"
              value={this.state.car_make}
              onChange={this.handleInputChangeFor('car_make')}
          />
          <TextField
              label="Model"
              className={classes.textField}
              type="text"
              name="model"
              margin="normal"
              variant="outlined"
              value={this.state.car_model}
              onChange={this.handleInputChangeFor('car_model')}
          />
          <TextField
              label="Year"
              className={classes.textField}
              type="number"
              min="1885"
              max="2022"
              name="year"
              margin="normal"
              variant="outlined"
              value={this.state.car_year}
              onChange={this.handleInputChangeFor('car_year')}
          />

          {/* <RegisterCar state={this.state} handleInputChangeFor={this.handleInputChangeFor}/> */}
          {/* <RegisterAutoShop state={this.state} handleInputChangeFor={this.handleInputChangeFor}/> */}
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));

