import React, {Component} from 'react';
import {connect} from 'react-redux';

// material ui

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import classes from '*.module.scss';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
  }); // end of styles
  

class DeleteChart extends Component {
    constructor() {
        super();

        this.state = {
            deleteFrequency: '',
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    handleSelectChange = name => event => {
        this.setState({ [name]: Number(event.target.value) });
      };

    handleDeleteChart = (event) => {
        event.preventDefault();
        console.log(this.state.deleteFrequency);
        this.props.dispatch({type: 'DELETE_GAS_CHART', payload: this.state.deleteFrequency})
        
    }
    render() {
        const {classes} = this.props;
        return (
            <div id="delete-container">
                {/* <form onSubmit={this.handleDeleteChart}>
                    <select onChange={this.handleSelectChange}>
                        <option selected disabled>Select Frequency</option>
                        <option value="1">Houry</option>
                        <option value="2">Daily</option>
                        <option value="3">Weeky</option>
                        <option value="4">Monthly</option>
                    </select>
                    <button>Delete Chart</button>
                </form> */}
                
                <Button onClick={this.handleClickOpen} className={classes.button}>Delete Chart</Button>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleDeleteChart}
                >
                    <DialogTitle>Select Frequency</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Frequency</InputLabel>
                                <Select
                                    
                                    value={this.state.deleteFrequency}
                                    onChange={this.handleSelectChange('deleteFrequency')}
                                >
                                    <MenuItem value="" />
                                    <MenuItem value="1">Houry</MenuItem>
                                    <MenuItem value="2">Daily</MenuItem>
                                    <MenuItem value="3">Weeky</MenuItem>
                                    <MenuItem value="4">Monthly</MenuItem>
                                </Select>
                            </FormControl>
                            
                        </form>    
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Ok
                        </Button>  
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect()(withStyles(styles)(DeleteChart));