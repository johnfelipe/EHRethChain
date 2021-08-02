import React from "react";

import { Container, Row, Col, Form } from "react-bootstrap";
import { Divider } from "antd";

import { GrUserAdmin } from "react-icons/gr";
import { FaRegAddressCard, FaRegHospital } from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";

import { FcExpired } from "react-icons/fc";
import { BiUser } from "react-icons/bi";

import { FcDepartment, FcOvertime } from "react-icons/fc";

import { GiRank3 } from "react-icons/gi";

import { SiWorldhealthorganization } from "react-icons/si";

import EntityImage from "../assets/images/entity-avatar.png";

function EntityProfile(props) {
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
              <p style={{ color: "#1890FF" }}>Entity </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <img src={EntityImage} alt="admin avatar" />
            <Divider>Entity</Divider>
            <p style={{ padding: "20px" }}>
              View records that are shared by patients.
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
                <Form.Label column sm="2">
                  Fullname
                </Form.Label>
                <Col sm="5" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.fullname}
                    readOnly
                  />
                  <span>
                    <GrUserAdmin
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
                <Form.Label column sm="2">
                  Assoication
                </Form.Label>
                <Col sm="5" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.assoication}
                    readOnly
                  />
                  <span>
                    <SiWorldhealthorganization
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Address
                </Form.Label>
                <Col sm="10" style={{ display: "flex" }}>
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
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  ID
                </Form.Label>
                <Col sm="3" style={{ display: "flex" }}>
                  <Form.Control type="text" placeholder={props.id} readOnly />
                  <span>
                    <MdPermIdentity
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Expiration
                </Form.Label>
                <Col sm="3" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.expiration}
                    readOnly
                  />
                  <span>
                    <FcExpired
                      style={{
                        margin: "10px",
                        fontSize: "22px",
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

export default EntityProfile;
