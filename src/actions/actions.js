import {
  LOG_IN,
  GET_ALL_USERS,
  SEND_TASK,
  GET_ALL_TASKS,
  UPDATE_TASK,
  DELETE_TASK,
  COMMENTS_FAILURE,
  LOGIN_FAILURE
} from "./types";
import axios from 'axios';
const BASEURL = "https://stage.api.sloovi.com/";

export const logIn = (username, password) => async (dispatch) => {
  try {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    const body = { "email": username, "password": password }
    const res = await axios.post(BASEURL + 'login', body, {
      headers: headers
    })
    localStorage.setItem("token", res.data.results.token);
    dispatch({
      type: LOG_IN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: err,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {

    const res = await axios.get(BASEURL + 'team?user_status=accepted', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });


  } catch (err) {
    dispatch({
      type: COMMENTS_FAILURE,
      payload: err,
    });
  }
};

export const sendTask = (task_msg, task_date, sec, assigned_user, time_zone, is_completed) => async (dispatch) => {
  try {
    const body = { "task_msg": task_msg, "task_date": task_date, "task_time": sec, "assigned_user": assigned_user, "time_zone": time_zone, "is_completed": is_completed };

    const res = await axios.post(BASEURL + 'task/lead_6996a7dcdddc4af3b4f71ccb985cea38', body, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    console.log(res.data);
    dispatch({
      type: SEND_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_FAILURE,
      payload: err,
    });
  }
};
export const getAllTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(BASEURL + 'task/lead_6996a7dcdddc4af3b4f71ccb985cea38', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    dispatch({
      type: GET_ALL_TASKS,
      payload: res.data,
    });


  } catch (err) {
    dispatch({
      type: COMMENTS_FAILURE,
      payload: err,
    });
  }
};

export const updateTask = (id, task_msg, task_date, sec, assigned_user, time_zone, is_completed) => async (dispatch) => {
  try {
    const body = { "task_msg": task_msg, "task_date": task_date, "task_time": sec, "assigned_user": assigned_user, "time_zone": time_zone, "is_completed": is_completed };
    const res = await axios.put(BASEURL + 'task/lead_6996a7dcdddc4af3b4f71ccb985cea38/' + id, body, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    console.log(res.data);
    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });


  } catch (err) {
    dispatch({
      type: COMMENTS_FAILURE,
      payload: err,
    });
  }
};

export const deleteTasks = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(BASEURL + 'task/lead_6996a7dcdddc4af3b4f71ccb985cea38/' + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    dispatch({
      type: DELETE_TASK,
      payload: res.data,
    });


  } catch (err) {
    dispatch({
      type: COMMENTS_FAILURE,
      payload: err,
    });
  }
};
