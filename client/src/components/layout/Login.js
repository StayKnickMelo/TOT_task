import React, { useState } from 'react';
import {Redirect} from 'react-router-dom'
import {logIn} from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Login = ({logIn, isAuthenticated}) => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    logIn(user);
  };

  if(isAuthenticated){
    return <Redirect to='/flood'/>
  }


  return (
    <form onSubmit={onSubmit} style={style} className="ui form">
      <div className="field">
        <label htmlFor="email">Email</label>
        <input onChange={onChange} value={user.email} type="email" name="email" placeholder="Email" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input onChange={onChange} value={user.password} type="password" name="password" placeholder="Password" />
      </div>
      <button className="ui button primary" type="submit">Log In</button>
    </form>
  )
};

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state)=>({
  isAuthenticated: state.auth.isAuthenticated
})


const style = {
  maxWidth: '50%',
  margin: 'auto',
  marginTop: '2rem'
};

export default connect(mapStateToProps, { logIn })(Login)
