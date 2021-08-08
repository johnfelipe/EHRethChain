import React, { useState, useEffect } from "react";

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

import { FcInfo } from "react-icons/fc";

import "../../styles/profile.css";
import PatientProfile from "../../components/PatientProfile";

import IPFS from "ipfs";
import { ethers } from "ethers";

import {
  contractAddress,
  requestAccount,
  initContract,
} from "../../adapters/contractAPI";

const patientActions = [
  { id: 1, name: "Profile" },
  { id: 2, name: "View Health Records" },
  { id: 3, name: "Give Permission" },
  { id: 4, name: "Share Records" },
  { id: 5, name: "Revoke Permission" },
];

{
  /* <UserProfile
                title="Personal Details"
                name="Mohammed Fajer"
                address="0x897Fd668E8adfF344D52104A699187096aD17645"
              /> */
}

function PatientHome() {
  let match = useRouteMatch();

  async function profileData() {
    // const node = await IPFS.create().catch((err) => console.log(err));
    let result = initContract();
    let signer = result.provider.getSigner();
    let contract = new ethers.Contract(contractAddress, result.abi, signer);

    let records = await contract.viewOwnRecords();
    console.log(records);
  }

  useEffect(() => {
    console.log("here");
    profileData();
  }, []);

  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/home/patientHome/Profile">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={
              <PatientProfile
                fullname="Mohammed Fajer"
                address="0x897Fd668E8adfF344D52104A699187096aD17645"
              />
            }
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/ViewHealthRecords">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
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
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
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
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
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
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
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
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={
              <PatientProfile
                fullname="Mohammed Fajer"
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
