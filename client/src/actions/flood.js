import axios from 'axios';
import {
  LOAD_MSGS, ADD_MSG, DELETE_MSG, EDIT_MSG, SET_TO_EDIT, CLEAR_TO_EDIT

} from './types';

import { setAlert } from './alert';

export const getFloodMsgs = () => async dispatch => {
  try {
    const res = await axios.get('/flood');

    dispatch({
      type: LOAD_MSGS,
      payload: res.data.data
    })

  } catch (error) {
    console.error(error.response.errors)

  }
};

export const sendFloodMsg = (msg) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/flood/send', msg, config);

    dispatch({
      type: ADD_MSG,
      payload: res.data.data
    });

    dispatch(setAlert('Message has been sent', 'success'))


  } catch (error) {
    error.response.data.errors.forEach(err=> dispatch(setAlert(err.msg, 'danger')))

  }
};

export const setMsgToEdit = (msg) => dispatch => {
  dispatch({
    type: SET_TO_EDIT,
    payload: msg
  })
}

export const editMessage = (id, msg) => async dispatch => {
  try {
    const res = await axios.put(`/flood/edit/${id}`, msg);

    dispatch({
      type: EDIT_MSG,
      payload: res.data.data
    });

    dispatch(setAlert('Edited', 'success'))


    dispatch({
      type: CLEAR_TO_EDIT
    })

  } catch (error) {
    console.error(error.response.data.errors);

  }
};

export const clearToEdit = () => dispatch => {

  dispatch({
    type: CLEAR_TO_EDIT
  })

}


export const deleteMessage = (id) => async dispatch => {
  try {
    await axios.delete(`/flood/${id}`);

    dispatch({
      type: DELETE_MSG,
      payload: id
    });

    dispatch(setAlert('Message has been deleted', 'danger'))


  } catch (error) {
    console.error(error.response.data.errors);

  }
};

