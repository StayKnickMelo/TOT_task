import axios from 'axios';
import setAuthToken from '../utils/auth';
import { USER_LOADED, AUTH_ERROR, LOG_IN_SUCCESS, LOG_OUT, REGISTER, CLEAR_MSGS } from './types';

import { setAlert } from './alert'


// Log in a user
export const logIn = (user) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/auth/login', user, config);

    console.log(res.data.token);

    dispatch({
      type: LOG_IN_SUCCESS,
      payload: res.data.token
    });

    dispatch(loadUser())

  } catch (error) {


    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));

    // dispatch({
    //   type: LOG_IN_FAIL,
    //   payload: error.response.data.errors
    // });
  }
}


// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'))
  };

  try {
    const res = await axios.get('/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data
    })

  } catch (error) {

    dispatch({
      type: AUTH_ERROR
    })

  }
};

export const register = (user) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/auth/register', user, config);

    dispatch({
      type: REGISTER,
      payload: res.data.token
    });

    dispatch(loadUser());


  } catch (error) {

    error.response.data.errors.forEach(err=> dispatch(setAlert(err.msg, 'danger')))

  }
}


// Log user out
export const logOut = () => dispatch => {

  dispatch({
    type: LOG_OUT
  });

  dispatch({
    type: CLEAR_MSGS
  })


}
