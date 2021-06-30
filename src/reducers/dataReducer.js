import {
  LOG_IN,
  GET_ALL_USERS,
  GET_ALL_TASKS,
  SEND_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  LOGIN_FAILURE,
  COMMENTS_FAILURE
} from "../actions/types";

const initialState = {
  isAuth: false,
  user: null,
  error: false,
  message: null,
  userlist: null,
  tasklist: null,
  storedTask: null,
  updateTask: null,
  deleteTask: null
};


const dataReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        error: false
      };
    case GET_ALL_USERS:
      return {
        ...state,
        userlist: action.payload,
        isAuth: true
      };
    case SEND_TASK:
      return {
        ...state,
        storedTask: action.payload,
        isAuth: true
      };
    case GET_ALL_TASKS:
      return {
        ...state,
        tasklist: action.payload,
        isAuth: true
      };
    case UPDATE_TASK:
      return {
        ...state,
        updateTask: action.payload,
        isAuth: true
      };
    case DELETE_TASK:
      return {
        ...state,
        deleteTask: action.payload,
        isAuth: true
      };
    case COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuth: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        message: 'Username or Password Incorrect',
        isAuth: false,
        error: true
      };
    default:
      return state;
  }
};

export default dataReducer;
