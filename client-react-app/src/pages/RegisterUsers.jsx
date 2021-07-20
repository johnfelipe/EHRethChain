import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";
import Account from "../components/Account";

import { useHistory } from "react-router";

import "../styles/registerUsers.css";

function RegisterUsers() {
  let history = useHistory();
  return (
    <>
      <Layout>
        <MainContainer>
          <Container>
            <Account />
            <Row>
              <Col className="registerText">You are not registered yet.</Col>
            </Row>
            <Row>
              <Col className="registerBtn">
                <button onClick={() => history.push("/home/registerPatient")}>
                  Patient
                </button>
              </Col>
              <Col className="registerBtn">
                <button>Provider</button>
              </Col>
            </Row>
          </Container>
        </MainContainer>
      </Layout>
    </>
  );
}

export default RegisterUsers;
