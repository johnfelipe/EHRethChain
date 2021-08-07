import React, { useState } from "react";
import HomeSection from "../components/HomeSection";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { homeObjOne } from "../components/HomeSection/data";
import AboutSection from "../components/AboutSection";
import DemoSection from "../components/DemoSection";
import SolutionSection from "../components/SolutionSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer/index";
import Modal from "../components/Modal";
import { connectMetaMask, checkForWallet } from "../adapters/connectWallet";
import auth from "../adapters/auth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Alert } from "react-bootstrap";

import {
  contractAddress,
  requestAccount,
  initContract,
} from "../adapters/contractAPI";

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
          let result = initContract();

          console.log(result);

          if (result !== 0) {
            let signer = result.provider.getSigner();
            signer.getAddress().then((address) => {
              console.log(address);

              let contract = result.contract;
              let paitnetR = contract.PATIENT_ROLE();
              let providerR = contract.PROVIDER_ROLE();
              let entityR = contract.ENTITY_ROLE();
              let adminR = contract.ADMIN_ROLE();
              let ownerR = contract.DEFAULT_ADMIN_ROLE();

              contract.hasRole(ownerR, address).then((v) => {
                if (v === true) {
                  console.log("this account is the owner");
                  auth.login(() => history.push("/home"));
                }
              });
              contract.hasRole(paitnetR, address).then((v) => {
                if (v === true) {
                  console.log("this account is a patient");
                  // go to patient page
                  auth.login(() => history.push("/home/patientHome"));
                } else {
                  // go to register page
                  auth.login(() => history.push("/home/registerUsers"));
                }
              });
              contract.hasRole(providerR, address).then((v) => {
                if (v === true) {
                  console.log("this account is a provider");
                  // go to patient page
                  auth.login(() => history.push("/home/providerHome"));
                } else {
                  // go to register page
                  auth.login(() => history.push("/home/registerUsers"));
                }
              });
              contract.hasRole(entityR, address).then((v) => {
                if (v === true) {
                  console.log("this account is an entity");
                  // go to patient page
                  auth.login(() => history.push("/home/entityHome"));
                } else {
                  // go to register page
                  auth.login(() => history.push("/home/registerUsers"));
                }
              });
              contract.hasRole(adminR, address).then((v) => {
                if (v === true) {
                  console.log("this account is an admin");
                  // go to patient page
                  auth.login(() => history.push("/home/adminHome"));
                } else {
                  // go to register page
                  auth.login(() => history.push("/home/registerUsers"));
                }
              });

              // auth.login(() => history.push("/home"));
            });
          }
          // check address here
          // if not registered send to register or verify
          // otherwise what role this address has and direct it appropriatly

          // auth.login(() => history.push("/home"));
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

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} connectOnClick={checkMetaMask} />
      <HomeSection {...homeObjOne} connectOnClick={checkMetaMask} />
      <AboutSection />
      <SolutionSection />
      <DemoSection />
      <ContactSection />
      <Footer />

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
    </>
  );
};
export default Home;
