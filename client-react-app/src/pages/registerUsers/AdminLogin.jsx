import React from "react";

import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import Account from "../../components/Account";
import GoBackBtn from "../../components/GoBackBtn";

import { Link } from "react-router-dom";
import { Typography, message } from "antd";

import { Container, Row, Col, Button } from "react-bootstrap";
const { Title } = Typography;

function AdminLogin() {
  return (
    <>
      <Layout>
        <MainContainer>
          <Container>
            <Account />
            <Row>
              <GoBackBtn path="/home/registerUsers" />

              <Col xs={6} className="form-container">
                {" "}
                <Title level={2} style={{ textAlign: "center" }}>
                  Admin Login
                </Title>
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    // onClick={verifyCredentials}
                  >
                    Verify Credientials
                  </Button>

                  <span>
                    Or <Link to="/issueUserID">issue your admin ID now!</Link>
                  </span>
                </div>
              </Col>

              <Col></Col>
            </Row>
          </Container>
        </MainContainer>
      </Layout>
    </>
  );
}

export default AdminLogin;
