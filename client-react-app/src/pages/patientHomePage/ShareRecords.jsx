import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";

import { message, notification } from "antd";



export default function ShareRecords() {
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

    // ? 1. Determine address role == entity
    // ? 2. Grant Entity Read Permission
    // ? 3. Check record exists
    // ? 4. Share record with Entity
  };
  return (
    <>
      <Row style={{ padding: "90px" }}>
        <h3>Share Records</h3>
        <Col sm={1}></Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Your Ethereum address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={patientAddress}
                  required
                  readOnly
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your doctor ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Recipient Ethereum address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Recipient ethereum address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a recipient ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Record Name</Form.Label>
                <Form.Control type="text" placeholder="record name" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a record name.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant="primary" type="button" onClick={handleSubmit}>
              Share
            </Button>
          </Form>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </>
  );
}
