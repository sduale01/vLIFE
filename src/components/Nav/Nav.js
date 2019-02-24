import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

import './Nav.css';

// imports
import DynamicDrawerIcon from './DynamicDrawerIcon';

class Nav extends Component {
  render(){
    return (
      <div className="nav">
      <h2 className="nav-title">vLIFE</h2>
      
    <div className="nav-rightsds">
      {/* <Link className="nav-link" to="/homepage"> */}
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {/* {props.user.id ? 'Home' : ''}
      </Link> */}
      {/* Show the link to the info page and the logout button if the user is logged in */}
          
      <DynamicDrawerIcon user={this.props.user.id} history={this.props.history}/>
    </div>
  </div>
    )
  }
}
  

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
