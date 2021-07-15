import React, { useEffect, useState } from "react";

// ? This page is protected, users can access once signed in with Metamask.
// ? the app starts here
// ? This is the Home page

import Web3 from "web3";

import { ethers } from "ethers";

import auth from "../auth";

import styled from "styled-components";
import { Container } from "react-bootstrap";

import Blockies from "react-blockies";

import "./Home.css";

// ? TESTIING
import { CopyToClipboard } from "react-copy-to-clipboard";
import UseAnimations from "react-useanimations";
// EVERY ANIMATION NEEDS TO BE IMPORTED FIRST -> YOUR BUNDLE WILL INCLUDE ONLY WHAT IT NEEDS
import copy from "react-useanimations/lib/copy";

const Network = styled.div`
  position: relative;
  display: inline-block;
  width: 150px;
  margin: 20px;

  span {
    font-weight: bold;
  }
`;

const Address = styled.div`
  position: relative;
  display: inline-block;
  width: 190px;
  left: 660px;
  bottom: 20px;
`;

const Balance = styled.div`
  position: relative;
  display: inline-block;
  widht: 50px;
  left: 470px;
  top: 18px;
`;

const DisconnectBtn = styled.button`
  position: relative;
  width: 100px;
  border-radius: 30px;
  left: 520px;
  top: 17px;
  border: 1px solid lightgray;
  background-color: #fff;

  :hover {
    background-color: #f8f8f8;
    cursor: pointer;
    border-radius: 20px;
  }
`;

const Avatar = styled.div`
  position: relative;
  display: inline-block;

  left: 260px;
  top: 10px;
`;

const ClipboardCopy = styled.div`
  ${"" /* border: 1px solid red; */}
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
  left: 490px;
  bottom: 5px;
`;

function Home(props) {
  // TODO: need a way to get accout, network and balance passed here.

  const [userAddress, setUserAddress] = useState("");
  const [connectedToNet, setConnectedToNet] = useState("");
  const [userBalance, setUserBalance] = useState("");

  async function getUserData() {
    // ? Connect to Ethereum: Metamask

    // ? WEb3 way of connecting
    // let accounts = await window.ethereum
    //   .request({ method: "eth_requestAccounts" })
    //   .catch((err) => console.log(err));

    // const addr = provider.resolveName();
    // console.log(addr);
    // let ENSa = await provider.lookupAddress(as[0]);
    // console.log(ENSa);
    // const balance = await provider.getBalance(ENSa);
    // console.log(balance);
    // const net = await provider.getNetwork();
    // console.log(net);

    // let accounts = await window.ethereum
    //   .request({ method: "eth_requestAccounts" })
    //   .catch((err) => console.log(err));

    // setUserAddress(accounts[0]);
    // console.log("Address: " + userAddress);

    // // ? get connected network
    // const chainId = await window.ethereum
    //   .request({ method: "eth_chainId" })
    //   .catch((err) => console.log(err));

    // switch (chainId) {
    //   case "0x1":
    //     setConnectedToNet("Ethereum Mainnet");
    //     break;
    //   case "0x3":
    //     setConnectedToNet("Ropsten Test Network");
    //     break;
    //   case "0x4":
    //     setConnectedToNet("Rinkeby Test Network");
    //     break;
    //   case "0x5":
    //     setConnectedToNet("Goerli Test Network");
    //     break;
    //   case "0x2a":
    //     setConnectedToNet("Kovan Test Network");
    //     break;
    //   default:
    //     setConnectedToNet("localhost Network");
    //     break;
    // }

    // console.log("Connected to " + connectedToNet);

    // // ? instance of web3 with provided information
    // const web3 = new Web3(window.ethereum);

    // if (userAddress !== "") {
    //   web3.eth
    //     .getBalance(userAddress)
    //     .then((value) => {
    //       setUserBalance(value);
    //       console.log("Balance: " + userBalance);
    //     })
    //     .catch((err) => console.log(err));
    // }

    // alert(chainId);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    setUserAddress(await signer.getAddress());

    console.log(userAddress);
    console.log(typeof userAddress);
    let accounts = provider
      .listAccounts()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
    console.log(accounts);

    setUserBalance(ethers.utils.formatEther(await signer.getBalance()));
    let n = await provider.getNetwork();
    let name = n.name;
    if (name === "homestead") setConnectedToNet("Ethereum Mainnet");
    else {
      setConnectedToNet(
        `${name.charAt(0).toUpperCase() + name.slice(1)} Test Network`
      );
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  function disconnect() {
    auth.logout(() => {
      props.history.push("/");
    });
  }

  // ? the start of the application components goes here
  return (
    <Container style={{ margin: "60px 80px 80px 80px", padding: "20px" }}>
      <Network>
        <p>
          Connected to <span>{connectedToNet}</span>
        </p>
      </Network>
      <Address>
        <p>{`${userAddress.substring(0, 9)}...${userAddress.substring(
          33,
          42
        )}`}</p>
      </Address>
      <Balance>
        <p>${userBalance}</p>
      </Balance>
      {/* <h1>Home Page protected page</h1> */}
      <DisconnectBtn onClick={disconnect}>Logout</DisconnectBtn>

      <Avatar>
        <Blockies seed={userAddress} size={15} scale={3} className="avatar" />
      </Avatar>

      <ClipboardCopy>
        <CopyToClipboard text={userAddress}>
          <UseAnimations
            animation={copy}
            size={35}
            strokeColor={"#258fe6"}
            wrapperStyle={{
              color: "#258fe6",
            }}
          />
        </CopyToClipboard>
      </ClipboardCopy>
    </Container>
  );
}

export default Home;
