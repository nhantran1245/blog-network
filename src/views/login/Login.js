import React, { useRef, useState } from "react";
import "./styles.scss";
import apiInstance from "../../services/axios_helper";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const userNameRef = useRef();
  const passwordRef =  useRef();
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (localStorage.getItem("access-token")) {
    navigate("/");
  }
  const validateUserName = (value) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9]+$/;
    return regex.test(value);
  }

  const validatePassword = (value) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*]+$/;
    return regex.test(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;
    if (userName.length < 8 || userName.length > 24) {
      const tempError = {};
      tempError.userName = "Username must have length beetwen 8 and 24";
      setError(tempError);
    } else if (!validateUserName(userName)) {
      const tempError = {};
      tempError.userName = "Username must only contain numbers or letters, and must start with letter";
      setError(tempError);
    } else if (password.length < 8 || password.length > 32) {
      const tempError = {};
      tempError.password = "Password must have length beetwen 8 and 32";
      setError(tempError);
    } else if (!validatePassword(password)){
      const tempError = {};
      tempError.password = "Password must only contain numbers letters, or special characters";
      setError(tempError);
    } else {
      const data = {
        username: userName,
        password: password
      };
      const config = {
        headers: {"Access-Control-Allow-Origin": "*"}
      };
      apiInstance.post("/auth/login", data, config)
        .then(res => {
          localStorage.setItem("access-token", res.data.jwtToken);
          navigate("/");
        }).catch(err => {
          const message = err.response.data.message;
          setMessage(message)
        });
      setError({});
    }
  }
  return (
    <div className="row login-page">
      <div className="col-md-6 sm-6">
        <img 
          src="https://tridenstechnology.com/wp-content/uploads/2019/07/Smart-home.png"
          alt="."
          className="img-fluid"
        />
      </div>
      <div className="col-md-6 sm-6">
        <form 
          className="login-form-container"
          onSubmit={handleSubmit}
        >
          <h3 className='mt-1 mb-5 pb-1'>Log In</h3>
          {message && <p className="text text-danger">{message}</p>}
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input 
              ref={userNameRef}
              type="text" 
              className="form-control" 
              id="userName"
              aria-describedby="emailHelp" 
              placeholder="Enter Username"
            />
            {error && error.userName && (
              <small id="userNameHelp" className="form-text text-danger">{error.userName}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"/>
            {error && error.password && (
              <small id="passwordHelp" className="form-text text-danger">{error.password}</small>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
                Submit
          </button>
        </form>
      </div>
    </div>
  )
}

