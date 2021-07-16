import React from "react";
import { FaLaptopMedical } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "antd";

import "./Header.css";

const { Title, Text } = Typography;

function Header() {
  return (
    <header>
      {" "}
      <Container className="header-container">
        <Row>
          <Col>
            <div className="header-appname">
              <Title level={4}>
                <span>
                  <FaLaptopMedical />
                </span>
                EHRethChain
              </Title>
            </div>
          </Col>
          <Col>
            <Title type="secondary" level={5} className="header-author">
              Created By:{" "}
              <span>
                <Text underline>Mohammed Fajer</Text>
              </span>
            </Title>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
