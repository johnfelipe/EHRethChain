import React, { useState, useEffect, useRef } from "react";

import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import Account from "../../components/Account";
import Modal from "../../components/Modal";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Select } from "antd";

// import { client } from "../../adapters/trinsic";

import { Typography, message } from "antd";

import { Link, useHistory } from "react-router-dom";

import "../../styles/doctorLogin.css";

import QRCode from "react-qr-code";
import { openNotification } from "../../helpers/trinsicExchangeNotification";

import {
  manchesterHospitalClient,
  londonHospitalClient,
} from "../../adapters/trinsic";

import GoBackBtn from "../../components/GoBackBtn";

import styled from "styled-components";

const key = "updatable";
const { Option } = Select;

const { Title } = Typography;

const SelectIssuerContainer = styled.div`
  padding: 10px;
  margin: 10px 0;
  display: flex;
`;

const SelectBox = styled.div`
  margin-left: 10px;
  height: 50px;
`;

const SelectTxt = styled.p`
  font-size: 16px;
`;

function DoctorLogin() {
  let history = useHistory();
  const [issuingProvider, setIssuingProvider] = useState("");

  const [qrValue, setQRvalue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [providerAddress, setProviderAddress] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [accpetedData, setAcceptedData] = useState({});

  const result = initContract();
  const signer = result.provider.getSigner();

  let provider = new ethers.providers.JsonRpcProvider();
  let owner = provider.getSigner(0);
  let contractAsOwner = result.contract.connect(owner);

  function verifyLoading() {
    message.loading({ content: "Loading...", key });
  }

  useEffect(() => {
    if (showQR && showModal) {
      message.success({ content: "Loaded!", key, duration: 2 });
    }
  }, [showQR, showModal]);

  async function verifyCredentials() {
    const hide = message.loading("Trying to verify credentials...", 0);
    setTimeout(hide, 2500);

    try {
      if (issuingProvider !== "" && providerAddress !== "") {
        let client;
        let policy;

        switch (issuingProvider) {
          case "manchester hospital":
            client = manchesterHospitalClient;
            policy = process.env.REACT_APP_MANCHESTER_HOSPITAL_DOCTOR_POLICY_ID;
            break;
          case "london hospital":
            client = londonHospitalClient;
            policy = process.env.REACT_APP_LONDON_HOSPITAL_DOCTOR_POLICY_ID;
            break;
          default:
            break;
        }

        verifyLoading();

        let response = await client.createVerificationFromPolicy(policy);

        setQRvalue(response.verificationRequestUrl);
        setShowQR(true);
        setShowModal(true);

        let verificationID = response.verificationId;
        let verification = { state: "Requested" };
        let timeOut = false;
        setTimeout(() => (timeOut = true), 1000 * 60);
        while (!timeOut && verification.state === "Requested") {
          verification = await client.getVerification(verificationID);
        }

        setShowQR(false);

        // store address and if verified in local storage
        if (verification.state === "Accepted") {
          // alert("Verification  Accepted");
          message.success("Verification Accepted");
          setIsVerified(true);

          let v = await client.getVerification(verificationID);
          console.log(v);
          setAcceptedData({
            Hospital: v.proof["Doctor ID"].attributes["Hospital"],
            "Full Name": v.proof["Doctor ID"].attributes["Full Name"],
            ID: v.proof["Doctor ID"].attributes["ID"],
            Expiration: v.proof["Doctor ID"].attributes["Expiration"],
          });

          localStorage.setItem("isVerified", {
            isVerified: true,
            address: providerAddress,
            data: accpetedData,
          });

          // ? 1.  owner register provider since verified
          await contractAsOwner
            .registerProvider(providerAddress)
            .catch((err) => console.log(err));

          // ? 2.  direct provider to provider page
          message.success("Successfully registered as a provider.");
          message.loading("Redirecting to provider home page.");

          // We need to pass in the provider data to provider home

          setTimeout(() => history.push("/home/providerHome"), 5000);
        } else {
          // alert("Verification  Rejected");

          message.error("Verification Rejected");

          setIsVerified(false);

          localStorage.setItem("isVerified", {
            isVerified: false,
            address: providerAddress,
            data: {},
          });
        }
      } else {
        message.warning(
          "Please select issuing provider to verify your provider credentials"
        );
      }
    } catch (err) {
      console.log(err);
      // openNotification();
    }
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
    let provider = value.toLowerCase();

    setIssuingProvider(provider);
  }

  return (
    <>
      <Layout>
        <MainContainer>
          <Container>
            <Account />
            <Row>
              <GoBackBtn path="/home/registerUsers" />

              <Col xs={6} className="form-container">
                <Title level={2} style={{ textAlign: "center" }}>
                  Doctor Login
                </Title>{" "}
                <SelectIssuerContainer>
                  <SelectTxt>Select your issuing health provider</SelectTxt>
                  <SelectBox>
                    <Select style={{ width: 220 }} onChange={handleChange}>
                      <Option value="Manchester Hospital">
                        Manchester Hospital
                      </Option>
                      <Option value="London Hospital">London Hospital</Option>
                    </Select>
                  </SelectBox>
                </SelectIssuerContainer>
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={verifyCredentials}
                  >
                    Verify Credentials
                  </Button>

                  <span>
                    Or <Link to="/issueUserID">issue your doctor ID now!</Link>
                  </span>
                </div>
              </Col>

              <Col></Col>
            </Row>
            {showQR && showModal && (
              <Modal showModal={showModal} setShowModal={setShowModal}>
                <Container>
                  <h4>Scan this code to accept a connection-less credential</h4>
                  <Row style={{ margin: "40px" }}>
                    <Col></Col>
                    <Col>
                      {" "}
                      <div style={{ padding: "20px" }}>
                        <QRCode value={qrValue} />
                      </div>
                    </Col>
                    <Col></Col>
                  </Row>
                </Container>
              </Modal>
            )}
          </Container>
        </MainContainer>
      </Layout>
    </>
  );
}

export default DoctorLogin;
