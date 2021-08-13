import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";
import AccessNotification from "../../components/AccessNotification";

import {
  contractAddress,
  requestAccount,
  initContract,
} from "../../adapters/contractAPI";
import { ethers } from "ethers";

import { message, notification } from "antd";

export default function GivePermission() {
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
    let providerR = contract.PROVIDER_ROLE();
    let entityR = contract.ENTITY_ROLE();

    let isProvider = await contract.hasRole(providerR, address);
    let isEntity = await contract.hasRole(entityR, address);

    // ? we only grant permission to providers or entities
    if (isProvider) {
      console.log("this account is a provider");
      return { role: "provider" };
    } else if (isEntity) {
      console.log("this account is an entity");
      return { role: "entity" };
    } else {
      console.log("dont allow this account any access");

      let placement = "bottomRight";
      notification.error({
        message: "Granting Permission Failed",
        description:
          "Permission is only granted to accounts with either a verified provider or entity role",
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

    console.log(recipientAddress);

    // ? 1. Determine address role
    getUserRole(recipientAddress)
      .then((status) => {
        // ? if role == provider grant CRUD provider access
        // ? if role == entity grant entity read share access
        console.log(status);
      })
      .catch((err) => console.log(err));
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
