import { LOG_IN_SUCCESS, USER_LOADED, LOG_OUT, REGISTER } from "../actions/types";

const initalState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  errors: null
};

const authReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOG_IN_SUCCESS:
    case REGISTER:
      localStorage.setItem('token', payload)
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
        errors: null
      }
    case USER_LOADED:
      return {
        ...state,
        user:payload,
        isAuthenticated: true,
        loading: false

      };
    case LOG_OUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
        
      }
    default:
      return state
  }

};


export default authReducer;