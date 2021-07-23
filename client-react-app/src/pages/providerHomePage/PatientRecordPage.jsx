import React, { useEffect, useState } from "react";
import Blockies from "react-blockies";
import { Row, Col } from "react-bootstrap";

import { LeftCircleOutlined, CopyOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { Typography } from "antd";
import { Button } from "react-bootstrap";
import { message } from "antd";

import { Modal } from "antd";

import "../../styles/patientRecordPage.css";
import CreateRecordForm from "../../components/CreateRecordForm";
// import ViewRecordForm from "../../components/ViewRecordForm";

import PatientRecordCard from "../../components/PatientRecordCard";

import { DatePicker } from "antd";
import moment from "moment";
import { Form } from "react-bootstrap";
import { Empty } from "antd";

const { Paragraph } = Typography;

function PatientInformation(props) {
  let history = useHistory();
  const returnToPatients = () => {
    history.push("/home/providerHome/AssignedPatients/");
  };
  return (
    <>
      <Row>
        <Col>
          <span>
            <LeftCircleOutlined
              className="go-back-icon"
              onClick={returnToPatients}
            />
          </span>
          <span className="go-back-text">Go back</span>
        </Col>
      </Row>
      <Row className="record-status-text">
        <Col>You are viewing the records of the following patient</Col>
      </Row>
      <Row className="record-info-row">
        <Col sm={2}>
          <p className="record-blockie">
            <Blockies seed={props.user.address} size={5} scale={8} />
          </p>
        </Col>
        <Col sm={3}>
          <span className="record-user-name">
            {props.user.firstname} {props.user.lastname}
          </span>
        </Col>
        <Col>
          <Paragraph
            copyable={{
              text: props.user.address,
              icon: <CopyOutlined style={{ fontSize: "18px" }} />,
            }}
          >
            <span className="record-user-address">
              {`${props.user.address.substring(0, 9)}...`}
            </span>
          </Paragraph>
        </Col>
        <Col>
          {" "}
          <button className="create-record-btn" onClick={props.handleCreateBtn}>
            Create new Record
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <p className="patient-records-text">Patient Records</p>
            {/* <input
              placeholder="Search by record name"
              className="patient-records-search-input"
              onChange={props.searchRecordsByName}
            /> */}
          </div>

          <div style={{ display: "flex", flexFlow: "row wrap" }}>
            {props.records.length > 0 ? (
              props.records.map((record, index) => (
                <PatientRecordCard
                  recordName={record.recordName}
                  date={record.date}
                  provider={record.provider}
                  key={record.id}
                  id={record.id}
                  viewButton={
                    <Button
                      variant="primary"
                      onClick={() => props.handleViewRecord(record)}
                    >
                      View
                    </Button>
                  }
                />
              ))
            ) : (
              <div className="patient-empty">
                <Empty />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default function PatientRecordPage(props) {
  const dateFormat = " DD/MM/YYYY";

  const [validated, setValidated] = useState(false);
  const [recordName, setRecordName] = useState("");
  const [doctorNote, setDoctorNote] = useState("");
  const [date, setDate] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);

  const [viewedRecord, setViewedRecord] = useState({
    recordName: "",
    doctorNote: "",
    date: "",
    id: "",
  });

  const searchRecordsByName = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredRecords = patientRecords.filter((record) =>
      `${record.name}`.toLowerCase().includes(value)
    );

    setPatientRecords(filteredRecords);
  };

  const handleUpdate = (id) => {
    // alert(id);

    // ? ENSURE VALIDATED

    setPatientRecords(
      patientRecords.map((record) => {
        if (record.id !== id) return record;
        // alert(record.date);
        // alert(typeof record.date);

        return {
          recordName: recordName,

          date: date.toString(),
          doctorNote: doctorNote,
          id: record.id,
        };
      })
    );

    message.success("Record updated successfully");
    setShowViewModal(false);
  };

  const handleDelete = (id) => {
    // alert(id);

    let filteredRecords = patientRecords.filter((r) => r.id !== id);
    setPatientRecords(filteredRecords);
    message.success("Record deleted successfully");
    setShowViewModal(false);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleCreateRecord = () => {
    setShowCreateModal(true);
  };

  const handleViewRecord = (record) => {
    setRecordName(record.recordName);
    setDoctorNote(record.doctorNote);
    setDate(record.date);
    // alert(record.date);
    // alert(typeof record.date);

    setViewedRecord({});
    setViewedRecord(record);
    setShowViewModal(true);
  };

  return (
    <>
      <PatientInformation
        user={props.user}
        handleCreateBtn={handleCreateRecord}
        records={patientRecords}
        handleViewRecord={handleViewRecord}
        searchRecordsByName={searchRecordsByName}
      />

      <Modal
        visible={showCreateModal}
        onOk={() => setShowCreateModal(false)}
        onCancel={() => setShowCreateModal(false)}
        closable
        width={1000}
        footer={null}
      >
        <CreateRecordForm
          patientName={props.user.firstname + " " + props.user.lastname}
          patientAddress={props.user.address}
          provider="TODO: Manchester Hospital"
          doctorAddress="TODO: 0X13"
          setShowCreateModal={setShowCreateModal}
          setPatientRecords={setPatientRecords}
          patientRecords={patientRecords}
        />
      </Modal>
      <Modal
        visible={showViewModal}
        onOk={() => setShowViewModal(false)}
        onCancel={() => setShowViewModal(false)}
        closable
        width={1000}
        footer={null}
      >
        {/* <ViewRecordForm
          patientName={props.user.firstname + " " + props.user.lastname}
          patientAddress={props.user.address}
          provider="TODO: Manchester Hospital"
          doctorAddress="TODO: 0X13"
          recordName={viewedRecord.recordName}
          doctorNote={viewedRecord.doctorNote}
          date={new Date(viewedRecord.date)}
          setShowViewModal={setShowViewModal}
          setPatientRecords={setPatientRecords}
        /> */}

        <div style={{ fontSize: "18px", padding: "40px" }}>
          <Form noValidate validated={validated} onClick={handleSubmit}>
            <h1>Patient Record</h1>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Patient Name:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder={props.user.firstname + " " + props.user.lastname}
                  readOnly
                />
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
                {" "}
                <p>Provider:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder={"TODO: Manchester Hospital"}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Date:</p>
              </Form.Label>
              <Col sm="4">
                <DatePicker
                  showTime
                  // defaultValue={moment(new Date(date), dateFormat)}
                  // onChange={(date, dateString) =>
                  //   setDate(moment(date, dateFormat))
                  // }
                  // defaultValue={moment(new Date(viewedRecord.date), dateFormat)}
                  // format={dateFormat}
                  defaultValue={moment(new Date(date), dateFormat)}
                  onChange={(date, dateString) =>
                    setDate(moment(new Date(dateString), dateFormat))
                  }
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
                  placeholder={props.user.address}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Doctor's Address:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" placeholder="TODO: 0X13" readOnly />
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

            <div className="patient-create-record-btns-container">
              <Button
                variant="primary"
                type="button"
                className="patient-create-btn"
                onClick={() => handleUpdate(viewedRecord.id)}
              >
                Update
              </Button>
              <Button
                variant="danger"
                type="button"
                className="patient-create-btn"
                onClick={() => handleDelete(viewedRecord.id)}
              >
                Delete
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
