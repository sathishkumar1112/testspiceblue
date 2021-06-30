import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './Components/LogIn'
import Home from './Components/Home'

function App() {
  return (
    <>
      <Router >
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" component={LogIn} />
        </Switch>
      </Router >
    </>
  );
}

export default App;
