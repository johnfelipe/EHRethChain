import React, { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import Account from "../../components/Account";
import ActionPageLayout from "../../components/ActionPageLayout";
// import { Button } from "antd";
import { Empty, Modal } from "antd";

import { Form, Card, InputGroup, Button } from "react-bootstrap";

import { Form as antForm, Input } from "antd";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";

import ProtectedRoute from "../../components/Protected.route";
import UserProfile from "../../components/UserProfile";
import { Container, Row, Col } from "react-bootstrap";
import PageNotFound from "../../components/PageNotFound";

import Avatar from "react-avatar-edit";

import "../../styles/profile.css";
import AccessNotification from "../../components/AccessNotification";

function UserActions(props) {
  // let match = useRouteMatch();
  let history = useHistory();

  function handleClick(e) {
    history.push(`/home/patientHome/${e.target.innerHTML.replace(/\s/g, "")}`);
  }

  return (
    <>
      {props.actions.map((action) => (
        <Row className="action-items">
          <Col>
            {/* <Link to={`${match.path}/${action.name.replace(/\s/g, "")}`}>
              {action.name}
            </Link> */}
            <Button
              style={{ width: "100%", textAlign: "left" }}
              size="lg"
              onClick={handleClick}
              variant="outline-dark"
            >
              {action.name}
            </Button>

            {/* <button style={{ width: "200px" }} onClick={handleClick}>
              {" "}
              {action.name}{" "}
            </button> */}
          </Col>
        </Row>
      ))}
    </>
  );
}
const patientActions = [
  { id: 1, name: "Profile" },
  { id: 2, name: "View Health Records" },
  { id: 3, name: "Give Permission" },
  { id: 4, name: "Share Records" },
  { id: 5, name: "Revoke Permission" },
];

function PatientHome() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/home/patientHome/Profile">
          <ActionPageLayout
            actions={<UserActions actions={patientActions} />}
            content={
              <UserProfile
                title="Personal Details"
                name="Mohammed Fajer"
                address="0x897Fd668E8adfF344D52104A699187096aD17645"
              />
            }
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/ViewHealthRecords">
          <ActionPageLayout
            actions={<UserActions actions={patientActions} />}
            content={<ViewHealthRecords />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/GivePermission">
          <ActionPageLayout
            actions={<UserActions actions={patientActions} />}
            content={<GivePermission />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/ShareRecords">
          <ActionPageLayout
            actions={<UserActions actions={patientActions} />}
            content={<ShareRecords />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/RevokePermission">
          <ActionPageLayout
            actions={<UserActions actions={patientActions} />}
            content={<RevokePermission />}
          />
        </ProtectedRoute>

        <Route exact path={match.path}>
          <ActionPageLayout
            actions={<UserActions actions={patientActions} />}
            content={
              <UserProfile
                title="Personal Details"
                name="Mohammed Fajer"
                address="0x897Fd668E8adfF344D52104A699187096aD17645"
              />
            }
          />
        </Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

function ViewHealthRecords() {
  const [visible, setVisible] = useState(false);
  const noData = (
    <>
      <Row>
        <Col style={{ height: "200px" }}></Col>
      </Row>
      <Row>
        <Col>
          <Empty />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </>
  );

  return (
    <>
      <Row style={{ padding: "40px 40px 10px 40px" }}>
        <h3>View Health Records</h3>
        <Col>
          <Card border="primary">
            <Card.Header>Blood Test 1</Card.Header>
            <Card.Body>
              <Card.Title>15-5-2020</Card.Title>
              <Card.Text>Manchester Hosptial</Card.Text>
              <Button type="primary" onClick={() => setVisible(true)}>
                View
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          {" "}
          <Card border="primary">
            <Card.Header>Doctor Note</Card.Header>
            <Card.Body>
              <Card.Title>4-9-2021</Card.Title>
              <Card.Text>Manchester Hosptial</Card.Text>
              <Button type="primary" onClick={() => setVisible(true)}>
                View
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          {" "}
          <Card border="primary">
            <Card.Header>Nurse Note</Card.Header>
            <Card.Body>
              <Card.Title>5-5-2018</Card.Title>
              <Card.Text>Bolton Surgery</Card.Text>
              <Button type="primary" onClick={() => setVisible(true)}>
                View
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ padding: "40px 40px 10px 40px" }}>
        <Col>
          <Card border="primary">
            <Card.Header>Blood Test 1</Card.Header>
            <Card.Body>
              <Card.Title>15-5-2020</Card.Title>
              <Card.Text>Manchester Hosptial</Card.Text>
              <Button type="primary" onClick={() => setVisible(true)}>
                View
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          {" "}
          <Card border="primary">
            <Card.Header>Doctor Note</Card.Header>
            <Card.Body>
              <Card.Title>4-9-2021</Card.Title>
              <Card.Text>Manchester Hosptial</Card.Text>
              <Button type="primary" onClick={() => setVisible(true)}>
                View
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          {" "}
          <Card border="primary">
            <Card.Header>Nurse Note</Card.Header>
            <Card.Body>
              <Card.Title>5-5-2018</Card.Title>
              <Card.Text>Bolton Surgery</Card.Text>
              <Button type="primary" onClick={() => setVisible(true)}>
                View
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        // title="Modal 1000px width"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Form style={{ padding: "20px" }}>
          <h1>Record Found</h1>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Patient Name
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Mohammed Fajer" readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Record Name
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Test 1" readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Provider
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Manchester Hospital"
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Date
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="20-5-2021" readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Patient Address
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="0x897Fd668E8adfF344D52104A699187096aD17645"
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Doctor's Address
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="0x897Fd668E8adfF344D52104A699187096aD17645"
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Doctor's Note
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Mohammed Fajer"
                readOnly
                as="textarea"
                rows={10}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
}

function GivePermission() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
      <Row style={{ padding: "90px" }}>
        <h3>Give Permission</h3>
        <Col sm={2}></Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Doctor's Ethereum Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ethereum address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your doctor ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Patient's Ethereum Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ethereum address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant="primary" type="button" onClick={handleSubmit}>
              Give Permission
            </Button>
          </Form>
        </Col>
        <Col sm={2}></Col>
      </Row>
      <Row style={{ padding: "90px" }}>
        <h3>Notification</h3>
        <Col sm={1}></Col>
        <Col>
          <AccessNotification />
          <AccessNotification />
          <AccessNotification />
          <AccessNotification />
          <AccessNotification />
          <AccessNotification />
          <AccessNotification />
        </Col>
        <Col sm={1}></Col>
      </Row>
    </>
  );
}

function ShareRecords() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
      <Row style={{ padding: "90px" }}>
        <h3>Share Records</h3>
        <Col sm={2}></Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Your Ethereum address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your ethereum address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your doctor ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Recipient Ethereum address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Recipient ethereum address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a recipient ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Record Name</Form.Label>
                <Form.Control type="text" placeholder="record name" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a record name.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant="primary" type="button" onClick={handleSubmit}>
              Share
            </Button>
          </Form>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </>
  );
}

function RevokePermission() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
      <Row style={{ padding: "90px" }}>
        <h3>Revoke Records</h3>
        <Col sm={2}></Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Your Ethereum address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your ethereum address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your doctor ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Revoke from Ethereum address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Revoke from ethereum address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an ethereum address to revoke.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Record Name</Form.Label>
                <Form.Control type="text" placeholder="record name" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a record name.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant="primary" type="button" onClick={handleSubmit}>
              Share
            </Button>
          </Form>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </>
  );
}

export default PatientHome;
