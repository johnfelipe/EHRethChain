import React, { useState } from "react";
// import { Container, Button } from "react-bootstrap";

// ? This represent the landing page or the root '/'

import auth from "../auth";

import Modal from "../components/Modal";

import "./Connect.css";

import { createGlobalStyle } from "styled-components";

import styled from "styled-components";

// export const GlobalStyle = createGlobalStyle`
//   * {
//     box-sizing: border-box;
//     margin:0;
//     padding: 0;
//     font-family: 'Arial', sans-serif;
//   }
// `;

const Container = styled.div`
  display: flex;
  ${"" /* background-color: lightblue; */}
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

function Connect(props) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Container>
      <h1>hi</h1>

      <button className="connect-button" onClick={openModal}>
        Connect
      </button>

      <Modal showModal={showModal} setShowModal={setShowModal} />
      {/* <GlobalStyle /> */}
    </Container>
  );
}

export default Connect;
