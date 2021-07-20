import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";
import Account from "../components/Account";

import "../styles/registerPatient.css";

import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";

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
  function onFinish(values) {
    console.log("Sucess : ", values);
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
        name="firsname"
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
        name="ethereum address"
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
              <Col></Col>
              <Col xs={6} className="form-container">
                {" "}
                <Title level={2} style={{ textAlign: "center" }}>
                  Registering a Patient
                </Title>
                <RegisterPatientForm />{" "}
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
