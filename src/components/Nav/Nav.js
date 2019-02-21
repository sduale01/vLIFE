import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

// imports
// import DynamicMenuIcon from './DynamicMenuIcon';

const Nav = (props) => (
  
  
  <div className="nav">
    <Link to="/homepage">
      <h2 className="nav-title">vLIFE</h2>
      
    </Link>
    <div className="nav-right">
      {/* <Link className="nav-link" to="/homepage"> */}
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {/* {props.user.id ? 'Home' : ''}
      </Link> */}
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id &&  (
        <>
          {/* <LogOutButton className="nav-link"/> */}
          {/* {console.log(props.location)} */}
          {/* <DynamicMenuIcon /> */}
         
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
