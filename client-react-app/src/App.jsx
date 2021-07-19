import React from "react";

import "./styles.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageNotFound from "./components/PageNotFound";
import LandingPage from "./pages/LandingPage";
import IssueDoctorID from "./pages/IssueDoctorID";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/issueDoctorID" component={IssueDoctorID} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
