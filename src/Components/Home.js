import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, sendTask, getAllTasks, updateTask, deleteTasks } from "../actions/actions";
import { isEmpty } from 'lodash';
import { AiOutlinePlus } from 'react-icons/ai'
import { BsPencil, BsTrash } from 'react-icons/bs'

const Home = () => {
  const initialPostsState = {
    task_msg: "",
    task_date: "",
    task_time: "",
    assigned_user: "",
    is_completed: 1,
  };
  const [taskDetails, setTaskDetails] = useState(initialPostsState);
  const dispatch = useDispatch();

  const userlist = useSelector(state => state.dataReducer.userlist);
  // const isAuth = useSelector(state => state.dataReducer.isAuth);
  const getTask = useSelector(state => state.dataReducer.tasklist);
  const [task, setTask] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showEditBox, setShowEditBox] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [getTaskList, setGetTaskList] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllTasks());

  }, [dispatch]);
  useEffect(() => {
    if (!isEmpty(userlist)) {
      setAllUsers(userlist.results.data);
    }
    if (!isEmpty(getTask)) {
      setGetTaskList(getTask.results);
    }
    if (!localStorage.getItem('token')) {
      window.location = "/";
    }

  }, [userlist, getTask]);
  const createNew = () => {
    setTask(true);
    setShowList(false);
    setShowEditBox(false)
  }
  const cancelTask = () => {
    setTask(false);
    setShowList(true);
  }
  const createOnChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  }
  const onSubmit = (e) => {
    e.preventDefault()

    const { task_msg, task_date, task_time, assigned_user, is_completed } = taskDetails;
    let time_zone = timezone_offset_in_seconds();
    let sec = toConvert(task_time);
    dispatch(sendTask(task_msg, task_date, sec, assigned_user, time_zone, is_completed));
    dispatch(getAllTasks());
    setShowList(true);
  }
  const toConvert = (timeString) => {
    const arr = timeString.split(":");
    return arr[0] * 3600 + arr[1] * 60;
  }
  const secondsToTime = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var hDisplay = h < 10 ? "0" + h : h;
    var mDisplay = m < 10 ? "0" + m : m;
    return hDisplay + ":" + mDisplay;
  }
  const timezone_offset_in_seconds = () => {
    let dt = new Date();
    return -dt.getTimezoneOffset() * 60;
  }
  const editTask = (list) => {
    setShowEditBox(true)
    setTask(false);
    setShowList(false);
    setTaskDetails({
      task_msg: list.task_msg,
      task_date: list.task_date,
      task_time: secondsToTime(list.task_time),
      assigned_user: list.assigned_user,
      is_completed: 1,
      id: list.id
    })
  }
  const cancelEditTask = () => {
    setShowEditBox(false)
    setShowList(true);

  }
  const onUpdate = (e) => {
    e.preventDefault();
    setShowEditBox(false)
    setShowList(true);
    const { id, task_msg, task_date, task_time, assigned_user, is_completed } = taskDetails;
    let time_zone = timezone_offset_in_seconds();
    let sec = toConvert(task_time);
    dispatch(updateTask(id, task_msg, task_date, sec, assigned_user, time_zone, is_completed))
    dispatch(getAllTasks());

  }
  const deleteTask = (id) => {
    setShowEditBox(false)
    setShowList(true);
    dispatch(deleteTasks(id));
    dispatch(getAllTasks());
  }

  let options =
    allUsers.length > 0 ? (allUsers.map((list, index) => {
      return (
        <option key={index} value={list.user_id}>{list.first + list.last}</option>
      )
    })) : (<option >selectusers</option>)

  return (
    <>

      <div className="container-fluid" style={{ "marginTop": "100px" }}>
        <div className="row align-items-center">
          <div className="col">
            <div className="row">
              <div className="col-sm-4">
                <div className="card" style={{ "height": "40px" }}>
                  <div className="card-body" style={{ "padding": "8px" }}>
                    <div className="row">
                      <div className="col">
                        <p>Task</p>
                      </div>
                      <div className="col">
                        <div className="text-end">
                          <AiOutlinePlus onClick={createNew} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showList &&
              <div className="row">
                <div className="col-sm-4">

                  {getTaskList.length > 0 ? (getTaskList.map((list, index) => {
                    return (
                      <div className="card" key={index} style={{ "height": "40px" }}>
                        <div className="card-body" style={{ "padding": "8px" }}>
                          <div className="row" >
                            <div className="col" >
                              <p >{list.task_msg}</p>
                            </div>
                            <div className="col" >
                              <div className="text-end" >
                                <BsPencil onClick={() => editTask(list)} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    )
                  })) : (<div>no data</div>)
                  }

                </div>
              </div>}
            {
              task &&
              <div className="row">
                <div className="col-sm-4">
                  <div className="card" style={{ "backgroundColor": "#daf3f5" }}>
                    <div className="card-body">
                      <form className="form-signin" onSubmit={onSubmit}>
                        <div className="row g-3">
                          <div className="col-sm-12">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" aria-describedby="description" name="task_msg" onChange={createOnChange} />
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="Date" className="form-label">Date</label>
                            <input type="date" className="form-control" aria-label="Date" name="task_date" onChange={createOnChange} />
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="Time" className="form-label">Time</label>
                            <input type="time" className="form-control" aria-label="Time" name="task_time" onChange={createOnChange} />
                          </div>
                          <div className="col-sm-12">
                            <label htmlFor="AssignUser" className="form-label">Assign User</label>
                            <select className="form-select" id="autoSizingSelect" name="assigned_user" onChange={createOnChange} >
                              <option >Choose...</option>
                              {options}
                            </select>
                          </div>
                          <div className="col-sm-12">

                            <div className="col">
                              <div className="d-flex justify-content-end">
                                <div className="text-end" style={{ "marginRight": "10px" }}>
                                  <button onClick={cancelTask} className="btn btn-sm text-center">Cancel</button>
                                </div>
                                <div className="gap-3">
                                  <button className="btn btn-sm text-center" style={{ "backgroundColor": "#47bb7f" }}>Save</button>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            }
            {
              showEditBox &&
              <div className="row">
                <div className="col-sm-4">
                  <div className="card" style={{ "backgroundColor": "#daf3f5" }}>
                    <div className="card-body">
                      <form className="form-signin" onSubmit={onUpdate}>
                        <div className="row g-3">
                          <div className="col-sm-12">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" aria-describedby="description" name="task_msg" onChange={createOnChange} value={taskDetails.task_msg} />
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="Date" className="form-label">Date</label>
                            <input type="date" className="form-control" aria-label="Date" name="task_date" onChange={createOnChange} value={taskDetails.task_date} />
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="Time" className="form-label">Time</label>
                            <input type="time" className="form-control" aria-label="Time" name="task_time" onChange={createOnChange} value={taskDetails.task_time} />
                          </div>
                          <div className="col-sm-12">
                            <label htmlFor="AssignUser" className="form-label">Assign User</label>
                            <select className="form-select" id="autoSizingSelect" name="assigned_user" onChange={createOnChange} value={taskDetails.assigned_user}>
                              <option >Choose...</option>
                              {options}
                            </select>
                          </div>
                          <div className="col-sm-12">
                            <div className="row">
                              <div className="col">
                                <div className="d-flex justify-content-start">
                                  <div className="text-end">
                                    <BsTrash onClick={() => deleteTask(taskDetails.id)} />
                                  </div>
                                </div>
                              </div>
                              <div className="col">
                                <div className="d-flex justify-content-end">
                                  <div className="text-end" style={{ "marginRight": "10px" }}>
                                    <button onClick={cancelEditTask} className="btn btn-sm text-center">Cancel</button>
                                  </div>
                                  <div className="gap-3">
                                    <button className="btn btn-sm text-center" style={{ "backgroundColor": "#47bb7f" }}>Save</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div >
    </>
  )
}

export default Home
