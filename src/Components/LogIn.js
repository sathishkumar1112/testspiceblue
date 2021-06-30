import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { logIn } from "../actions/actions";
const LogIn = () => {
  const initialPostsState = {
    username: "",
    password: "",
  };
  const [userDetails, setuserDetails] = useState(initialPostsState);
  const isAuth = useSelector(state => state.dataReducer.isAuth);
  const message = useSelector(state => state.dataReducer.message);
  const error = useSelector(state => state.dataReducer.error);
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setuserDetails({ ...userDetails, [name]: value });
  }
  const validateForm = (username, password) => {
    if (username.length === 0) {
      return false
    }
    else if (password.length === 0) {
      return false
    }
    else {
      return true;
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { username, password } = userDetails;

    const errors = validateForm(username, password);
    if (errors) {
      dispatch(logIn(username, password))

    }
    else {
      alert('Form can not be null');
    }
  };
  return isAuth ? (
    <Redirect to='/home' />
  ) : (
    <div className="container">
      {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      }
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5 center">
            <div className="card-body ">
              <h5 className="card-title text-center">Log In</h5>
              <form className="form-signin" onSubmit={onSubmit}>
                <div className="row mb-3">
                  <label htmlFor="inputEmail3" className="col-sm-3 col-form-label text-end">Email</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" id="inputEmail3" name='username' onChange={handleInputChange} value={userDetails.username} />
                  </div>

                </div>

                <div className="row mb-3">
                  <label htmlFor="inputPassword3" className="col-sm-3 col-form-label text-end">Password</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control" id="inputPassword3" name='password' onChange={handleInputChange} value={userDetails.password} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col text-center">
                    <button className="btn btn-md btn-bgcustomized" type="submit">Login</button>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="row justify-content-center">
                  <div className="col-6">
                    <Link to="#" className="navigation-btn">Forgot your password ?</Link>
                  </div>
                  <div className="col-6">
                    <Link to="#" className="navigation-btn">Register For Account</Link>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LogIn
