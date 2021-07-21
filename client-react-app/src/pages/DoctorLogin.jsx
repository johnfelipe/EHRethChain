import React, { useState } from "react";

import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";
import Account from "../components/Account";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/doctorLogin.css";

import { Typography } from "antd";
import { Link } from "react-router-dom";
import { client } from "../adapters/trinsic";
import Modal from "../components/Modal";
import QRCode from "react-qr-code";

import { Button as antButton, notification } from "antd";

const { Title } = Typography;

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Ok
    </Button>
  );
  notification.error({
    message: "Error",
    description:
      "This account has exceeded the maximum allowed credential monthly exchanges. Please upgrade your plan.",
    btn,
    key,
    onClose: close,
  });
};

function DoctorLogin() {
  const [qrValue, setQRvalue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);

  async function verifyCredentials() {
    try {
      let response = await client.createVerificationFromPolicy(
        process.env.REACT_APP_POLICY_ID
      );

      setQRvalue(response.verificationRequestUrl);
      setShowQR(true);
      setShowModal(true);

      let verificationID = response.verificationId;
      let verification = { state: "Requested" };
      let timeOut = false;
      setTimeout(() => (timeOut = true), 1000 * 60);
      while (!timeOut && verification.state === "Requested") {
        verification = await client.getVerification(verificationID);
      }

      setShowQR(false);
      if (verification.state === "Accepted") {
        alert("Verification  Accepted");
      } else {
        alert("Verification  Rejected");
      }
    } catch (err) {
      openNotification();
    }
  }

  return (
    <>
      <Layout>
        <MainContainer>
          <Container>
            <Account />
            <Row>
              <Col></Col>
              <Col xs={6} className="form-container">
                {" "}
                <Title level={2} style={{ textAlign: "center" }}>
                  Doctor Login
                </Title>
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={verifyCredentials}
                  >
                    Verify Credientials
                  </Button>

                  <span>
                    Or{" "}
                    <Link to="/issueDoctorID">issue your doctor ID now!</Link>
                  </span>
                </div>
              </Col>

              <Col></Col>
            </Row>
            {showQR && showModal && (
              <Modal showModal={showModal} setShowModal={setShowModal}>
                <Container>
                  <h4>Scan this code to accept a connectionless credential</h4>
                  <Row style={{ margin: "40px" }}>
                    <Col></Col>
                    <Col>
                      {" "}
                      <div style={{ padding: "20px" }}>
                        <QRCode value={qrValue} />
                      </div>
                    </Col>
                    <Col></Col>
                  </Row>
                </Container>
              </Modal>
            )}
          </Container>
        </MainContainer>
      </Layout>
    </>
  );
}

export default DoctorLogin;
