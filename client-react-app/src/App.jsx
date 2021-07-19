import React from "react";

import "./styles.css";

import { FaLaptopMedical } from "react-icons/fa";

import { Container, Row, Col } from "react-bootstrap";

import { Typography } from "antd";

import { AiOutlineCopyrightCircle, AiFillGithub } from "react-icons/ai";

// import Button from "@material-ui/core/Button";
import Layout from "./components/Layout";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import PageNotFound from "./components/NotFound";

// import { AwesomeButton } from "react-awesome-button";
// import "react-awesome-button/dist/styles.css";
// import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

// import btn from "./btn.scss";

// function Button() {
//   return (
//     <AwesomeButton type="primary" ripple cssModule={AwesomeButtonStyles}>
//       Connect Wallet
//     </AwesomeButton>
//   );
// }

const { Title, Text } = Typography;

function Main() {
  return (
    <Layout>
      <main>
        <Container className="main-container">
          <Row>
            <Col>
              <div className="main-text">
                <h4>
                  Welcome to EHRethChain an electronic health record powered
                </h4>
                <h4>by Ethereum Blockchain</h4>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="main-container">
          <Row>
            <Col>
              {/* <button className="connect-button">Connect</button> */}
              {/* <Button /> */}
              <button className="btn blue">Connect</button>
              <button className="btn blue">Issue Doctor ID</button>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
