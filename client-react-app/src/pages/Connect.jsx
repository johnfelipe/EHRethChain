import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

// ? This represent the landing page or the root '/'

import Web3 from "web3";
import { ethers } from "ethers";

import auth from "../auth";
import Modal from "../components/Modal";
import "./Connect.css";
import styled from "styled-components";
import { Alert } from "react-bootstrap";
// ? to redirect
import { useHistory } from "react-router-dom";

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
    // enable enthereum
    // await window.ethereum.enable(); // deprecated

    // ? get account address

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .send("eth_requestAccounts", []) // prompt the user for account connections
      .then(() => {
        //? redirect to protected route home
        auth.login(() => history.push("/home"));
      })
      .catch((err) => console.log(err));
  }

  return (
    <WalletBox onClick={connectToMetaMask}>
      <WalletImg src={props.walletImg} alt="metamask logo"></WalletImg>
      <WalletName>{props.walletName}</WalletName>
      <WalletDescription>{props.walletDescription}</WalletDescription>
    </WalletBox>
  );
}

function Connect(props) {
  // ? Checks to see if meta mask is installed and render the correct component
  const [showModal, setShowModal] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  function checkForWallet() {
    if (typeof window.ethereum !== "undefined") setIsMetaMaskInstalled(true);
    else setIsMetaMaskInstalled(false);
  }

  useEffect(() => {
    checkForWallet();
  }, [isMetaMaskInstalled]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Container className="welcome-container">
      <p className="welcome-text">
        Welcome to EHRethChain an electronic health record powered by Ethereum
        Blockchain
      </p>
      <button className="connect-button" onClick={openModal}>
        Connect
      </button>

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
    </Container>
  );
}

export default Connect;
