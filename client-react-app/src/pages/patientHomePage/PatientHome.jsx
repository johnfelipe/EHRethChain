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
import { Modal, message } from "antd";

import "../../styles/profile.css";
import PatientProfile from "../../components/PatientProfile";

import IPFS from "ipfs";
import { ethers } from "ethers";

import { getFromIPFS } from "../../adapters/ipfs";

import {
  contractAddress,
  requestAccount,
  initContract,
} from "../../adapters/contractAPI";

import { decryptDataWithSymKey } from "../../cryptography/decryption";

import { BtnContainer, Btn } from "../../components/UpdateKeysBtn";

import styled from "styled-components";

const PromptFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-grow: 1;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bolder;
`;

const TextArea = styled.textarea`
  width: 90%;

  padding: 8px;
  margin: 10px 0;
  outline: none;
  border: none;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  resize: none;
  &:focus {
    outline: none;
  }
  color: #7c7c7c;
  line-height: 25px;
`;

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

  const [reload, setReload] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [patientData, setPatienData] = useState({});

  const [symmk, setSymmK] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (symmk !== "" && symmk.length >= 64) {
      // alert(symmk);
      setIsModalVisible(false);
    } else {
      message.warn("You must enter your symmetric key before continuing.");
    }
  };

  const handleCancel = () => {
    if (symmk !== "" && symmk.length >= 64) {
      // alert(symmk);
      setIsModalVisible(false);
    } else {
      message.warn("You must enter your symmetric key before continuing.");
    }
  };

  useEffect(() => {
    showModal();
    async function fetchUserData() {
      let result = initContract();
      let signer = result.provider.getSigner();
      let contract = new ethers.Contract(contractAddress, result.abi, signer);

      let addr = await signer.getAddress();
      setAddress(addr);
      console.log(address);

      // ? 1. Retrieve patient records from the blockchain
      let records = await contract.viewOwnRecords();
      setPatienData(records);
      console.log(patientData);

      // ? 2. Retrieve encrypted data from IPFS
      let fNameEncrypted = await getFromIPFS(records.firstNameHash);
      let lNameEncrypted = await getFromIPFS(records.lastNameHash);

      // ? 3. Decrypt the encrypted data
      let fNamePlaintext = decryptDataWithSymKey(fNameEncrypted, symmk);
      let lNamePlaintext = decryptDataWithSymKey(lNameEncrypted, symmk);

      // ? 4. Update data
      setName(fNamePlaintext + " " + lNamePlaintext);
    }
    fetchUserData();
  }, [reload, symmk]);

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
                button={
                  <BtnContainer>
                    <Btn type="button" onClick={() => setReload(!reload)}>
                      Update Keys
                    </Btn>
                  </BtnContainer>
                }
                fullname={name}
                address={address}
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
                button={
                  <BtnContainer>
                    <Btn type="button" onClick={() => setReload(!reload)}>
                      Update Keys
                    </Btn>
                  </BtnContainer>
                }
                fullname={name}
                address={address}
              />
            }
          />
        </Route>
        <Route path="*" component={PageNotFound} />
      </Switch>

      <Modal
        title="Enter Your Keys"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <PromptFormContainer>
          <div>
            <Label>Symmetric Key</Label>
          </div>
          <div>
            <TextArea
              rows={3}
              type="text"
              onChange={(e) => setSymmK(e.target.value)}
              value={symmk}
            />
          </div>
        </PromptFormContainer>
      </Modal>
    </>
  );
}

export default PatientHome;
