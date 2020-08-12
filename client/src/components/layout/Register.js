import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Register = ({ isAuthenticated, register, setAlert }) => {

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register(user)
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/flood' />
  }


  return (
    <form onSubmit={onSubmit} style={style} className="ui form">
      <div className="field">
        <label htmlFor="firstName">First Name</label>
        <input onChange={onChange} value={user.firstName} type="text" name="firstName" placeholder="First Name" />
      </div>
      <div className="field">
        <label htmlFor="lastName">Last Name</label>
        <input onChange={onChange} value={user.lastName} type="text" name="lastName" placeholder="Last Name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input onChange={onChange} value={user.email} type="email" name="email" placeholder="Email" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input onChange={onChange} value={user.password} type="password" name="password" placeholder="Password" />
      </div>
      <div className="field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input onChange={onChange} value={user.confirmPassword} type="password" name="confirmPassword" placeholder="Confirm Password" />
      </div>
      <button className="ui button primary" type="submit">Register</button>
    </form>
  )
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})


const style = {
  maxWidth: '50%',
  margin: 'auto',
  marginTop: '2rem'
};

export default connect(mapStateToProps, { register, setAlert })(Register)