import React, {Component} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {withRouter} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PowerIcon from '@material-ui/icons/PowerSettingsNewTwoTone'



const styles = {
    list: {
      width: 150,
    },
    fullList: {
      width: 'auto',
    },
  };

class DynamicDrawerIcon extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            left: false,
        }
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };
    
    render() {
        const {classes} = this.props;
        const sideList = (
            <div className={classes.list}>
            {this.props.user && this.props.location.pathname !== '/homepage' && (
                <List>
                    <ListItem button key={this.props.history.location.pathname}>
                      <Button color="primary" onClick={() => this.props.history.goBack()}>Back</Button>
                  </ListItem>
                </List>
            )}
              <List>
                  
              {/* {console.log(this.props.context.location.pathName)} */}
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              {this.props.user && (
              <List>
                  <ListItem button >
                      <Button color="primary" onClick={() => this.props.history.push('/homepage')}>Home</Button>
                  </ListItem>
                  <ListItem button key="Log out">
                    <ListItemIcon><PowerIcon /></ListItemIcon>
                    <ListItemText primary={<LogOutButton />} />
                  </ListItem>
              </List>
               )}
            </div>
          );
      
        return (
            <div>
                <Button onClick={this.toggleDrawer('left', true)}>open left</Button>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    > 
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(DynamicDrawerIcon));