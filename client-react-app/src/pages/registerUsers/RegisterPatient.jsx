import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Modal from "../../components/Modal";
import auth from "../../adapters/auth";
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import Account from "../../components/Account";

import "../../styles/registerPatient.css";

import { Form, Input, Button, message, notification } from "antd";

import { Typography } from "antd";

import GoBackBtn from "../../components/GoBackBtn";

import { newIdentity } from "../../cryptography/ethIdentity";

import Localbase from "localbase";

import { addToIPFS } from "../../adapters/ipfs";

import {
  encryptSymKeyWithPublicKey,
  encryptDataWithSymKey,
} from "../../cryptography/encryption";

import { decryptDataWithSymKey } from "../../cryptography/decryption";

import { ethers } from "ethers";

import DownloadUserIdentity from "../../components/DownloadUserIdentity";

import IPFS from "ipfs";

import {
  contractAddress,
  requestAccount,
  initContract,
} from "../../adapters/contractAPI";

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function RegisterPatientForm() {
  let history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [patinetNewIdentity, setPatientNewIdentity] = useState({});
  const [isDownloaded, setIsDownloaded] = useState(false);
  // const [fName, setFName] = useState("");
  // const [lName, setLName] = useState("");

  const warnUserToDownload = () => {
    notification["warning"]({
      message: "Download Identity Keys",
      description: "In order to register you must download the keys first.",
    });
    message.warn("You need to download your identity keys first");
  };

  const registerPatient = async () => {
    const hide = message.loading("Registering in progress..", 0);
    await new Promise((resolve, reject) => {
      setTimeout(async () => {
        hide();

        let result = initContract();
        let signer = result.provider.getSigner();
        let contract = new ethers.Contract(contractAddress, result.abi, signer);

        console.log(patinetNewIdentity);

        try {
          console.log(
            patinetNewIdentity.firstname,
            patinetNewIdentity.lastname
          );

          // encrypt name with user symmetric key
          let encryptedFname = encryptDataWithSymKey(
            patinetNewIdentity.firstname,
            patinetNewIdentity.symmetricKey
          );

          let encryptedLname = encryptDataWithSymKey(
            patinetNewIdentity.lastname,
            patinetNewIdentity.symmetricKey
          );

          // store encrypted data on IPFS
          const fNameCid = await addToIPFS(encryptedFname);
          const lNameCid = await addToIPFS(encryptedLname);
          console.log(fNameCid);
          console.log(lNameCid);

          //register user
          await contract.registerPatient(
            signer.getAddress(),
            fNameCid,
            lNameCid
          );

          // check registered user
          let r = await contract.hasRole(
            contract.PATIENT_ROLE(),
            signer.getAddress()
          );
          if (r === true) {
            // redirect
            resolve("done");
          }
        } catch (err) {
          console.log(err);
        }
        // resolve("done");
      }, 3500);
    });
    const success = message.success(
      "You successfully registered, directing to patient home page"
    );
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        success();
        resolve("done");
      }, 2500);
    });
    const redirect = message.loading("Redirecting to patient homepage..", 0);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        redirect();
        resolve("done");
      }, 2500);
    });
    await new Promise((resolve, reject) =>
      setTimeout(
        auth.login(() => history.push("/home/patientHome")),
        2500
      )
    );
  };

  function hasDownloadedIdentity(value) {
    setIsDownloaded(true);
    registerPatient();
  }

  function onFinish(values) {
    console.log("Sucess : ", values);

    let password =
      values.firstname + values.ethereumAddress.toString() + values.lastname;
    console.log(password);

    // generate user keys
    let identity = newIdentity(password, 256);

    setPatientNewIdentity((prev) => ({
      ...prev,
      ...identity,
      firstname: values.firstname,
      lastname: values.lastname,
    }));
    setShowModal(true);

    if (isDownloaded === false) {
      warnUserToDownload();
    }
  }
  function onFinishFailed(errorInfo) {
    console.log("Failure : ", errorInfo);
  }

  function onReset() {}

  function onFill() {}

  return (
    <>
      <Form
        {...layout}
        style={{ padding: "40px" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        label="Form Layout"
      >
        <Form.Item
          label="First Name"
          name="firstname"
          tooltip="This is a required field"
        >
          <Input placeholder="firstname" required></Input>
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          tooltip="This is a required field"
        >
          <Input placeholder="lastname" required></Input>
        </Form.Item>
        <Form.Item
          label="Ethereum address"
          name="ethereumAddress"
          tooltip="This is a required field"
        >
          <Input
            placeholder="your ethereum address shown above"
            required
          ></Input>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <DownloadUserIdentity
        showModal={showModal}
        setShowModal={setShowModal}
        pubK={patinetNewIdentity.publicKey}
        priK={patinetNewIdentity.privateKey}
        symmK={patinetNewIdentity.symmetricKey}
        callback={hasDownloadedIdentity}
      />
    </>
  );
}

function RegisterPatient() {
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
                  Registering a Patient
                </Title>
                <RegisterPatientForm />
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </MainContainer>
      </Layout>
    </>
  );
}

export default RegisterPatient;
