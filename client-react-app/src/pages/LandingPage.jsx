import React from "react";

import "../styles/landingpage.css";

import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";

import { useHistory } from "react-router-dom";
import MainContainer from "../components/MainContainer";

function LandingPage() {
  let history = useHistory();
  return (
    <Layout>
      <MainContainer>
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
              <button className="btn blue">Connect</button>
              <button
                className="btn blue"
                onClick={() => history.push("/issueDoctorID")}
              >
                Issue Doctor ID
              </button>
            </Col>
          </Row>
        </Container>
      </MainContainer>
    </Layout>
  );
}

export default LandingPage;
