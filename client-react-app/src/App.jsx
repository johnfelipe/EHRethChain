import React from "react";

import "./styles.css";

import { FaLaptopMedical } from "react-icons/fa";

import { Container, Row, Col } from "react-bootstrap";

import { Typography } from "antd";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { AiOutlineCopyrightCircle, AiFillGithub } from "react-icons/ai";

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
          </Col>
        </Row>
      </Container>
    </main>
  );
}

function App() {
  return (
    <>
      <Header />
      <Main></Main>
      <Footer></Footer>
    </>
  );
}

export default App;
