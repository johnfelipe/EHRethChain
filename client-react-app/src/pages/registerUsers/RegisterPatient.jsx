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

import { encryptSymKeyWithPublicKey } from "../../cryptography/encryption";
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

        // const node = await IPFS.create().catch((err) => console.log(err));

        let result = initContract();
        let signer = result.provider.getSigner();
        let contract = new ethers.Contract(contractAddress, result.abi, signer);

        console.log(patinetNewIdentity);

        // const fnameAdded = await node
        //   .add(patinetNewIdentity.firstname)
        //   .catch((err) => console.log(err));

        // const lnameAdded = await node
        //   .add(patinetNewIdentity.lastname)
        //   .catch((err) => console.log(err));

        // console.log(fnameAdded.cid.toString(), lnameAdded.cid.toString());

        try {
          // const node = await IPFS.create();
          console.log(
            patinetNewIdentity.firstname,
            patinetNewIdentity.lastname
          );
          const fNameCid = await addToIPFS(
            patinetNewIdentity.firstname.toString()
          );
          const lNameCid = await addToIPFS(
            patinetNewIdentity.lastname.toString()
          );
          console.log(fNameCid);
          console.log(lNameCid);
        } catch (err) {
          console.log(err);
        }

        //Register
        // await contract
        //   .registerPatient(
        //     signer.getAddress(),
        //     fnameAdded.cid.toString(),
        //     lnameAdded.cid.toString()
        //   )
        //   .catch((err) => {
        //     console.log(err);
        //   });

        // let r = await contract.hasRole(
        //   result.contract.PATIENT_ROLE(),
        //   signer.getAddress()
        // );

        // if (r === true) {
        //   message.info("You are already registered Patient ");
        // }

        resolve("done");
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

  // useEffect(() => {
  //   if (isDownloaded === true) {
  //     // if downloaded we register then we redirect

  //     t();

  //     //
  //   }
  //   return () => {};
  // }, [isDownloaded]);

  function hasDownloadedIdentity(value) {
    // alert(value);
    setIsDownloaded(true);

    registerPatient();
  }

  function onFinish(values) {
    console.log("Sucess : ", values);

    // setFName(values.firstname);
    // setLName(values.setLName);

    let password =
      values.firstname + values.ethereumAddress.toString() + values.lastname;
    console.log(password);

    // generate user keys
    let identity = newIdentity(password, 256);
    // console.log({
    //   ...identity,
    //   firstname: values.firstname,
    //   lastname: values.lastname,
    // });

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

    // prompt the user to store the keys
    // if downloaded register and redirect

    // let db = new Localbase("db");

    // store private key on user wallet or browser
    // store user public key to ipfs
    // encrypt user symmetric key and store on ipfs

    // try {
    //   let pkCID = await addToIPFS(patinetNewIdentity.publicKey);

    //   let encryptedSymmKey = await encryptSymKeyWithPublicKey(
    //     patinetNewIdentity.publicKey,
    //     patinetNewIdentity.symmetricKey
    //   );
    //   console.log(1);
    //   let encryptedSymmKeyCid = await addToIPFS(encryptedSymmKey);

    //   db.collection("users").add({
    //     id: values.firstname + " " + values.lastname,
    //     privateKey: patinetNewIdentity.privateKey,
    //     publicKeyIPFScid: pkCID,
    //     encryptedSymmetricKeyCid: encryptedSymmKeyCid,
    //   });
    // } catch (e) {
    //   console.error(e);
    // }

    // encrypt his name with symmetric key
    // store data on ipfs
    // pass those cids to register user
    // register patient
    // direct to patientHome
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
