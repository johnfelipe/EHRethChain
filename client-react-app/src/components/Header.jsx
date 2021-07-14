import React from "react";
import "./Header.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Header() {
  return (
    <header className="header">
      <Navbar className="nav">
        <Container>
          <Navbar.Brand className="brand">
            <span style={{ marginRight: "10px" }}>
              <i class="fas fa-laptop-medical"></i>
            </span>
            EHRethChain
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Created by: <span className="author">Mohammed Fajer</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
