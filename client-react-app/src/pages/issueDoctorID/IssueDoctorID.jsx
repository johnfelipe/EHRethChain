import React, { useState } from "react";

import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";

import { Container, Row, Col } from "react-bootstrap";

import { Steps, Button, message } from "antd";

import { useHistory } from "react-router-dom";

import "../../styles/issueDoctorID.css";
import Info from "./Info";
import Setup from "./Setup";
import Issue from "./Issue";

const { Step } = Steps;

const steps = [
  {
    title: "Verifiable Credientials with Trinsic",
    content: <Info />,
  },
  {
    title: "Trinsic Wallet",
    content: <Setup />,
  },
  {
    title: "Issue Doctor ID",
    content: <Issue />,
  },
];

function IssueDoctorID() {
  let history = useHistory();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const whenDone = () => {
    message.success("Processing complete!").then(() => {
      message.loading("returning home", 1.5).then(() => history.push("/"));
    });
  };

  return (
    <Layout>
      <MainContainer>
        <Container style={{ margin: "50px auto" }}>
          <Row>
            <Col>
              <Steps current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">{steps[current].content}</div>
              <div className="steps-action">
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === 0 && (
                  <Button
                    style={{ margin: "0 8px" }}
                    onClick={() => history.push("/")}
                  >
                    Back Home
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={whenDone}>
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                    Previous
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </MainContainer>
    </Layout>
  );
}

export default IssueDoctorID;
