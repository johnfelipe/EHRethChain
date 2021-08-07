import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import Account from "../../components/Account";

import "../../styles/registerPatient.css";

import { Form, Input, Button } from "antd";

import { Typography } from "antd";

import GoBackBtn from "../../components/GoBackBtn";

import { newIdentity } from "../../cryptography/ethIdentity";

import Localbase from "localbase";

import { addToIPFS } from "../../adapters/ipfs";

import { encryptSymKeyWithPublicKey } from "../../cryptography/encryption";

import DownloadUserIdentity from "../../components/DownloadUserIdentity";

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
  async function onFinish(values) {
    console.log("Sucess : ", values);

    let password =
      values.firstname + values.ethereumAddress.toString() + values.lastname;
    console.log(password);

    // generate user keys
    let patinetNewIdentity = newIdentity(password, 256);

    console.log(patinetNewIdentity);
    let db = new Localbase("db");

    // store private key on user wallet or browser
    // store user public key to ipfs
    // encrypt user symmetric key and store on ipfs

    try {
      let pkCID = await addToIPFS(patinetNewIdentity.publicKey);

      let encryptedSymmKey = await encryptSymKeyWithPublicKey(
        patinetNewIdentity.publicKey,
        patinetNewIdentity.symmetricKey
      );
      console.log(1);
      let encryptedSymmKeyCid = await addToIPFS(encryptedSymmKey);

      db.collection("users").add({
        id: values.firstname + " " + values.lastname,
        privateKey: patinetNewIdentity.privateKey,
        publicKeyIPFScid: pkCID,
        encryptedSymmetricKeyCid: encryptedSymmKeyCid,
      });
    } catch (e) {
      console.error(e);
    }

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
        <Input placeholder="your ethereum address shown above" required></Input>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button block type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
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
