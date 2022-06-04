import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/authSlice";

export default function PrivateRoute({ component: Component }) {
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  if (token) {
    if (!currentUser) {
      dispatch({ type: "FETCH_USER" });
    }
    return <Component />;
  }
  return <Redirect to="/login" />;
}
