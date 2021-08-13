import React from "react";

import { Container, Row, Col, Form } from "react-bootstrap";
import { Divider } from "antd";

import { BiUser } from "react-icons/bi";

import { FaRegHospital, FaRegAddressCard } from "react-icons/fa";

import { FcDepartment, FcOvertime } from "react-icons/fc";

import { GiRank3 } from "react-icons/gi";

import { IoIosCard } from "react-icons/io";

import ProviderImage from "../assets/images/provider-avatar.png";

function ProviderProfile(props) {
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
              <p style={{ color: "#1890FF" }}>Provider </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <img src={ProviderImage} alt="patient avatar" />
            <Divider>Patient</Divider>
            <p style={{ padding: "20px" }}>
              Provider can do any of the CRUD operation on patient records that
              granted provider access, but other records created by other
              providers are read only. Finally can request access from an
              ethereum patient account.
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
                  Hosptial
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.hospital}
                    readOnly
                  />
                  <span>
                    <FaRegHospital
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
                  Fullname
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
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
              {/* <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Address
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
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
              </Form.Group> */}
              {/* <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Position
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.position}
                    readOnly
                  />
                  <span>
                    <GiRank3
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                        color: "#1890FF",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group> */}
              {/* <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Department
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.department}
                    readOnly
                  />
                  <span>
                    <FcDepartment
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                        color: "#1890FF",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group> */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  ID
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control type="text" placeholder={props.id} readOnly />
                  <span>
                    <IoIosCard
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
                  Expiration
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control type="text" placeholder={props.id} readOnly />
                  <span>
                    <FcOvertime
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

export default ProviderProfile;
