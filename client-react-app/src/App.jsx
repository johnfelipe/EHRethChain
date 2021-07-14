import React from "react";

import HomePage from "./pages/Home";
import ConnectPage from "./pages/Connect";

import ProtectedRoute from "./components/Protected.route";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles.css";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Container>
          <Switch>
            <Route exact path="/" component={ConnectPage} />
            <ProtectedRoute exact path="/home" component={HomePage} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </Container>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
