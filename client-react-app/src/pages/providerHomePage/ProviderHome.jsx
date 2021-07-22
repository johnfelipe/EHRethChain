import React, { useEffect, useState } from "react";

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
import PageNotFound from "../../components/PageNotFound";
import ActionPageLayout from "../../components/ActionPageLayout";
import { Form, Card, InputGroup, Row, Col, Button } from "react-bootstrap";
import UserProfile from "../../components/UserProfile";
import PatientInfoCard from "../../components/PatientInfoCard";
import PatientRecordPage from "./PatientRecordPage";

function UserActions(props) {
  // let match = useRouteMatch();
  let history = useHistory();

  function handleClick(e) {
    history.push(`/home/providerHome/${e.target.innerHTML.replace(/\s/g, "")}`);
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

const doctorActions = [
  { id: 1, name: "Profile" },
  { id: 2, name: "Assigned Patients" },
  { id: 3, name: "Request Access" },
];

function ProviderHome() {
  let match = useRouteMatch();
  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/home/providerHome/Profile">
          <ActionPageLayout
            actions={<UserActions actions={doctorActions} />}
            content={
              <UserProfile
                title="Personal Details"
                name="Mohammed Fajer"
                address="0x897Fd668E8adfF344D52104A699187096aD17645"
              />
            }
          />
        </ProtectedRoute>
        <ProtectedRoute path="/home/providerHome/AssignedPatients">
          <ActionPageLayout
            actions={<UserActions actions={doctorActions} />}
            content={<AssignedPatients />}
          />
        </ProtectedRoute>

        <ProtectedRoute exact path="/home/providerHome/RequestAccess">
          <ActionPageLayout
            actions={<UserActions actions={doctorActions} />}
            content={<RequestAccess />}
          />
        </ProtectedRoute>

        <Route exact path={match.path}>
          <ActionPageLayout
            actions={<UserActions actions={doctorActions} />}
            content={
              <UserProfile
                title="Personal Details"
                name="Mohammed Fajer"
                address="0x897Fd668E8adfF344D52104A699187096aD17645"
              />
            }
          />
        </Route>
        {/* <Route path="*" component={PageNotFound} /> */}
      </Switch>
    </>
  );
}

const demo = () => {
  return <h1>Here</h1>;
};

function AssignedPatients() {
  let match = useRouteMatch();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    let usrs = [
      {
        firstname: "Mohammed",
        lastname: "Fajer",
        address: "0x897Fd668E8adfF344D52104A699187096aD17645",
        id: 1,
      },
      {
        firstname: "Mohammed",
        lastname: "Fajer",
        address: "0x897Fd668E8adfF344D52104A699187096aD17645",
        id: 7,
      },
      {
        firstname: "Sam",
        lastname: "Jaray",
        address: "0x897Fd63...96aD17645",
        id: 2,
      },
      {
        firstname: "Whilter",
        lastname: "White",
        address: "0x897Fd63...93aD17645",
        id: 3,
      },
      {
        firstname: "Norki",
        lastname: "Morkov",
        address: "0x81Fd66...96aD17645",
        id: 4,
      },
      {
        firstname: "Mia",
        lastname: "Watson",
        address: "0x892Fd63...96aD17645",
        id: 5,
      },
      {
        firstname: "Kolim",
        lastname: "Marlo",
        address: "0x897ed63...93aD17645",
        id: 6,
      },
    ];
    setAllUsers(usrs);
    setUsers(usrs);
  }, []);

  function filterCards(event) {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter((user) =>
      `${user.firstname} ${user.lastname}`.toLowerCase().includes(value)
    );

    setUsers(filteredUsers);
  }
  return (
    <Switch>
      <Route exact path={match.path}>
        <h1>Assigned Patients</h1>
        <input
          placeholder="Search by patient name"
          onInput={filterCards}
          style={{
            outline: "none",
            width: "100%",
            border: "1px solid grey",
            fontSize: "0.9rem",
            padding: "1rem",
            borderRadius: ".5rem",
          }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {users.map((user, index) => (
            <PatientInfoCard
              firstname={user.firstname}
              lastname={user.lastname}
              address={user.address}
              id={user.id}
              key={user.id}
            />
          ))}
        </div>
      </Route>

      {users.map((user, index) => (
        <ProtectedRoute
          path={`${match.path}/${user.firstname + user.lastname + user.id}`}
        >
          <PatientRecordPage user={user} />
        </ProtectedRoute>
      ))}
    </Switch>
  );
}

function RequestAccess() {
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
        <h3>Request Access</h3>
        <Col sm={2}></Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Patient's Ethereum Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ethereum address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your patient ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Doctor's Ethereum Address</Form.Label>
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
              Request Access
            </Button>
          </Form>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </>
  );
}

export default ProviderHome;
