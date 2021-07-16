import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { AiOutlineCopyrightCircle, AiFillGithub } from "react-icons/ai";

import "./Footer.css";

function Footer() {
  return (
    <footer>
      <Container className="footer-container">
        <Row>
          <Col>
            <div className="footer-content">
              <span>Copyright</span>
              <span className="copyright-icon">
                <AiOutlineCopyrightCircle />
              </span>
              <span>2021 All Rights Reserved</span>
              <a
                className="github-icon"
                href="https://github.com/mohammedfajer/EHRethChain"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillGithub />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
