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


import {
  contractAddress,
  requestAccount,
  initContract,
} from "../../adapters/contractAPI";


import { ethers } from "ethers";

import DownloadUserIdentity from "../../components/DownloadUserIdentity";
import UserPassPhraseModel from "../../components/UserPassPhraseModel";
import StorjAPI from "../../adapters/APIWrapper";



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
  const [formData, setFormData] = useState({});


  const warnUserToDownload = () => {
    notification["warning"]({
      message: "Download Identity Keys",
      description: "In order to register you must download the keys first.",
    });
    message.warn("You need to download your identity keys first");
  };

 
  function onFinish(values) {
    console.log("Success : ", values);
    setFormData(values);
    setShowModal(true);
  }
  
  function onFinishFailed(errorInfo) {
    console.log("Failure : ", errorInfo);
  }

  function onReset() {}

  function onFill() {}

  async function encryptionPassphrase(passphrase) {
    let storjAPI = new StorjAPI();

    // let result = initContract();
    // const provider = result.provider;
    // const signer = await provider.getSigner();
    // let Contract = new ethers.Contract(contractAddress, result.abi, signer);
    // let address =  await signer.getAddress();
    
    // let userAccessGrant;

    // if(result != -1) {
    
   
    //   // [x] 0. get user pass phrase
    //   // [] 1. generate access grant
    //   let reqData = { userPassPhrase: passphrase }
    //   storjAPI.generateUserAccess(reqData,String(address))
    //   .then(resData => {
    //     userAccessGrant = resData.userAccessGrant;
    //   })
    //   .catch(err => console.log(err));

    //   // 2. add user identity information
    //   storjAPI.uploadIdentity({
    //     userAccessGrant: userAccessGrant,
    //     objectKey: "/EHRs/identity.json",
    //     identity: {
    //       firstname: formData.firstname,
    //       lastname: formData.lastname
    //     }
    //   }, String(address))

    //   // 3. register patient
    //   await Contract.registerPatient(userAccessGrant);

      // 4. redirect to patient homepage
      // auth.login(() => history.push("/home/patientHome"));
    // }
    auth.login(() => history.push("/home/patientHome"));
  }

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
          <Button block type="primary" htmlType="submit" >
            Register
          </Button>
        </Form.Item>
      </Form>

      <UserPassPhraseModel showModal={showModal} setShowModal={setShowModal} getPhrase={encryptionPassphrase} />
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
