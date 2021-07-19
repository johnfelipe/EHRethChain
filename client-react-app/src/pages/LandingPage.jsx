import React, { useState, useEffect } from "react";

import "../styles/landingpage.css";

import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";

import { useHistory } from "react-router-dom";
import MainContainer from "../components/MainContainer";

import { connectMetaMask, checkForWallet } from "../adapters/connectWallet";

import Modal from "../components/Modal";
import auth from "../adapters/auth";

import styled from "styled-components";
import { Alert } from "react-bootstrap";

const WalletBox = styled.div`
  margin: 50px; /** was 76 */
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

  async function connectToMetaMask() {
    // ? get account address
    auth.login(() => history.push("/home"));
  }

  return (
    <WalletBox onClick={connectToMetaMask}>
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

  // function connectWallet() {
  //   // ? show model with metamask and once clicked do that.
  //   connectMetaMask()
  //     .then((data) => setIsMetaMaskInstalled(true))
  //     .catch((err) => setIsMetaMaskInstalled(false));
  // }

  // useEffect(() => {
  //   connectWallet();
  // }, [isMetaMaskInstalled]);

  // const openModal = () => {
  //   setShowModal((prev) => !prev);
  // };

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
              <button className="btn blue" onClick={checkMetaMask}>
                Connect
              </button>
              <button
                className="btn blue"
                onClick={() => history.push("/issueDoctorID")}
              >
                Issue Doctor ID
              </button>
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
