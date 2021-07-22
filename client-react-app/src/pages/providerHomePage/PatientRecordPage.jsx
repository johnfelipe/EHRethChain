import React, { useState } from "react";
import Blockies from "react-blockies";
import { Row, Col, Container } from "react-bootstrap";

import { LeftCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import "../../styles/patientRecordPage.css";

import { Modal } from "antd";

// import Modal from "../../components/Modal";

// import { Form, Input, Button, DatePicker } from "antd";

import { Form, Button } from "react-bootstrap";

const Demo = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleSave = () => {
    alert("request save");
  };

  const handleDelete = () => {
    alert("request delete");
  };

  return (
    <div style={{ fontSize: "18px", padding: "40px" }}>
      <Form noValidate validated={validated} onClick={handleSubmit}>
        <h1>Patient Record</h1>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Patient Name:</p>
          </Form.Label>
          <Col sm="9">
            {" "}
            <Form.Control type="text" placeholder="Mohammed Fajer" readOnly />
            <Form.Text id="passwordHelpBlock" muted>
              help text
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Record Name:</p>
          </Form.Label>
          <Col sm="9">
            <Form.Control type="text" placeholder="record name" required />
            <Form.Control.Feedback type="invalid">
              Please enter a record name!
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Provider:</p>
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="Manchester Hosptial"
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Date:</p>
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="date"
              placeholder="Readonly input here..."
              required
            />
            <Form.Control.Feedback type="invalid">
              Please select a date for this note!
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Patient Address:</p>
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="0x897Fd668E8adfF344D52104A699187096aD17645"
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Doctor's Address:</p>
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="0x897Fd668E8adfF344D52104A699187096aD17645"
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Doctor's Note</p>
          </Form.Label>
          <Col sm="9">
            <Form.Control as="textarea" rows={5} required />
            <Form.Control.Feedback type="invalid">
              Please provide record note!
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <div style={{ margin: "10px", textAlign: "right" }}>
          <Button
            variant="primary"
            type="button"
            style={{ margin: "5px" }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="danger"
            type="button"
            style={{ margin: "5px" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Form>
    </div>
  );
};

const { Paragraph } = Typography;

function CreateNewRecord({ showModal, setShowModal, children, ...restProps }) {
  return (
    <>
      <Modal
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        closable
        width={1000}
        // showModal={showModal}
        // setShowModal={setShowModal}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
}

function PatientRecordPage(props) {
  let history = useHistory();

  const [showModal, setShowModal] = useState(false);

  function goToPatients() {
    history.push("/home/providerHome/AssignedPatients/");
  }
  return (
    <>
      <Row>
        <Col>
          <LeftCircleOutlined
            style={{ fontSize: "25px" }}
            onClick={goToPatients}
          />{" "}
          <span style={{ fontSize: "18px", padding: "5px", marginTop: "5px" }}>
            Go back
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ fontSize: "20px", padding: "20px" }}>
            You are viewing the records of the following patient
          </p>
        </Col>
      </Row>
      <Row style={{ padding: "20px" }}>
        <Col sm={2}>
          <p style={{ textAlign: "center" }}>
            <Blockies seed={props.user.address} size={5} scale={8} />
          </p>
        </Col>
        <Col sm={3}>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>
            {props.user.firstname} {props.user.lastname}
          </p>
        </Col>
        <Col>
          <Paragraph
            copyable={{
              text: props.user.address,
              icon: <CopyOutlined style={{ fontSize: "18px" }} />,
            }}
          >
            <span style={{ fontSize: "16px" }}>
              {`${props.user.address.substring(0, 9)}...`}
            </span>
          </Paragraph>
        </Col>
        <Col>
          <button
            className="create-record-btn"
            onClick={() => setShowModal(true)}
          >
            Create new record
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Patient Records</h3>
          <input
            placeholder="Search by record name, or date"
            style={{
              outline: "none",
              width: "100%",
              border: "1px solid grey",
              fontSize: "0.9rem",
              padding: "1rem",
              borderRadius: ".5rem",
            }}
          />
        </Col>
      </Row>

      <CreateNewRecord showModal={showModal} setShowModal={setShowModal}>
        <Container
        // style={{
        //   padding: "50px",
        //   margin: "5px",
        //   width: "1050px",
        //   // border: "1px solid black",
        // }}
        >
          <Row>
            <Col
              style={{
                // boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                marginTop: "20px",
              }}
            >
              <Demo />
            </Col>
          </Row>
        </Container>
      </CreateNewRecord>
    </>
  );
}

export default PatientRecordPage;
