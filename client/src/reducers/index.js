import { combineReducers } from 'redux';
import auth from './auth';
import flood from './flood';
import alert from './alert';


export default combineReducers({
  auth,
  flood,
  alert
});