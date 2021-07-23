import React, { useContext, useEffect, useState } from "react";
import Blockies from "react-blockies";
import { Row, Col, Container } from "react-bootstrap";

import { LeftCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import "../../styles/patientRecordPage.css";

import { Modal } from "antd";

import { DatePicker } from "antd";

import { Form, Button } from "react-bootstrap";
import PatientRecordCard from "../../components/PatientRecordCard";
import moment from "moment";
import { message, Space } from "antd";

const { Paragraph } = Typography;
let count = 0;

const Demo = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const [validated, setValidated] = useState(false);
  const [recordName, setRecordName] = useState("");
  const [date, setDate] = useState("");
  const [doctorNote, setDoctorNote] = useState("");

  useEffect(() => {
    if (props.view === true) {
      setRecordName(props.values.recordName);
      setDate(moment(props.values.date, dateFormat));
      setDoctorNote(props.values.doctorNote);
    }
  }, [props.view]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleSave = () => {
    let status = false;
    if (validated === true) {
      if (recordName !== "" && date !== "" && doctorNote !== "") {
        props.setPatientRecords((prevState) => {
          for (let i = 0; i < props.patientRecords.length; i++) {
            if (
              props.patientRecords[i].recordName === recordName &&
              props.patientRecords[i].date === date &&
              props.patientRecords[i].doctorNote === doctorNote
            ) {
              message.error("This record is already added, try new values!");
              status = true;
              return [...prevState];
            }
          }

          let newRecord = {
            recordName: recordName,
            date: date,
            doctorNote: doctorNote,
            id: ++count,
          };
          status = false;
          message.success("New record added successfully");
          return [...prevState, newRecord];

          // if (prevState === newRecord) {
          //   alert("this is already added");
          //   return [...prevState];
          // } else {
          //   return [...prevState, newRecord];
          // }
        });

        props.setShowModal(status);
      }
      // alert("request save");
    }
  };

  const handleDelete = (id) => {
    // if (recordName !== "" && date !== "" && doctorNote !== "") {

    // }

    props.setPatientRecords(
      props.patientRecords.filter((record) => {
        return record.id !== id;
      })
    );
    // props.setPatientRecords([]);
    // alert("request delete");
    message.success("Record deleted successfully");
    props.setShowModal(false);
  };

  const handleCancel = () => {
    props.setShowModal(false);
  };

  const handleUpdate = (id) => {
    // props.setPatientRecords((prevState) => [
    //   ...prevState,
    //   { recordName: recordName, date: date, doctorNote: doctorNote, id: id },
    // ]);

    props.setShowModal(false);
    message.success("Record updated successfully");
    // alert("to update");
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
            <Form.Control
              type="text"
              placeholder={props.patientName}
              readOnly
            />
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
            <Form.Control
              type="text"
              placeholder="record name"
              value={recordName}
              onChange={(e) => setRecordName(e.target.value)}
              required
            />

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
            <Form.Control type="text" placeholder={props.provider} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Date:</p>
          </Form.Label>
          <Col sm="4">
            {/* <Form.Control type="date" required /> */}

            {props.view === true ? (
              <DatePicker
                size="large"
                // value={date}
                // value={props.values.date}
                value={moment(props.values.date, dateFormat)}
              />
            ) : (
              <DatePicker
                size="large"
                // value={date}
                // value={props.values.date}

                onChange={(date, dateString) => setDate(dateString)}
              />
            )}

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
              placeholder={props.patientAddress}
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
              placeholder={props.doctorAddress}
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Doctor's Note</p>
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              rows={5}
              value={doctorNote}
              onChange={(e) => setDoctorNote(e.target.value)}
              required
            />
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
            onClick={() => {
              props.view === true
                ? handleUpdate(props.values.id)
                : handleSave();
            }}
          >
            Save
          </Button>
          <Button
            variant="danger"
            type="button"
            style={{ margin: "5px" }}
            onClick={() => {
              props.view === true
                ? handleDelete(props.values.id)
                : handleCancel();
            }}
          >
            {props.view === true ? "Delete" : "Cancel"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

function CreateNewRecord({ showModal, setShowModal, children, ...restProps }) {
  return (
    <>
      <Modal
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        closable
        width={1000}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
}

function ViewRecord({ showModal, setShowModal, children, ...restProps }) {
  return (
    <>
      <Modal
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        closable
        width={1000}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
}

function PatientRecordPage(props) {
  let history = useHistory();

  const [createShowModal, setCreateShowModal] = useState(false);
  const [viewShowModal, setViewShowModal] = useState(false);
  const [viewRecord, setViewRecord] = useState({});

  const [patientRecords, setPatientRecords] = useState([]);

  function goToPatients() {
    history.push("/home/providerHome/AssignedPatients/");
  }

  function handleDisplayRecord(record) {
    setViewRecord(false);

    setViewRecord({});

    setViewRecord(record);

    setViewShowModal(true);
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
            onClick={() => setCreateShowModal(true)}
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
          <div style={{ display: "flex", flexFlow: "row wrap" }}>
            {/* { Object.keys(patientRecords).length > 0 ? <h1>here</h1> : null } */}

            {/* { patientRecords.filter(value => Object.keys(value).length !== 0) } */}

            {patientRecords.map((record, index) => (
              <PatientRecordCard
                recordName={record.recordName}
                date={record.date}
                provider={record.provider}
                key={record.id}
                id={record.id}
                viewButton={
                  <Button
                    variant="primary"
                    onClick={() => {
                      // handleDisplayRecord(record);
                      setViewRecord(false);

                      setViewRecord({});

                      setViewRecord(record);

                      setViewShowModal(true);
                    }}
                  >
                    View
                  </Button>
                }
              />
            ))}
          </div>
        </Col>
      </Row>

      <CreateNewRecord
        showModal={createShowModal}
        setShowModal={setCreateShowModal}
      >
        <Container>
          <Row>
            <Col
              style={{
                marginTop: "20px",
              }}
            >
              <Demo
                patientName="Test 1"
                provider="Manchester Hosptial"
                patientAddress="0x123141"
                doctorAddress="0x1234121"
                setShowModal={setCreateShowModal}
                // view={false}
                patientRecords={patientRecords}
                setPatientRecords={setPatientRecords}
              />
            </Col>
          </Row>
        </Container>
      </CreateNewRecord>

      <ViewRecord showModal={viewShowModal} setShowModal={setViewShowModal}>
        <Container>
          <Row>
            <Col
              style={{
                marginTop: "20px",
              }}
            >
              <Demo
                patientName="Test 1"
                provider="Manchester Hosptial"
                patientAddress="0x123141"
                doctorAddress="0x1234121"
                setShowModal={setViewShowModal}
                patientRecords={patientRecords}
                setPatientRecords={setPatientRecords}
                view={true}
                values={viewRecord}
              />
            </Col>
          </Row>
        </Container>
      </ViewRecord>
    </>
  );
}

export default PatientRecordPage;
