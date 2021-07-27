import React from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import UserProfile from "../../components/UserProfile";
import ActionPageLayout from "../../components/ActionPageLayout";
import ProtectedRoute from "../../components/Protected.route";
import PageNotFound from "../../components/PageNotFound";

import UserActions from "../../components/UserActions";
import ViewHealthRecords from "./ViewHealthRecords";
import GivePermission from "./GivePermission";
import ShareRecords from "./ShareRecords";
import RevokePermission from "./RevokePermission";

import "../../styles/profile.css";

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
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
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
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={<ViewHealthRecords />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/GivePermission">
          <ActionPageLayout
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={<GivePermission />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/ShareRecords">
          <ActionPageLayout
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={<ShareRecords />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/RevokePermission">
          <ActionPageLayout
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={<RevokePermission />}
          />
        </ProtectedRoute>

        <Route exact path={match.path}>
          <ActionPageLayout
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
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

export default PatientHome;
