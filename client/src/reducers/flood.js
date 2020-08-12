import { LOAD_MSGS, ADD_MSG, DELETE_MSG, EDIT_MSG, SET_TO_EDIT, CLEAR_TO_EDIT, CLEAR_MSGS } from "../actions/types";


const initalState = {
  messages: [],
  message: null
};


const floodReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_MSGS:
      return {
        ...state,
        messages: payload
      };
    case ADD_MSG:
      return {
        ...state,
        messages: [payload, ...state.messages]
      };
    case DELETE_MSG:
      return {
        ...state,
        messages: state.messages.filter(msg => msg._id !== payload)
      };
    case EDIT_MSG:
      return {
        ...state,
        messages: state.messages.map(msg => msg._id === payload._id ? payload : msg)
      }
    case SET_TO_EDIT:
      return {
        ...state,
        message: payload
      }
    case CLEAR_TO_EDIT:
      return {
        ...state,
        message: null
      }
    case CLEAR_MSGS:
      return {
        ...state,
        messages: [],
        message: null
      }
    default:
      return state
  }
};


export default floodReducer;


