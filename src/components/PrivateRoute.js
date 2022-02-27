import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component: Component }) {
  const user = localStorage.getItem("access-token");
  return (
    user ? <Component /> : <Navigate to="/login" />
  )
}
