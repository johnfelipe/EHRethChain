import React from "react";

import { Card, Button, Row, Col, Container } from "react-bootstrap";

import "../styles/patientRecordCard.css";

function PatientRecordCard(props) {
  return (
    <Card
      className="record-card"
      border="primary"
      //   style={{ width: "190px", margin: "20px 15px 0 0" }}
    >
      <Card.Header>{props.recordName}</Card.Header>
      <Card.Body>
        <Card.Title>{props.date}</Card.Title>
        <Card.Text>{props.provider}</Card.Text>
        {props.viewButton}
      </Card.Body>
    </Card>
  );
}

export default PatientRecordCard;
