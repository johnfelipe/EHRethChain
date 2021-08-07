import React, { useEffect, useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Modal from "../../components/Modal";

import { DatePicker, message } from "antd";

import QRCode from "react-qr-code";
import { openNotification } from "../../helpers/trinsicExchangeNotification";

import { IssueDoctorID } from "../../adapters/trinsic";

const key = "updatable";

function IssueDoctorCredentials() {
  const [hospital, setHospital] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [id, setID] = useState("");
  const [expiration, setExpiration] = useState("");

  const [qrValue, setQRvalue] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);

  function issueLoading() {
    message.loading({ content: "Loading...", key });
  }

  useEffect(() => {
    if (showQR && showModal) {
      message.success({ content: "Loaded!", key, duration: 2 });
    }
  }, [showQR, showModal]);

  async function issueID() {
    try {
      if (
        hospital !== "" &&
        fullname !== "" &&
        address !== "" &&
        position !== "" &&
        department !== "" &&
        id !== "" &&
        expiration !== ""
      ) {
        let formData = {
          hospital: hospital,
          name: fullname,
          address: address,
          position: position,
          department: department,
          id: id,
          expiration: expiration,
        };

        issueLoading();

        let result = await IssueDoctorID(formData);

        setQRvalue(result.offerUrl);
        setShowQR(true);
        setShowModal(true);
      } else {
        message.warning("Please fill in the form entries first!");
      }
    } catch (err) {
      openNotification();
    }
  }

  return (
    <>
      <Container>
        <Row md={4}>
          <Col></Col>
          <Col
            xs={6}
            style={{
              margin: "0 auto 50px auto",
              padding: "20px",
              width: "90%",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
          >
            <Form>
              <h1>Create your digital doctor ID</h1>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Hospital
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Manchester Hospital"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Full Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="your name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Oxford Rd, Manchester M21 3RN"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Position
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Consultant"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Deparment
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Orthopaedics"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  ID
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="your id e.g., 1231451"
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Expiration
                </Form.Label>
                <Col sm="3">
                  <DatePicker
                    type="text"
                    onChange={(data, dataString) => setExpiration(dataString)}
                  />
                </Col>
              </Form.Group>
              <Button
                variant="primary"
                size="sm"
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  fontSize: "18px",
                }}
                onClick={issueID}
              >
                Issue Doctor ID
              </Button>
            </Form>
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
    </>
  );
}

export default IssueDoctorCredentials;
