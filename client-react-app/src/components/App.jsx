import React from "react";

import HomePage from "../pages/Home.page";
import ConnectPage from "../pages/Connect.page";

import ProtectedRoute from "./Protected.route";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path="/" component={ConnectPage} />
          <ProtectedRoute exact path="/home" component={HomePage} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
