import React from "react";
import { Container, Row, Col, Card, CardGroup } from "react-bootstrap";

import { Button } from "antd";

function Info() {
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
            </Card>
          </CardGroup>
        </Row>
      </Container>
    </>
  );
}

export default Info;
