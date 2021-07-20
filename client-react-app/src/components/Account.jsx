import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { ethers } from "ethers";

import styled from "styled-components";

import auth from "../adapters/auth";
import { useHistory } from "react-router-dom";

import Identicon from "react-identicons";

import Blockies from "react-blockies";
import { Avatar } from "antd";

import { CopyOutlined } from "@ant-design/icons";

import { Typography } from "antd";
const { Paragraph } = Typography;

const DisconnectBtn = styled.button`
  width: 120px;
  border-radius: 30px;
  margin-top: 10px;
  border: 1px solid lightgray;
  font-size: 18px;
  :hover {
    background-color: #f8f8f8;
    cursor: pointer;
    border-radius: 20px;
  }
`;

function Account() {
  let history = useHistory();
  const [userAddress, setUserAddress] = useState("");
  const [connectedToNet, setConnectedToNet] = useState("");
  const [userBalance, setUserBalance] = useState("");
  async function getUserData() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    setUserAddress(await signer.getAddress());
    console.log(typeof userAddress);
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
  }, [userAddress, connectedToNet, userBalance]);

  function disconnect() {
    auth.logout(() => {
      history.push("/");
    });
  }

  return (
    <Container
      style={{
        margin: "20px auto 20px auto",
        padding: "20px",
        boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
      }}
    >
      <Row>
        <Col>
          <p
            style={{
              fontSize: "20px",
              display: "flex",
              flexFlow: "column nowrap",
            }}
          >
            Connected to{" "}
            <span style={{ fontWeight: "bold" }}>{connectedToNet}</span>
          </p>
        </Col>
        <Col>
          <Row>
            <Col style={{ textAlign: "right" }}>
              <Blockies seed={userAddress} size={5} scale={8} />
            </Col>
            <Col>
              {" "}
              <Paragraph
                copyable={{
                  text: userAddress,
                  icon: (
                    <CopyOutlined style={{ fontSize: "35px", margin: "5px" }} />
                  ),
                }}
                style={{ fontSize: "20px" }}
              >
                {`${userAddress.substring(0, 9)}...${userAddress.substring(
                  33,
                  42
                )}`}
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col>
              <p
                style={{
                  textAlign: "right",
                  marginTop: "10px",
                  fontSize: "20px",
                }}
              >
                {" "}
                ${userBalance}
              </p>
            </Col>
            <Col>
              <DisconnectBtn onClick={disconnect}>Logout</DisconnectBtn>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
