import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { createBrowserHistory } from "history";
import React from "react";
import Login from "./views/login/Login";
import HomePage from "./views/home-page/HomePage";
import PrivateRoute from "./components/PrivateRoute";

const hist = createBrowserHistory();
function App() {
  return (
    <Router history={hist}>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route exact path="/" element={<PrivateRoute component={HomePage}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
