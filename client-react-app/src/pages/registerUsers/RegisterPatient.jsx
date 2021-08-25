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


import { ethers } from "ethers";

import DownloadUserIdentity from "../../components/DownloadUserIdentity";

import IPFS from "ipfs";


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
  


  const warnUserToDownload = () => {
    notification["warning"]({
      message: "Download Identity Keys",
      description: "In order to register you must download the keys first.",
    });
    message.warn("You need to download your identity keys first");
  };

 
  function onFinish(values) {
    console.log("Sucess : ", values);
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
