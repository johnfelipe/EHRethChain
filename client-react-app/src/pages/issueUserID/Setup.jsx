import React from "react";
import { Row, Col, Card } from "react-bootstrap";

import { Button } from "antd";

function Setup() {
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

export default Setup;
