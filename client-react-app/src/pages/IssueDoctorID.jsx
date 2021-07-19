import React, { useState } from "react";

import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";
import { Container, Row, Col, Card, CardGroup, Form } from "react-bootstrap";

import { Steps, Button, message } from "antd";

import { useHistory } from "react-router-dom";

import "../styles/issueDoctorID.css";
import Info from "./issueDoctorID/Info";

const { Step } = Steps;

function PartOne() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h1>
                  Trinsic - A Full-stack self-sovereign identity (SSI) platform{" "}
                </h1>
                <p
                  style={{
                    fontSize: "16px",

                    padding: "10px 60px",
                  }}
                >
                  Trinsic Core is for sending verifiable data between digital
                  identity wallets. Core gives people and organizations the
                  ability to easily and securely prove things about themselves
                  with digital credentials.
                </p>
                <p
                  style={{
                    fontSize: "16px",

                    padding: "0 60px",
                  }}
                >
                  This technology is powered by blockchain for maintaining
                  transparency and trust in the issuers, holders and verifiers
                  of digital identities.
                </p>

                <p>
                  <Button
                    type="primary"
                    href="https://trinsic.id/"
                    target="_blank"
                  >
                    Learn More
                  </Button>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <CardGroup style={{ margin: "40px 0" }}>
            <Card>
              <i
                class="fas fa-id-card fa-5x"
                style={{
                  width: "200px",
                  margin: "20px auto",
                  color: "#053742",
                }}
              ></i>
              <Card.Body>
                <Card.Title>Issue Credentials</Card.Title>
                <Card.Text>
                  Trinsic Core enables organizations with the ability to give
                  their customers digital credentials that contain verifiable
                  data.
                </Card.Text>
              </Card.Body>
              {/* <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer> */}
            </Card>
            <Card>
              <i
                class="fas fa-share-alt fa-5x"
                style={{
                  width: "200px",
                  margin: "20px auto",
                  color: "#053742",
                }}
              ></i>
              <Card.Body>
                <Card.Title>Share Credentials</Card.Title>
                <Card.Text>
                  The credentials are securely stored in the customers' digital
                  wallets. Customers can easily share their credentials with
                  anyone they want at a touch or click of a button.
                </Card.Text>
              </Card.Body>
              {/* <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer> */}
            </Card>
            <Card>
              <i
                class="fas fa-user-check fa-5x"
                style={{
                  width: "200px",
                  margin: "20px auto",
                  color: "#053742",
                }}
              ></i>
              <Card.Body>
                <Card.Title>Verify credentials</Card.Title>
                <Card.Text>
                  Relying parties can instantly verify the data contained within
                  the credentials without having to "phone home" to the original
                  issuing entity.
                </Card.Text>
              </Card.Body>
              {/* <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer> */}
            </Card>
          </CardGroup>
        </Row>
      </Container>
    </>
  );
}

function PartTwo() {
  const mystyle = { background: "#0092ff", padding: "8px 0" };
  return (
    <>
      <Row style={{ margin: "10px auto 60px auto" }}>
        <Col>
          <Card>
            <i
              class="fas fa-user-circle fa-6x"
              style={{ margin: "10px", color: "#053742" }}
            ></i>
            <Card.Body>
              <Card.Title>1. Create an account with Trinsic</Card.Title>
              <Card.Text>
                In order to register as a doctor you need to have a verifiable
                credentials.
              </Card.Text>
              <Button
                variant="primary"
                href="https://trinsic.id/"
                target="_blank"
              >
                Get Started
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <i
              class="fas fa-wallet fa-6x"
              style={{ margin: "10px", color: "#053742" }}
            ></i>
            <Card.Body>
              <Card.Title>2. Download Trinsic Wallet</Card.Title>
              <Card.Text>
                This is where you will store your issued credentials and can
                later be used for verification.
              </Card.Text>
              <Button
                variant="primary"
                href="https://trinsic.id/trinsic-wallet/"
                target="_blank"
              >
                Download Wallet
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <i
              class="fas fa-envelope-open-text fa-6x"
              style={{ margin: "10px", color: "#053742" }}
            ></i>
            <Card.Body>
              <Card.Title>
                3. Check your email and create a login credentials
              </Card.Title>
              <Card.Text>
                Check your email after registering with Trinsic and downloading
                the wallet to create your login wallet.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

function PartThree() {
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
                  <Form.Control defaultValue="Manchester Hospital" />
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
                  <Form.Control placeholder="your name" />
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
                  <Form.Control defaultValue="Oxford Rd, Manchester M21 3RN" />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Position
                </Form.Label>
                <Col sm="10">
                  <Form.Control defaultValue="Consultant" />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Deparment
                </Form.Label>
                <Col sm="10">
                  <Form.Control defaultValue="Orthopaedics" />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  ID
                </Form.Label>
                <Col sm="10">
                  <Form.Control placeholder="your id e.g., 1231451" />
                </Col>
              </Form.Group>
              <Button variant="primary" size="lg">
                Issue Doctor
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

const steps = [
  {
    title: "Verifiable Credientials with Trinsic",
    content: <Info />,
  },
  {
    title: "Trinsic Wallet",
    content: <PartTwo />,
  },
  {
    title: "Issue Doctor ID",
    content: <PartThree />,
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
      history.push("/");
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
