import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";
import AccessNotification from "../../components/AccessNotification";



import { message, notification } from "antd";

export default function GivePermission() {
  const [validated, setValidated] = useState(false);
  const [patientAddress, setPatientAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    console.log(recipientAddress);
  };

  return (
    <>
      <Row style={{ padding: "90px" }}>
        <h3>Give Permission</h3>
        <Col sm={1}></Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Recipient Ethereum Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ethereum address"
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  value={recipientAddress}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your doctor ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Patient's Ethereum Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={patientAddress}
                  required
                  readOnly
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant="primary" type="button" onClick={handleSubmit}>
              Give Permission
            </Button>
          </Form>
        </Col>
        <Col sm={1}></Col>
      </Row>
      <Row style={{ padding: "90px" }}>
        <h3>Notification</h3>
        <Col sm={1}></Col>
        <Col>
          <AccessNotification />
          <AccessNotification />
          <AccessNotification />
          <AccessNotification />
          <AccessNotification />
          <AccessNotification />
          <AccessNotification />
        </Col>
        <Col sm={1}></Col>
      </Row>
    </>
  );
}
