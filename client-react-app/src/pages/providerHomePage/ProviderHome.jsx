import React from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import ProtectedRoute from "../../components/Protected.route";
import PageNotFound from "../../components/PageNotFound";
import ActionPageLayout from "../../components/ActionPageLayout";

import UserActions from "../../components/UserActions";
import UserProfile from "../../components/UserProfile";
import AssignedPatients from "./AssignedPatients";
import RequestAccess from "./RequestAccess";
import ProviderProfile from "../../components/ProviderProfile";

import { FcInfo } from "react-icons/fc";

{
  /* <UserProfile
                title="Personal Details"
                name="Mohammed Fajer"
                address="0x897Fd668E8adfF344D52104A699187096aD17645"
              /> */
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
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as a provider
              </p>
            }
            actions={
              <UserActions
                actions={doctorActions}
                userHome="/home/providerHome/"
              />
            }
            content={
              <ProviderProfile
                fullname="Whats up"
                address="0x686eBf10835212c16751a3716a38Cc15AB76B783"
              />
            }
          />
        </ProtectedRoute>
        <ProtectedRoute path="/home/providerHome/AssignedPatients">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as a provider
              </p>
            }
            actions={
              <UserActions
                actions={doctorActions}
                userHome="/home/providerHome/"
              />
            }
            content={<AssignedPatients />}
          />
        </ProtectedRoute>

        <ProtectedRoute exact path="/home/providerHome/RequestAccess">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as a provider
              </p>
            }
            actions={
              <UserActions
                actions={doctorActions}
                userHome="/home/providerHome/"
              />
            }
            content={<RequestAccess />}
          />
        </ProtectedRoute>

        <Route exact path={match.path}>
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as a provider
              </p>
            }
            actions={
              <UserActions
                actions={doctorActions}
                userHome="/home/providerHome/"
              />
            }
            content={
              <ProviderProfile
                fullname="Whats up"
                address="0x686eBf10835212c16751a3716a38Cc15AB76B783"
              />
            }
          />
        </Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default ProviderHome;
