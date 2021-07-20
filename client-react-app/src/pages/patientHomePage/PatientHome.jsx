import React, { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import Account from "../../components/Account";
import ActionPageLayout from "../../components/ActionPageLayout";
import { Button } from "antd";

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
            <button onClick={handleClick}> {action.name} </button>
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

const doctorActions = [
  { id: 1, name: "Profile" },
  { id: 2, name: "Assigned Patients" },
  { id: 3, name: "Request Access" },
];

function PatientHome() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/home/patientHome/Profile">
          <ActionPageLayout
            actions={<UserActions actions={patientActions} />}
            content={<Profile />}
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
            content={<Profile />}
          />
        </Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

let savePreview = "";

// function UploadAvatar() {
//   const [src, setSource] = useState("");
//   const [preview, setPreview] = useState();

//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     if (savePreview !== "") {
//       setPreview(savePreview);
//       setShow(false);
//     }
//   }, []);

//   function onClose() {
//     // setPreview(null);
//     savePreview = preview;
//     setShow(false);
//   }
//   function onCrop(p) {
//     setPreview(p);
//   }

//   return (
//     <div>
//       {show && (
//         <Avatar
//           width={200}
//           height={200}
//           onCrop={onCrop}
//           onClose={onClose}
//           src={src}
//         />
//       )}
//       {show === false && <img src={preview} alt="Preview" />}
//     </div>
//   );
}

function Profile() {
  return (
    <Row className="profile-section">
    //   <Col sm={2}></Col>
    //   <Col sm={4}>
    //     <div className="profile-section-title">Avatar</div>
    //     <UploadAvatar />
    //   </Col>

    //   <Col style={{ display: "flex" }} sm={4}>
    //     {" "}
    //     <Button type="primary" style={{ alignSelf: "center" }}>
    //       Reset Avatar
    //     </Button>
    //   </Col>

      <Row className="profile-section">
        <Col sm={4} className="profile-section-title">
          Personal Details
        </Col>
      </Row>
      <Row>
        <Col sm={4} style={{ textAlign: "center" }}>
          Full Name
        </Col>
        <Col sm={8}>Form Entry</Col>
      </Row>
      <Row>
        <Col sm={4} style={{ textAlign: "center" }}>
          Ethereum Address
        </Col>
        <Col sm={8}>Form Entry</Col>
      </Row>
    </Row>
  );
}

function ViewHealthRecords() {
  return <h1>View Health Records</h1>;
}

function GivePermission() {
  return <h1>Hi from Give Permission</h1>;
}

function ShareRecords() {
  return <h1>Hi from Share Records</h1>;
}

function RevokePermission() {
  return <h1>hi from Revoke Permission</h1>;
}

export default PatientHome;
