import React, {Component} from 'react';

// material ui
// import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  });
  


class ListItem extends Component {
    constructor() {
        super()

        this.state = {
            expanded: false,
        }
    }

    handleExpandClick = () => {
        this.setState({
            expanded: !this.state.expanded,
        })
    }
    render() {

        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader title={this.props.x.sensor_name} />
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton 
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show description"
                    >
                        <ExpandMoreIcon />    
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Description:</Typography>
                        <Typography paragraph>
                            {this.props.x.sensor_description}
                        </Typography>
                    </CardContent>
                    </Collapse>
            </Card>
                /* // <tr>
                //     <td>{this.props.x.sensor_name}</td>
                //     <td>{this.props.x.sensor_enabled}</td>
                //     <td>{this.props.x.sensor_description}</td>
                // </tr> */
        );
    }
}

export default withStyles(styles)(ListItem);