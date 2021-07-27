import React, { useState } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";

export default function ShareRecords() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
      <Row style={{ padding: "90px" }}>
        <h3>Share Records</h3>
        <Col sm={2}></Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Your Ethereum address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your ethereum address"
                  required
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
        <Col sm={2}></Col>
      </Row>
    </>
  );
}
