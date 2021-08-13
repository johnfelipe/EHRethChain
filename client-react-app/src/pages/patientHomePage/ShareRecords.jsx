import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";

import { message, notification } from "antd";

import {
  contractAddress,
  requestAccount,
  initContract,
} from "../../adapters/contractAPI";
import { ethers } from "ethers";

export default function ShareRecords() {
  const [validated, setValidated] = useState(false);
  const [patientAddress, setPatientAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  let result = initContract();
  let signer = result.provider.getSigner();
  let contract = new ethers.Contract(contractAddress, result.abi, signer);

  useEffect(() => {
    async function fetchUserData() {
      let addr = await signer.getAddress();
      setPatientAddress(addr);
    }
    fetchUserData();
  }, []);

  async function getUserRole(address) {
    let entityR = contract.ENTITY_ROLE();

    let isEntity = await contract.hasRole(entityR, address);

    // ? we only grant share to t entities

    if (isEntity) {
      console.log("this account is an entity");
      return { role: "entity" };
    } else {
      console.log("dont allow this account any access");

      let placement = "bottomRight";
      notification.error({
        message: "Sharing Record Failed",
        description: "Sharing records is only for granted entities",
        placement,
      });

      return { role: "undefined" };
    }
  }

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
