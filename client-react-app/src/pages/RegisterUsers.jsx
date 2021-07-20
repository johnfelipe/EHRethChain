import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";
import Account from "../components/Account";

function RegisterUsers() {
  return (
    <>
      <Layout>
        <MainContainer>
          <Container>
            <Account />
            <Row>
              <Col sm={4}>sm=8</Col>
              <Col sm={8}>sm=4</Col>
            </Row>
          </Container>
        </MainContainer>
      </Layout>
    </>
  );
}

export default RegisterUsers;
