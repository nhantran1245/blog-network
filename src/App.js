import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import React from "react";
import Login from "./views/login/Login";
import HomePage from "./views/home-page/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import Editor from "./components/ckeditor/Editor";
import Register from "./views/register/Register";

const hist = createBrowserHistory();
function App() {
  return (
    <Router history={hist}>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/editor"
          element={
            <div style={{ width: "60%", margin: "auto" }}>
              <Editor />
            </div>
          }
        />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/" element={<PrivateRoute component={HomePage} />} />
      </Routes>
    </Router>
  );
}

export default App;
