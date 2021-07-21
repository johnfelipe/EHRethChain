import React, { useState } from "react";

import { Form } from "react-bootstrap";

import { notification } from "antd";

import { Container, Button, Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

import "../styles/accessNotification.css";

const openNotification = (message, placement) => {
  notification.info({
    message: `Notification`,
    description: message,
    placement,
  });
};

function AccessNotification() {
  const [showMessage, setShowMessage] = useState(true);

  function handleGrant() {
    openNotification("request access granted !", "bottomRight");
    setShowMessage(false);
  }

  function handleDeny() {
    openNotification("request access denyed !", "bottomRight");
    setShowMessage(false);
  }

  return (
    <>
      <Container style={{ paddingTop: "1rem" }}>
        <CSSTransition
          in={showMessage}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <Alert
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
            }}
            variant="light"
          >
            <Alert.Heading>Request Access</Alert.Heading>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ethereum Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="0x897Fd668E8adfF344D52104A699187096aD17645"
                readOnly
              />
              <Form.Text className="text-muted">
                This may not be a verified user requesting access.
              </Form.Text>
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{ margin: "5px" }}
                onClick={handleGrant}
                variant="primary"
              >
                Grant
              </Button>
              <Button
                style={{ margin: "5px" }}
                onClick={handleDeny}
                variant="danger"
              >
                Deny
              </Button>
            </div>
          </Alert>
        </CSSTransition>
      </Container>
    </>
  );
}

export default AccessNotification;
