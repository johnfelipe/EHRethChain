import React, { useState } from "react";

import { Container, Row, Col, Form } from "react-bootstrap";
import { Divider } from "antd";

import { BiUser } from "react-icons/bi";

import { FaRegAddressCard } from "react-icons/fa";

import PatientImage from "../assets/images/patient-avatar.png";

function PatientProfile(props) {
  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <div>
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  margin: "10px 0 0 0 ",
                }}
              >
                Profile
              </p>
              <p style={{ color: "#1890FF" }}>Patient </p>
            </div>
          </Col>
     
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <img src={PatientImage} alt="patient avatar" />
            <Divider>Patient</Divider>
            <p style={{ padding: "20px" }}>
              Patient can view his own medical records, grant access to health
              providers to access their records and do CRUD operation on those
              records that are created by the doctors, patient can also share
              records with third party entities such as researchers, and can
              revoke access from providers or from entities
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
              padding: "40px",
            }}
          >
            <div>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Fullname
                </Form.Label>
                <Col sm="9" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.fullname}
                    readOnly
                  />
                  <span>
                    <BiUser
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                        color: "#1890FF",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Ethereum Address
                </Form.Label>
                <Col sm="9" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.address}
                    readOnly
                  />
                  <span>
                    <FaRegAddressCard
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                        color: "#1890FF",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default PatientProfile;
