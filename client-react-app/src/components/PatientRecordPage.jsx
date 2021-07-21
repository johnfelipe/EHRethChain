import React from "react";
import Blockies from "react-blockies";
import { Row, Col } from "react-bootstrap";

import { LeftCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import "../styles/patientRecordPage.css";

const { Paragraph } = Typography;

function PatientRecordPage(props) {
  let history = useHistory();
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
          <p style={{ fontSize: "16px" }}>
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
          <button className="create-record-btn">Create new record</button>
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
    </>
  );
}

export default PatientRecordPage;
