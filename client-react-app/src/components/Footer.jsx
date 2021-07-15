import React from "react";
import Container from "react-bootstrap/esm/Container";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Container className="copyright">
        <p>
          Copyright
          <span className="copyrightIcon">
            <i class="far fa-copyright"></i>
          </span>
          2021 All Rights Reserved
          <span>
            <a
              href="https://github.com/mohammedfajer/EHRethChain"
              className="github"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fab fa-github"></i>
            </a>
          </span>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
