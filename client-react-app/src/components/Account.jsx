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

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  left: 260px;
  top: 10px;
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
        margin: "60px auto 80px auto",
        padding: "20px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
            <Col>
              <AvatarContainer>
                <Blockies seed={userAddress} size={5} scale={8} />
              </AvatarContainer>
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
