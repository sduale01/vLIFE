import React, {Component} from 'react';

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

class RegisterCar extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
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
                {/* <div>
                    <label htmlFor="make">
                    Make:
                    <input
                        type="make"
                        name="make"
                        value={this.props.state.car_make}
                        onChange={this.props.handleInputChangeFor('car_make')}
                    />
                    </label>
                </div> */}
                {/* <div>
                    <label htmlFor="model">
                    Model:
                    <input
                        type="model"
                        name="model"
                        value={this.props.state.car_model}
                        onChange={this.props.handleInputChangeFor('car_model')}
                    />
                    </label>
                </div> */}
                <div>
                    <label htmlFor="year">
                    Year:
                    <input
                        type="number"
                        min="1885"
                        max="2022"
                        name="year"
                        value={this.props.state.car_year}
                        onChange={this.props.handleInputChangeFor('car_year')}
                    />
                    </label>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(RegisterCar);