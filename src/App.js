import { Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./views/login/Login";
import MyResum from "./views/my-profile-page";
import PrivateRoute from "./components/PrivateRoute";
import Editor from "./components/ckeditor/Editor";
import Register from "./views/register/Register";
import HomePage from "./views/home-page";
import BlogDetails from "./views/blog-details/BlogDetails";

function App() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/editor">
        <div style={{ width: "60%", margin: "auto" }}>
          <Editor />
        </div>
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/">
        <PrivateRoute component={HomePage} />
      </Route>
      <Route exact path="/my-resum">
        <MyResum />
      </Route>
      <Route exact path="/blog/:id">
        <PrivateRoute component={BlogDetails}/>
      </Route>
    </Switch>
  );
}

export default App;
