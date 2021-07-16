import HomePage from "./Home";
import ConnectPage from "./Connect";

import ProtectedRoute from "../components/Protected.route";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./Navigation.css";

{
  /* <Row>
<Col>
  <div className="content">
    <Router>
      <Container>
        <Switch>
          <Route exact path="/" component={ConnectPage} />
          <ProtectedRoute exact path="/home" component={HomePage} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Container>
    </Router>
  </div>
</Col>
</Row> */
}

function Navigation() {
  return <main></main>;
}

export default Navigation;
