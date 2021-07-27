import React, { useState } from "react";

import Modal from "../components/Modal";
import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";

import { connectMetaMask, checkForWallet } from "../adapters/connectWallet";
import auth from "../adapters/auth";

import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import "../styles/landingpage.css";

const WalletBox = styled.div`
  margin: 50px;
  width: 400px;
  :hover {
    background-color: #f8f8f8;
    cursor: pointer;
    border-radius: 20px;
  }
`;

const WalletImg = styled.img`
  width: 100px;
  height: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const WalletName = styled.h3`
  text-align: center;
`;

const WalletDescription = styled.p`
  text-align: center;
`;

function InstallMetaMask(props) {
  return (
    <WalletBox>
      <Alert variant="warning">
        <p>You dont have MetaMask browser extension to use this app.</p>
        <Alert.Link href="https://metamask.io/" target="_blank">
          Here
        </Alert.Link>{" "}
        you can install the chrome/firefox browser extension.
      </Alert>
    </WalletBox>
  );
}

function MetaMaskConnect(props) {
  // ? connect to metamask and redirect to homepage

  let history = useHistory();

  async function makeConnection() {
    connectMetaMask()
      .then((result) => {
        console.log(result.status);
        if (result.status === "success") {
          auth.login(() => history.push("/home"));
        }
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <WalletBox onClick={makeConnection}>
      <WalletImg src={props.walletImg} alt="metamask logo"></WalletImg>
      <WalletName>{props.walletName}</WalletName>
      <WalletDescription>{props.walletDescription}</WalletDescription>
    </WalletBox>
  );
}

function LandingPage() {
  let history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  function checkMetaMask() {
    if (checkForWallet()) {
      setIsMetaMaskInstalled(true);
    } else {
      setIsMetaMaskInstalled(false);
    }

    setShowModal(true);
  }

  return (
    <Layout>
      <MainContainer>
        <Container className="main-container">
          <Row>
            <Col>
              <div className="main-text">
                <h4>
                  Welcome to EHRethChain an electronic health record powered
                </h4>
                <h4>by Ethereum Blockchain</h4>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="main-container">
          <Row>
            <Col>
              <Button className="lp-btn lp-blue" onClick={checkMetaMask}>
                Connect
              </Button>
              <Button
                className="lp-btn lp-blue"
                onClick={() => history.push("/issueDoctorID")}
              >
                Issue Doctor ID
              </Button>
            </Col>
          </Row>
        </Container>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          {isMetaMaskInstalled ? (
            <MetaMaskConnect
              walletImg="https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png"
              walletName="MetaMask"
              walletDescription="Connect to your MetaMask Wallet"
            />
          ) : (
            <InstallMetaMask />
          )}
        </Modal>
      </MainContainer>
    </Layout>
  );
}

export default LandingPage;
