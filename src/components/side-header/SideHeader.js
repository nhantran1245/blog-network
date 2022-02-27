import React from "react";
import "./styles.scss";
import profile from "../../asset/img/avatar.jpg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "../../services/api_helper";
import { setUser } from "../../redux/reduxUser";
import { connect } from "react-redux";
// import ApiInstance from "../../services/axios_helper";

function SideHeader(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access-token");
    dispatch(setUser(null));
    navigate("/login");
  }

  const user = useSelector(state => state.user);
  if (!user) {
    ApiService.get("/auth/current-user")
      .then(res => {
        console.log(res.data.user);
        dispatch(setUser(res.data.user));
      })
      .catch(() => handleLogout()) 
  }

  return (
    <div id="side-header">
      <div className="profile-container">
        <div className="profile-img">
          <img
            className="img-fluid rounded-circle img-thumbnail"
            src={profile} 
            alt=""
          />
        </div>
        <h4 className="text-white">{user ? user.lastName + " " + user.firstName : ""}</h4>
        <div className="social-links mt-3">
          <a href="/" className="text-light"><i className="fab fa-facebook"></i></a>
          <a href="/" className="text-light"><i className="fab fa-instagram"></i></a>
          <a href="/" className="text-light"><i className="fab fa-skype"></i></a>
          <a href="/" className="text-light"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
      <div className="group-button-container">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-light active" aria-current="page" href="/">
              <i className="fa fa-home" aria-hidden="true"/>&nbsp;&nbsp;&nbsp;
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="/">
              <i className="fa fa-briefcase" aria-hidden="true"/>&nbsp;&nbsp;&nbsp;
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="/">
              <i className="fa fa-address-card" aria-hidden="true"/>&nbsp;&nbsp;&nbsp;
              Resume
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="/">
              <i className="fa fa-book" aria-hidden="true"/>&nbsp;&nbsp;&nbsp;
              Blog
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="/" onClick={handleLogout}>
              <i className="fa fa-sign-out" aria-hidden="true"/>&nbsp;&nbsp;&nbsp;
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user?.value?.payload
})

export default connect(mapStateToProps, null)(SideHeader);
